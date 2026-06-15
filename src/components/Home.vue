<script setup>
import { ref } from 'vue'
import Navbar from './Navbar.vue'
</script>

<template>
<div>
  <!-- Navbar / Header -->
  <Navbar />


  <!-- Hero Section -->
  <div class="py-10 py-lg-20" style="background-color: #1b1b1b;">
      <div class="container">
          <div class="row align-items-center">
              <div class="col-12 col-lg-5 d-flex flex-column mt-5 mt-lg-0">
                  <span class="text-white fs-1 fw-bolder align-items-start">MAINTENANCE & <br><span style="color: #d26527;">REPAIR SERVICE</span></span>
                  <span class="text-white mt-7">Promotors is one of the leading units specializing in providing car care equipment
                      and tools worldwide. Need to buy car
                      care tools, accessories, this will be a useful choice.</span>
                  <a href="#services" class="btn btn-light-warning font-weight-bold mt-10" style="width: 130px;">GET SERVICE</a>
              </div>

              <div class="col-12 col-lg-7 text-center mt-10 mt-lg-0">
                  <img src="/image/Mazda-RX-7-Transparent-PNG.png" class="img-fluid mx-auto" style="max-width: 900px; width: 100%; height: auto;">
              </div>
          </div>
      </div>
  </div>


  <!-- Our Services Section -->
  <div id="services" class="d-flex flex-column py-10 py-lg-20 px-5 px-lg-20" style="background-color: #121212;">
      <div class="container d-flex flex-row align-items-center justify-content-between mb-8">
          <span class="text-white fw-bold fs-1 mt-2 mb-2">OUR SERVICES</span>
          <a href="/" class="btn mt-2 me-2 mb-2 text-white" style="background-color: #d26527;">ALL SERVICE</a>
      </div>

      <div class="container">
          <div class="row">
              <!-- Card 1 -->
              <div class="col-12 col-md-6 col-lg-4 d-flex flex-column text-white p-5 mb-5">
                  <img src="/image/Icon-6b.png" style="width: 70px;">
                  <span class="fw-bold fs-5 mb-2 pt-5">BRAKE REPAIR</span>
                  <span class="mb-3 col-md-12 pt-5">
                      You get used to your brakes. Brake pads and rotors wear out from the immense friction and heat they
                      encounter. Air gets into brake lines…
                  </span>
                  <a href="#" class="text-warning fw-bold pt-5">DETAILS SERVICE</a>
              </div>

              <!-- Card 2 -->
              <div class="col-12 col-md-6 col-lg-4 d-flex flex-column text-white p-5 mb-5">
                  <img src="/image/Icon-5b.png" style="width: 70px;">
                  <span class="fw-bold fs-5 mb-2 pt-5">ENGINE REPAIR</span>
                  <span class="mb-3 col-md-12 pt-5">
                      The check engine usually indicates a need to replace one or more parts of your engine or exhaust system:
                      the oxygen sensor, catalytic converter, mass…
                  </span>
                  <a href="#" class="text-warning fw-bold pt-5">DETAILS SERVICE</a>
              </div>

              <!-- Card 3 -->
              <div class="col-12 col-md-6 col-lg-4 d-flex flex-column text-white p-5 mb-5">
                  <img src="/image/Icon-4b.png" style="width: 70px;">
                  <span class="fw-bold fs-5 mb-2 pt-5">TIRE REPAIR</span>
                  <span class="mb-3 col-md-12 pt-5">
                      You need new tires, and you have questions. What type of tire do I really need? What do terms like
                      “all-season” and “all-terrain” really mean?...
                  </span>
                  <a href="#" class="text-warning fw-bold pt-5">DETAILS SERVICE</a>
              </div>

              <!-- Card 4 -->
              <div class="col-12 col-md-6 col-lg-4 d-flex flex-column text-white p-5 mb-5">
                  <img src="/image/Icon-3b.png" style="width: 70px;">
                  <span class="fw-bold fs-5 mb-2 pt-5">COOLING SYSTEM</span>
                  <span class="mb-3 col-md-12 pt-5">
                      An overheated engine that leaves you stranded on the side of the road is a hassle. But overheating is
                      one of many signs of trouble…
                  </span>
                  <a href="#" class="text-warning fw-bold pt-5">DETAILS SERVICE</a>
              </div>

              <!-- Card 5 -->
              <div class="col-12 col-md-6 col-lg-4 d-flex flex-column text-white p-5 mb-5">
                  <img src="/image/Icon-2b.png" style="width: 70px;">
                  <span class="fw-bold fs-5 mb-2 pt-5">BATTERY REPAIR</span>
                  <span class="mb-3 col-md-12 pt-5">
                      Your vehicle just won’t start. You turn on the ignition, and all you get is the telltale clicking noise.
                      Possibly followed by competing pronouncements of…
                  </span>
                  <a href="#" class="text-warning fw-bold pt-5">DETAILS SERVICE</a>
              </div>

              <!-- Card 6 -->
              <div class="col-12 col-md-6 col-lg-4 d-flex flex-column text-white p-5 mb-5">
                  <img src="/image/Icon-1b.png" style="width: 70px;">
                  <span class="fw-bold fs-5 mb-2 pt-5">STEERING REPAIR</span>
                  <span class="mb-3 col-md-12 pt-5">
                      Your steering and suspension systems work together to keep your tires on the pavement and your vehicle
                      under control – until a power steering problem…
                  </span>
                  <a href="#" class="text-warning fw-bold pt-5">DETAILS SERVICE</a>
              </div>
          </div>
      </div>
  </div>

  <!-- Video Section -->
  <div class="d-flex flex-column align-items-center py-10 py-lg-20 px-5" style="background-color: #1b1b1b;">
      <div class="container pb-10">
          <span class="text-white fs-1 fw-bolder">MAINTENANCE & REPAIRS</span>
      </div>
      <div class="container">
          <div class="ratio ratio-16x9 mx-auto" style="max-width: 1260px;">
              <iframe src="https://www.youtube.com/embed/xBd-IWm2owY?si=F80rJUg8bQ0dYp4J" allowfullscreen></iframe>
          </div>
      </div>
  </div>

  <!-- How to Service Section -->
  <div class="py-10 py-lg-20 px-5 px-lg-20" style="background-color: #121212;">
      <div class="container mt-10">
          <div class="row">
              <!-- Left Column: Title -->
              <div class="col-12 col-lg-4 text-white mb-10 mb-lg-0 pe-lg-10">
                  <span class="fw-bolder fs-1 d-block">HOW TO SERVICE YOUR CARS</span>
                  <span class="pt-7 fs-5 d-block">Rather than letting your services go by, take these steps to keep your car in good shape until you can afford a full service.</span>
              </div>
              
              <!-- Middle Column: Steps 01 & 03 -->
              <div class="col-12 col-md-6 col-lg-4 text-white mb-10 mb-md-0 px-md-5">
                  <div class="d-flex flex-column pb-10">
                      <div class="d-flex flex-row fs-4 fw-bolder">
                          <span style="color: #d26527;">01</span>
                          <span class="ps-3">MAKE AN APPOINTMENT</span>
                      </div>
                      <div class="des_01 pt-5">
                          <span class="fs-6 text-gray-400">Promotors has made it easy to schedule an appointment online at a location
                              near you in a few simple steps, easy schedule for customers.</span>
                      </div>
                  </div>
                  <div class="d-flex flex-column">
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
                  <div class="d-flex flex-column pb-10">
                      <div class="d-flex flex-row fs-4 fw-bolder">
                          <span style="color: #d26527;">02</span>
                          <span class="ps-3">SELECT SERVICE</span>
                      </div>
                      <div class="des_02 pt-5">
                          <span class="fs-6 text-gray-400">We specialize in car services and have more than 20 years of experience in cars. We are car guys from day one. We love
                              and respect cars.</span>
                      </div>
                  </div>
                  <div class="d-flex flex-column">
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
  <div class="py-10 py-lg-20 px-5 px-lg-20" style="background-color: #121212;">
      <div class="container">
          <div class="d-flex flex-column mb-10">
              <span class="text-white fw-bolder fs-1">REQUEST AN APPOINTMENT ONLINE</span>
              <span class="text-white fs-5 pt-7">After you submit the form, a representative will call you back 
                  with the information you’ll need to make an appointment.</span>
          </div>
          
          <form action="" method="post" @submit.prevent>
              <div class="row">
                  <div class="col-12 col-md-6 d-flex flex-column pt-5 text-white fs-5">
                      <span class="pb-3" style="color: #d26527;">YOUR NAME</span>
                      <input type="text" class="form-control" placeholder="Enter Your Name">
                  </div>
                  <div class="col-12 col-md-6 d-flex flex-column pt-5 text-white fs-5">
                      <span class="pb-3" style="color: #d26527;">YOUR EMAIL</span>
                      <input type="email" class="form-control" placeholder="Enter Your Email">
                  </div>
              </div>

              <div class="row">
                  <div class="col-12 col-md-6 d-flex flex-column pt-5 text-white fs-5">
                      <span class="pb-3" style="color: #d26527;">SELECT DATE</span>
                      <input type="date" class="form-control">
                  </div>
                  <div class="col-12 col-md-6 d-flex flex-column pt-5 text-white fs-5">
                      <span class="pb-3" style="color: #d26527;">SELECT TIME</span>
                      <input type="time" class="form-control">
                  </div>
              </div>

              <div class="d-flex flex-column pt-5 text-white fs-5">
                  <span class="pb-3" style="color: #d26527;">YOUR MESSAGE</span>
                  <input type="text" class="form-control" placeholder="YOUR PROBLEM">
              </div>

              <div class="button pt-10">
                  <button type="submit" class="btn text-white" style="background-color: #d26527; width: 200px;">SEND MESSAGE</button>
              </div>
          </form>
      </div>
  </div>
</div>
</template>
