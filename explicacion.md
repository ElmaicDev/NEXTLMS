# Explicación de los cambios

Documento didáctico de los dos cambios independientes que se aplicaron al repo. El objetivo no es que aceptes "lo que se hizo", sino que entiendas el *por qué* y puedas reproducir un cambio análogo por tu cuenta la próxima vez.

---

## Resumen ejecutivo

Se hicieron dos cosas independientes en la misma sesión:

1. **Cambio de paleta** de gris a azul/índigo, modificando sólo tokens cromáticos en `src/app/globals.css`.
2. **Fix del bug "no se puede agregar usuario porque no tiene tenant"**, modificando el flujo de registro en `src/app/api/register/route.ts` y el flujo OAuth en `src/lib/auth.ts`.

Son cambios sin relación entre sí, pero comparten una lección: en sistemas con buenas abstracciones (tokens semánticos, claims en JWT, transacciones), un cambio en un lugar pequeño se propaga por todo el sistema. Eso es bueno (productividad) y peligroso (errores que se propagan igual).

---

## Parte 1 — La paleta azul/índigo

### 1.1 Cómo funciona el color en este proyecto

Este proyecto usa **Tailwind v4**. Hay diferencias importantes vs Tailwind v3:

- **No hay `tailwind.config.ts`.** En v3 tu archivo de config era el centro de tu diseño. En v4 ya no existe — la configuración vive directamente en CSS, dentro de un bloque `@theme inline { ... }`.
- **Colores en oklch, no hex.** Verás cosas como `oklch(0.55 0.20 260)`. Es un espacio de color perceptualmente uniforme: si subes la lightness en 0.1, el cambio que percibe tu ojo es consistente sin importar el hue. En hex/rgb, un cambio "del mismo tamaño" cambia visualmente mucho más en unos colores que en otros.

`oklch(L C H)` donde:
- **L (lightness):** 0 = negro absoluto, 1 = blanco absoluto. Para texto sobre fondo, fíjate en el contraste de L.
- **C (chroma):** saturación. `0` = gris neutro. Valores típicos: 0.1 = pastel, 0.2 = vibrante, 0.3+ = muy saturado (cuidado: a más chroma, menos colores son representables y caes en `out of gamut`).
- **H (hue):** ángulo en grados. 0/360 = rojo, 60 = amarillo, 130 = verde, 200 = cian, 240–280 = azul/índigo, 300 = magenta.

### 1.2 El patrón "tokens semánticos" de shadcn

Mira `globals.css`:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  /* ... */
}

:root {
  --primary: oklch(0.55 0.20 260);
  --primary-foreground: oklch(0.985 0 0);
  /* ... */
}

.dark {
  --primary: oklch(0.70 0.16 260);
  /* ... */
}
```

Lo importante de este patrón:

- El `@theme inline` declara los tokens que Tailwind expone como clases (`bg-primary`, `text-primary-foreground`, `border-accent`, etc.).
- `:root` y `.dark` definen los **valores reales** según el modo.
- Tus componentes usan clases semánticas: `<button className="bg-primary text-primary-foreground">`. **Nunca** escribes `bg-blue-500` directamente.

¿La ventaja? Cambias el valor de `--primary` y todos los botones, links, anillos de focus, etc. cambian de golpe. Por eso este "cambio de paleta" no requirió tocar ningún componente JSX.

¿La trampa? Si en algún componente alguien escribió `bg-blue-500` en vez de `bg-primary`, ese componente se va a quedar fuera del cambio. Si después de cambiar la paleta ves un botón viejo que no cambió, busca clases hardcoded en su JSX.

### 1.3 Qué se cambió y qué no

**Se mantuvieron sin tocar** (todos eran grises o el rojo de error):
- `background`, `foreground` — fondos y texto base
- `card`, `card-foreground`, `popover`, `popover-foreground` — superficies elevadas
- `secondary`, `secondary-foreground` — botones secundarios
- `muted`, `muted-foreground` — texto atenuado
- `border`, `input` — bordes
- `destructive` — rojo de error (no quieres tintarlo de azul, perdería su semántica)
- `sidebar`, `sidebar-foreground`, `sidebar-border` — base de la sidebar

**Se cambiaron** (los tokens "de marca"):
- `primary`, `ring` — la identidad visual
- `accent`, `accent-foreground` — superficies con tinte sutil de marca (hovers, badges)
- `chart-1` a `chart-5` — paleta secuencial para gráficos
- `sidebar-primary`, `sidebar-accent`, `sidebar-ring` — equivalentes en la sidebar

### 1.4 Light vs dark: por qué los valores no son iguales

En **light mode** (fondo blanco), un azul medio-oscuro (`L=0.55`) se ve nítido y profundo. Si pusieras el mismo `L=0.55` en dark mode (fondo negro), se vería apagado, casi sucio. Por eso en dark **subimos lightness** (`L=0.70`) — el color "vuela" más sobre fondo oscuro.

Al mismo tiempo, **bajamos un poco el chroma** en dark (`C=0.20 → 0.16`) porque los colores muy saturados sobre fondo oscuro suelen ser agresivos (vibran).

Misma lógica con `primary-foreground`: en light es casi blanco (`0.985`) para contrastar contra el primary oscuro; en dark es casi negro (`0.205`) para contrastar contra el primary claro. **Foreground siempre es el inverso de su pareja.**

El `accent` light usa un chroma muy bajo (`0.04`) para ser un "tinte sutil" de azul, casi blanco con un soplo de color. Sirve para hovers sin ser intrusivo. En dark, lo subimos en lightness y chroma para que se note sobre el fondo oscuro.

### 1.5 Cómo reproducir esto con otra paleta

1. **Elige un hue base.** Mira la rueda: azul=260°, verde=155°, naranja=55°, magenta=320°.
2. **Decide la pareja de valores light/dark para `primary`:**
   - Light: `L ≈ 0.50–0.60`, `C ≈ 0.15–0.22`
   - Dark: `L ≈ 0.65–0.75`, `C ≈ 0.13–0.18`
3. **`primary-foreground` es siempre el inverso por lightness:**
   - Si tu primary tiene L≈0.55, foreground = `oklch(0.985 0 0)` (casi blanco)
   - Si tu primary tiene L≈0.70, foreground = `oklch(0.205 0 0)` (casi negro)
4. **`ring`** suele ser el mismo hue que primary, ligeramente más claro (anillos de focus deben verse pero no robar atención).
5. **`accent`** light = `oklch(0.95 0.04 <hue>)`, dark = `oklch(0.30 0.06 <hue>)`. Sutil.
6. **Charts**: cinco oklch en torno al hue base con `lightness` y `chroma` variados para diferenciarse.
7. Abre la app, navega por todas las páginas, comprueba que botones, links, focus rings y badges se ven bien en light y dark.

---

## Parte 2 — El bug del tenant

### 2.1 Contexto del schema

El proyecto es **multi-tenant**. Mira `prisma/schema.prisma`:

```prisma
model Tenant {
  id    String @id @default(cuid())
  name  String
  slug  String @unique
  users User[]
  ...
}

model User {
  id       String  @id @default(cuid())
  email    String? @unique
  role     Role    @default(STUDENT)
  tenantId String?
  tenant   Tenant? @relation(...)
  ...
}
```

Dos cosas críticas:

- `User.tenantId` es **opcional** (puede ser `null`). El único caso legítimo de tenantId null es un `SUPER_ADMIN` de la plataforma. Cualquier otro rol *necesita* tenant.
- `Tenant.slug` es **`@unique`**. Dos tenants no pueden tener el mismo slug. Esto va a importar.

### 2.2 El chokepoint: `getTenantId()`

```ts
// src/lib/getTenant.ts
export async function getTenantId() {
  const session = await auth()
  if (!session?.user?.tenantId) {
    throw new Error("No tenant")
  }
  return session.user.tenantId
}
```

Toda ruta protegida (cualquier API/server action que acceda a Courses, Modules, Lessons, etc.) llama a `getTenantId()`. Si no hay tenant en la sesión, todo explota con `"No tenant"`.

**No hay middleware global** que valide tenant. Cada ruta lo llama explícitamente. Es una decisión de diseño: simple y explícita, pero requiere que todo usuario llegue al login con un tenantId ya asignado.

### 2.3 Por qué existía el bug

Hay dos flujos por los que un usuario nace en el sistema, y **ninguno asignaba tenant**:

```
┌───────────────────────────┐         ┌───────────────────────────┐
│   Credentials (email +    │         │   OAuth (Google/GitHub)   │
│   password)               │         │                           │
├───────────────────────────┤         ├───────────────────────────┤
│ POST /api/register        │         │ Click "Iniciar con Google"│
│   ↓                       │         │   ↓                       │
│ prisma.user.create({      │         │ @auth/prisma-adapter      │
│   name, email, password   │         │   .createUser({...})      │
│ })  ← tenantId: null      │         │   ← tenantId: null        │
│   ↓                       │         │   ↓                       │
│ Login                     │         │ Sesión creada             │
│   ↓                       │         │   ↓                       │
│ getTenantId() → 💥        │         │ getTenantId() → 💥        │
└───────────────────────────┘         └───────────────────────────┘
```

El bug vive en dos sitios distintos porque hay **dos productores de usuarios** distintos. Esta es una de las cosas más importantes que tienes que internalizar: en NextAuth, si tienes Credentials + OAuth, tienes dos rutas que crean filas en `User` y las dos deben respetar la misma política.

### 2.4 La política elegida

"**Un tenant nuevo por usuario.** El usuario es ADMIN de su tenant." Es el modelo SaaS clásico self-serve (cada usuario es su propia organización al principio; si más adelante quiere invitar colegas, eso es otra feature).

En términos de schema, cada registro produce:
- 1 fila nueva en `Tenant` con un `name` derivado del nombre del usuario y un `slug` único.
- 1 fila nueva en `User` con `tenantId` apuntando al tenant y `role = ADMIN`.

### 2.5 Fix del flujo Credentials

`src/app/api/register/route.ts`. La operación de antes era:

```ts
const user = await prisma.user.create({ data: { name, email, password } })
// tenantId queda null → bug
```

La operación nueva, simplificada:

```ts
const user = await prisma.$transaction(async (tx) => {
  const tenant = await tx.tenant.create({ data: { name: tenantName, slug } })
  return tx.user.create({
    data: { name, email, password, tenantId: tenant.id, role: Role.ADMIN },
  })
})
```

Por qué `$transaction`:
- Si la creación del user falla (p.ej. el email ya existe por una race condition), no quieres que quede un Tenant huérfano en la DB. La transacción es ACID: o se crean ambos, o se hace rollback de los dos.
- Prisma maneja esto en una sola conexión y una sola transacción de PostgreSQL.

#### El problema del slug único

`Tenant.slug` es `@unique`. Estrategia para generar uno:

1. Tomar el local-part del email: `breiner@example.com` → `breiner`.
2. "Slugificar" (minúsculas, sin acentos, sin caracteres raros): `juan.pérez` → `juan-perez`.
3. Añadir un **sufijo aleatorio** de 4 hex (`randomBytes(2).toString("hex")`): `breiner-a3f9`. Esto da 65.536 combinaciones por slug base, así que la probabilidad de colisión es muy baja.
4. Si por mala suerte colisiona, Prisma lanza el error `P2002` (unique constraint violation). Lo atrapamos y reintentamos hasta 5 veces:

```ts
for (let attempt = 0; attempt < 5; attempt++) {
  const slug = `${baseSlug}-${randomBytes(2).toString("hex")}`
  try {
    user = await prisma.$transaction(...)
    break
  } catch (err) {
    if ((err as { code?: string })?.code === "P2002") continue
    throw err
  }
}
```

Este patrón "slugify + sufijo random + retry on unique violation" es muy genérico — lo vas a reusar para handles de usuario, códigos de invitación, etc.

#### Detalle de imports

`Role` se importa de `@/lib/generated/prisma/client`, **no** de `@prisma/client`. ¿Por qué? Mira `schema.prisma`:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/lib/generated/prisma"
}
```

Este proyecto le dice a Prisma que genere el cliente en una ruta custom (no en `node_modules/.prisma`). Si importas de `@prisma/client`, no existe en este proyecto. Es una de las idiosincrasias que están documentadas en el `CLAUDE.md` y que vale la pena recordar.

### 2.6 Fix del flujo OAuth

`src/lib/auth.ts`. Aquí no controlas la creación del user — la hace el `PrismaAdapter`. ¿Dónde te enchufas?

NextAuth v5 expone una hook llamada `events.createUser` que se dispara DESPUÉS de que el adapter creó el user. Es "fire and forget": no puedes abortar la creación, sólo reaccionar.

```ts
events: {
  async createUser({ user }) {
    if (!user.id) return
    const fresh = await prisma.user.findUnique({ where: { id: user.id } })
    if (!fresh || fresh.tenantId) return  // ya tiene tenant, nada que hacer

    // Misma política: slugify + retry + transacción
    const emailLocalPart = (fresh.email ?? "user").split("@")[0] || "user"
    const tenantName = `${fresh.name || emailLocalPart} Workspace`
    const baseSlug = slugify(emailLocalPart)

    for (let attempt = 0; attempt < 5; attempt++) {
      const slug = `${baseSlug}-${randomBytes(2).toString("hex")}`
      try {
        await prisma.$transaction(async (tx) => {
          const tenant = await tx.tenant.create({ data: { name: tenantName, slug } })
          await tx.user.update({
            where: { id: fresh.id },
            data: { tenantId: tenant.id, role: Role.ADMIN },
          })
        })
        return
      } catch (err) {
        if ((err as { code?: string })?.code === "P2002") continue
        throw err
      }
    }
  },
}
```

¿Por qué `events.createUser` y no `signIn`? Los **events** son post-hechos, ideales para side effects derivados. El **callback `signIn`** es un gate (`return true/false`) que decide si dejar entrar al usuario — usarlo para mutaciones de DB sería un patrón sucio.

### 2.7 La sutileza crítica: por qué el `jwt` callback debe releer de la DB

Esto es lo más importante de toda la sesión, y es **muy fácil pasarlo por alto**.

NextAuth corre los hooks en este orden, en el primer login OAuth:

```
1. adapter.createUser(profile)        → User creado en DB, tenantId: null
                                        adapter devuelve `user` (snapshot)
2. events.createUser({ user })        → Aquí creamos el tenant y mutamos el user
                                        AHORA el user en DB tiene tenantId
3. jwt({ token, user })               → Pero el `user` que recibimos aquí es
                                        el snapshot del paso 1 (tenantId: null)
4. session({ session, token })        → El token se firma → la sesión hereda
                                        tenantId null → BUG sigue
```

El `user` que llega al callback `jwt` **no se actualiza** entre los pasos 1 y 3. Es el objeto devuelto por el adapter al inicio.

Solución: en el callback `jwt`, cuando `user` esté presente (es decir, en el primer sign-in), releemos los valores frescos desde la DB:

```ts
async jwt({ token, user }) {
  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id as string },
      select: { id: true, tenantId: true, role: true },
    })
    if (dbUser) {
      token.id = dbUser.id
      token.tenantId = dbUser.tenantId  // ← valor post-mutación de events.createUser
      token.role = dbUser.role
    } else {
      // fallback al user del callback si por lo que sea no encontramos en DB
      token.id = user.id
      token.tenantId = (user as { tenantId: string | null }).tenantId
      token.role = user.role
    }
  }
  return token
}
```

Costo: una query extra a la DB **sólo en login** (no en cada request). El callback `jwt` corre en cada request, pero `user` sólo está presente cuando hay sign-in fresco — el resto del tiempo el callback recibe `{ token }` (sin `user`) y no entra al if.

**Lección general:** cada vez que añadas un campo nuevo que dependa de un side effect post-creación (un trial, un default, una asignación de equipo...), pregúntate: ¿el `user` que llega al `jwt` callback ya tiene ese campo, o no? Si tienes dudas, relée de la DB.

### 2.8 Edge case que dejé sin tocar (a propósito)

Si en tu DB ya hay usuarios OAuth con `tenantId = null` (gente que se logueó antes del fix), **`events.createUser` no los va a reparar** — ese evento sólo dispara en *creación*, no en login posterior.

Opciones:

1. **Backfill manual.** Script de una sola vez: para cada user con `tenantId = null` y `role != SUPER_ADMIN`, crear tenant y asignar. Pragmático si tienes pocos usuarios afectados.
2. **Self-healing en el callback `signIn`.** Antes de aceptar el login, si el user no tiene tenant, crearle uno. Cubre también casos futuros raros. Cuesta un check extra en cada login.

Si tienes 5 usuarios huérfanos, opción 1. Si es producción con muchos usuarios, opción 2.

---

## Parte 3 — Cosas para hacerlo manualmente la próxima vez

Lecciones generales, separadas del cambio concreto:

### 3.1 Mapa mental de "agregar un nuevo claim a la sesión"

Cuando quieras que el usuario lleve algo nuevo en su sesión (p.ej. `subscriptionPlan`, `teamId`, `featureFlags`), el cambio se distribuye por estos puntos. Saltarte uno = el campo es `null` en runtime:

1. **Schema (Prisma)** — añade la columna a `User`, corre `npx prisma migrate dev`.
2. **Generator de Prisma** — corre `npx prisma generate` (en este proyecto, regenera en `src/lib/generated/prisma`).
3. **Tipos de NextAuth** — actualiza el `declare module "next-auth"` en `src/lib/auth.ts` añadiendo el campo a `User` y a `Session.user`.
4. **Asignación inicial** — si el campo se setea al crear el user, edita `/api/register/route.ts` (Credentials) y `events.createUser` (OAuth).
5. **Callback `jwt`** — copia el valor de `user` (o de la DB) al `token`.
6. **Callback `session`** — copia el valor de `token` a `session.user`.
7. **Uso en código** — `const session = await auth(); session.user.tuCampo`.

### 3.2 Cuándo usar transacciones de Prisma

Regla simple: **si dos operaciones de DB deben suceder juntas o no suceder en absoluto, ponlas en `$transaction`.** Crear tenant + user, descontar saldo + crear pedido, eliminar relación + actualizar contadores.

No abuses: una transacción larga bloquea filas. Si la operación no necesita atomicidad, no la metas en transacción.

### 3.3 Patrón "slug único con retry"

Reusa este patrón cada vez que necesites un identificador legible pero único:

```ts
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")          // quita acentos
    .replace(/[^a-z0-9]+/g, "-")    // todo lo demás → guion
    .replace(/(^-|-$)+/g, "")       // sin guiones al principio/fin
    || "fallback"
}

for (let attempt = 0; attempt < 5; attempt++) {
  const slug = `${slugify(base)}-${randomBytes(2).toString("hex")}`
  try {
    return await prisma.thing.create({ data: { slug, ... } })
  } catch (err) {
    if ((err as { code?: string })?.code === "P2002") continue
    throw err
  }
}
```

`P2002` es el código de Prisma para violación de unique constraint. Memorízalo, lo verás mucho.

### 3.4 Cambios de paleta sin tocar componentes

Si tu proyecto sigue el patrón de tokens semánticos shadcn:

1. Decide qué *categoría* de tokens cambiar: ¿sólo "de marca" (primary, accent, ring) o también neutros (background, foreground)?
2. Para cada token cromático: define la pareja `light` (en `:root`) y `dark` (en `.dark`).
3. Recuerda la heurística "en dark sube lightness, baja chroma".
4. Comprueba contraste de pareja `X` / `X-foreground` con un checker WCAG (Chrome DevTools tiene uno integrado).
5. Arranca `pnpm dev`, recorre todas las páginas, mira hovers y focus rings.

### 3.5 Verificación manual mínima antes de declarar "listo"

- `pnpm lint` — pasa, o los errores son preexistentes y no introducidos por ti.
- `pnpm dev` — arranca sin errores.
- Reproduce el flujo afectado a mano: registro, login, primera ruta protegida.
- Para el bug del tenant: tras registrar un usuario nuevo, abre la DB (Prisma Studio: `npx prisma studio`) y comprueba que hay UN tenant nuevo + UN user nuevo con `tenantId` correcto y `role = ADMIN`.

---

## Diff resumido

```
src/app/globals.css                  ~24 valores oklch cambiados (light + dark)
src/app/api/register/route.ts        rewrite (slugify + $transaction + retry)
src/lib/auth.ts                      añade events.createUser; jwt re-lee de DB
```

Sin migraciones de schema. Sin cambios en componentes UI. Sin cambios en otras rutas.

---

## Si algo se rompe

- "No tenant" sigue saliendo en una ruta protegida → comprueba `pnpm dev` reiniciado (los JWTs de sesiones viejas siguen sin `tenantId`; cierra sesión y vuelve a entrar).
- Slug collision repetida → es prácticamente imposible con 4 hex; si pasa, sube el sufijo a `randomBytes(3)` (12 millones de combinaciones).
- Color "raro" en dark mode → contrasta con el fondo, no con el componente. Sube lightness o baja chroma.
- Botón viejo no cambió de color → probablemente tiene `bg-blue-500` hardcoded; reemplaza por `bg-primary`.
