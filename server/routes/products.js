import express from 'express'
import { db } from '../firebaseAdmin.js'
import { checkAuth, requireAdmin } from '../middleware/auth.js'
import admin from 'firebase-admin'

const router = express.Router()

// Validation constants
const MAX_STRING_LENGTH = 500
const MAX_IMAGE_SIZE = 500000 // ~500KB Base64 limit
const MAX_PRICE = 9999999

// GET all products - chronological ascending order
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('products').orderBy('createdAt', 'asc').get()
    const products = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        brand: data.brand,
        price: data.price,
        originalPrice: data.originalPrice || null,
        // Truncate Base64 images in listing to reduce payload
        image: data.image?.startsWith('data:') 
          ? data.image.substring(0, 200) + '...[truncated]' 
          : (data.image || ''),
        imageFull: data.image || '',
        description: data.description || '',
        isSale: !!data.isSale,
        createdAt: data.createdAt
      }
    })
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error.message)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Helper: validate product fields
const validateProduct = (body) => {
  const { name, brand, price, originalPrice, image, description } = body

  if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > MAX_STRING_LENGTH) {
    return 'Invalid product name (required, max 500 chars)'
  }
  if (!brand || typeof brand !== 'string' || brand.trim().length === 0 || brand.length > MAX_STRING_LENGTH) {
    return 'Invalid brand (required, max 500 chars)'
  }
  const priceNum = Number(price)
  if (isNaN(priceNum) || priceNum <= 0 || priceNum > MAX_PRICE) {
    return 'Invalid price (must be a positive number up to 9,999,999)'
  }
  if (originalPrice !== null && originalPrice !== undefined) {
    const origNum = Number(originalPrice)
    if (isNaN(origNum) || origNum <= 0 || origNum > MAX_PRICE) {
      return 'Invalid original price'
    }
  }
  if (image && typeof image === 'string' && image.length > MAX_IMAGE_SIZE) {
    return 'Image too large (max ~500KB for Base64 uploads)'
  }
  if (description && typeof description === 'string' && description.length > 2000) {
    return 'Description too long (max 2000 chars)'
  }
  return null // No error
}

// POST add a new product (Admin only)
router.post('/', checkAuth, requireAdmin, async (req, res) => {
  const validationError = validateProduct(req.body)
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  const { name, brand, price, originalPrice, image, description, isSale } = req.body

  const productData = {
    name: name.trim(),
    brand: brand.trim(),
    price: Number(price),
    originalPrice: originalPrice ? Number(originalPrice) : null,
    image: image || '/image/Mazda-RX-7-Transparent-PNG.png',
    description: (description || '').substring(0, 2000),
    isSale: !!isSale,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }

  try {
    const docRef = await db.collection('products').add(productData)
    res.status(201).json({ id: docRef.id, ...productData })
  } catch (error) {
    console.error('Error creating product:', error.message)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

// PUT edit product details (Admin only)
router.put('/:id', checkAuth, requireAdmin, async (req, res) => {
  const { id } = req.params

  const validationError = validateProduct(req.body)
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  // Check document exists
  const docRef = db.collection('products').doc(id)
  const docSnap = await docRef.get()
  if (!docSnap.exists) {
    return res.status(404).json({ error: 'Product not found' })
  }

  const { name, brand, price, originalPrice, image, description, isSale } = req.body

  const productData = {
    name: name.trim(),
    brand: brand.trim(),
    price: Number(price),
    originalPrice: originalPrice ? Number(originalPrice) : null,
    image: image || '/image/Mazda-RX-7-Transparent-PNG.png',
    description: (description || '').substring(0, 2000),
    isSale: !!isSale,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }

  try {
    await docRef.update(productData)
    res.json({ id, ...productData })
  } catch (error) {
    console.error('Error updating product:', error.message)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

// DELETE product (Admin only)
router.delete('/:id', checkAuth, requireAdmin, async (req, res) => {
  const { id } = req.params

  try {
    // Check document exists
    const docRef = db.collection('products').doc(id)
    const docSnap = await docRef.get()
    if (!docSnap.exists) {
      return res.status(404).json({ error: 'Product not found' })
    }

    await docRef.delete()
    res.json({ message: 'Product deleted successfully', id })
  } catch (error) {
    console.error('Error deleting product:', error.message)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

export default router
