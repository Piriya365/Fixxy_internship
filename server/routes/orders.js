import express from 'express'
import { db } from '../firebaseAdmin.js'
import { checkAuth, requireAdmin } from '../middleware/auth.js'
import admin from 'firebase-admin'

const router = express.Router()

// Whitelist of valid order statuses
const VALID_ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled']

// GET orders list (role dependent)
router.get('/', checkAuth, async (req, res) => {
  try {
    let query = db.collection('orders')
    
    // Customers can only see their own orders
    if (req.user.role !== 'admin') {
      query = query.where('userId', '==', req.user.uid)
    }

    const snapshot = await query.get()
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Sort locally in memory to avoid index requirements in Firestore
    orders.sort((a, b) => {
      const timeA = a.createdAt?.seconds || a.createdAt?._seconds || 0
      const timeB = b.createdAt?.seconds || b.createdAt?._seconds || 0
      return timeB - timeA
    })

    res.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error.message)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// POST create a new order (checkout) — server-side price verification
router.post('/', checkAuth, async (req, res) => {
  const { shippingName, shippingPhone, shippingAddress, paymentMethod, items } = req.body

  // Input validation
  if (!shippingName || typeof shippingName !== 'string' || shippingName.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid shipping name' })
  }
  if (!shippingPhone || typeof shippingPhone !== 'string' || shippingPhone.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid shipping phone' })
  }
  if (!shippingAddress || typeof shippingAddress !== 'string' || shippingAddress.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid shipping address' })
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' })
  }
  if (items.length > 50) {
    return res.status(400).json({ error: 'Too many items in order (max 50)' })
  }

  try {
    // SERVER-SIDE PRICE VERIFICATION — never trust client totals
    let calculatedSubtotal = 0
    const verifiedItems = []

    for (const item of items) {
      if (!item.id || typeof item.id !== 'string') {
        return res.status(400).json({ error: 'Invalid item ID in order' })
      }
      const quantity = parseInt(item.quantity)
      if (isNaN(quantity) || quantity < 1 || quantity > 100) {
        return res.status(400).json({ error: `Invalid quantity for item ${item.id}` })
      }

      // Fetch real price from database
      const productDoc = await db.collection('products').doc(item.id).get()
      if (!productDoc.exists) {
        return res.status(400).json({ error: `Product "${item.id}" not found` })
      }

      const productData = productDoc.data()
      const itemTotal = productData.price * quantity
      calculatedSubtotal += itemTotal

      verifiedItems.push({
        id: item.id,
        name: productData.name,
        brand: productData.brand,
        price: productData.price,
        quantity
      })
    }

    const calculatedShippingFee = calculatedSubtotal >= 1500 ? 0 : 50
    const calculatedTotal = calculatedSubtotal + calculatedShippingFee

    const orderData = {
      userId: req.user.uid,
      customerEmail: req.user.email,
      shippingName: shippingName.trim().substring(0, 200),
      shippingPhone: shippingPhone.trim().substring(0, 20),
      shippingAddress: shippingAddress.trim().substring(0, 500),
      paymentMethod: paymentMethod || 'cod',
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      shippingFee: calculatedShippingFee,
      total: calculatedTotal,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }

    const docRef = await db.collection('orders').add(orderData)
    res.status(201).json({ id: docRef.id, ...orderData })
  } catch (error) {
    console.error('Error creating order:', error.message)
    res.status(500).json({ error: 'Failed to place order' })
  }
})

// PUT update order status (Admin only)
router.put('/:id/status', checkAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  // Whitelist validation for status
  if (!status || !VALID_ORDER_STATUSES.includes(status)) {
    return res.status(400).json({ 
      error: `Invalid status. Must be one of: ${VALID_ORDER_STATUSES.join(', ')}` 
    })
  }

  try {
    // Check document exists
    const docRef = db.collection('orders').doc(id)
    const docSnap = await docRef.get()
    if (!docSnap.exists) {
      return res.status(404).json({ error: 'Order not found' })
    }

    await docRef.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
    res.json({ message: 'Order status updated successfully', id, status })
  } catch (error) {
    console.error('Error updating order status:', error.message)
    res.status(500).json({ error: 'Failed to update order status' })
  }
})

export default router
