import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/Header'), { ssr: false })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })
const CartProvider = dynamic(() => import('@/components/CartProvider'), { ssr: false })

export const metadata: Metadata = {
  title: 'AuraScent - Create Your Custom Perfume',
  description: 'Design a custom perfume that\'s uniquely yours. Choose your bottle, type, and scent to create the perfect fragrance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}




