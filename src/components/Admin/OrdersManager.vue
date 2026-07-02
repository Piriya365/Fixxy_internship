<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api'

const orders = ref([])
const isLoading = ref(true)
const activeOrderId = ref(null)

const fetchOrders = async () => {
  isLoading.value = true
  try {
    orders.value = await api.get('/orders')
  } catch (error) {
    console.error('Error fetching orders from API:', error)
    orders.value = []
  } finally {
    isLoading.value = false
  }
}

const toggleOrderDetails = (orderId) => {
  if (activeOrderId.value === orderId) {
    activeOrderId.value = null
  } else {
    activeOrderId.value = orderId
  }
}

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    await api.put(`/orders/${orderId}/status`, { status: newStatus })
    await fetchOrders()
  } catch (error) {
    console.error('Error updating order status:', error)
    alert('Failed to update status: ' + error.message)
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
    month: 'short',
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

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="orders-manager">
      <div v-if="isLoading" class="d-flex flex-column align-items-center py-15 text-center">
          <div class="spinner-border text-warning mb-3" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
          <span class="text-muted">Loading orders...</span>
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-15 text-muted">
          <i class="fas fa-boxes mb-4" style="font-size: 40px; color: #d26527;"></i>
          <h5>NO SHOP ORDERS FOUND</h5>
          <p class="mb-0" style="font-size: 14px;">No shop orders have been placed by customers in the database yet.</p>
      </div>

      <div v-else class="d-flex flex-column">
          <!-- Accordion Orders -->
          <div v-for="(order, index) in orders" :key="order.id" class="order-item-card mb-4 border border-secondary rounded p-4" style="background-color: #161616;">
              <!-- Order Header Summary -->
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center cursor-pointer" @click="toggleOrderDetails(order.id)">
                  <div>
                      <div class="d-flex align-items-center mb-2 flex-wrap">
                          <span class="fw-bold fs-5 me-3 text-white">ORDER #{{ orders.length - index }}</span>
                          <span class="badge me-3 text-uppercase" :class="getStatusBadgeClass(order.status)">{{ order.status }}</span>
                          <span class="text-muted" style="font-size: 12px;">ID: #{{ order.id }}</span>
                      </div>
                      <div class="text-muted fs-6">
                          <i class="far fa-calendar-alt me-2 text-warning"></i>{{ formatDate(order.createdAt) }}
                          <span class="mx-2">|</span>
                          <i class="fas fa-user me-2 text-warning"></i>{{ order.shippingName }}
                      </div>
                  </div>

                  <div class="d-flex align-items-center mt-3 mt-md-0 w-100 w-md-auto justify-content-between justify-content-md-end">
                      <div class="text-md-end me-5">
                          <span class="text-muted d-block" style="font-size: 11px;">Total Paid</span>
                          <span class="fw-bold text-warning fs-4">฿{{ order.total }}</span>
                      </div>
                      <button class="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; border-radius: 50%;">
                          <i class="fas" :class="activeOrderId === order.id ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                      </button>
                  </div>
              </div>

              <!-- Collapsible Details Container -->
              <transition name="slide-fade">
                  <div v-if="activeOrderId === order.id" class="order-details-expanded mt-4 pt-4 border-top border-secondary">
                      <div class="row g-5">
                          <!-- Delivery Info -->
                          <div class="col-12 col-md-4 border-end-md border-secondary">
                              <h6 class="fw-bold mb-3 text-warning" style="font-size: 13px; letter-spacing: 0.5px;">SHIPPING LOGS</h6>
                              <p class="mb-2"><span class="text-muted">Recipient:</span> <span class="fw-bold text-white">{{ order.shippingName }}</span></p>
                              <p class="mb-2"><span class="text-muted">Phone:</span> <span class="fw-bold text-white">{{ order.shippingPhone }}</span></p>
                              <p class="mb-2"><span class="text-muted">Payment:</span> <span class="fw-bold text-white">{{ order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer' }}</span></p>
                              <p class="mb-3"><span class="text-muted">Address:</span> <span class="d-block text-white mt-1" style="font-size: 13px; line-height: 1.4;">{{ order.shippingAddress }}</span></p>
                              
                              <div class="mt-4 pt-3 border-top border-secondary" style="border-color: #252525 !important;">
                                  <label class="form-label text-muted fw-bold mb-2" style="font-size: 12px; letter-spacing: 0.5px;">UPDATE ORDER STATUS</label>
                                  <select :value="order.status" 
                                          @change="updateOrderStatus(order.id, $event.target.value)" 
                                          class="form-select form-select-sm bg-dark text-white border-secondary" 
                                          style="border-radius: 4px; font-size: 13px;">
                                      <option value="pending">Pending (รอการจัดส่ง)</option>
                                      <option value="shipped">Shipped (จัดส่งแล้ว)</option>
                                      <option value="completed">Completed (คำสั่งซื้อเสร็จสิ้น)</option>
                                  </select>
                              </div>
                          </div>

                          <!-- Items Purchased -->
                          <div class="col-12 col-md-8">
                              <h6 class="fw-bold mb-3 text-warning" style="font-size: 13px; letter-spacing: 0.5px;">ITEMS PURCHASED</h6>
                              <div class="table-responsive">
                                  <table class="table table-dark table-borderless align-middle mb-0" style="background-color: transparent;">
                                      <thead>
                                          <tr class="text-muted border-bottom border-secondary" style="font-size: 11px;">
                                              <th>ITEM DETAILS</th>
                                              <th class="text-center">PRICE</th>
                                              <th class="text-center">QUANTITY</th>
                                              <th class="text-end">SUBTOTAL</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="item in order.items" :key="item.id" style="font-size: 13px;">
                                              <td class="py-2">
                                                  <span class="fw-bold text-white d-block">{{ item.name }}</span>
                                                  <span class="text-muted" style="font-size: 11px;">{{ item.brand }}</span>
                                              </td>
                                              <td class="text-center py-2">฿{{ item.price }}</td>
                                              <td class="text-center py-2">{{ item.quantity }}</td>
                                              <td class="text-end py-2 text-warning">฿{{ item.price * item.quantity }}</td>
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
</template>

<style scoped>
.order-item-card {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.order-item-card:hover {
  border-color: #444 !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
.cursor-pointer {
  cursor: pointer;
}
@media (min-width: 768px) {
  .border-end-md {
    border-right: 1px solid #282828 !important;
  }
}
.form-select:focus {
  border-color: #d26527;
  box-shadow: 0 0 0 0.15rem rgba(210, 101, 39, 0.25);
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
</style>
