<script setup>
import { ref, watchEffect } from 'vue'
import { currentUser, getUserRole } from '../auth'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { cartCount } from '../cartState'

const router = useRouter()
const isAdmin = ref(false)

watchEffect(async () => {
  if (currentUser.value) {
    const role = await getUserRole(currentUser.value)
    isAdmin.value = role === 'admin'
  } else {
    isAdmin.value = false
  }
})

const handleSignOut = async () => {
  try {
    await signOut(auth)
    alert('Logged out successfully.')
    router.push('/')
  } catch (error) {
    console.error('Sign Out Error:', error)
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark py-5" style="background-color: #1b1b1b;">
      <div class="container border-bottom pb-5">
          <router-link to="/" class="d-flex align-items-center fs-1 fw-bolder text-decoration-none logo-animated" style="color: #d26527;">
              <img src="/image/Service-Grid-3.png" style="height: 40px;" class="me-3 logo-img-animated" alt="Logo">
              FIXXY <span class="ps-3 fs-3 text-white fw-bold">MOTORSERVICE</span>
          </router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-lg-between" id="navbarNav">
              <ul class="navbar-nav mx-auto mb-2 mb-lg-0 mt-3 mt-lg-0">
                  <li class="nav-item">
                      <router-link to="/" class="nav-link px-3 text-white nav-link-animated" exact-active-class="text-warning">Home</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/shop" class="nav-link px-3 text-white nav-link-animated" exact-active-class="text-warning">Shop</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/cart" class="nav-link px-3 text-white nav-link-animated position-relative" exact-active-class="text-warning">
                          Cart
                          <span v-if="cartCount > 0" class="position-absolute translate-middle badge rounded-pill bg-danger" style="font-size: 10px; top: 10px; left: 90%;">
                              {{ cartCount }}
                          </span>
                      </router-link>
                  </li>
                  <li v-if="currentUser" class="nav-item">
                      <router-link to="/orders" class="nav-link px-3 text-white nav-link-animated" exact-active-class="text-warning">My Orders</router-link>
                  </li>
                  <li v-if="isAdmin" class="nav-item">
                      <router-link to="/admin" class="nav-link px-3 text-white nav-link-animated" exact-active-class="text-warning">Admin Panel</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/about" class="nav-link px-3 text-white nav-link-animated" exact-active-class="text-warning">About</router-link>
                  </li>
              </ul>
              <div class="d-flex align-items-center mt-3 mt-lg-0">
                  <template v-if="!currentUser">
                      <router-link to="/login" class="btn btn-outline-primary me-2 hover-glow text-decoration-none">Login</router-link>
                      <router-link to="/register" class="btn text-white hover-glow text-decoration-none" style="background-color: #d26527;">Sign-up</router-link>
                  </template>
                  <template v-else>
                      <span class="text-white me-4 fs-5 text-truncate d-inline-block" style="max-width: 180px;" :title="currentUser.email">
                          <i class="fas fa-user me-2 text-warning"></i>{{ currentUser.displayName || currentUser.email }}
                      </span>
                      <button @click="handleSignOut" type="button" class="btn btn-outline-danger hover-glow">Logout</button>
                  </template>
              </div>
          </div>
      </div>
  </nav>
</template>

<style scoped>
.logo-animated {
  transition: transform 0.3s ease;
}
.logo-animated:hover {
  transform: scale(1.02);
}
.logo-img-animated {
  transition: transform 0.5s ease;
}
.logo-animated:hover .logo-img-animated {
  transform: rotate(15deg) scale(1.1);
}
</style>
