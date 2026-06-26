'use client'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabase'

const CATEGORIES = ['All', 'Phones', 'Laptops', 'TVs', 'Accessories']

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      setProducts(data || [])
      setFiltered(data || [])
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    let result = products
    if (category !== 'All') result = result.filter(p => p.category === category)
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    setFiltered(result)
  }, [category, search, products])

  return (
    <div style={{ background: '#000', minHeight: '100vh' }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '2rem', color: 'white' }}>
            All Products
          </h1>
          <p style={{ color: '#a0a0a0', marginTop: '0.5rem' }}>
            Browse our full collection of premium electronics
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} color="#555" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                background: '#111', border: '1px solid #1a1a1a', color: 'white',
                paddingLeft: '36px', width: '100%', borderRadius: '10px', padding: '10px 12px 10px 36px',
                fontSize: '0.9rem', outline: 'none'
              }}
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  background: category === cat ? '#006B35' : '#111',
                  color: category === cat ? 'white' : '#a0a0a0',
                  border: category === cat ? '1px solid #006B35' : '1px solid #1a1a1a',
                  padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem',
                  fontWeight: category === cat ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={{ color: '#555', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ background: '#111', borderRadius: '12px', height: '320px', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p style={{ color: '#555', fontSize: '1rem' }}>No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
