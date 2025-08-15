import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SISOBRA - Visualização de Dados',
  description: 'Sistema de visualização de dados públicos do sistema legado SISOBRA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
