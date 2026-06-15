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
          <span class="fs-4 ms-5" style="color: #d26527;">SHOP</span>
      </div>

      <div class="container pt-8">
          <span class="text-white fw-bolder" style="font-size: 48px;">CART</span>
      </div>
  </div>

  <!-- Empty Cart Section -->
  <div class="d-flex flex-column align-items-center justify-content-center py-20 px-5 w-100" style="background-color: #161616; min-height: 350px;">
      <div class="d-flex flex-column align-items-center justify-content-center bg-white" style="height: 100px; width: 100px; border-radius: 50%;">
          <i class="bi bi-cart" style="font-size: 30px; color: #d26527;"></i>
      </div>
      <span class="text-white fs-4 pt-6 text-center">Your cart is currently empty.</span>
      <router-link to="/shop" class="btn btn-light-warning font-weight-bold mt-10" style="width: 200px;">RETURN TO SHOP</router-link>
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
