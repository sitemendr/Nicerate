import Link from 'next/link'
import { MessageCircle, Tv, Laptop, Smartphone, Shield, Truck, Star, ChevronRight } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export const revalidate = 60

const BRANDS = [
  { name: 'Samsung', logo: 'https://cdn.worldvectorlogo.com/logos/samsung-7.svg', color: '#1428A0' },
  { name: 'Tecno', logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/tecno-mobile-logo-icon.png', color: '#0066CC' },
  { name: 'HP', logo: 'https://cdn.worldvectorlogo.com/logos/hp-hewlett-packard.svg', color: '#0096D6' },
  { name: 'Lenovo', logo: 'https://cdn.worldvectorlogo.com/logos/lenovo-1.svg', color: '#E2231A' },
  { name: 'Dell', logo: 'https://cdn.worldvectorlogo.com/logos/dell-technologies-1.svg', color: '#007DB8' },
  { name: 'Nokia', logo: 'https://cdn.worldvectorlogo.com/logos/nokia-3.svg', color: '#124191' },
  { name: 'Oppo', logo: 'https://cdn.worldvectorlogo.com/logos/oppo-2022-1.svg', color: '#1D6FA4' },
  { name: 'Huawei', logo: 'https://cdn.worldvectorlogo.com/logos/huawei.svg', color: '#CF0A2C' },
  { name: 'Apple', logo: 'https://cdn.worldvectorlogo.com/logos/apple-11.svg', color: '#555555' },
  { name: 'Tenda', logo: 'https://cdn.worldvectorlogo.com/logos/tenda-2.svg', color: '#E8000D' },
  { name: 'TP-Link', logo: 'https://cdn.worldvectorlogo.com/logos/tp-link.svg', color: '#4AB648' },
  { name: 'Oraimo', logo: null, color: '#00A651' },
  { name: 'Itel', logo: null, color: '#E4002B' },
  { name: 'Amaya', logo: null, color: '#9B59B6' },
]

async function getHomeData() {
  try {
    const featured = await getFeaturedProducts()
    return { featured }
  } catch {
    return { featured: [] }
  }
}

export default async function HomePage() {
  const { featured } = await getHomeData()
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000'

  const categories = [
    { icon: <Smartphone size={28} />, label: 'Phones', href: '/products?category=Phones' },
    { icon: <Laptop size={28} />, label: 'Laptops', href: '/products?category=Laptops' },
    { icon: <Tv size={28} />, label: 'TVs', href: '/products?category=TVs' },
    { icon: <span style={{ fontSize: '1.75rem' }}>🎧</span>, label: 'Accessories', href: '/products?category=Accessories' },
  ]

  const features = [
    { icon: <Shield size={20} />, title: 'Genuine Products', desc: '100% authentic electronics, no counterfeits.' },
    { icon: <Truck size={20} />, title: 'Fast Delivery', desc: 'Quick delivery within Nairobi and beyond.' },
    { icon: <Star size={20} />, title: 'Best Prices', desc: "Competitive prices you won't find elsewhere." },
    { icon: <MessageCircle size={20} />, title: 'Easy Ordering', desc: 'Order instantly via WhatsApp or Email.' },
  ]

  const marqueeItems = [...BRANDS, ...BRANDS, ...BRANDS]

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(0,0,0,0.93) 0%, rgba(0,20,10,0.88) 50%, rgba(0,0,0,0.85) 100%)' }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'center' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div className="max-w-3xl">
              <div style={{ background: '#006B3520', border: '1px solid #006B3540', color: '#006B35', fontSize: '0.8rem', fontWeight: 600 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
                <span style={{ width: 6, height: 6, background: '#006B35', borderRadius: '50%', display: 'inline-block' }} />
                Premium Electronics Store
              </div>
              <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: 'white' }}>
                The Best Tech,<br />
                <span style={{ color: '#006B35' }}>At the Best Price.</span>
              </h1>
              <p style={{ color: '#a0a0a0', fontSize: '1.1rem', lineHeight: '1.7', marginTop: '1.5rem', maxWidth: '520px' }}>
                Shop TVs, Laptops, Phones and Accessories at Nicerate. Genuine products, fast delivery, and ordering made simple via WhatsApp.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/products" className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                  Browse Products <ChevronRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/${whatsapp}?text=Hi! I'd like to know more about your products.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                >
                  <MessageCircle size={16} /> Chat with Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Brands marquee */}
        <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid #ffffff12', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', padding: '1.25rem 0', overflow: 'hidden' }}>
          <div className="marquee-track">
            {marqueeItems.map((brand, i) => (
              <span key={i} className="marquee-item">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={{ height: '20px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }}
                  />
                ) : (
                  <span style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    color: brand.color,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}>
                    {brand.name}
                  </span>
                )}
                <span className="brand-dot">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.75rem', color: 'white', marginBottom: '2rem' }}>
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link key={cat.label} href={cat.href} className="category-card flex flex-col items-center gap-3 p-6 rounded-xl">
                <div style={{ color: '#006B35' }}>{cat.icon}</div>
                <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-16" style={{ background: '#000' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.75rem', color: 'white' }}>
                Featured Products
              </h2>
              <Link href="/products" style={{ color: '#006B35', fontSize: '0.9rem', fontWeight: 500 }} className="flex items-center gap-1 hover:underline">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Us */}
      <section style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.75rem', color: 'white', marginBottom: '2.5rem', textAlign: 'center' }}>
            Why Choose Nicerate?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} style={{ background: '#111', border: '1px solid #1a1a1a' }} className="p-6 rounded-xl">
                <div style={{ color: '#006B35', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: '#a0a0a0', fontSize: '0.875rem', lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: '#006B35' }} className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '2rem', color: 'white', marginBottom: '0.75rem' }}>
            Ready to Order?
          </h2>
          <p style={{ color: '#ffffff99', fontSize: '1rem', marginBottom: '1.5rem' }}>
            Reach us on WhatsApp — we respond fast.
          </p>
          <a
            href={`https://wa.me/${whatsapp}?text=Hi! I'd like to place an order.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: 'white', color: '#006B35', fontWeight: 700 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-base hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} /> Order via WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}