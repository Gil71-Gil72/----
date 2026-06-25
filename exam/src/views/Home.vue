<template>
  <div class="container my-4">
    <h2 class="text-center mb-4">短袖商城 — 精选商品</h2>

    <Loading v-if="loading" />

    <!-- 3×3九宫格布局：col-md-4 一行3个 -->
    <div class="row mt-3" v-else>
      <div class="col-md-4 mb-4" v-for="item in list" :key="item.id">
        <div class="card h-100 text-center">
          <img :src="item.img" class="card-img-top" alt="短袖">
          <div class="card-body">
            <h6>{{ item.name }}</h6>
            <p class="text-danger">¥{{ item.price }}</p>
            <router-link :to="`/product/${item.id}`" class="btn btn-sm btn-primary">
              立即选购
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="text-danger text-center" v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Loading from '../components/Loading.vue'
import { getProducts } from '../api'

const list = ref([])
const loading = ref(true)
const error = ref('')

onMounted(() => {
  getProducts().then(res => {
    list.value = res
    loading.value = false
  }).catch(err => {
    error.value = err.message
    loading.value = false
  })
})
</script>