import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import productsRoute from './routes/products.js'
import ordersRoute from './routes/orders.js'
import appointmentsRoute from './routes/appointments.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Allowed origins whitelist (CORS restriction)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',')

// Security Middleware
app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. server-to-server, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}))

// Rate Limiting — 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
})
app.use('/api/', apiLimiter)

// Body parser with size limit (reduced from 10mb for security)
app.use(express.json({ limit: '2mb' }))

// Routes Mapping
app.use('/api/products', productsRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/appointments', appointmentsRoute)

// Health Check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'FIXXY MOTORSERVICE Backend API Server is running.'
  })
})

// Export app for Cloud Functions
export { app }

// Start local dev server only when NOT running in Cloud Functions
const isCloudFunction = process.env.FUNCTION_TARGET || process.env.K_SERVICE
if (!isCloudFunction) {
  app.listen(PORT, () => {
    console.log(`🚀 FIXXY Backend Server running at http://localhost:${PORT}`)
  })
}
