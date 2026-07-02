import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

export const currentUser = ref(null)
export const isAuthReady = ref(false)

onAuthStateChanged(auth, (user) => {
  currentUser.value = user
  isAuthReady.value = true
})

// Wait until Auth state is resolved on page load
export const getCurrentUser = () => {
  if (isAuthReady.value) {
    return Promise.resolve(auth.currentUser)
  }
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

// Fetch user role dynamically from Firestore 'users' collection
export const getUserRole = async (user) => {
  if (!user) return null
  try {
    const userDocRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)
    if (userDoc.exists()) {
      return userDoc.data().role || 'customer'
    }
  } catch (error) {
    console.error('Error fetching user role:', error)
  }
  return 'customer'
}
