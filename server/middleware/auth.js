import { auth, db } from '../firebaseAdmin.js'

export const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' })
  }

  const token = authHeader.split('Bearer ')[1]
  try {
    const decodedToken = await auth.verifyIdToken(token)
    req.user = decodedToken
    
    // Fetch dynamic role from Firestore `/users/{uid}`
    const userDoc = await db.collection('users').doc(decodedToken.uid).get()
    if (userDoc.exists) {
      req.user.role = userDoc.data().role || 'customer'
    } else {
      req.user.role = 'customer'
    }

    next()
  } catch (error) {
    console.error('Auth verification error:', error)
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' })
  }
  next()
}
