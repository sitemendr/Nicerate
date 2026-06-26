import { Shield, Star, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'About Us — Nicerate',
}

export default function AboutPage() {
  const stats = [
    { value: '500+', label: 'Products Sold' },
    { value: '200+', label: 'Happy Customers' },
    { value: '3+', label: 'Years in Business' },
    { value: '100%', label: 'Genuine Products' },
  ]

  const values = [
    { icon: <Shield size={22} />, title: 'Authenticity', desc: 'Every product we sell is 100% genuine. No fakes, no compromises.' },
    { icon: <Star size={22} />, title: 'Quality First', desc: 'We only stock electronics that meet our high quality standards.' },
    { icon: <Users size={22} />, title: 'Customer Focus', desc: 'Your satisfaction is our priority — before and after every purchase.' },
    { icon: <Zap size={22} />, title: 'Speed', desc: 'Fast responses on WhatsApp and quick delivery to your door.' },
  ]

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(180deg, #001a0d 0%, #000 100%)', borderBottom: '1px solid #1a1a1a' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2 }}>
            We're <span style={{ color: '#006B35' }}>Nicerate</span>
          </h1>
          <p style={{ color: '#a0a0a0', fontSize: '1.1rem', lineHeight: '1.8', marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            A premium electronics store based in Nairobi, Kenya. We make it easy for you to get the best tech at honest prices — with ordering as simple as sending a WhatsApp message.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#0a0a0a', borderBottom: '1px solid #1a1a1a' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '2.5rem', color: '#006B35' }}>
                  {s.value}
                </div>
                <div style={{ color: '#a0a0a0', fontSize: '0.875rem', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.75rem', color: 'white', marginBottom: '1.5rem' }}>
            Our Story
          </h2>
          <div style={{ color: '#a0a0a0', lineHeight: '1.9', fontSize: '1rem' }} className="flex flex-col gap-4">
            <p>
              Nicerate was born from a simple frustration — finding genuine electronics in Nairobi shouldn't be hard, and it shouldn't be expensive.
            </p>
            <p>
              We started small, helping friends and family source quality phones and laptops at fair prices. Word spread quickly, and what began as a side hustle turned into something we're truly proud of.
            </p>
            <p>
              Today, we stock a wide range of electronics — TVs, Laptops, Phones, and Accessories — all carefully sourced to ensure you're getting the real deal. And we've kept ordering dead simple: just send us a message on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.75rem', color: 'white', marginBottom: '2.5rem', textAlign: 'center' }}>
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} style={{ background: '#111', border: '1px solid #1a1a1a' }} className="p-6 rounded-xl">
                <div style={{ color: '#006B35', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>
                  {v.title}
                </h3>
                <p style={{ color: '#a0a0a0', fontSize: '0.875rem', lineHeight: '1.6' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.75rem', color: 'white', marginBottom: '1rem' }}>
            Ready to shop?
          </h2>
          <p style={{ color: '#a0a0a0', marginBottom: '1.5rem' }}>Browse our full catalogue and order in minutes.</p>
          <Link href="/products" className="btn-primary px-8 py-3 rounded-xl font-semibold inline-block">
            View Products
          </Link>
        </div>
      </section>
    </div>
  )
}
