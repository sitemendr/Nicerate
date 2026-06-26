'use client'
import { useCart } from '@/lib/CartContext'
import { X, Trash2, MessageCircle, ShoppingBag } from 'lucide-react'

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, clearCart } = useCart()
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000'

  const sendWhatsApp = () => {
    const itemList = cart.map((p, i) => `${i + 1}. ${p.name} — KES ${p.price?.toLocaleString()}`).join('\n')
    const message = `Hi Nicerate! I'm interested in the following products:\n\n${itemList}\n\nPlease confirm availability and prices. Thank you!`
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const total = cart.reduce((sum, p) => sum + (p.price || 0), 0)

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100%', width: '100%', maxWidth: '400px',
        background: '#0a0a0a', borderLeft: '1px solid #1a1a1a', zIndex: 201,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} color="#006B35" />
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: 'white', fontSize: '1rem' }}>
              Enquiry List
            </span>
            {cart.length > 0 && (
              <span style={{ background: '#006B35', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '2px 7px', borderRadius: '999px' }}>
                {cart.length}
              </span>
            )}
          </div>
          <button onClick={onClose} style={{ color: '#555' }}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
              <ShoppingBag size={40} color="#222" style={{ margin: '0 auto 1rem' }} />
              <p style={{ color: '#555', fontSize: '0.9rem' }}>No items added yet.</p>
              <p style={{ color: '#333', fontSize: '0.8rem', marginTop: '0.5rem' }}>Browse products and tap "Add to Enquiry"</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.map(p => (
                <div key={p.id} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover', background: '#1a1a1a', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: '52px', height: '52px', borderRadius: '8px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📦</div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500, lineHeight: '1.3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</p>
                    <p style={{ color: '#006B35', fontSize: '0.8rem', fontWeight: 700, marginTop: '2px' }}>KES {p.price?.toLocaleString()}</p>
                    <p style={{ color: '#555', fontSize: '0.7rem' }}>{p.category}</p>
                  </div>
                  <button onClick={() => removeFromCart(p.id)} style={{ color: '#555', flexShrink: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff4444'}
                    onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #1a1a1a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>Total estimate</span>
              <span style={{ color: 'white', fontFamily: 'Space Grotesk', fontWeight: 700 }}>KES {total.toLocaleString()}</span>
            </div>
            <button
              onClick={sendWhatsApp}
              className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} /> Send Enquiry via WhatsApp
            </button>
            <button
              onClick={clearCart}
              style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.75rem', width: '100%', textAlign: 'center' }}
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </>
  )
}