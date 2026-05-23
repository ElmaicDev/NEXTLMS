import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { randomBytes } from "crypto"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma";
import { Role } from "@/lib/generated/prisma/client"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") || "user"
  )
}

declare module "next-auth" {
  interface User {
    role: string;
    tenantId: string | null;
  }

  interface Session {
    user: {
      id: string;
      tenantId: string | null;
      role: string;
    } & DefaultSession["user"];
  }
}

// async function getUserFromDb(email: string, password: string) {
//   const user = await prisma.user.findFirst({
//     where: {
//       email: email,
//     },
//   });

//   if (!user || !user.password) {
//     return null;
//   }

//   const isValidPassword = await compare(password, user.password);

//   if (!isValidPassword) {
//     return null;
//   }

//   return user;
// }
async function getUserFromDb(email: string, password: string) {
  console.log("🔍 Buscando usuario:", email)

  const user = await prisma.user.findFirst({
    where: { email },
  });

  console.log("👤 Usuario:", user)

  if (!user) {
    console.log("❌ Usuario no existe")
    return null;
  }

  if (!user.password) {
    console.log("⚠️ Usuario sin password (OAuth?)")
    return null;
  }

  const isValidPassword = await compare(password, user.password);
  console.log("🔐 Password válido:", isValidPassword)

  if (!isValidPassword) {
    console.log("❌ Password incorrecto")
    return null;
  }

  return user;
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // debug: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        )

        // Return null if invalid credentials (NextAuth will show CredentialsSignin error)
        if (!user) {
          return null
        }

        return user
      },
    }),
  ],
  events: {
    async createUser({ user }) {
      // Sólo aplica al flujo OAuth: el PrismaAdapter ya creó el User sin tenant.
      // Para Credentials, el registro en /api/register ya crea Tenant + User
      // dentro de una transacción y este evento no se dispara.
      if (!user.id) return
      const fresh = await prisma.user.findUnique({ where: { id: user.id } })
      if (!fresh || fresh.tenantId) return

      const emailLocalPart = (fresh.email ?? "user").split("@")[0] || "user"
      const displayName =
        (fresh.name && fresh.name.trim()) || emailLocalPart
      const tenantName = `${displayName} Workspace`
      const baseSlug = slugify(emailLocalPart)

      for (let attempt = 0; attempt < 5; attempt++) {
        const slug = `${baseSlug}-${randomBytes(2).toString("hex")}`
        try {
          await prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
              data: { name: tenantName, slug },
            })
            await tx.user.update({
              where: { id: fresh.id },
              data: { tenantId: tenant.id, role: Role.ADMIN },
            })
          })
          return
        } catch (err: unknown) {
          if ((err as { code?: string })?.code === "P2002") continue
          throw err
        }
      }
      console.error(
        "[AUTH_EVENT_CREATE_USER] no se pudo generar un slug único para",
        fresh.email
      )
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      // En el primer sign-in releemos tenantId/role desde la DB.
      // Necesario para OAuth: el `user` aquí es el devuelto por el adapter
      // ANTES de que `events.createUser` haya adjuntado el tenant.
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id as string },
          select: { id: true, tenantId: true, role: true },
        })
        if (dbUser) {
          token.id = dbUser.id
          token.tenantId = dbUser.tenantId
          token.role = dbUser.role
        } else {
          token.id = user.id
          token.tenantId = (user as { tenantId: string | null }).tenantId
          token.role = user.role
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.tenantId = token.tenantId as string
        session.user.role = token.role as string
      }

      return session
    },
  },
})