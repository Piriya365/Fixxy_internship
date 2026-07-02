<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'
import { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } from '../cartState'
import { currentUser } from '../auth'
import api from '../api'
import { addToast } from '../toastState'

const router = useRouter()

// Checkout state fields
const shippingName = ref('')
const shippingPhone = ref('')
const shippingAddress = ref('')
const paymentMethod = ref('cod')
const isLoading = ref(false)
const isOrderSuccess = ref(false)
const createdOrderId = ref('')

// Prepopulate shipping name from display name
watchEffect(() => {
  if (currentUser.value) {
    shippingName.value = currentUser.value.displayName || ''
  } else {
    shippingName.value = ''
  }
})

// Calculations (in Thai Baht ฿)
const shippingFee = computed(() => {
  if (cartTotal.value === 0) return 0
  return cartTotal.value >= 1500 ? 0 : 50
})

const grandTotal = computed(() => {
  return cartTotal.value + shippingFee.value
})

const handleCheckout = async () => {
  if (!currentUser.value) {
    addToast('Please login to place your order.', 'info')
    router.push('/login')
    return
  }

  if (!shippingName.value || !shippingPhone.value || !shippingAddress.value) {
    addToast('Please fill out all shipping details.', 'danger')
    return
  }

  isLoading.value = true
  try {
    const orderData = {
      shippingName: shippingName.value,
      shippingPhone: shippingPhone.value,
      shippingAddress: shippingAddress.value,
      paymentMethod: paymentMethod.value,
      items: cartItems.value.map(item => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: cartTotal.value,
      shippingFee: shippingFee.value,
      total: grandTotal.value
    }

    const orderDoc = await api.post('/orders', orderData)

    // Slice or format ID if needed (e.g. last 4 chars)
    createdOrderId.value = orderDoc.id || ''
    isOrderSuccess.value = true
    addToast('Order placed successfully!', 'success')
    clearCart()
  } catch (error) {
    console.error('Checkout Error:', error)
    addToast('Failed to place order: ' + error.message, 'danger')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div style="background-color: #121212; min-height: 100vh;">
      <Navbar />

      <!-- Banner Section -->
      <div class="d-flex flex-column w-100 py-15" style="background-image: url(/image/FIXXY_SHOP.png); background-size: cover; background-position: center; min-height: 180px;">
          <div class="container d-flex flex-row pt-5">
              <router-link to="/" class="text-white fs-5 text-decoration-none hover-glow">HOME</router-link>
              <span class="fs-5 ms-5" style="color: #d26527;">SHOPPING CART</span>
          </div>
          <div class="container pt-5">
              <span class="text-white fw-bolder" style="font-size: 40px; letter-spacing: 1px;">MY BASKET</span>
          </div>
      </div>

      <!-- MAIN PAGE WRAPPER -->
      <div class="container py-10" style="background-color: #121212;">

          <!-- CASE 1: ORDER PLACED SUCCESSFULLY -->
          <div v-if="isOrderSuccess" class="d-flex flex-column align-items-center justify-content-center text-white py-15 text-center px-5 hover-glow-subtle rounded border border-secondary" style="background-color: #1a1a1a;">
              <div class="d-flex align-items-center justify-content-center bg-success text-white mb-5 rounded-circle" style="width: 80px; height: 80px;">
                  <i class="fas fa-check" style="font-size: 36px;"></i>
              </div>
              <h2 class="fw-bold mb-3" style="letter-spacing: 1px; color: #34c759;">ORDER PLACED SUCCESSFULLY!</h2>
              <p class="text-muted mb-3" style="max-width: 500px;">
                  Thank you for shopping at FIXXY. Our mechanics will pack and dispatch your items immediately.
              </p>
              <p class="text-muted mb-8" style="font-size: 14px;">
                  You can track your order status in your 
                  <router-link to="/orders" class="text-warning text-decoration-none hover-white fw-bold">Order History</router-link>.
              </p>
              <router-link to="/shop" class="btn text-white px-8 py-3 fw-bold hover-glow" style="background-color: #d26527;">CONTINUE SHOPPING</router-link>
          </div>

          <!-- CASE 2: CART IS EMPTY -->
          <div v-else-if="cartItems.length === 0" class="d-flex flex-column align-items-center justify-content-center py-20 px-5 text-center hover-glow-subtle rounded border border-secondary" style="background-color: #1a1a1a; min-height: 350px;">
              <div class="d-flex align-items-center justify-content-center bg-white pulse-animation mb-6" style="height: 90px; width: 90px; border-radius: 50%;">
                  <i class="bi bi-cart" style="font-size: 30px; color: #d26527;"></i>
              </div>
              <h3 class="text-white fw-bold mb-2">YOUR BASKET IS EMPTY</h3>
              <p class="text-muted mb-8" style="max-width: 320px;">You haven't added any products to your basket yet.</p>
              <router-link to="/shop" class="btn btn-outline-light font-weight-bold px-8 py-3 hover-glow" style="border-color: #444;">RETURN TO SHOP</router-link>
          </div>

          <!-- CASE 3: CART HAS ITEMS -->
          <div v-else class="row g-8">
              <!-- Left Side: Cart Items List -->
              <div class="col-12 col-lg-8">
                  <div class="card p-5 p-md-8 text-white border-secondary mb-5" style="background-color: #1a1a1a; border: 1px solid #282828;">
                      <h4 class="fw-bolder mb-6" style="letter-spacing: 1px; color: #d26527;">ITEMS IN BASKET ({{ cartItems.length }})</h4>

                      <!-- Header labels -->
                      <div class="d-none d-md-flex row border-bottom border-secondary pb-3 text-muted" style="font-size: 13px;">
                          <div class="col-6">PRODUCT DETAILS</div>
                          <div class="col-2 text-center">PRICE</div>
                          <div class="col-2 text-center">QUANTITY</div>
                          <div class="col-2 text-end">TOTAL</div>
                      </div>

                      <!-- Cart Item Row -->
                      <div v-for="item in cartItems" :key="item.id" class="row align-items-center border-bottom border-secondary py-5">
                          <!-- Details -->
                          <div class="col-12 col-md-6 d-flex align-items-center mb-4 mb-md-0">
                              <div class="d-flex align-items-center justify-content-center bg-dark p-2 rounded me-4" style="width: 70px; height: 70px; border: 1px solid #252525;">
                                  <img :src="item.image" :alt="item.name" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                              </div>
                              <div>
                                  <div class="fw-bold text-white fs-5 text-truncate" style="max-width: 250px;">{{ item.name }}</div>
                                  <div class="text-muted fs-6">{{ item.brand }}</div>
                                  <a href="#" @click.prevent="removeFromCart(item.id)" class="text-danger text-decoration-none fs-6 mt-1 d-inline-block hover-white">
                                      <i class="far fa-trash-alt me-1"></i> Remove
                                  </a>
                              </div>
                          </div>

                          <!-- Price -->
                          <div class="col-4 col-md-2 text-md-center">
                              <span class="d-inline d-md-none text-muted">Price: </span>
                              <span class="fw-bold">฿{{ item.price }}</span>
                          </div>

                          <!-- Quantity -->
                          <div class="col-4 col-md-2 d-flex justify-content-md-center align-items-center">
                              <button @click="updateQuantity(item.id, item.quantity - 1)" class="btn btn-sm btn-dark text-white border-secondary px-2">-</button>
                              <input type="number" :value="item.quantity" @change="updateQuantity(item.id, $event.target.value)" class="form-control form-control-sm bg-dark text-white border-secondary text-center mx-2" style="width: 50px;">
                              <button @click="updateQuantity(item.id, item.quantity + 1)" class="btn btn-sm btn-dark text-white border-secondary px-2">+</button>
                          </div>

                          <!-- Subtotal -->
                          <div class="col-4 col-md-2 text-end">
                              <span class="d-inline d-md-none text-muted">Total: </span>
                              <span class="fw-bold text-warning">฿{{ item.price * item.quantity }}</span>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Right Side: Order Summary & Checkout Form -->
              <div class="col-12 col-lg-4">
                  <!-- Pricing summary -->
                  <div class="card p-6 text-white border-secondary mb-6" style="background-color: #1a1a1a; border: 1px solid #282828; border-radius: 8px;">
                      <h4 class="fw-bold mb-5" style="letter-spacing: 1px; color: #d26527;">ORDER SUMMARY</h4>
                      <div class="d-flex justify-content-between mb-3">
                          <span class="text-muted">Subtotal</span>
                          <span class="fw-bold">฿{{ cartTotal }}</span>
                      </div>
                      <div class="d-flex justify-content-between mb-3">
                          <span class="text-muted">Shipping Fee</span>
                          <span class="fw-bold">{{ shippingFee === 0 ? 'FREE' : '฿' + shippingFee }}</span>
                      </div>
                      <div v-if="shippingFee > 0" class="text-muted mb-4" style="font-size: 11px;">
                          <i class="fas fa-info-circle me-1 text-warning"></i> Add ฿{{ 1500 - cartTotal }} more for FREE shipping!
                      </div>
                      <hr class="border-secondary my-4">
                      <div class="d-flex justify-content-between mb-2">
                          <span class="fs-4 fw-bold">Grand Total</span>
                          <span class="fs-4 fw-bolder text-warning">฿{{ grandTotal }}</span>
                      </div>
                  </div>

                  <!-- Checkout Form -->
                  <div class="card p-6 text-white border-secondary" style="background-color: #1a1a1a; border: 1px solid #282828; border-radius: 8px;">
                      <h4 class="fw-bold mb-5" style="letter-spacing: 1px; color: #d26527;">SHIPPING INFORMATION</h4>
                      
                      <div v-if="!currentUser" class="text-center py-4 rounded border border-danger bg-dark mb-4">
                          <p class="fs-6 text-white mb-3">Please sign in to complete checkout.</p>
                          <router-link to="/login" class="btn text-white px-5 py-2 fw-bold" style="background-color: #d26527; font-size: 14px;">SIGN IN NOW</router-link>
                      </div>

                      <form v-else @submit.prevent="handleCheckout">
                          <!-- Recipient Name -->
                          <div class="d-flex flex-column mb-4">
                              <span class="pb-2 fw-bold text-muted" style="font-size: 12px; letter-spacing: 1px;">RECIPIENT NAME</span>
                              <input type="text" v-model="shippingName" class="form-control bg-dark border-secondary text-white py-2 px-3" placeholder="Full Name" required>
                          </div>

                          <!-- Phone Number -->
                          <div class="d-flex flex-column mb-4">
                              <span class="pb-2 fw-bold text-muted" style="font-size: 12px; letter-spacing: 1px;">PHONE NUMBER</span>
                              <input type="tel" v-model="shippingPhone" class="form-control bg-dark border-secondary text-white py-2 px-3" placeholder="e.g. 0812345678" required>
                          </div>

                          <!-- Address -->
                          <div class="d-flex flex-column mb-4">
                              <span class="pb-2 fw-bold text-muted" style="font-size: 12px; letter-spacing: 1px;">SHIPPING ADDRESS</span>
                              <textarea v-model="shippingAddress" rows="3" class="form-control bg-dark border-secondary text-white py-2 px-3" placeholder="Street Address, City, Zip Code" required></textarea>
                          </div>

                          <!-- Payment Method -->
                          <div class="d-flex flex-column mb-6">
                              <span class="pb-2 fw-bold text-muted" style="font-size: 12px; letter-spacing: 1px;">PAYMENT METHOD</span>
                              <select v-model="paymentMethod" class="form-select bg-dark border-secondary text-white py-2 px-3">
                                  <option value="cod">Cash on Delivery (เก็บเงินปลายทาง)</option>
                                  <option value="bank">Bank Transfer (โอนเงินผ่านธนาคาร)</option>
                              </select>
                          </div>

                          <!-- Submit Button -->
                          <button type="submit" class="btn text-white w-100 py-3 fw-bold hover-glow" style="background-color: #d26527; font-size: 16px;" :disabled="isLoading">
                              <span v-if="isLoading">
                                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  PLACING ORDER...
                              </span>
                              <span v-else>
                                  PLACE ORDER
                              </span>
                          </button>
                      </form>
                  </div>
              </div>
          </div>

      </div>

      <!-- Footer Section -->
      <div class="py-15" style="background-color: #121212; border-top: 1px solid #222;">
          <div class="container">
              <div class="row">
                  <!-- Column 1 -->
                  <div class="col-12 col-md-6 col-lg-3 mb-10 mb-lg-0 text-white">
                      <span class="text-white fs-1 fw-bolder">FIXXY <span style="color: #d26527;">MOTORSHOP</span></span>
                      <span class="text-white pt-5 d-block text-gray-400">Every service is rigorously screened and constantly rated to ensure you get the best service.</span>
                      <div class="pt-5">
                          <span class="text-white d-block text-gray-400">Support center 24/7</span>
                          <span class="text-white fw-bolder fs-3" style="color: #d26527;">0534393242</span>
                      </div>
                  </div>

                  <!-- Column 2 -->
                  <div class="col-12 col-md-6 col-lg-2 mb-10 mb-lg-0 text-white">
                      <span class="text-white fs-3 fw-bolder">ABOUT US</span>
                      <ul class="list-unstyled pt-5">
                          <li><router-link to="/about" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">ABOUT US</router-link></li>
                          <li class="pt-2"><router-link to="/about" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">OUR TEAM</router-link></li>
                          <li class="pt-2"><a href="#" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">OUR WORKS</a></li>
                          <li class="pt-2"><a href="#" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">FAQ</a></li>
                      </ul>
                  </div>

                  <!-- Column 3 -->
                  <div class="col-12 col-md-6 col-lg-3 mb-10 mb-lg-0 text-white">
                      <span class="text-white fs-3 fw-bolder">POPULAR SERVICES</span>
                      <ul class="list-unstyled pt-5">
                          <li><a href="#" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">TIRE REPAIR</a></li>
                          <li class="pt-2"><a href="#" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">BRAKE REPAIR</a></li>
                          <li class="pt-2"><a href="#" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">ENGINE REPAIR</a></li>
                          <li class="pt-2"><a href="#" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">STEERING REPAIR</a></li>
                      </ul>
                  </div>

                  <!-- Column 4 -->
                  <div class="col-12 col-md-6 col-lg-4 text-white">
                      <span class="text-white fs-3 fw-bolder">SUBSCRIBE</span>
                      <span class="d-block pt-5 pb-3 text-gray-400" style="color: #d26527;">YOUR EMAIL</span>
                      <input type="text" class="form-control bg-dark border-secondary text-white mb-5" placeholder="ENTER YOUR EMAIL">
                      <div>
                          <a href="" class="btn text-white w-100 w-sm-50 hover-glow" style="background-color: #d26527;">SUBSCRIBE</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- Copyright Section -->
      <div class="py-10 text-center" style="background-color: #161616;">
          <span class="text-white fs-3 fw-bold"><span style="color: #d26527;">Piriya</span> © Copyrights 2025</span>
      </div>
  </div>
</template>

<style scoped>
.pulse-animation {
  animation: pulse 2.5s infinite ease-in-out;
  transition: transform 0.3s ease;
}
.pulse-animation:hover {
  transform: scale(1.1) rotate(5deg);
}
.hover-glow-subtle {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s ease;
}
.hover-glow-subtle:hover {
  box-shadow: 0 15px 35px rgba(210, 101, 39, 0.15);
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.hover-white:hover {
  color: #fff !important;
}
.btn-dark {
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
}
.btn-dark:hover {
  background-color: #d26527 !important;
  border-color: #d26527 !important;
  transform: translateY(-1px);
}
.btn-dark:active {
  transform: translateY(0);
}
.text-danger {
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-block;
}
.text-danger:hover {
  color: #ff453a !important;
  transform: scale(1.03);
}
</style>
