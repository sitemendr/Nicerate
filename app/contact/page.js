import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact — Nicerate',
}

export default function ContactPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000'
  const email = process.env.NEXT_PUBLIC_STORE_EMAIL || 'info@nicerate.com'

  return (
    <div style={{ background: '#000', minHeight: '100vh' }} className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '2.5rem', color: 'white' }}>
            Get in Touch
          </h1>
          <p style={{ color: '#a0a0a0', marginTop: '0.75rem', fontSize: '1rem' }}>
            We're available on WhatsApp and Email. We respond fast.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsapp}?text=Hi Nicerate! I'd like to enquire about your products.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#111', border: '1px solid #1a1a1a', transition: 'all 0.2s', display: 'block' }}
            className="p-8 rounded-2xl hover:border-green-700 group"
          >
            <div style={{ background: '#006B35', width: '52px', height: '52px', borderRadius: '14px' }}
              className="flex items-center justify-center mb-4">
              <MessageCircle size={24} color="white" />
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem', color: 'white', marginBottom: '0.5rem' }}>
              WhatsApp
            </h2>
            <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Fastest way to reach us. We typically reply within minutes.
            </p>
            <span style={{ color: '#006B35', fontWeight: 600, fontSize: '0.95rem' }}>
              +{whatsapp} →
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}?subject=Product Enquiry&body=Hi Nicerate,%0D%0A%0D%0AI would like to enquire about:%0D%0A%0D%0AProduct:%0D%0ADetails:%0D%0A%0D%0AThank you.`}
            style={{ background: '#111', border: '1px solid #1a1a1a', transition: 'all 0.2s', display: 'block' }}
            className="p-8 rounded-2xl"
          >
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', width: '52px', height: '52px', borderRadius: '14px' }}
              className="flex items-center justify-center mb-4">
              <Mail size={24} color="#006B35" />
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem', color: 'white', marginBottom: '0.5rem' }}>
              Email
            </h2>
            <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Send us an email and we'll get back to you within the day.
            </p>
            <span style={{ color: '#006B35', fontWeight: 600, fontSize: '0.95rem' }}>
              {email} →
            </span>
          </a>
        </div>

        {/* Info Strip */}
        <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }} className="rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <MapPin size={18} color="#006B35" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: 'white', fontSize: '0.9rem' }}>Location</p>
              <p style={{ color: '#a0a0a0', fontSize: '0.875rem', marginTop: '0.25rem' }}>Nairobi, Kenya</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} color="#006B35" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: 'white', fontSize: '0.9rem' }}>Working Hours</p>
              <p style={{ color: '#a0a0a0', fontSize: '0.875rem', marginTop: '0.25rem' }}>Monday – Saturday, 8am – 8pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}