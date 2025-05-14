// app/layout.tsx
import { ToastProvider } from "@/components/ui/toast/toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}