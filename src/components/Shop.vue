<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'
import { addToCart } from '../cartState'
import { currentUser, getUserRole } from '../auth'
import api from '../api'

const router = useRouter()

const productsList = ref([])
const isLoading = ref(true)
const isAdmin = ref(false)

// Form Modal Fields
const showFormModal = ref(false)
const isEditing = ref(false)
const currentProductId = ref(null)

const productName = ref('')
const productBrand = ref('')
const productPrice = ref(0)
const productOriginalPrice = ref(null)
const productImage = ref('')
const productDescription = ref('')
const productIsSale = ref(false)

// Image attachment options
const imageMethod = ref('upload') // 'upload' or 'url'
const uploadProgress = ref(false)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploadProgress.value = true

  const reader = new FileReader()
  reader.onload = (e) => {
    productImage.value = e.target.result
    uploadProgress.value = false
  }
  reader.onerror = (err) => {
    console.error('FileReader error:', err)
    uploadProgress.value = false
  }
  reader.readAsDataURL(file)
}

// Check dynamic Admin role on current logged-in user changes
watchEffect(async () => {
  if (currentUser.value) {
    const role = await getUserRole(currentUser.value)
    isAdmin.value = role === 'admin'
  } else {
    isAdmin.value = false
  }
})

const fetchProducts = async () => {
  isLoading.value = true
  try {
    productsList.value = await api.get('/products')
  } catch (error) {
    console.error('Error fetching products from API:', error)
    productsList.value = []
  } finally {
    isLoading.value = false
  }
}

const openAddModal = () => {
  isEditing.value = false
  currentProductId.value = null
  productName.value = ''
  productBrand.value = ''
  productPrice.value = 0
  productOriginalPrice.value = null
  productImage.value = ''
  productDescription.value = ''
  productIsSale.value = false
  showFormModal.value = true
}

const openEditModal = (product) => {
  isEditing.value = true
  currentProductId.value = product.id
  productName.value = product.name || ''
  productBrand.value = product.brand || ''
  productPrice.value = Number(product.price) || 0
  productOriginalPrice.value = product.originalPrice ? Number(product.originalPrice) : null
  productImage.value = product.image || ''
  productDescription.value = product.description || ''
  productIsSale.value = !!product.isSale
  showFormModal.value = true
}

const saveProduct = async () => {
  if (!productName.value || !productBrand.value || productPrice.value <= 0) {
    alert('Please fill out Name, Brand, and a valid Price.')
    return
  }

  const productData = {
    name: productName.value,
    brand: productBrand.value,
    price: Number(productPrice.value),
    originalPrice: productOriginalPrice.value ? Number(productOriginalPrice.value) : null,
    image: productImage.value || '/image/Mazda-RX-7-Transparent-PNG.png',
    description: productDescription.value,
    isSale: productIsSale.value
  }

  try {
    if (isEditing.value) {
      await api.put(`/products/${currentProductId.value}`, productData)
    } else {
      await api.post('/products', productData)
    }
    showFormModal.value = false
    await fetchProducts()
  } catch (error) {
    console.error('Error saving product:', error)
    alert('Failed to save product: ' + error.message)
  }
}

const deleteProduct = async (productId) => {
  if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    return
  }

  try {
    await api.delete(`/products/${productId}`)
    await fetchProducts()
  } catch (error) {
    console.error('Error deleting product:', error)
    alert('Failed to delete product: ' + error.message)
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
  closeServiceModal()
  router.push({ path: '/', hash: '#appointment-form', query: { service: serviceTitle } })
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
<div>
  <!-- Navbar / Header -->
  <Navbar />


  <!-- Banner Section -->
  <div class="d-flex flex-column w-100 py-15 py-lg-20"
      style="background-image: url(/image/FIXXY_SHOP.png); background-size: cover; background-position: center; min-height: 200px;">
      <div class="container d-flex flex-row pt-5">
          <a href="/main/lab_12" class="text-white fs-4 text-decoration-none">HOME</a>
          <span class="fs-4 ms-5" style="color: #d26527;">SHOP</span>
      </div>

      <div class="container pt-8">
          <span class="text-white fw-bolder" style="font-size: 48px;">SHOP</span>
      </div>
  </div>

  <!-- Products Grid -->
  <div class="py-10 py-lg-20 px-5" style="background-color: #161616; overflow: hidden;">
      <div class="container">
          <!-- Admin Tools -->
          <div v-if="isAdmin" class="d-flex justify-content-end mb-6">
              <button @click="openAddModal" class="btn text-white px-5 py-2 fw-bold hover-glow" style="background-color: #d26527; font-size: 14px;">
                  <i class="fas fa-plus me-2"></i>ADD NEW PRODUCT
              </button>
          </div>

          <div class="row">
              <!-- Dynamic Products List -->
              <div v-for="(product, index) in productsList" :key="product.id" class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column text-white p-4 hover-card" v-reveal.once="(index % 3) * 100" style="width: 310px; background-color: #1a1a1a; border: 1px solid #252525;">
                      <div class="position-relative zoom-img-container" style="width: 100%; height: 270px; background-color: #121212; border-radius: 6px;">
                          <div v-if="product.isSale" class="position-absolute pt-4 ps-4" style="z-index: 2;">
                              <span class="badge badge-danger bg-danger">Sale</span>
                          </div>
                          <img class="img-fluid p-4 mx-auto d-block zoom-img" :src="product.imageFull || product.image" :alt="product.name" style="height: 100%; width: 100%; object-fit: contain;">
                      </div>
                      <span class="pt-5 fw-bolder fs-3 text-truncate w-100" :title="product.name">{{ product.name }}</span>
                      <span class="pt-2 text-muted fs-5">{{ product.brand }}</span>
                      <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                          <div>
                              <del v-if="product.originalPrice" class="text-muted fw-bolder fs-5 me-2">฿{{ product.originalPrice }}</del>
                              <span class="text-white fw-bolder fs-4">฿{{ product.price }}</span>
                          </div>
                          <a href="#" @click.prevent="addToCart(product)" class="text-white fs-5 text-decoration-none add-to-cart-btn">ADD TO CART <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
                      </div>

                      <!-- Admin Product Controls -->
                      <div v-if="isAdmin" class="d-flex justify-content-between mt-4 pt-3 border-top border-secondary" style="border-color: #252525 !important;">
                          <button @click.prevent="openEditModal(product)" class="btn btn-sm btn-outline-light px-3 py-1 hover-glow" style="border-color: #333; font-size: 13px;">
                              <i class="far fa-edit me-1"></i>Edit
                          </button>
                          <button @click.prevent="deleteProduct(product.id)" class="btn btn-sm btn-outline-danger px-3 py-1 hover-glow" style="font-size: 13px;">
                              <i class="far fa-trash-alt me-1"></i>Delete
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          <!-- Pagination -->
          <nav aria-label="Page navigation example" class="mt-10" v-reveal.once>
              <ul class="pagination align-items-center justify-content-center">
                  <li class="page-item"><a class="page-link bg-dark border-secondary" href="#" style="color: #d26527;">Previous</a></li>
                  <li class="page-item"><a class="page-link bg-dark border-secondary" href="#" style="color: #d26527;">1</a></li>
                  <li class="page-item"><a class="page-link bg-dark border-secondary" href="#" style="color: #d26527;">2</a></li>
                  <li class="page-item"><a class="page-link bg-dark border-secondary" href="#" style="color: #d26527;">3</a></li>
                  <li class="page-item"><a class="page-link bg-dark border-secondary" href="#" style="color: #d26527;">Next</a></li>
              </ul>
          </nav>
      </div>
  </div>

  <!-- Our Services Section -->
  <div id="services" class="d-flex flex-column py-10 py-lg-20 px-5 px-lg-20" style="background-color: #121212; border-top: 1px solid #222;">
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

  <!-- Add/Edit Product Modal Overlay -->
  <div v-if="showFormModal" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-5" style="z-index: 9999; background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(6px);" @click.self="showFormModal = false">
      <div class="card p-6 p-md-8 text-white border-secondary hover-glow-subtle modal-content-anim position-relative" style="background-color: #1a1a1a; max-width: 550px; width: 100%; border: 1px solid #282828; border-radius: 12px;">
          <!-- Close button -->
          <button @click="showFormModal = false" type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-5" aria-label="Close"></button>

          <h3 class="fw-bold text-white mb-6" style="letter-spacing: 0.5px;">
              {{ isEditing ? 'EDIT PRODUCT DETAILS' : 'ADD NEW PRODUCT' }}
          </h3>

          <form @submit.prevent="saveProduct">
              <!-- Product Name -->
              <div class="d-flex flex-column mb-4">
                  <span class="pb-2 fw-bold text-muted" style="font-size: 11px; letter-spacing: 1px;">PRODUCT NAME *</span>
                  <input type="text" v-model="productName" class="form-control bg-dark border-secondary text-white py-2 px-3" placeholder="e.g. Brembo Brake Pad" required>
              </div>

              <!-- Brand -->
              <div class="d-flex flex-column mb-4">
                  <span class="pb-2 fw-bold text-muted" style="font-size: 11px; letter-spacing: 1px;">BRAND *</span>
                  <input type="text" v-model="productBrand" class="form-control bg-dark border-secondary text-white py-2 px-3" placeholder="e.g. BREMBO" required>
              </div>

              <!-- Price -->
              <div class="d-flex flex-column mb-4">
                  <span class="pb-2 fw-bold text-muted" style="font-size: 11px; letter-spacing: 1px;">PRICE (฿) *</span>
                  <input type="number" v-model="productPrice" class="form-control bg-dark border-secondary text-white py-2 px-3" placeholder="Price in Baht" min="1" required>
              </div>

              <!-- Original Price -->
              <div class="d-flex flex-column mb-4">
                  <span class="pb-2 fw-bold text-muted" style="font-size: 11px; letter-spacing: 1px;">ORIGINAL PRICE (฿) (OPTIONAL)</span>
                  <input type="number" v-model="productOriginalPrice" class="form-control bg-dark border-secondary text-white py-2 px-3" placeholder="Original price if on sale" min="1">
              </div>

              <!-- Product Image (Upload File or Paste URL) -->
              <div class="d-flex flex-column mb-4">
                  <span class="pb-2 fw-bold text-muted" style="font-size: 11px; letter-spacing: 1px;">PRODUCT IMAGE *</span>
                  
                  <!-- Toggle Tab buttons -->
                  <div class="d-flex mb-3">
                      <button type="button" 
                              @click="imageMethod = 'upload'" 
                              class="btn btn-sm py-1 px-4 fw-bold me-2" 
                              style="font-size: 11px; border-radius: 4px; border: 1px solid #333;"
                              :class="imageMethod === 'upload' ? 'btn-warning text-dark' : 'btn-dark text-muted'">
                          UPLOAD IMAGE
                      </button>
                      <button type="button" 
                              @click="imageMethod = 'url'" 
                              class="btn btn-sm py-1 px-4 fw-bold" 
                              style="font-size: 11px; border-radius: 4px; border: 1px solid #333;"
                              :class="imageMethod === 'url' ? 'btn-warning text-dark' : 'btn-dark text-muted'">
                          PASTE IMAGE URL
                      </button>
                  </div>

                  <!-- Upload Image Mode -->
                  <div v-if="imageMethod === 'upload'">
                      <input type="file" @change="handleImageUpload" accept="image/*" class="form-control bg-dark border-secondary text-white py-2 px-3">
                      <div v-if="uploadProgress" class="mt-2 text-warning" style="font-size: 12px;">
                          <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                          Attaching photo...
                      </div>
                      <div v-else-if="productImage" class="mt-3 d-flex align-items-center bg-dark p-2 rounded border border-secondary" style="border-color: #252525 !important;">
                          <div class="bg-black p-1 rounded me-3 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border: 1px solid #333;">
                              <img :src="productImage" style="max-width: 100%; max-height: 100%; object-fit: contain;" alt="Attached preview">
                          </div>
                          <div>
                              <span class="text-success d-block fw-bold" style="font-size: 12px;"><i class="fas fa-check-circle me-1"></i>Attached successfully</span>
                              <span class="text-muted" style="font-size: 10px;">Ready to save</span>
                          </div>
                      </div>
                  </div>

                  <!-- Paste URL Mode -->
                  <div v-else>
                      <input type="text" v-model="productImage" class="form-control bg-dark border-secondary text-white py-2 px-3" placeholder="e.g. /image/part.png or web URL">
                      <div v-if="productImage" class="mt-3 d-flex align-items-center bg-dark p-2 rounded border border-secondary" style="border-color: #252525 !important;">
                          <div class="bg-black p-1 rounded me-3 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border: 1px solid #333;">
                              <img :src="productImage" style="max-width: 100%; max-height: 100%; object-fit: contain;" alt="URL preview" @error="$event.target.src='/image/Mazda-RX-7-Transparent-PNG.png'">
                          </div>
                          <div>
                              <span class="text-white d-block fw-bold" style="font-size: 12px;">URL Attached</span>
                              <span class="text-muted text-truncate d-block" style="font-size: 10px; max-width: 200px;">{{ productImage }}</span>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- On Sale Status -->
              <div class="d-flex align-items-center mb-5">
                  <input type="checkbox" id="productIsSale" v-model="productIsSale" class="form-check-input bg-dark border-secondary me-3" style="width: 20px; height: 20px;">
                  <label for="productIsSale" class="fw-bold text-muted" style="font-size: 13px; cursor: pointer; user-select: none;">ON SALE (ติดป้ายลดราคา)</label>
              </div>

              <!-- Description -->
              <div class="d-flex flex-column mb-6">
                  <span class="pb-2 fw-bold text-muted" style="font-size: 11px; letter-spacing: 1px;">DESCRIPTION</span>
                  <textarea v-model="productDescription" rows="3" class="form-control bg-dark border-secondary text-white py-2 px-3" placeholder="Product details/specifications"></textarea>
              </div>

              <div class="mt-8 d-flex justify-content-end">
                  <button @click="showFormModal = false" type="button" class="btn btn-outline-light me-4 px-6 py-2 fw-bold" style="border-color: #333; font-size: 14px;">CANCEL</button>
                  <button type="submit" class="btn text-white px-8 py-2 fw-bold hover-glow" style="background-color: #d26527; font-size: 14px;">SAVE PRODUCT</button>
              </div>
          </form>
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
.form-control:focus {
  border-color: #d26527 !important;
  box-shadow: 0 0 0 0.15rem rgba(210, 101, 39, 0.25) !important;
}
.form-check-input:checked {
  background-color: #d26527 !important;
  border-color: #d26527 !important;
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
.hover-glow-subtle {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s ease;
}
.hover-glow-subtle:hover {
  box-shadow: 0 15px 45px rgba(210, 101, 39, 0.12);
}
</style>
