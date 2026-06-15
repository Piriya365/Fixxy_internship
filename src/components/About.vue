<script setup>
import { ref } from 'vue'
import Navbar from './Navbar.vue'
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
  <div class="py-10 py-lg-20" style="background-color: #1b1b1b;">
      <div class="container">
          <div class="row align-items-center">
              <!-- Text Column -->
              <div class="col-12 col-lg-6 d-flex flex-column mb-10 mb-lg-0 text-white">
                  <span class="fs-1 fw-bolder">WE MAKE AUTO REPAIR MORE CONVENIENT</span>
                  <span class="mt-7 fs-5">Promotors has over 1200 locations across the U.S. and Canada to provide car maintenance and car repair services wherever you are.</span>
                  
                  <div class="d-flex flex-row pt-10 pb-2 justify-content-between">
                      <span class="fs-5 fw-bolder">HIGHLY QUALIFIED EXPERTS</span>
                      <span class="fs-5 fw-bolder">90%</span>
                  </div>
                  <div class="progress">
                      <div class="progress-bar" role="progressbar" style="width: 90%; background-color: #d26527;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>

                  <div class="d-flex flex-row pt-7 pb-2 justify-content-between">
                      <span class="fs-5 fw-bolder">CLEAN, MODERN FACILITY</span>
                      <span class="fs-5 fw-bolder">99%</span>
                  </div>
                  <div class="progress">
                      <div class="progress-bar" role="progressbar" style="width: 99%; background-color: #d26527;" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>

              <!-- Image Column -->
              <div class="col-12 col-lg-6 mt-5 mt-lg-0 text-center px-lg-10">
                  <img src="/image/about-1.jpg" class="img-fluid rounded mx-auto d-block" alt="About">
              </div>
          </div>
      </div>
  </div>


  <!-- Team Member Section -->
  <div class="py-10 py-lg-20" style="background-color: #1b1b1b; border-top: 1px solid #222;">
      <div class="container mb-8">
          <span class="text-white fw-bold fs-1">TEAM MEMBERS</span>
      </div>

      <div class="container">
          <div class="row">
              <!-- Team 1 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column align-items-center text-center text-white" style="max-width: 300px; width: 100%;">
                      <img src="/image/no_image.png" class="img-fluid rounded mb-5" style="max-width: 300px; width: 100%;">
                      <span class="fw-bold fs-1 mb-2">Piriya Inkhan</span>
                      <a href="https://www.facebook.com/piriya123" class="fw-bold fs-5 text-decoration-none" style="color: #d26527;">Front end (Web App)</a>
                      <span class="pt-5 text-gray-400">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, inventore.
                      </span>
                  </div>
              </div>

              <!-- Team 2 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column align-items-center text-center text-white" style="max-width: 300px; width: 100%;">
                      <img src="/image/no_image.png" class="img-fluid rounded mb-5" style="max-width: 300px; width: 100%;">
                      <span class="fw-bold fs-1 mb-2">Suphawit Cherdchutum</span>
                      <a href="#" class="fw-bold fs-5 text-decoration-none" style="color: #d26527;">Front end (Web App)</a>
                      <span class="pt-5 text-gray-400">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, inventore.
                      </span>
                  </div>
              </div>

              <!-- Team 3 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column align-items-center text-center text-white" style="max-width: 300px; width: 100%;">
                      <img src="/image/no_image.png" class="img-fluid rounded mb-5" style="max-width: 300px; width: 100%;">
                      <span class="fw-bold fs-1 mb-2">Phoonsup Aunghuab</span>
                      <a href="#" class="fw-bold fs-5 text-decoration-none" style="color: #d26527;">Front end (Mobile App)</a>
                      <span class="pt-5 text-gray-400">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, inventore.
                      </span>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Footer Section -->
  <div class="py-15 py-lg-20" style="background-color: #121212; border-top: 1px solid #222;">
      <div class="container">
          <div class="row">
              <!-- Column 1 -->
              <div class="col-12 col-md-6 col-lg-3 mb-10 mb-lg-0 text-white">
                  <span class="text-white fs-1 fw-bolder">FIXXY <span style="color: #d26527;">MOTORSHOP</span></span>
                  <span class="text-white pt-5 d-block">Every service is rigorously screened and constantly rated to ensure you get the best service.</span>
                  <div class="pt-5">
                      <span class="text-white d-block">Support center 24/7</span>
                      <span class="text-white fw-bolder fs-3">0534393242</span>
                  </div>
              </div>

              <!-- Column 2 -->
              <div class="col-12 col-md-6 col-lg-2 mb-10 mb-lg-0 text-white">
                  <span class="text-white fs-1 fw-bolder">ABOUT US</span>
                  <ul class="list-unstyled pt-5">
                      <li><a href="" class="text-white text-hover-warning text-decoration-none">ABOUT US</a></li>
                      <li class="pt-2"><a href="" class="text-white text-hover-warning text-decoration-none">OUR TEAM</a></li>
                      <li class="pt-2"><a href="" class="text-white text-hover-warning text-decoration-none">OUR WORKS</a></li>
                      <li class="pt-2"><a href="" class="text-white text-hover-warning text-decoration-none">FAQ</a></li>
                  </ul>
              </div>

              <!-- Column 3 -->
              <div class="col-12 col-md-6 col-lg-3 mb-10 mb-lg-0 text-white">
                  <span class="text-white fs-1 fw-bolder">POPULAR SERVICES</span>
                  <ul class="list-unstyled pt-5">
                      <li><a href="" class="text-white text-hover-warning text-decoration-none">TIRE REPAIR</a></li>
                      <li class="pt-2"><a href="" class="text-white text-hover-warning text-decoration-none">BRAKE REPAIR</a></li>
                      <li class="pt-2"><a href="" class="text-white text-hover-warning text-decoration-none">ENGINE REPAIR</a></li>
                      <li class="pt-2"><a href="" class="text-white text-hover-warning text-decoration-none">STEERING REPAIR</a></li>
                  </ul>
              </div>

              <!-- Column 4 -->
              <div class="col-12 col-md-6 col-lg-4 text-white">
                  <span class="text-white fs-1 fw-bolder">SUBSCRIBE</span>
                  <span class="d-block pt-5 pb-3" style="color: #d26527;">YOUR EMAIL</span>
                  <input type="text" class="form-control mb-5" placeholder="ENTER YOUR EMAIL">
                  <div>
                      <a href="" class="btn text-white w-100 w-sm-50" style="background-color: #d26527;">SUBSCRIBE</a>
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
