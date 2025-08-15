import './globals.css'
import type { Metadata } from 'next'
import Navigation from './components/Navigation'

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
        <Navigation />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
          <p className="text-sm">
            SISOBRA - Sistema de Visualização de Dados Históricos
          </p>
        </footer>
      </body>
    </html>
  )
}
