import { supabase } from './supabase'

const PRODUCT_LIMIT = parseInt(process.env.NEXT_PUBLIC_PRODUCT_LIMIT || '20')

// Get all products
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Get featured products (for hero/homepage)
export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(6)

  if (error) throw error
  return data
}

// Get products by category
export async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Get single product
export async function getProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Add product (admin)
export async function addProduct(product) {
  // Check product limit
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  if (count >= PRODUCT_LIMIT) {
    throw new Error(`Product limit of ${PRODUCT_LIMIT} reached. Upgrade to add more.`)
  }

  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()

  if (error) throw error
  return data[0]
}

// Update product (admin)
export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

// Delete product (admin)
export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Get product count
export async function getProductCount() {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  if (error) throw error
  return { count, limit: PRODUCT_LIMIT }
}

export { PRODUCT_LIMIT }
