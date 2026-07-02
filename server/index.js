import { onRequest } from 'firebase-functions/v2/https'
import { app } from './server.js'

// Export Express app as Firebase Cloud Function (Gen2)
export const api = onRequest(
  {
    region: 'asia-southeast1', // Singapore — closest to Thailand
    memory: '256MiB',
    timeoutSeconds: 60
  },
  app
)
