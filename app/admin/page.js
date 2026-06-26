'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Star, StarOff, Lock, Package, AlertCircle, Check, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const PRODUCT_LIMIT = parseInt(process.env.NEXT_PUBLIC_PRODUCT_LIMIT || '20')
const CATEGORIES = ['Phones', 'Laptops', 'TVs', 'Accessories']

const emptyForm = { name: '', category: 'Phones', price: '', image: '', description: '', featured: false }

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  // Simple client-side password check
  const handleLogin = () => {
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'nicerate2024')) {
      setAuthed(true)
    } else {
      setAuthError('Incorrect password.')
    }
  }

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const loadProducts = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { if (authed) loadProducts() }, [authed])

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category) return showToast('Fill in all required fields.', 'error')

    setSaving(true)
    try {
      if (editing) {
        await supabase.from('products').update({ ...form, price: parseFloat(form.price) }).eq('id', editing)
        showToast('Product updated!')
      } else {
        if (products.length >= PRODUCT_LIMIT) return showToast(`Limit of ${PRODUCT_LIMIT} products reached.`, 'error')
        await supabase.from('products').insert([{ ...form, price: parseFloat(form.price) }])
        showToast('Product added!')
      }
      setForm(emptyForm)
      setEditing(null)
      setShowForm(false)
      await loadProducts()
    } catch (e) {
      showToast(e.message, 'error')
    }
    setSaving(false)
  }

  const handleEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: p.price, image: p.image || '', description: p.description || '', featured: p.featured || false })
    setEditing(p.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    showToast('Product deleted.')
    await loadProducts()
  }

  const toggleFeatured = async (p) => {
    await supabase.from('products').update({ featured: !p.featured }).eq('id', p.id)
    await loadProducts()
  }

  // Login screen
  if (!authed) {
    return (
      <div style={{ background: '#000', minHeight: '100vh' }} className="flex items-center justify-center px-4">
        <div style={{ background: '#111', border: '1px solid #1a1a1a', width: '100%', maxWidth: '380px' }} className="p-8 rounded-2xl">
          <div style={{ background: '#006B35', width: '48px', height: '48px', borderRadius: '12px' }} className="flex items-center justify-center mb-6">
            <Lock size={20} color="white" />
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Admin Panel</h1>
          <p style={{ color: '#a0a0a0', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Enter your password to continue.</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: 'white', width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', marginBottom: '0.75rem' }}
          />
          {authError && <p style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{authError}</p>}
          <button onClick={handleLogin} className="btn-primary w-full py-2.5 rounded-xl font-semibold text-sm">
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh' }} className="py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Toast */}
        {toast && (
          <div style={{
            position: 'fixed', top: '80px', right: '20px', zIndex: 100,
            background: toast.type === 'error' ? '#2a0a0a' : '#0a2a0a',
            border: `1px solid ${toast.type === 'error' ? '#ff4444' : '#006B35'}`,
            color: toast.type === 'error' ? '#ff4444' : '#00cc66',
            padding: '12px 16px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            {toast.type === 'error' ? <AlertCircle size={14} /> : <Check size={14} />}
            {toast.msg}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.75rem', color: 'white' }}>
              Product Manager
            </h1>
            <p style={{ color: '#a0a0a0', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {products.length} / {PRODUCT_LIMIT} products used
            </p>
          </div>
          <button
            onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(!showForm) }}
            className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Limit warning */}
        {products.length >= PRODUCT_LIMIT && (
          <div style={{ background: '#1a0a00', border: '1px solid #ff6600', borderRadius: '10px', padding: '12px 16px', marginBottom: '1.5rem' }}
            className="flex items-center gap-2">
            <AlertCircle size={16} color="#ff6600" />
            <span style={{ color: '#ff6600', fontSize: '0.875rem' }}>Product limit reached ({PRODUCT_LIMIT}). Contact support to upgrade.</span>
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{ background: '#111', border: '1px solid #1a1a1a' }} className="rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: 'white' }}>
                {editing ? 'Edit Product' : 'New Product'}
              </h2>
              <button onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm) }}>
                <X size={18} color="#555" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Product Name *', key: 'name', placeholder: 'e.g. Samsung Galaxy S24' },
                { label: 'Price (KES) *', key: 'price', placeholder: 'e.g. 95000', type: 'number' },
                { label: 'Image URL', key: 'image', placeholder: 'https://...' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ color: '#a0a0a0', fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: 'white', width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ color: '#a0a0a0', fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: 'white', width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.875rem', outline: 'none' }}
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label style={{ color: '#a0a0a0', fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Description</label>
                <textarea
                  placeholder="Short product description..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: 'white', width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.875rem', outline: 'none', resize: 'vertical' }}
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.checked })}
                  style={{ accentColor: '#006B35', width: '16px', height: '16px' }}
                />
                <label htmlFor="featured" style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                  Mark as Featured (shows on homepage)
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold"
              >
                {saving ? 'Saving...' : editing ? 'Update Product' : 'Add Product'}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm) }}
                className="btn-outline px-6 py-2.5 rounded-xl text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-20" style={{ color: '#555' }}>Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package size={40} color="#333" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: '#555' }}>No products yet. Add your first one!</p>
          </div>
        ) : (
          <div style={{ background: '#111', border: '1px solid #1a1a1a' }} className="rounded-2xl overflow-hidden">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  {['Product', 'Category', 'Price', 'Featured', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', color: '#555', fontSize: '0.75rem', fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < products.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', background: '#1a1a1a' }} />
                        ) : (
                          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📦</div>
                        )}
                        <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: '#006B3520', color: '#006B35', fontSize: '0.75rem', fontWeight: 600, padding: '3px 8px', borderRadius: '6px' }}>
                        {p.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#a0a0a0', fontSize: '0.875rem' }}>
                      KES {p.price?.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button onClick={() => toggleFeatured(p)} title="Toggle featured">
                        {p.featured
                          ? <Star size={16} color="#006B35" fill="#006B35" />
                          : <StarOff size={16} color="#555" />
                        }
                      </button>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(p)} style={{ color: '#a0a0a0', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'white'}
                          onMouseLeave={e => e.currentTarget.style.color = '#a0a0a0'}>
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} style={{ color: '#a0a0a0', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#ff4444'}
                          onMouseLeave={e => e.currentTarget.style.color = '#a0a0a0'}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
