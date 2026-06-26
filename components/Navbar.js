'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Zap, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/CartContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cart } = useCart()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav style={{ background: '#000', borderBottom: '1px solid #1a1a1a' }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div style={{ background: '#006B35' }} className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Zap size={16} color="white" fill="white" />
              </div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'white' }}>
                Nice<span style={{ color: '#006B35' }}>rate</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map(link => (
                <Link key={link.href} href={link.href} className="nav-link text-sm font-medium">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Cart */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000'}?text=Hi, I'd like to enquire about a product`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex btn-primary px-4 py-2 rounded-lg text-sm font-medium"
              >
                WhatsApp Us
              </a>

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                style={{ position: 'relative', background: '#111', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '8px', color: 'white' }}
              >
                <ShoppingBag size={18} />
                {cart.length > 0 && (
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    background: '#006B35', color: 'white', fontSize: '0.65rem',
                    fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }} className="md:hidden px-4 py-4 flex flex-col gap-4">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium"
                style={{ color: '#a0a0a0' }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000'}?text=Hi, I'd like to enquire about a product`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-center"
            >
              WhatsApp Us
            </a>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}