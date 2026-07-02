<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const router = useRouter()
const email = ref('')
const password = ref('')
const name = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  if (!email.value || !password.value || !name.value) {
    alert('Please fill out all fields.')
    return
  }

  isLoading.value = true
  try {
    // Create User
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    
    // Update display name profile
    await updateProfile(user, { displayName: name.value })
    
    // Save profile info to Firestore users collection
    await setDoc(doc(db, 'users', user.uid), {
      name: name.value,
      email: email.value,
      role: 'customer',
      createdAt: new Date().toISOString()
    })
    
    alert('Registration successful! Welcome to FIXXY.')
    router.push('/')
  } catch (error) {
    console.error('Registration Error:', error)
    let message = 'A registration error occurred. Please try again.'
    if (error.code === 'auth/email-already-in-use') {
      message = 'This email is already registered.'
    } else if (error.code === 'auth/weak-password') {
      message = 'Password should be at least 6 characters.'
    }
    alert(message)
  } finally {
    isLoading.value = false
  }
}

const handleGoogleAuth = async () => {
  isLoading.value = true
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    
    // Check if user document already exists in Firestore
    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      // Save profile info to Firestore users collection
      await setDoc(userRef, {
        name: user.displayName || 'Google User',
        email: user.email,
        role: 'customer',
        createdAt: new Date().toISOString()
      })
    }
    
    // Redirect to home
    router.push('/')
  } catch (error) {
    console.error('Google Auth Error:', error)
    if (error.code === 'auth/operation-not-allowed') {
      alert('Google Sign-In is disabled. Please enable it under Authentication > Sign-in method in your Firebase Console.')
    } else {
      alert('Google Sign-In failed. Please try again.')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh-100 px-5" style="background-color: #121212;">
      <!-- Logo and Back link -->
      <router-link to="/" class="d-flex align-items-center fs-1 fw-bolder text-decoration-none mb-10 logo-link" style="color: #d26527;">
          <img src="/image/Service-Grid-3.png" style="height: 50px;" class="me-3 logo-img" alt="Logo">
          FIXXY <span class="ps-3 fs-3 text-white fw-bold">MOTORSERVICE</span>
      </router-link>

      <!-- Register Card -->
      <div class="card p-8 p-md-10 text-white border-secondary hover-glow-subtle" style="background-color: #1b1b1b; max-width: 450px; width: 100%; border: 1px solid #282828; border-radius: 12px;">
          <h2 class="fw-bolder mb-2 text-center" style="font-size: 32px; letter-spacing: 1px; color: #d26527;">CREATE ACCOUNT</h2>
          <p class="text-muted text-center mb-8">Sign up to get access to custom repairs and features.</p>

          <form @submit.prevent="handleRegister">
              <!-- Name Input -->
              <div class="d-flex flex-column mb-6">
                  <span class="pb-2 fw-bold" style="color: #d26527; font-size: 14px; letter-spacing: 1px;">YOUR FULL NAME</span>
                  <input type="text" v-model="name" class="form-control bg-dark border-secondary text-white py-3 px-4" placeholder="Enter Full Name" required>
              </div>

              <!-- Email Input -->
              <div class="d-flex flex-column mb-6">
                  <span class="pb-2 fw-bold" style="color: #d26527; font-size: 14px; letter-spacing: 1px;">EMAIL ADDRESS</span>
                  <input type="email" v-model="email" class="form-control bg-dark border-secondary text-white py-3 px-4" placeholder="Enter Email" required>
              </div>

              <!-- Password Input -->
              <div class="d-flex flex-column mb-8">
                  <span class="pb-2 fw-bold" style="color: #d26527; font-size: 14px; letter-spacing: 1px;">PASSWORD</span>
                  <input type="password" v-model="password" class="form-control bg-dark border-secondary text-white py-3 px-4" placeholder="Enter Password" required>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn text-white w-100 py-3 fw-bold hover-glow" style="background-color: #d26527; font-size: 16px; border-radius: 6px;" :disabled="isLoading">
                  <span v-if="isLoading">
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      CREATING ACCOUNT...
                  </span>
                  <span v-else>
                      SIGN UP
                  </span>
              </button>
          </form>

          <!-- Divider -->
          <div class="d-flex align-items-center my-6">
              <hr class="flex-grow-1 border-secondary" style="border-color: #333 !important;">
              <span class="px-3 text-muted" style="font-size: 11px; letter-spacing: 1px; font-weight: bold;">OR</span>
              <hr class="flex-grow-1 border-secondary" style="border-color: #333 !important;">
          </div>

          <!-- Google Login Button -->
          <button @click="handleGoogleAuth" type="button" class="btn btn-outline-light w-100 py-3 d-flex align-items-center justify-content-center hover-glow" style="font-size: 16px; border-radius: 6px; border-color: #333; background-color: #161616;" :disabled="isLoading">
              <svg class="me-3" style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.82 2.96c.9-2.7 3.4-4.48 6.79-4.48z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.43c-.28 1.44-1.09 2.67-2.32 3.5l3.6 2.79c2.1-1.94 3.78-4.79 3.78-8.44z"/>
                  <path fill="#FBBC05" d="M5.21 14.52A7.16 7.16 0 0 1 4.8 12c0-.88.15-1.72.41-2.52L1.39 6.52A11.96 11.96 0 0 0 0 12c0 2.05.52 4 1.39 5.48l3.82-2.96z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.6-2.79c-1.01.68-2.3 1.09-4.36 1.09-3.39 0-5.89-1.78-6.79-4.48L1.39 16.8A11.97 11.97 0 0 0 12 23z"/>
              </svg>
              SignUp with Google
          </button>

          <!-- Toggle link -->
          <div class="mt-8 text-center">
              <span class="text-muted">Already have an account?</span>
              <router-link to="/login" class="ms-2 fw-bold text-warning text-decoration-none toggle-link">Sign In</router-link>
          </div>
      </div>

      <!-- Return Link -->
      <router-link to="/" class="text-muted mt-10 text-decoration-none hover-white transition-all">
          <i class="fas fa-arrow-left me-2"></i> Return to Homepage
      </router-link>
  </div>
</template>

<style scoped>
.hover-glow-subtle {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s ease;
}
.hover-glow-subtle:hover {
  box-shadow: 0 15px 35px rgba(210, 101, 39, 0.15);
}
.logo-link {
  transition: transform 0.3s ease;
}
.logo-link:hover {
  transform: scale(1.02);
}
.logo-img {
  transition: transform 0.5s ease;
}
.logo-link:hover .logo-img {
  transform: rotate(12deg);
}
.toggle-link {
  border-bottom: 1px dashed transparent;
  transition: border-bottom-color 0.2s ease, color 0.2s ease;
}
.toggle-link:hover {
  border-bottom-color: #ffc107;
  color: #ffca2c !important;
}
.hover-white:hover {
  color: #fff !important;
}
</style>
