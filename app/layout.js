import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/CartContext'

export const metadata = {
  title: 'Nicerate — Premium Electronics',
  description: 'Shop the best TVs, Laptops, Phones and Accessories at Nicerate. Quality electronics, great prices.',
  keywords: 'electronics, phones, laptops, TVs, accessories, Kenya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}