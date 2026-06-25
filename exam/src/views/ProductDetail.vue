<template>
  <div class="container my-4">
    <Loading v-if="loading" />
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Loading from '../components/Loading.vue'
import { getProductById } from '../api'
import { getStorage, setStorage } from '../utils/storage'

const route = useRoute()
const info = ref({})
const loading = ref(true)

onMounted(() => {
  // 可自行修改失败概率 0~1，0.3代表30%概率加载失败
  const failProb = 0.3
  getProductById(route.params.id).then(res => {
    // 随机模拟加载失败
    if(Math.random() < failProb){
      throw new Error('商品数据加载失败')
    }
    info.value = res
    loading.value = false
  }).catch(err=>{
    loading.value = false
    alert(err.message)
  })
})

const addCart = () => {
  const data = getStorage()
  const exist = data.cart.find(p => p.id === info.value.id)
  if (exist) {
    // 统一quantity，不再用count
    exist.quantity += 1
  } else {
    // 新增商品，quantity初始值1
    data.cart.push({ ...info.value, quantity: 1 })
  }
  setStorage(data)
  alert('加入购物车成功')
}
</script>