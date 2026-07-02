import { ref, computed, watch } from 'vue'
import { addToast } from './toastState'

// Load initial cart from localStorage
const storedCart = localStorage.getItem('fixxy_cart')
export const cartItems = ref(storedCart ? JSON.parse(storedCart) : [])

// Save to localStorage automatically on changes
watch(cartItems, (newCart) => {
  localStorage.setItem('fixxy_cart', JSON.stringify(newCart))
}, { deep: true })

// Add a product or increment quantity
export const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1
    })
  }
  addToast(`Added "${product.name}" to cart!`, 'success')
}

// Remove item from cart
export const removeFromCart = (productId) => {
  const item = cartItems.value.find(item => item.id === productId)
  if (item) {
    cartItems.value = cartItems.value.filter(i => i.id !== productId)
    addToast(`Removed "${item.name}" from cart.`, 'info')
  }
}

// Update quantity of an item
export const updateQuantity = (productId, quantity) => {
  const item = cartItems.value.find(item => item.id === productId)
  if (item) {
    item.quantity = Math.max(1, parseInt(quantity) || 1)
  }
}

// Clear all items in cart
export const clearCart = () => {
  cartItems.value = []
}

// Computed: Total item count
export const cartCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

// Computed: Total cost (in Thai Baht)
export const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})
