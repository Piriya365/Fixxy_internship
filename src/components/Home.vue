<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './Navbar.vue'
import { currentUser } from '../auth'
import api from '../api'

const route = useRoute()
const name = ref('')
const email = ref('')
const date = ref('')
const time = ref('')
const message = ref('')
const isLoading = ref(false)

// Autofill name and email if logged in
watchEffect(() => {
  if (currentUser.value) {
    name.value = currentUser.value.displayName || ''
    email.value = currentUser.value.email || ''
  } else {
    name.value = ''
    email.value = ''
  }
})

// Fill in message if service query param is present
watchEffect(() => {
  if (route.query.service) {
    message.value = `I would like to book a "${route.query.service}" for my vehicle.`
  }
})

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
  cooling: {
    title: 'Cooling System & Radiator Service',
    icon: '/image/Icon-3b.png',
    description: 'An overheated engine can cause permanent engine block damage. The cooling system regulates engine temperature to prevent overheating.',
    symptoms: 'Dashboard temperature needle in the red, sweet smell (coolant leak), steam from under the hood, or low coolant dashboard indicator.',
    included: [
      'Radiator and pressure cap safety inspection',
      'Cooling system leak test under pressure',
      'Coolant flush & refill with premium rust-inhibiting coolant',
      'Radiator hose and thermostat checks & replacement',
      'Cooling fan operation check'
    ],
    price: '฿800 - ฿3,200',
    duration: '1 - 1.5 Hours'
  },
  battery: {
    title: 'Battery & Electrical System Repair',
    icon: '/image/Icon-2b.png',
    description: 'Batteries store the electrical power needed to start your engine and run electronic accessories like headlights, screens, and radio.',
    symptoms: 'Slow engine crank, dim headlights, battery warning light on dashboard, corrosion on battery terminals, or battery older than 3 years.',
    included: [
      'Battery load capacity and voltage testing',
      'Alternator output checks & starter motor inspection',
      'Corrosive deposit cleaning from battery terminals & connectors',
      'New battery installation with warranty',
      'Electrical system check for parasitic drain'
    ],
    price: '฿2,200 - ฿4,500 (includes battery unit)',
    duration: '20 - 40 Minutes'
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
  message.value = `I would like to book a "${serviceTitle}" for my vehicle.`
  closeServiceModal()
  
  // Smooth scroll to the appointment form
  const formElement = document.getElementById('appointment-form')
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' })
  }
}

const submitAppointment = async () => {
  if (!currentUser.value) {
    alert('Please log in to request an appointment.')
    return
  }

  if (!name.value || !email.value || !date.value || !time.value) {
    alert('Please fill out all required fields (Name, Email, Date, and Time).')
    return
  }

  isLoading.value = true
  try {
    const appointmentData = {
      customerName: name.value,
      date: date.value,
      time: time.value,
      message: message.value
    }

    await api.post('/appointments', appointmentData)
    
    alert('Your appointment request has been submitted successfully! We will contact you soon.')
    
    // Reset Form (except profile info)
    date.value = ''
    time.value = ''
    message.value = ''
  } catch (error) {
    console.error('Error submitting appointment:', error)
    alert('Could not submit appointment: ' + error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
<div>
  <!-- Navbar / Header -->
  <Navbar />


  <!-- Hero Section -->
  <div class="py-10 py-lg-20" style="background-color: #1b1b1b; overflow: hidden;">
      <div class="container">
          <div class="row align-items-center">
              <div class="col-12 col-lg-5 d-flex flex-column mt-5 mt-lg-0" v-reveal.left.once>
                  <span class="text-white fs-1 fw-bolder align-items-start">MAINTENANCE & <br><span style="color: #d26527;">REPAIR SERVICE</span></span>
                  <span class="text-white mt-7">Promotors is one of the leading units specializing in providing car care equipment
                      and tools worldwide. Need to buy car
                      care tools, accessories, this will be a useful choice.</span>
                  <a href="#services" class="btn btn-light-warning font-weight-bold mt-10 hover-glow" style="width: 130px;">GET SERVICE</a>
              </div>

              <div class="col-12 col-lg-7 text-center mt-10 mt-lg-0" v-reveal.right.once>
                  <img src="/image/Mazda-RX-7-Transparent-PNG.png" class="img-fluid mx-auto" style="max-width: 900px; width: 100%; height: auto;">
              </div>
          </div>
      </div>
  </div>


  <!-- Our Services Section -->
  <div id="services" class="d-flex flex-column py-10 py-lg-20 px-5 px-lg-20" style="background-color: #121212;">
      <div class="container d-flex flex-row align-items-center justify-content-between mb-8" v-reveal.once>
          <span class="text-white fw-bold fs-1 mt-2 mb-2">OUR SERVICES</span>
          <button class="btn mt-2 me-2 mb-2 text-white hover-glow" style="background-color: #d26527;">ALL SERVICE</button>
      </div>

      <div class="container">
          <div class="row">
              <!-- Card 1 -->
              <div class="col-12 col-md-6 col-lg-4 p-3 mb-3">
                  <div class="d-flex flex-column text-white p-5 h-100 hover-card" v-reveal.once="0" style="background-color: #161616; border: 1px solid #222;">
                      <img src="/image/Icon-6b.png" style="width: 70px;" class="transition-all service-icon">
                      <span class="fw-bold fs-5 mb-2 pt-5">BRAKE REPAIR</span>
                      <span class="mb-3 col-md-12 pt-5 text-gray-400">
                          You get used to your brakes. Brake pads and rotors wear out from the immense friction and heat they
                          encounter. Air gets into brake lines…
                      </span>
                      <a href="#" @click.prevent="openServiceModal('brake')" class="text-warning fw-bold pt-5 add-to-cart-btn text-decoration-none">DETAILS SERVICE <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                  </div>
              </div>

              <!-- Card 2 -->
              <div class="col-12 col-md-6 col-lg-4 p-3 mb-3">
                  <div class="d-flex flex-column text-white p-5 h-100 hover-card" v-reveal.once="100" style="background-color: #161616; border: 1px solid #222;">
                      <img src="/image/Icon-5b.png" style="width: 70px;" class="transition-all service-icon">
                      <span class="fw-bold fs-5 mb-2 pt-5">ENGINE REPAIR</span>
                      <span class="mb-3 col-md-12 pt-5 text-gray-400">
                          The check engine usually indicates a need to replace one or more parts of your engine or exhaust system:
                          the oxygen sensor, catalytic converter, mass…
                      </span>
                      <a href="#" @click.prevent="openServiceModal('engine')" class="text-warning fw-bold pt-5 add-to-cart-btn text-decoration-none">DETAILS SERVICE <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                  </div>
              </div>

              <!-- Card 3 -->
              <div class="col-12 col-md-6 col-lg-4 p-3 mb-3">
                  <div class="d-flex flex-column text-white p-5 h-100 hover-card" v-reveal.once="200" style="background-color: #161616; border: 1px solid #222;">
                      <img src="/image/Icon-4b.png" style="width: 70px;" class="transition-all service-icon">
                      <span class="fw-bold fs-5 mb-2 pt-5">TIRE REPAIR</span>
                      <span class="mb-3 col-md-12 pt-5 text-gray-400">
                          You need new tires, and you have questions. What type of tire do I really need? What do terms like
                          “all-season” and “all-terrain” really mean?...
                      </span>
                      <a href="#" @click.prevent="openServiceModal('tire')" class="text-warning fw-bold pt-5 add-to-cart-btn text-decoration-none">DETAILS SERVICE <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                  </div>
              </div>

              <!-- Card 4 -->
              <div class="col-12 col-md-6 col-lg-4 p-3 mb-3">
                  <div class="d-flex flex-column text-white p-5 h-100 hover-card" v-reveal.once="0" style="background-color: #161616; border: 1px solid #222;">
                      <img src="/image/Icon-3b.png" style="width: 70px;" class="transition-all service-icon">
                      <span class="fw-bold fs-5 mb-2 pt-5">COOLING SYSTEM</span>
                      <span class="mb-3 col-md-12 pt-5 text-gray-400">
                          An overheated engine that leaves you stranded on the side of the road is a hassle. But overheating is
                          one of many signs of trouble…
                      </span>
                      <a href="#" @click.prevent="openServiceModal('cooling')" class="text-warning fw-bold pt-5 add-to-cart-btn text-decoration-none">DETAILS SERVICE <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                  </div>
              </div>

              <!-- Card 5 -->
              <div class="col-12 col-md-6 col-lg-4 p-3 mb-3">
                  <div class="d-flex flex-column text-white p-5 h-100 hover-card" v-reveal.once="100" style="background-color: #161616; border: 1px solid #222;">
                      <img src="/image/Icon-2b.png" style="width: 70px;" class="transition-all service-icon">
                      <span class="fw-bold fs-5 mb-2 pt-5">BATTERY REPAIR</span>
                      <span class="mb-3 col-md-12 pt-5 text-gray-400">
                          Your vehicle just won’t start. You turn on the ignition, and all you get is the telltale clicking noise.
                          Possibly followed by competing pronouncements of…
                      </span>
                      <a href="#" @click.prevent="openServiceModal('battery')" class="text-warning fw-bold pt-5 add-to-cart-btn text-decoration-none">DETAILS SERVICE <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                  </div>
              </div>

              <!-- Card 6 -->
              <div class="col-12 col-md-6 col-lg-4 p-3 mb-3">
                  <div class="d-flex flex-column text-white p-5 h-100 hover-card" v-reveal.once="200" style="background-color: #161616; border: 1px solid #222;">
                      <img src="/image/Icon-1b.png" style="width: 70px;" class="transition-all service-icon">
                      <span class="fw-bold fs-5 mb-2 pt-5">STEERING REPAIR</span>
                      <span class="mb-3 col-md-12 pt-5 text-gray-400">
                          Your steering and suspension systems work together to keep your tires on the pavement and your vehicle
                          under control – until a power steering problem…
                      </span>
                      <a href="#" @click.prevent="openServiceModal('steering')" class="text-warning fw-bold pt-5 add-to-cart-btn text-decoration-none">DETAILS SERVICE <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Video Section -->
  <div class="d-flex flex-column align-items-center py-10 py-lg-20 px-5" style="background-color: #1b1b1b; overflow: hidden;">
      <div class="container pb-10" v-reveal.once>
          <span class="text-white fs-1 fw-bolder">MAINTENANCE & REPAIRS</span>
      </div>
      <div class="container" v-reveal.once="150">
          <div class="ratio ratio-16x9 mx-auto" style="max-width: 1260px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-radius: 8px; overflow: hidden;">
              <iframe src="https://www.youtube.com/embed/xBd-IWm2owY?si=F80rJUg8bQ0dYp4J" allowfullscreen></iframe>
          </div>
      </div>
  </div>

  <!-- How to Service Section -->
  <div class="py-10 py-lg-20 px-5 px-lg-20" style="background-color: #121212; overflow: hidden;">
      <div class="container mt-10">
          <div class="row">
              <!-- Left Column: Title -->
              <div class="col-12 col-lg-4 text-white mb-10 mb-lg-0 pe-lg-10" v-reveal.left.once>
                  <span class="fw-bolder fs-1 d-block">HOW TO SERVICE YOUR CARS</span>
                  <span class="pt-7 fs-5 d-block text-gray-400">Rather than letting your services go by, take these steps to keep your car in good shape until you can afford a full service.</span>
              </div>
              
              <!-- Middle Column: Steps 01 & 03 -->
              <div class="col-12 col-md-6 col-lg-4 text-white mb-10 mb-md-0 px-md-5">
                  <div class="d-flex flex-column pb-10" v-reveal.once="100">
                      <div class="d-flex flex-row fs-4 fw-bolder">
                          <span style="color: #d26527;">01</span>
                          <span class="ps-3">MAKE AN APPOINTMENT</span>
                      </div>
                      <div class="des_01 pt-5">
                          <span class="fs-6 text-gray-400">Promotors has made it easy to schedule an appointment online at a location
                              near you in a few simple steps, easy schedule for customers.</span>
                      </div>
                  </div>
                  <div class="d-flex flex-column" v-reveal.once="300">
                      <div class="d-flex flex-row fs-4 fw-bolder">
                          <span style="color: #d26527;">03</span>
                          <span class="ps-3">CONFIRM REQUEST</span>
                      </div>
                      <div class="des_03 pt-5">
                          <span class="fs-6 text-gray-400">Has your request been confirmed?
                              Reduce no-shows, save time, and focus on serving clients is our top criterion.</span>
                      </div>
                  </div>
              </div>
              
              <!-- Right Column: Steps 02 & 04 -->
              <div class="col-12 col-md-6 col-lg-4 text-white px-md-5">
                  <div class="d-flex flex-column pb-10" v-reveal.once="200">
                      <div class="d-flex flex-row fs-4 fw-bolder">
                          <span style="color: #d26527;">02</span>
                          <span class="ps-3">SELECT SERVICE</span>
                      </div>
                      <div class="des_02 pt-5">
                          <span class="fs-6 text-gray-400">We specialize in car services and have more than 20 years of experience in cars. We are car guys from day one. We love
                              and respect cars.</span>
                      </div>
                  </div>
                  <div class="d-flex flex-column" v-reveal.once="400">
                      <div class="d-flex flex-row fs-4 fw-bolder">
                          <span style="color: #d26527;">04</span>
                          <span class="ps-3">GET YOUR CAR</span>
                      </div>
                      <div class="des_04 pt-5">
                          <span class="fs-6 text-gray-400">It is a vehicle inspection that keeps your car in a reliable, safe and fully-functioning condition based on guidelines
                              set out by the vehicle.</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Request Appointment Form -->
  <div id="appointment-form" class="py-10 py-lg-20 px-5 px-lg-20" style="background-color: #121212; border-top: 1px solid #1c1c1c; overflow: hidden;">
      <div class="container" v-reveal.once>
          <div class="d-flex flex-column mb-10">
              <span class="text-white fw-bolder fs-1">REQUEST AN APPOINTMENT ONLINE</span>
              <span class="text-white fs-5 pt-7 text-gray-400">After you submit the form, a representative will call you back 
                  with the information you’ll need to make an appointment.</span>
          </div>
          
          <form v-if="currentUser" action="" method="post" @submit.prevent="submitAppointment">
              <div class="row" v-reveal.once="100">
                  <div class="col-12 col-md-6 d-flex flex-column pt-5 text-white fs-5">
                      <span class="pb-3" style="color: #d26527;">YOUR NAME</span>
                      <input type="text" v-model="name" class="form-control bg-dark border-secondary text-white" placeholder="Enter Your Name" required>
                  </div>
                  <div class="col-12 col-md-6 d-flex flex-column pt-5 text-white fs-5">
                      <span class="pb-3" style="color: #d26527;">YOUR EMAIL</span>
                      <input type="email" v-model="email" class="form-control bg-dark border-secondary text-white" placeholder="Enter Your Email" required>
                  </div>
              </div>

              <div class="row" v-reveal.once="200">
                  <div class="col-12 col-md-6 d-flex flex-column pt-5 text-white fs-5">
                      <span class="pb-3" style="color: #d26527;">SELECT DATE</span>
                      <input type="date" v-model="date" class="form-control bg-dark border-secondary text-white" required>
                  </div>
                  <div class="col-12 col-md-6 d-flex flex-column pt-5 text-white fs-5">
                      <span class="pb-3" style="color: #d26527;">SELECT TIME</span>
                      <input type="time" v-model="time" class="form-control bg-dark border-secondary text-white" required>
                  </div>
              </div>

              <div class="d-flex flex-column pt-5 text-white fs-5" v-reveal.once="300">
                  <span class="pb-3" style="color: #d26527;">YOUR MESSAGE</span>
                  <input type="text" v-model="message" class="form-control bg-dark border-secondary text-white" placeholder="YOUR PROBLEM">
              </div>

              <div class="button pt-10" v-reveal.once="400">
                  <button type="submit" class="btn text-white hover-glow" style="background-color: #d26527; width: 200px;" :disabled="isLoading">
                      <span v-if="isLoading">SENDING...</span>
                      <span v-else>SEND MESSAGE</span>
                  </button>
              </div>
          </form>

          <!-- Locked PlaceHolder -->
          <div v-else class="d-flex flex-column align-items-center justify-content-center py-12 px-5 text-center rounded hover-glow-subtle" v-reveal.once="100" style="background-color: #161616; border: 1px solid #222; min-height: 250px;">
              <i class="fas fa-lock mb-5" style="font-size: 40px; color: #d26527;"></i>
              <h3 class="fw-bold text-white mb-2" style="letter-spacing: 1px;">APPOINTMENT SCHEDULER LOCKED</h3>
              <p class="text-muted mb-6" style="max-width: 440px;">Please login to your account to submit appointment requests and track your service tickets.</p>
              <router-link to="/login" class="btn text-white px-8 py-3 fw-bold hover-glow" style="background-color: #d26527; font-size: 16px;">LOGIN TO UNLOCK</router-link>
          </div>
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
