import express from 'express'
import { db } from '../firebaseAdmin.js'
import { checkAuth, requireAdmin } from '../middleware/auth.js'
import admin from 'firebase-admin'

const router = express.Router()

// Whitelist of valid appointment statuses
const VALID_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled']
const MAX_STRING_LENGTH = 500

// GET appointments (role dependent)
router.get('/', checkAuth, async (req, res) => {
  try {
    let query = db.collection('appointments')

    if (req.user.role !== 'admin') {
      query = query.where('userId', '==', req.user.uid)
    }

    const snapshot = await query.get()
    const appointments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Sort locally in memory descending
    appointments.sort((a, b) => {
      const timeA = a.createdAt?.seconds || a.createdAt?._seconds || 0
      const timeB = b.createdAt?.seconds || b.createdAt?._seconds || 0
      return timeB - timeA
    })

    res.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error.message)
    res.status(500).json({ error: 'Failed to fetch appointments' })
  }
})

// POST create booking
router.post('/', checkAuth, async (req, res) => {
  const { customerName, date, time, message } = req.body

  // Input validation
  if (!customerName || typeof customerName !== 'string' || customerName.trim().length === 0 || customerName.length > MAX_STRING_LENGTH) {
    return res.status(400).json({ error: 'Invalid customer name (required, max 500 chars)' })
  }
  if (!date || typeof date !== 'string') {
    return res.status(400).json({ error: 'Invalid date' })
  }
  if (!time || typeof time !== 'string') {
    return res.status(400).json({ error: 'Invalid time' })
  }
  if (message && typeof message === 'string' && message.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 chars)' })
  }

  const appointmentData = {
    userId: req.user.uid,
    customerEmail: req.user.email,
    customerName: customerName.trim().substring(0, MAX_STRING_LENGTH),
    date,
    time,
    message: (message || '').substring(0, 2000),
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }

  try {
    const docRef = await db.collection('appointments').add(appointmentData)
    res.status(201).json({ id: docRef.id, ...appointmentData })
  } catch (error) {
    console.error('Error creating appointment:', error.message)
    res.status(500).json({ error: 'Failed to book appointment' })
  }
})

// PUT update status (Admin only)
router.put('/:id/status', checkAuth, requireAdmin, async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  // Whitelist validation for status
  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ 
      error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` 
    })
  }

  try {
    // Check document exists
    const docRef = db.collection('appointments').doc(id)
    const docSnap = await docRef.get()
    if (!docSnap.exists) {
      return res.status(404).json({ error: 'Appointment not found' })
    }

    await docRef.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
    res.json({ message: 'Appointment status updated successfully', id, status })
  } catch (error) {
    console.error('Error updating appointment status:', error.message)
    res.status(500).json({ error: 'Failed to update status' })
  }
})

export default router
