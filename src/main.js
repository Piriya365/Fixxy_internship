import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Global scroll reveal directive
app.directive('reveal', {
  mounted(el, binding) {
    const isSlideLeft = binding.modifiers.left
    const isSlideRight = binding.modifiers.right
    const isFadeIn = binding.modifiers.fade
    
    let baseClass = 'reveal-init'
    if (isSlideLeft) baseClass = 'reveal-slide-left'
    else if (isSlideRight) baseClass = 'reveal-slide-right'
    else if (isFadeIn) baseClass = 'reveal-fade-in'
    
    el.classList.add(baseClass)
    
    if (binding.value) {
      el.style.transitionDelay = `${binding.value}ms`
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-active')
          if (binding.modifiers.once) {
            observer.unobserve(el)
          }
        } else if (!binding.modifiers.once) {
          el.classList.remove('reveal-active')
        }
      })
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    })
    
    observer.observe(el)
    el._observer = observer
  },
  unmounted(el) {
    if (el._observer) {
      el._observer.disconnect()
    }
  }
})

app.use(router)
app.mount('#app')


