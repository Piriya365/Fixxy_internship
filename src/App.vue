<script setup>
import { toasts } from './toastState'
</script>

<template>
  <div>
      <!-- Global Toast Container -->
      <div class="position-fixed top-0 end-0 p-5" style="z-index: 9999; max-width: 380px; width: 100%;">
          <transition-group name="toast-fade">
              <div v-for="toast in toasts" :key="toast.id" class="toast-custom mb-3 p-4 d-flex align-items-center rounded shadow-lg text-white" :class="toast.type">
                  <i v-if="toast.type === 'success'" class="fas fa-check-circle me-3 text-success fs-4"></i>
                  <i v-else-if="toast.type === 'info'" class="fas fa-info-circle me-3 text-info fs-4"></i>
                  <i v-else class="fas fa-exclamation-circle me-3 text-danger fs-4"></i>
                  <span class="fw-bold fs-6">{{ toast.message }}</span>
              </div>
          </transition-group>
      </div>

      <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
              <component :is="Component" />
          </transition>
      </router-view>
  </div>
</template>

<style scoped>
.toast-custom {
  background-color: #1a1a1a;
  border-left: 4px solid #d26527;
  border-top: 1px solid #2a2a2a;
  border-right: 1px solid #2a2a2a;
  border-bottom: 1px solid #2a2a2a;
  backdrop-filter: blur(10px);
}
.toast-custom.success {
  border-left-color: #34c759;
}
.toast-custom.danger {
  border-left-color: #ff3b30;
}
.toast-custom.info {
  border-left-color: #007aff;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.toast-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>


