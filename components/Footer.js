import Link from 'next/link'
import { Zap, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000'
  const email = process.env.NEXT_PUBLIC_STORE_EMAIL || 'info@nicerate.com'

  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div style={{ background: '#006B35' }} className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Zap size={16} color="white" fill="white" />
              </div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'white' }}>
                Nice<span style={{ color: '#006B35' }}>rate</span>
              </span>
            </Link>
            <p style={{ color: '#a0a0a0', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '280px' }}>
              Premium electronics at the best prices. TVs, Laptops, Phones, and Accessories — all genuine, all quality.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#006B35' }}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <MessageCircle size={16} color="white" />
              </a>
              <a
                href={`mailto:${email}`}
                style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Mail size={16} color="#a0a0a0" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Products' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MessageCircle size={14} color="#006B35" style={{ marginTop: '2px', flexShrink: 0 }} />
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#a0a0a0', fontSize: '0.875rem' }}
                >
                  +{whatsapp}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={14} color="#006B35" style={{ marginTop: '2px', flexShrink: 0 }} />
                <a
                  href={`mailto:${email}`}
                  style={{ color: '#a0a0a0', fontSize: '0.875rem' }}
                >
                  {email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} color="#006B35" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>Dominion Expo Centre, First Floor Shop F3, Tom Mboya Street, CBD Nairobi, Kenya</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} color="#006B35" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>Mon–Sat, 8am–8pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1a1a1a', marginTop: '3rem', paddingTop: '1.5rem' }} className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p style={{ color: '#555', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Nicerate. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  )
}