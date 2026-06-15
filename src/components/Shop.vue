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
          <a href="/main/lab_12" class="text-white fs-4 text-decoration-none">HOME</a>
          <span class="fs-4 ms-5" style="color: #d26527;">SHOP</span>
      </div>

      <div class="container pt-8">
          <span class="text-white fw-bolder" style="font-size: 48px;">SHOP</span>
      </div>
  </div>

  <!-- Products Grid -->
  <div class="py-10 py-lg-20 px-5" style="background-color: #161616;">
      <div class="container">
          <div class="row">
              <!-- Product 1 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column text-white" style="width: 300px;">
                      <div class="position-relative" style="width: 300px; height: 300px; background-color: #121212;">
                          <div class="position-absolute pt-5 ps-5" style="z-index: 2;">
                              <span class="badge badge-danger">Sale</span>
                          </div>
                          <img class="img-fluid p-15 mx-auto d-block" src="/image/product_1_1.png" alt="product_1" style="max-height: 100%; object-fit: contain;">
                      </div>
                      <span class="pt-7 fw-bolder fs-3">Shock Absorber Mounting</span>
                      <span class="pt-2 text-muted fs-5">MONSTER</span>
                      <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                          <div>
                              <del class="text-muted fw-bolder fs-5 me-2">$14.99</del>
                              <span class="text-white fw-bolder fs-4">$11.99</span>
                          </div>
                          <a href=" " class="text-white fs-5 text-decoration-none"><i class="fas fa-chevron-right me-2"></i>ADD TO CART</a>
                      </div>
                  </div>
              </div>

              <!-- Product 2 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column text-white" style="width: 300px;">
                      <div class="position-relative" style="width: 300px; height: 300px; background-color: #121212;">
                          <div class="position-absolute pt-5 ps-5" style="z-index: 2;">
                              <span class="badge badge-danger">Sale</span>
                          </div>
                          <img class="img-fluid mx-auto d-block" src="/image/product_2.png" alt="product_2" style="max-height: 100%; object-fit: contain;">
                      </div>
                      <span class="pt-7 fw-bolder fs-3">Silent Bloc Ø10-75mm</span>
                      <span class="pt-2 text-muted fs-5">WEROO</span>
                      <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                          <div>
                              <del class="text-muted fw-bolder fs-5 me-2">$49.99</del>
                              <span class="text-white fw-bolder fs-4">$19.89</span>
                          </div>
                          <a href=" " class="text-white fs-5 text-decoration-none"><i class="fas fa-chevron-right me-2"></i>ADD TO CART</a>
                      </div>
                  </div>
              </div>
              
              <!-- Product 3 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column text-white" style="width: 300px;">
                      <div class="position-relative" style="width: 300px; height: 300px; background-color: #121212;">
                          <img class="img-fluid p-4 mx-auto d-block" src="/image/product_3.png" alt="product_3" style="max-height: 100%; object-fit: contain;">
                      </div>
                      <span class="pt-7 fw-bolder fs-3">PS-3004 Oil Filter</span>
                      <span class="pt-2 text-muted fs-5">PSS</span>
                      <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                          <span class="text-white fw-bolder fs-4">$26.89</span>
                          <a href=" " class="text-white fs-5 text-decoration-none"><i class="fas fa-chevron-right me-2"></i>ADD TO CART</a>
                      </div>
                  </div>
              </div>
              
              <!-- Product 4 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column text-white" style="width: 300px;">
                      <div class="position-relative" style="width: 300px; height: 300px; background-color: #121212;">
                          <img class="img-fluid p-4 mx-auto d-block" src="/image/product_4.png" alt="product_4" style="max-height: 100%; object-fit: contain;">
                      </div>
                      <span class="pt-7 fw-bolder fs-3">Tendicatena Tension</span>
                      <span class="pt-2 text-muted fs-5">ROLLER</span>
                      <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                          <span class="text-white fw-bolder fs-4">$18.51</span>
                          <a href=" " class="text-white fs-5 text-decoration-none"><i class="fas fa-chevron-right me-2"></i>ADD TO CART</a>
                      </div>
                  </div>
              </div>
          
              <!-- Product 5 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column text-white" style="width: 300px;">
                      <div class="position-relative" style="width: 300px; height: 300px; background-color: #121212;">
                          <img class="img-fluid p-4 mx-auto d-block" src="/image/product_5.png" alt="product_5" style="max-height: 100%; object-fit: contain;">
                      </div>
                      <span class="pt-7 fw-bolder fs-3">Conical Compression Spring</span>
                      <span class="pt-2 text-muted fs-5">AUTOPARTI</span>
                      <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                          <span class="text-white fw-bolder fs-4">$49.99</span>
                          <a href=" " class="text-white fs-5 text-decoration-none"><i class="fas fa-chevron-right me-2"></i>ADD TO CART</a>
                      </div>
                  </div>
              </div>
          
              <!-- Product 6 -->
              <div class="col-12 col-md-6 col-lg-4 mb-10 d-flex justify-content-center">
                  <div class="d-flex flex-column text-white" style="width: 300px;">
                      <div class="position-relative" style="width: 300px; height: 300px; background-color: #121212;">
                          <div class="position-absolute pt-5 ps-5" style="z-index: 2;">
                              <span class="badge badge-danger">Sale</span>
                          </div>
                          <img class="img-fluid p-4 mx-auto d-block" src="/image/product_6.png" alt="product_6" style="max-height: 100%; object-fit: contain;">
                      </div>
                      <span class="pt-7 fw-bolder fs-3">Belt Auxiliary X-234890</span>
                      <span class="pt-2 text-muted fs-5">CONITECH</span>
                      <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                          <div>
                              <del class="text-muted fw-bolder fs-5 me-2">$49.99</del>
                              <span class="text-white fw-bolder fs-4">$29.99</span>
                          </div>
                          <a href=" " class="text-white fs-5 text-decoration-none"><i class="fas fa-chevron-right me-2"></i>ADD TO CART</a>
                      </div>
                  </div>
              </div>
          </div>

          <!-- Pagination -->
          <nav aria-label="Page navigation example" class="mt-10">
              <ul class="pagination align-items-center justify-content-center">
                  <li class="page-item"><a class="page-link" href="#" style="color: #d26527;">Previous</a></li>
                  <li class="page-item"><a class="page-link" href="#" style="color: #d26527;">1</a></li>
                  <li class="page-item"><a class="page-link" href="#" style="color: #d26527;">2</a></li>
                  <li class="page-item"><a class="page-link" href="#" style="color: #d26527;">3</a></li>
                  <li class="page-item"><a class="page-link" href="#" style="color: #d26527;">Next</a></li>
              </ul>
          </nav>
      </div>
  </div>

  <!-- Extra Info / Cooling System Cards -->
  <div class="py-10 py-lg-15" style="background-color: #121212; border-top: 1px solid #222;">
      <div class="container">
          <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-5">
              <div class="d-flex flex-column text-white p-5" style="background-color: #161616; width: 300px;">
                  <span class="fw-bold fs-5 mb-2 pt-5">COOLING SYSTEM</span>
                  <a href="#" class="text-warning fw-bold pt-5">DETAILS SERVICE</a>
              </div>

              <div class="d-flex flex-column text-white p-5" style="background-color: #161616; width: 300px;">
                  <span class="fw-bold fs-5 mb-2 pt-5">COOLING SYSTEM</span>
                  <a href="#" class="text-warning fw-bold pt-5">DETAILS SERVICE</a>
              </div>
          </div>
      </div>
  </div>
</div>
</template>
