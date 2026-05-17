import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"; 
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

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
  callbacks: {
    async jwt({ token, user }) {
      // Se ejecuta en login
      if (user) {
        token.id = user.id
        token.tenantId = (user as { tenantId: string | null; role: string }).tenantId
        token.role = user.role
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