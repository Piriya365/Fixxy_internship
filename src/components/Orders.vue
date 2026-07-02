<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'
import { currentUser } from '../auth'
import api from '../api'

const router = useRouter()

const orders = ref([])
const isLoading = ref(true)
const activeOrderId = ref(null)

const fetchOrders = async () => {
  if (!currentUser.value) return

  isLoading.value = true
  try {
    orders.value = await api.get('/orders')
  } catch (error) {
    console.error('Error fetching orders from API:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})

const toggleOrderDetails = (orderId) => {
  if (activeOrderId.value === orderId) {
    activeOrderId.value = null
  } else {
    activeOrderId.value = orderId
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  let date
  if (timestamp._seconds) {
    date = new Date(timestamp._seconds * 1000)
  } else if (timestamp.seconds) {
    date = new Date(timestamp.seconds * 1000)
  } else if (timestamp.toDate) {
    date = timestamp.toDate()
  } else {
    date = new Date(timestamp)
  }
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'pending': return 'bg-warning text-dark'
    case 'shipped': return 'bg-info text-white'
    case 'completed': return 'bg-success text-white'
    default: return 'bg-secondary text-white'
  }
}

// Mock service data details
const serviceDetails = {
  brake: {
    title: 'Brake Repair & Service',
    icon: '/image/Icon-6b.png',
    description: 'Your brakes are the most critical safety system of your vehicle. Brake pads, rotors, calipers, and fluid wear down under intense heat and friction.',
    symptoms: 'Squealing or grinding noise when braking, soft or spongy brake pedal, pulling to one side, or dashboard brake warning light active.',
    included: [
      'Comprehensive brake system safety inspection',
      'Premium brake pads replacement (front or rear)',
      'Rotor resurfacing or replacement matching OEM specifications',
      'Complete brake fluid flush and system bleeding',
      'Caliper clean, lubricate, and inspection'
    ],
    price: '฿1,200 - ฿4,500',
    duration: '1 - 2 Hours'
  },
  engine: {
    title: 'Engine Diagnostics & Repair',
    icon: '/image/Icon-5b.png',
    description: 'The engine is the heart of your vehicle. Engine issues can stem from spark plugs, oxygen sensors, ignition coils, or vacuum leaks.',
    symptoms: 'Check engine light active, rough idling, engine stalling, loss of acceleration power, or unusual tailpipe smoke.',
    included: [
      'Full computer diagnostics test to read engine fault codes',
      'Spark plugs and ignition coils inspection & replacement',
      'Coolant or oil leak search and gasket sealing',
      'Air filter and cabin filter checks',
      'Performance tuning and diagnostic code reset'
    ],
    price: '฿1,500 - ฿8,000',
    duration: '2 - 5 Hours'
  },
  tire: {
    title: 'Tire Service & Wheel Alignment',
    icon: '/image/Icon-4b.png',
    description: 'Tires connect your car to the road. Proper tread depth, alignment, and balancing ensure vehicle safety, handling, and fuel efficiency.',
    symptoms: 'Uneven tire tread wear, steering wheel vibration at high speeds, vehicle pulling left or right on flat straight road.',
    included: [
      'Flat tire leak check and tire patching',
      'Computerized 4-wheel alignment calibration',
      'Tire rotation to distribute tread wear evenly',
      'Dynamic tire balancing',
      'Tire pressure adjustments matching factory ratings'
    ],
    price: '฿300 (Patching) to ฿3,500+ (per new tire)',
    duration: '30 - 60 Minutes'
  },
  steering: {
    title: 'Steering & Suspension Repair',
    icon: '/image/Icon-1b.png',
    description: 'The steering and suspension systems collaborate to keep your ride smooth and your vehicle handling under control.',
    symptoms: 'Stiff steering wheel, screeching noise when turning, car pulling to one side, steering wheel vibration, or loose steering feel.',
    included: [
      'Power steering pump and fluid leak inspection',
      'Tie-rod ends, ball joints, and control arms wear check',
      'Shock absorbers and struts leak & bouncing test',
      'Power steering fluid flush & refill',
      'Steering gear box lubrication & adjustment'
    ],
    price: '฿1,800 - ฿6,500',
    duration: '1.5 - 3 Hours'
  }
}

const activeModalService = ref(null)

const openServiceModal = (serviceKey) => {
  activeModalService.value = serviceDetails[serviceKey]
}

const closeServiceModal = () => {
  activeModalService.value = null
}

const bookThisService = (serviceTitle) => {
  closeServiceModal()
  router.push({ path: '/', hash: '#appointment-form', query: { service: serviceTitle } })
}
</script>

<template>
  <div style="background-color: #121212; min-height: 100vh;">
      <Navbar />

      <!-- Banner Section -->
      <div class="d-flex flex-column w-100 py-15" style="background-image: url(/image/FIXXY_SHOP.png); background-size: cover; background-position: center; min-height: 180px;">
          <div class="container d-flex flex-row pt-5">
              <router-link to="/" class="text-white fs-5 text-decoration-none hover-glow">HOME</router-link>
              <span class="fs-5 ms-5" style="color: #d26527;">ORDER HISTORY</span>
          </div>
          <div class="container pt-5">
              <span class="text-white fw-bolder" style="font-size: 40px; letter-spacing: 1px;">MY ORDERS</span>
          </div>
      </div>

      <!-- MAIN PAGE WRAPPER -->
      <div class="container py-10">

          <!-- LOADING STATE -->
          <div v-if="isLoading" class="d-flex flex-column align-items-center justify-content-center text-white py-20">
              <div class="spinner-border text-warning mb-4" role="status" style="width: 3rem; height: 3rem;">
                  <span class="visually-hidden">Loading...</span>
              </div>
              <span class="text-muted">Loading your order history...</span>
          </div>

          <!-- EMPTY STATE -->
          <div v-else-if="orders.length === 0" class="d-flex flex-column align-items-center justify-content-center py-20 px-5 text-center hover-glow-subtle rounded border border-secondary" style="background-color: #1a1a1a; min-height: 350px;">
              <div class="d-flex align-items-center justify-content-center bg-white pulse-animation mb-6" style="height: 90px; width: 90px; border-radius: 50%;">
                  <i class="fas fa-history" style="font-size: 30px; color: #d26527;"></i>
              </div>
              <h3 class="text-white fw-bold mb-2">NO ORDERS FOUND</h3>
              <p class="text-muted mb-8" style="max-width: 380px;">You haven't placed any purchase orders on our shop catalog yet.</p>
              <router-link to="/shop" class="btn btn-outline-light font-weight-bold px-8 py-3 hover-glow" style="border-color: #444;">GO TO SHOP</router-link>
          </div>

          <!-- ORDERS LIST -->
          <div v-else class="d-flex flex-column">
              <div class="card p-5 p-md-8 text-white border-secondary mb-5" style="background-color: #1a1a1a; border: 1px solid #282828;">
                  <h4 class="fw-bolder mb-6" style="letter-spacing: 1px; color: #d26527;">PAST ORDERS ({{ orders.length }})</h4>

                  <!-- Accordion Orders -->
                  <div v-for="(order, index) in orders" :key="order.id" class="order-item-card mb-4 border border-secondary rounded p-4 p-md-5" style="background-color: #151515;">
                      <!-- Order Header Summary Info -->
                      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center cursor-pointer" @click="toggleOrderDetails(order.id)">
                          <div>
                              <div class="d-flex align-items-center mb-2 flex-wrap">
                                  <span class="fw-bold fs-5 me-3">ORDER #{{ orders.length - index }}</span>
                                  <span class="badge" :class="getStatusBadgeClass(order.status)">{{ order.status.toUpperCase() }}</span>
                              </div>
                              <div class="text-muted fs-6">
                                  <i class="far fa-calendar-alt me-2"></i>{{ formatDate(order.createdAt) }}
                              </div>
                          </div>
                          
                          <div class="d-flex align-items-center mt-3 mt-md-0 w-100 w-md-auto justify-content-between justify-content-md-end">
                              <div class="text-md-end me-5">
                                  <span class="text-muted d-block" style="font-size: 12px;">Total Paid</span>
                                  <span class="fw-bold text-warning fs-4">฿{{ order.total }}</span>
                              </div>
                              <button class="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; border-radius: 50%;">
                                  <i class="fas" :class="activeOrderId === order.id ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                              </button>
                          </div>
                      </div>

                      <!-- Collapsible Details Container -->
                      <transition name="slide-fade">
                          <div v-if="activeOrderId === order.id" class="order-details-expanded mt-6 pt-6 border-top border-secondary">
                              <div class="row g-6">
                                  <!-- Delivery info -->
                                  <div class="col-12 col-md-4 border-end-md border-secondary">
                                      <h5 class="fw-bold mb-4" style="color: #d26527; font-size: 15px; letter-spacing: 0.5px;">SHIPPING LOGS</h5>
                                      <p class="mb-2"><span class="text-muted">Order ID:</span> <span class="fw-bold text-white">#{{ orders.length - index }}</span></p>
                                      <p class="mb-2" style="font-size: 11px; opacity: 0.5;"><span class="text-muted">Ref Key:</span> {{ order.id }}</p>
                                      <p class="mb-2"><span class="text-muted">Recipient:</span> <span class="fw-bold text-white">{{ order.shippingName }}</span></p>
                                      <p class="mb-2"><span class="text-muted">Phone:</span> <span class="fw-bold text-white">{{ order.shippingPhone }}</span></p>
                                      <p class="mb-2"><span class="text-muted">Payment:</span> <span class="fw-bold text-white">{{ order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer' }}</span></p>
                                      <p class="mb-0"><span class="text-muted">Address:</span> <span class="d-block text-white mt-1" style="font-size: 14px;">{{ order.shippingAddress }}</span></p>
                                  </div>

                                  <!-- Items Purchased -->
                                  <div class="col-12 col-md-8">
                                      <h5 class="fw-bold mb-4" style="color: #d26527; font-size: 15px; letter-spacing: 0.5px;">ITEMS PURCHASED</h5>
                                      <div class="table-responsive">
                                          <table class="table table-dark table-borderless align-middle mb-0" style="background-color: transparent;">
                                              <thead>
                                                  <tr class="text-muted border-bottom border-secondary" style="font-size: 12px;">
                                                      <th>ITEM DETAILS</th>
                                                      <th class="text-center">PRICE</th>
                                                      <th class="text-center">QUANTITY</th>
                                                      <th class="text-end">SUBTOTAL</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  <tr v-for="item in order.items" :key="item.id" style="font-size: 14px;">
                                                      <td class="py-3">
                                                          <span class="fw-bold text-white d-block">{{ item.name }}</span>
                                                          <span class="text-muted" style="font-size: 12px;">{{ item.brand }}</span>
                                                      </td>
                                                      <td class="text-center py-3">฿{{ item.price }}</td>
                                                      <td class="text-center py-3">{{ item.quantity }}</td>
                                                      <td class="text-end py-3 text-warning">฿{{ item.price * item.quantity }}</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </transition>

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
                          <li><a href="#" @click.prevent="openServiceModal('tire')" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">TIRE REPAIR</a></li>
                          <li class="pt-2"><a href="#" @click.prevent="openServiceModal('brake')" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">BRAKE REPAIR</a></li>
                          <li class="pt-2"><a href="#" @click.prevent="openServiceModal('engine')" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">ENGINE REPAIR</a></li>
                          <li class="pt-2"><a href="#" @click.prevent="openServiceModal('steering')" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">STEERING REPAIR</a></li>
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

  <!-- Service Detail Modal Overlay -->
  <div v-if="activeModalService" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-5" style="z-index: 9999; background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(6px);" @click.self="closeServiceModal">
      <div class="card p-6 p-md-8 text-white border-secondary hover-glow-subtle modal-content-anim position-relative" style="background-color: #1a1a1a; max-width: 600px; width: 100%; border: 1px solid #282828; border-radius: 12px;">
          <!-- Close button -->
          <button @click="closeServiceModal" type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-5" aria-label="Close"></button>

          <div class="d-flex align-items-center mb-6">
              <img :src="activeModalService.icon" style="width: 55px;" class="me-4" alt="Service Icon">
              <h3 class="fw-bold text-white mb-0" style="letter-spacing: 0.5px;">{{ activeModalService.title }}</h3>
          </div>

          <p class="text-muted mb-5" style="font-size: 15px; line-height: 1.6;">{{ activeModalService.description }}</p>

          <div class="mb-5 bg-dark p-4 rounded border border-secondary" style="border-color: #252525 !important;">
              <span class="d-block fw-bold text-warning mb-2" style="font-size: 13px; letter-spacing: 0.5px;"><i class="fas fa-exclamation-triangle me-2"></i>COMMON SYMPTOMS</span>
              <p class="mb-0 text-white" style="font-size: 14px; line-height: 1.5;">{{ activeModalService.symptoms }}</p>
          </div>

          <div class="mb-6">
              <span class="d-block fw-bold text-warning mb-3" style="font-size: 13px; letter-spacing: 0.5px;"><i class="fas fa-list-ul me-2"></i>WHAT'S INCLUDED</span>
              <ul class="list-unstyled mb-0" style="font-size: 14px; line-height: 1.6;">
                  <li v-for="item in activeModalService.included" :key="item" class="mb-2 d-flex align-items-start">
                      <i class="fas fa-check text-success me-3 mt-1" style="font-size: 12px;"></i>
                      <span class="text-muted">{{ item }}</span>
                  </li>
              </ul>
          </div>

          <div class="row g-4 border-top border-secondary pt-5 align-items-center" style="border-color: #282828 !important;">
              <div class="col-6">
                  <div class="mb-1 text-muted" style="font-size: 11px; letter-spacing: 0.5px;">ESTIMATED COST</div>
                  <span class="fw-bold text-white fs-4">{{ activeModalService.price }}</span>
              </div>
              <div class="col-6 text-end">
                  <div class="mb-1 text-muted" style="font-size: 11px; letter-spacing: 0.5px;">DURATION</div>
                  <span class="fw-bold text-white fs-4"><i class="far fa-clock me-2 text-warning"></i>{{ activeModalService.duration }}</span>
              </div>
          </div>

          <div class="mt-8 d-flex justify-content-end">
              <button @click="closeServiceModal" type="button" class="btn btn-outline-light me-4 px-6 py-2 fw-bold" style="border-color: #333; font-size: 14px;">CLOSE</button>
              <button @click="bookThisService(activeModalService.title)" type="button" class="btn text-white px-8 py-2 fw-bold hover-glow" style="background-color: #d26527; font-size: 14px;">BOOK NOW</button>
          </div>
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
.cursor-pointer {
  cursor: pointer;
}
@media (min-width: 768px) {
  .border-end-md {
    border-right: 1px solid #282828 !important;
  }
}
.order-item-card {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.order-item-card:hover {
  border-color: #444 !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Accordion expand smooth transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(-15px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.modal-content-anim {
  animation: modalFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
