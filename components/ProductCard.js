'use client'
import Image from 'next/image'
import { MessageCircle, Mail, Plus, Check } from 'lucide-react'
import { useCart } from '@/lib/CartContext'

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart()
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000'
  const email = process.env.NEXT_PUBLIC_STORE_EMAIL || 'info@nicerate.com'
  const inCart = isInCart(product.id)

  const waMessage = `Hi! I'm interested in the *${product.name}* priced at KES ${product.price?.toLocaleString()}. Is it available?`
  const emailSubject = `Order Inquiry: ${product.name}`
  const emailBody = `Hi Nicerate,\n\nI would like to order the following:\n\nProduct: ${product.name}\nPrice: KES ${product.price?.toLocaleString()}\nCategory: ${product.category}\n\nPlease confirm availability and payment details.\n\nThank you.`

  return (
    <div className="product-card rounded-xl overflow-hidden flex flex-col" style={{ background: '#111111', border: '1px solid #1a1a1a' }}>
      {/* Image */}
      <div className="relative w-full" style={{ aspectRatio: '4/3', background: '#1a1a1a' }}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: '#333' }}>
            <span style={{ fontSize: '3rem' }}>📦</span>
          </div>
        )}
        <span style={{ background: '#006B35', color: 'white', fontSize: '0.7rem', fontWeight: 600 }}
          className="absolute top-2 left-2 px-2 py-1 rounded-md uppercase tracking-wide">
          {product.category}
        </span>
        {product.featured && (
          <span style={{ background: '#000', color: '#006B35', fontSize: '0.7rem', fontWeight: 600, border: '1px solid #006B35' }}
            className="absolute top-2 right-2 px-2 py-1 rounded-md">
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: 'white', fontSize: '0.95rem', lineHeight: '1.3' }}>
            {product.name}
          </h3>
          {product.description && (
            <p style={{ color: '#a0a0a0', fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: '1.4' }} className="line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        <div style={{ color: '#006B35', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem' }}>
          KES {product.price?.toLocaleString()}
        </div>

        {/* Add to enquiry */}
        <button
          onClick={() => addToCart(product)}
          disabled={inCart}
          style={{
            background: inCart ? '#0a2a0a' : '#006B35',
            color: inCart ? '#00cc66' : 'white',
            border: inCart ? '1px solid #006B35' : 'none',
            padding: '8px', borderRadius: '8px', fontSize: '0.875rem',
            fontWeight: 600, cursor: inCart ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            transition: 'all 0.2s'
          }}
        >
          {inCart ? <><Check size={14} /> Added to Enquiry</> : <><Plus size={14} /> Add to Enquiry</>}
        </button>

        {/* Quick contact buttons */}
        <div className="flex gap-2">
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 btn-primary py-2 rounded-lg text-sm font-medium"
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
            className="flex-1 flex items-center justify-center gap-1.5 btn-outline py-2 rounded-lg text-sm font-medium"
          >
            <Mail size={13} /> Email
          </a>
        </div>
      </div>
    </div>
  )
}