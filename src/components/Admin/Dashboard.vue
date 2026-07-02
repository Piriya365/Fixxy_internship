<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Navbar from '../Navbar.vue'
import AppointmentsManager from './AppointmentsManager.vue'
import OrdersManager from './OrdersManager.vue'
import api from '../../api'

const appointments = ref([])
const orders = ref([])
const isLoadingStats = ref(true)
const activeTab = ref('appointments') // 'appointments' or 'orders'

let intervalId = null

const fetchStatsData = async () => {
  try {
    const [apps, ords] = await Promise.all([
      api.get('/appointments'),
      api.get('/orders')
    ])
    appointments.value = apps
    orders.value = ords
  } catch (error) {
    console.error('Error fetching analytics stats from API:', error)
  } finally {
    isLoadingStats.value = false
  }
}

const stopPolling = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const startStatsPolling = () => {
  fetchStatsData()
  stopPolling()
  intervalId = setInterval(fetchStatsData, 30000) // Poll every 30 seconds
}

// Pause polling when tab is hidden to save bandwidth and Firestore reads
const handleVisibilityChange = () => {
  if (document.hidden) {
    stopPolling()
  } else {
    startStatsPolling()
  }
}

// KPI Computations
const totalSales = computed(() => {
  return orders.value
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + (Number(order.total) || 0), 0)
})

const totalOrdersCount = computed(() => orders.value.length)

const pendingAppointmentsCount = computed(() => {
  return appointments.value.filter(app => app.status === 'pending').length
})

const uniqueUsersCount = computed(() => {
  const uids = new Set()
  appointments.value.forEach(app => {
    if (app.userId) uids.add(app.userId)
  })
  orders.value.forEach(order => {
    if (order.userId) uids.add(order.userId)
  })
  return uids.size || 1 // Return at least 1 (the admin themselves)
})

onUnmounted(() => {
  stopPolling()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

onMounted(() => {
  startStatsPolling()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <div style="background-color: #121212; min-height: 100vh;">
      <Navbar />

      <!-- Banner Section -->
      <div class="d-flex flex-column w-100 py-15" style="background-image: url(/image/FIXXY_SHOP.png); background-size: cover; background-position: center; min-height: 180px;">
          <div class="container d-flex flex-row pt-5">
              <router-link to="/" class="text-white fs-5 text-decoration-none hover-glow">HOME</router-link>
              <span class="fs-5 ms-5" style="color: #d26527;">ADMIN CONSOLE</span>
          </div>
          <div class="container pt-5">
              <span class="text-white fw-bolder" style="font-size: 40px; letter-spacing: 1px;">MANAGEMENT DASHBOARD</span>
          </div>
      </div>

      <!-- MAIN PAGE WRAPPER -->
      <div class="container py-10">

          <!-- KPI Metric Cards Grid -->
          <div class="row g-4 mb-10">
              <!-- Metric 1: Total Revenue -->
              <div class="col-12 col-sm-6 col-lg-3">
                  <div class="kpi-card p-5 text-white border-secondary rounded d-flex align-items-center" style="background-color: #1a1a1a; border: 1px solid #282828;">
                      <div class="kpi-icon-container bg-success me-4 d-flex align-items-center justify-content-center text-white" style="width: 55px; height: 55px; border-radius: 50%;">
                          <i class="fas fa-coins" style="font-size: 22px;"></i>
                      </div>
                      <div>
                          <span class="d-block text-muted mb-1" style="font-size: 12px; letter-spacing: 0.5px;">TOTAL SALES</span>
                          <span v-if="isLoadingStats" class="spinner-border spinner-border-sm text-success" role="status"></span>
                          <span v-else class="fw-bold text-white fs-3">฿{{ totalSales }}</span>
                      </div>
                  </div>
              </div>

              <!-- Metric 2: Total Orders -->
              <div class="col-12 col-sm-6 col-lg-3">
                  <div class="kpi-card p-5 text-white border-secondary rounded d-flex align-items-center" style="background-color: #1a1a1a; border: 1px solid #282828;">
                      <div class="kpi-icon-container bg-warning me-4 d-flex align-items-center justify-content-center text-dark" style="width: 55px; height: 55px; border-radius: 50%;">
                          <i class="fas fa-shopping-basket" style="font-size: 22px;"></i>
                      </div>
                      <div>
                          <span class="d-block text-muted mb-1" style="font-size: 12px; letter-spacing: 0.5px;">TOTAL ORDERS</span>
                          <span v-if="isLoadingStats" class="spinner-border spinner-border-sm text-warning" role="status"></span>
                          <span v-else class="fw-bold text-white fs-3">{{ totalOrdersCount }}</span>
                      </div>
                  </div>
              </div>

              <!-- Metric 3: Pending Appointments -->
              <div class="col-12 col-sm-6 col-lg-3">
                  <div class="kpi-card p-5 text-white border-secondary rounded d-flex align-items-center" style="background-color: #1a1a1a; border: 1px solid #282828;">
                      <div class="kpi-icon-container bg-danger me-4 d-flex align-items-center justify-content-center text-white" style="width: 55px; height: 55px; border-radius: 50%;">
                          <i class="far fa-calendar-alt" style="font-size: 22px;"></i>
                      </div>
                      <div>
                          <span class="d-block text-muted mb-1" style="font-size: 12px; letter-spacing: 0.5px;">PENDING QUEUES</span>
                          <span v-if="isLoadingStats" class="spinner-border spinner-border-sm text-danger" role="status"></span>
                          <span v-else class="fw-bold text-white fs-3">{{ pendingAppointmentsCount }}</span>
                      </div>
                  </div>
              </div>

              <!-- Metric 4: Registered Users -->
              <div class="col-12 col-sm-6 col-lg-3">
                  <div class="kpi-card p-5 text-white border-secondary rounded d-flex align-items-center" style="background-color: #1a1a1a; border: 1px solid #282828;">
                      <div class="kpi-icon-container bg-info me-4 d-flex align-items-center justify-content-center text-white" style="width: 55px; height: 55px; border-radius: 50%;">
                          <i class="fas fa-users" style="font-size: 22px;"></i>
                      </div>
                      <div>
                          <span class="d-block text-muted mb-1" style="font-size: 12px; letter-spacing: 0.5px;">ACTIVE CLIENTS</span>
                          <span v-if="isLoadingStats" class="spinner-border spinner-border-sm text-info" role="status"></span>
                          <span v-else class="fw-bold text-white fs-3">{{ uniqueUsersCount }}</span>
                      </div>
                  </div>
              </div>
          </div>

          <!-- Tab Navigation Sidebar/Headers -->
          <div class="card p-5 p-md-8 text-white border-secondary" style="background-color: #1a1a1a; border: 1px solid #282828;">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-6 pb-4 border-bottom border-secondary">
                  <!-- Tab Triggers -->
                  <div class="d-flex align-items-center mb-4 mb-md-0">
                      <button @click="activeTab = 'appointments'" 
                              class="tab-btn btn px-5 py-3 fw-bold me-3 text-uppercase d-flex align-items-center" 
                              :class="activeTab === 'appointments' ? 'active-tab' : 'inactive-tab'">
                          <i class="far fa-calendar-check me-2"></i>Appointments
                      </button>
                      <button @click="activeTab = 'orders'" 
                              class="tab-btn btn px-5 py-3 fw-bold text-uppercase d-flex align-items-center" 
                              :class="activeTab === 'orders' ? 'active-tab' : 'inactive-tab'">
                          <i class="fas fa-truck-loading me-2"></i>Product Orders
                      </button>
                  </div>
              </div>

              <!-- Content Views -->
              <transition name="fade" mode="out-in">
                  <AppointmentsManager v-if="activeTab === 'appointments'" />
                  <OrdersManager v-else />
              </transition>
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
.kpi-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}
.tab-btn {
  border: 1px solid #333;
  transition: all 0.2s ease;
  font-size: 14px;
}
.active-tab {
  background-color: #d26527 !important;
  color: white !important;
  border-color: #d26527 !important;
}
.inactive-tab {
  background-color: #151515 !important;
  color: #888 !important;
}
.inactive-tab:hover {
  color: white !important;
  border-color: #444 !important;
}

/* Fade tab transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
