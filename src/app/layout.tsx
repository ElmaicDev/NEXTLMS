import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react"
import { AuthProvider } from "@/components/providers/session-provider"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable}`}
    >
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
