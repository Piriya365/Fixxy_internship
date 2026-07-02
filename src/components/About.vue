<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'

const router = useRouter()

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
<div>
  <!-- Navbar / Header -->
  <Navbar />


  <!-- Banner Section -->
  <div class="d-flex flex-column w-100 py-15 py-lg-20"
      style="background-image: url(/image/FIXXY_SHOP.png); background-size: cover; background-position: center; min-height: 200px;">
      <div class="container d-flex flex-row pt-5">
          <router-link to="/" class="text-white fs-4 text-decoration-none">HOME</router-link>
          <span class="fs-4 ms-5" style="color: #d26527;">ABOUT</span>
      </div>

      <div class="container pt-8">
          <span class="text-white fw-bolder" style="font-size: 48px;">ABOUT</span>
      </div>
  </div>

  <!-- Auto Repair Info Section -->
  <div class="py-10 py-lg-20" style="background-color: #1b1b1b; overflow: hidden;">
      <div class="container">
          <div class="row align-items-center">
              <!-- Text Column -->
              <div class="col-12 col-lg-6 d-flex flex-column mb-10 mb-lg-0 text-white" v-reveal.left.once>
                  <span class="fs-1 fw-bolder">WE MAKE AUTO REPAIR MORE CONVENIENT</span>
                  <span class="mt-7 fs-5 text-gray-400">Promotors has over 1200 locations across the U.S. and Canada to provide car maintenance and car repair services wherever you are.</span>
                  
                  <div class="d-flex flex-row pt-10 pb-2 justify-content-between">
                      <span class="fs-5 fw-bolder">HIGHLY QUALIFIED EXPERTS</span>
                      <span class="fs-5 fw-bolder" style="color: #d26527;">90%</span>
                  </div>
                  <div class="progress bg-dark" style="height: 8px;">
                      <div class="progress-bar progress-bar-custom-1" role="progressbar" style="background-color: #d26527;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>

                  <div class="d-flex flex-row pt-7 pb-2 justify-content-between">
                      <span class="fs-5 fw-bolder">CLEAN, MODERN FACILITY</span>
                      <span class="fs-5 fw-bolder" style="color: #d26527;">99%</span>
                  </div>
                  <div class="progress bg-dark" style="height: 8px;">
                      <div class="progress-bar progress-bar-custom-2" role="progressbar" style="background-color: #d26527;" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>

              <!-- Image Column -->
              <div class="col-12 col-lg-6 mt-5 mt-lg-0 text-center px-lg-10" v-reveal.right.once>
                  <img src="/image/about-1.jpg" class="img-fluid rounded mx-auto d-block hover-glow" alt="About" style="box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              </div>
          </div>
      </div>
  </div>


  <!-- Team Member Section -->
  <div class="py-10 py-lg-20" style="background-color: #1b1b1b; border-top: 1px solid #222; overflow: hidden;">
      <div class="container mb-8" v-reveal.once>
          <span class="text-white fw-bold fs-1">TEAM MEMBERS</span>
      </div>

      <div class="container">
          <div class="row">
              <!-- Team 1 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column align-items-center text-center text-white p-5 hover-card" v-reveal.once="0" style="max-width: 320px; width: 100%; background-color: #161616; border: 1px solid #222;">
                      <div class="zoom-img-container rounded mb-5" style="width: 100%; height: 260px; background-color: #121212; overflow: hidden;">
                          <img src="/image/no_image.png" class="img-fluid zoom-img" style="height: 100%; width: 100%; object-fit: cover;">
                      </div>
                      <span class="fw-bold fs-2 mb-2">Piriya Inkhan</span>
                      <a href="https://www.facebook.com/piriya123" class="fw-bold fs-5 text-decoration-none add-to-cart-btn" style="color: #d26527;">Front end (Web App) <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                      <span class="pt-5 text-gray-400">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, inventore.
                      </span>
                  </div>
              </div>

              <!-- Team 2 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column align-items-center text-center text-white p-5 hover-card" v-reveal.once="100" style="max-width: 320px; width: 100%; background-color: #161616; border: 1px solid #222;">
                      <div class="zoom-img-container rounded mb-5" style="width: 100%; height: 260px; background-color: #121212; overflow: hidden;">
                          <img src="/image/no_image.png" class="img-fluid zoom-img" style="height: 100%; width: 100%; object-fit: cover;">
                      </div>
                      <span class="fw-bold fs-2 mb-2">Suphawit Cherdchutum</span>
                      <a href="#" class="fw-bold fs-5 text-decoration-none add-to-cart-btn" style="color: #d26527;">Front end (Web App) <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                      <span class="pt-5 text-gray-400">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, inventore.
                      </span>
                  </div>
              </div>

              <!-- Team 3 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column align-items-center text-center text-white p-5 hover-card" v-reveal.once="200" style="max-width: 320px; width: 100%; background-color: #161616; border: 1px solid #222;">
                      <div class="zoom-img-container rounded mb-5" style="width: 100%; height: 260px; background-color: #121212; overflow: hidden;">
                          <img src="/image/no_image.png" class="img-fluid zoom-img" style="height: 100%; width: 100%; object-fit: cover;">
                      </div>
                      <span class="fw-bold fs-2 mb-2">Phoonsup Aunghuab</span>
                      <a href="#" class="fw-bold fs-5 text-decoration-none add-to-cart-btn" style="color: #d26527;">Front end (Mobile App) <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                      <span class="pt-5 text-gray-400">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, inventore.
                      </span>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Footer Section -->
  <div class="py-15 py-lg-20" style="background-color: #121212; border-top: 1px solid #222; overflow: hidden;">
      <div class="container">
          <div class="row">
              <!-- Column 1 -->
              <div class="col-12 col-md-6 col-lg-3 mb-10 mb-lg-0 text-white" v-reveal.once="0">
                  <span class="text-white fs-1 fw-bolder">FIXXY <span style="color: #d26527;">MOTORSHOP</span></span>
                  <span class="text-white pt-5 d-block text-gray-400">Every service is rigorously screened and constantly rated to ensure you get the best service.</span>
                  <div class="pt-5">
                      <span class="text-white d-block text-gray-400">Support center 24/7</span>
                      <span class="text-white fw-bolder fs-3" style="color: #d26527;">0534393242</span>
                  </div>
              </div>

              <!-- Column 2 -->
              <div class="col-12 col-md-6 col-lg-2 mb-10 mb-lg-0 text-white" v-reveal.once="100">
                  <span class="text-white fs-3 fw-bolder">ABOUT US</span>
                  <ul class="list-unstyled pt-5">
                      <li><router-link to="/about" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">ABOUT US</router-link></li>
                      <li class="pt-2"><router-link to="/about" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">OUR TEAM</router-link></li>
                      <li class="pt-2"><a href="#" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">OUR WORKS</a></li>
                      <li class="pt-2"><a href="#" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">FAQ</a></li>
                  </ul>
              </div>

              <!-- Column 3 -->
              <div class="col-12 col-md-6 col-lg-3 mb-10 mb-lg-0 text-white" v-reveal.once="200">
                  <span class="text-white fs-3 fw-bolder">POPULAR SERVICES</span>
                  <ul class="list-unstyled pt-5">
                      <li><a href="#" @click.prevent="openServiceModal('tire')" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">TIRE REPAIR</a></li>
                      <li class="pt-2"><a href="#" @click.prevent="openServiceModal('brake')" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">BRAKE REPAIR</a></li>
                      <li class="pt-2"><a href="#" @click.prevent="openServiceModal('engine')" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">ENGINE REPAIR</a></li>
                      <li class="pt-2"><a href="#" @click.prevent="openServiceModal('steering')" class="text-white text-hover-warning text-decoration-none transition-all py-1 d-inline-block">STEERING REPAIR</a></li>
                  </ul>
              </div>

              <!-- Column 4 -->
              <div class="col-12 col-md-6 col-lg-4 text-white" v-reveal.once="300">
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
</div>
</template>

<style scoped>
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
.hover-glow-subtle {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s ease;
}
.hover-glow-subtle:hover {
  box-shadow: 0 15px 45px rgba(210, 101, 39, 0.12);
}
</style>
