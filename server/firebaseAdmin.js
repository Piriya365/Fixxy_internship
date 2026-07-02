import admin from 'firebase-admin'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json')

if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  console.log('Firebase Admin SDK initialized with serviceAccountKey.json')
} else {
  // Fallback using credentials from env or ADC
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'fixxy-internship'
  })
  console.log('Firebase Admin SDK initialized using Project ID (ADC fallback)')
}

export const db = admin.firestore()
export const auth = admin.auth()
export default admin
