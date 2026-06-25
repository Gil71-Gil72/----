<template>
  <div class="container my-4">
    <Loading v-if="loading" />
    <div v-else>
      <!-- 若加载出错，显示页面内警告而不是 alert 弹窗 -->
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-else class="row">
        <div class="col-md-6"><img :src="info.img" class="w-100" alt="详情" /></div>
        <div class="col-md-6">
          <h3>{{ info.name }}</h3>
          <h4 class="text-danger my-3">¥{{ info.price }}</h4>
          <p>{{ info.desc }}</p>
          <button class="btn btn-danger btn-lg" @click="addCart">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Loading from '../components/Loading.vue'
import { getProductById } from '../api'
import { getStorage, setStorage } from '../utils/storage.js'

const route = useRoute()
const info = ref({})
const loading = ref(true)
const error = ref('')

onMounted(() => {
  // 仅在开发环境模拟失败，生产环境关闭（Vite 环境变量）
  const failProb = import.meta.env.DEV ? 0.3 : 0

  getProductById(route.params.id).then(res => {
    // 随机模拟加载失败（只有在 DEV 且 failProb>0 时会生效）
    if (Math.random() < failProb) {
      throw new Error('商品数据加载失败（模拟）')
    }
    info.value = res
    loading.value = false
  }).catch(err => {
    loading.value = false
    // 把错误信息显示在页面上，避免打断用户操作的 alert
    error.value = err?.message || '商品数据加载失败'
    // 同时在控制台输出真实错误以便调试
    console.error('getProductById error:', err)
  })
})

const addCart = () => {
  const data = getStorage()
  // 如果 localStorage 里没有 cart 字段也容错处理
  if (!data.cart) data.cart = []

  const exist = data.cart.find(p => p.id === info.value.id)
  if (exist) {
    // 统一使用 quantity 字段
    exist.quantity = (exist.quantity || 0) + 1
  } else {
    // 新增商品，quantity 初始值 1
    data.cart.push({ ...info.value, quantity: 1 })
  }
  setStorage(data)
  // 简单提示：如需更好的体验可替换为页面内 toast
  alert('加入购物车成功')
}
</script>