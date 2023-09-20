import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import HeaderNavigation from './components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <main className="bg-slate-100 p-0 container mx-auto">
          <HeaderNavigation />

          {children}
        </main>
      </body>
    </html>
  )
}
