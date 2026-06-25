<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-header">
        <h4>订单详情</h4>
      </div>
      <div class="card-body" v-if="order">
        <p><strong>订单编号：</strong>{{ order.id }}</p>
        <p><strong>下单时间：</strong>{{ order.time }}</p>
        <p>
          <strong>订单状态：</strong>
          <span class="text-danger" v-if="order.status === 'pending'">待支付</span>
          <span class="text-success" v-if="order.status === 'paid'">✅ 已支付</span>
        </p>
        <hr>
        <h5>选购商品清单</h5>
        <div class="border p-2 mb-2" v-for="goods in order.items" :key="goods.id">
          <p>商品名称：{{ goods.name }}</p>
          <p>单价：¥{{ goods.price }} × 数量{{ goods.quantity }} = ¥{{ goods.price * goods.quantity }}</p>
        </div>
        <hr>
        <h4 class="text-danger">订单实付总额：¥{{ order.totalPrice }}</h4>
        <router-link to="/orders" class="btn btn-outline-secondary mt-3">返回订单列表</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getStorage } from '../utils/storage.js'

const route = useRoute()
const order = ref(null)
onMounted(() => {
  const store = getStorage()
  order.value = store.orders.find(o => o.id === route.params.id)
})
</script>