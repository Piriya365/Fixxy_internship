<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api'

const appointments = ref([])
const isLoading = ref(true)

const fetchAppointments = async () => {
  isLoading.value = true
  try {
    appointments.value = await api.get('/appointments')
  } catch (error) {
    console.error('Error fetching appointments from API:', error)
    appointments.value = []
  } finally {
    isLoading.value = false
  }
}

const updateStatus = async (appointmentId, newStatus) => {
  try {
    await api.put(`/appointments/${appointmentId}/status`, { status: newStatus })
    await fetchAppointments()
  } catch (error) {
    console.error('Error updating appointment status:', error)
    alert('Failed to update status: ' + error.message)
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchAppointments()
})
</script>

<template>
  <div class="appointments-manager">
      <div v-if="isLoading" class="d-flex flex-column align-items-center py-15 text-center">
          <div class="spinner-border text-warning mb-3" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
          <span class="text-muted">Loading appointments...</span>
      </div>

      <div v-else-if="appointments.length === 0" class="text-center py-15 text-muted">
          <i class="far fa-calendar-times mb-4" style="font-size: 40px; color: #d26527;"></i>
          <h5>NO APPOINTMENTS FOUND</h5>
          <p class="mb-0" style="font-size: 14px;">No customer appointment requests have been logged in the database yet.</p>
      </div>

      <div v-else class="table-responsive">
          <table class="table table-dark table-hover border border-secondary align-middle" style="background-color: #161616;">
              <thead>
                  <tr class="text-muted border-bottom border-secondary" style="font-size: 13px;">
                      <th class="ps-4">CUSTOMER</th>
                      <th>CONTACT</th>
                      <th>DATE & TIME</th>
                      <th>CLIENT MESSAGE</th>
                      <th class="text-center">STATUS</th>
                      <th class="text-end pe-4">ACTIONS</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="app in appointments" :key="app.id" style="font-size: 14px;">
                      <td class="ps-4 py-4">
                          <span class="fw-bold text-white d-block">{{ app.customerName }}</span>
                          <span class="text-muted" style="font-size: 12px;">ID: #{{ app.id.slice(0, 8) }}...</span>
                      </td>
                      <td>
                          <span class="text-white d-block">{{ app.customerEmail }}</span>
                      </td>
                      <td>
                          <span class="fw-bold text-warning d-block">{{ formatDate(app.date) }}</span>
                          <span class="text-muted" style="font-size: 12px;">At {{ app.time }}</span>
                      </td>
                      <td style="max-width: 250px;">
                          <span class="text-muted text-truncate d-block" :title="app.message || 'No description provided'">
                              {{ app.message || '-' }}
                          </span>
                      </td>
                      <td class="text-center">
                          <span class="badge px-3 py-2 text-uppercase" 
                                :class="{
                                  'bg-warning text-dark': app.status === 'pending',
                                  'bg-success': app.status === 'confirmed',
                                  'bg-info text-white': app.status === 'completed',
                                  'bg-danger': app.status === 'cancelled'
                                }">
                              {{ app.status }}
                          </span>
                      </td>
                      <td class="text-end pe-4">
                          <select :value="app.status" 
                                  @change="updateStatus(app.id, $event.target.value)" 
                                  class="form-select form-select-sm bg-dark text-white border-secondary d-inline-block" 
                                  style="width: 130px; border-radius: 4px; font-size: 13px;">
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                          </select>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #1f1f1f !important;
}
.table th {
  letter-spacing: 0.5px;
  font-weight: 600;
  padding-top: 15px;
  padding-bottom: 15px;
}
.form-select:focus {
  border-color: #d26527;
  box-shadow: 0 0 0 0.15rem rgba(210, 101, 39, 0.25);
}
</style>
