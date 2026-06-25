<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">短袖商城</router-link>
      <div class="navbar-nav">
        <router-link class="nav-link" to="/">首页</router-link>
        <router-link class="nav-link" to="/products">全部商品</router-link>
        <router-link class="nav-link" to="/cart">
          购物车 <span class="badge badge-light">{{ cartCount }}</span>
        </router-link>
        <router-link class="nav-link" to="/orders">我的订单</router-link>
        <router-link class="nav-link" to="/about">关于我们</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { getStorage } from '../utils/storage'
const cartCount = computed(() => getStorage().cart.length || 0)
</script>