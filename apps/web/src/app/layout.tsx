import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ChakraProvider } from '@/providers/ChakraProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PWEP — Plataforma Web de Estatísticas e Probabilidade',
  description: 'Estatísticas e Probabilidades da Copa do Mundo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
