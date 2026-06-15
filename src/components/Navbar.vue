<script setup>
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark py-5" style="background-color: #1b1b1b;">
      <div class="container border-bottom pb-5">
          <router-link to="/" class="d-flex align-items-center fs-1 fw-bolder text-decoration-none" style="color: #d26527;">
              <img src="/image/Service-Grid-3.png" style="height: 40px;" class="me-3" alt="Logo">
              FIXXY <span class="ps-3 fs-3 text-white fw-bold">MOTORSERVICE</span>
          </router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-lg-between" id="navbarNav">
              <ul class="navbar-nav mx-auto mb-2 mb-lg-0 mt-3 mt-lg-0">
                  <li class="nav-item">
                      <router-link to="/" class="nav-link px-3 text-white" exact-active-class="text-warning">Home</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/shop" class="nav-link px-3 text-white" exact-active-class="text-warning">Shop</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/cart" class="nav-link px-3 text-white" exact-active-class="text-warning">Cart</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/about" class="nav-link px-3 text-white" exact-active-class="text-warning">About</router-link>
                  </li>
              </ul>
              <div class="d-flex align-items-center mt-3 mt-lg-0">
                  <button type="button" class="btn btn-outline-primary me-2">Login</button>
                  <button type="button" class="btn text-white" style="background-color: #d26527;">Sign-up</button>
              </div>
          </div>
      </div>
  </nav>
</template>

<style scoped>
</style>
