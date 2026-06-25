<template>
  <div class="container my-4">
    <h3>我的全部订单</h3>
    <div v-if="orders.length === 0" class="alert alert-info mt-3">暂无任何订单</div>
    <div class="list-group mt-3" v-else>
      <div class="list-group-item" v-for="order in orders" :key="order.id">
        <p><strong>订单编号：</strong>{{ order.id }}</p>
        <p><strong>订单总金额：</strong>¥{{ order.totalPrice }}</p>
        <p>
          <strong>订单状态：</strong>
          <span class="text-danger" v-if="order.status === 'pending'">待支付</span>
          <span class="text-success" v-if="order.status === 'paid'">✅ 已支付</span>
        </p>
        <router-link :to="`/order/${order.id}`" class="btn btn-sm btn-outline-primary me-2">查看订单详情</router-link>
        <router-link v-if="order.status === 'pending'" :to="`/pay?id=${order.id}`" class="btn btn-sm btn-primary">去支付</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getStorage } from '../utils/storage.js'

const orders = ref([])
onMounted(() => {
  orders.value = getStorage().orders
})
</script>