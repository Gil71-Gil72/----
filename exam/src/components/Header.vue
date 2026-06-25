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
import { ref, onMounted, onUnmounted } from 'vue'
import { getStorage } from '../utils/storage'

// 计算购物车中商品总数量（所有项的 quantity 总和）
const cartCount = ref(0)
const updateCount = () => {
  const cart = getStorage().cart || []
  cartCount.value = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
}

onMounted(() => {
  updateCount()
  // 监听我们在 setStorage 里派发的事件
  window.addEventListener('shopDataChanged', updateCount)
})

// 清理监听器
onUnmounted(() => {
  window.removeEventListener('shopDataChanged', updateCount)
})
</script>