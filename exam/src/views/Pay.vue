<template>
  <div class="container my-5">
    <div class="card" v-if="order">
      <div class="card-header">
        <h4>订单支付页面</h4>
      </div>
      <div class="card-body">
        <p><strong>订单编号：</strong>{{ order.id }}</p>
        <p><strong>下单时间：</strong>{{ order.time }}</p>
        <p><strong>应付总金额：</strong>¥{{ order.totalPrice }}</p>
        <p>
          <strong>订单状态：</strong>
          <span class="text-danger" v-if="order.status === 'pending'">待支付</span>
          <span class="text-success" v-if="order.status === 'paid'">✅ 已支付成功</span>
        </p>

        <div class="alert alert-success mt-3" v-if="order.status === 'paid'">
          🎉 支付完成！2秒后自动跳转到我的订单页面
        </div>

        <button
          class="btn btn-primary mt-3"
          @click="payNow"
          :disabled="order.status === 'paid'"
        >
          {{ order.status === 'paid' ? '已完成支付' : '确认支付' }}
        </button>

        <router-link v-if="order.status === 'paid'" to="/orders" class="btn btn-outline-secondary ms-2 mt-3">
          手动查看我的订单
        </router-link>
      </div>
    </div>
    <div v-else class="alert alert-warning">未获取到订单数据</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getStorage, setStorage } from '../utils/storage.js'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const order = ref(null)

onMounted(() => {
  const storeData = getStorage()
  // 防止 oid 为空查找报错
  const oid = route.query.id
  if (!oid) return
  order.value = storeData.orders.find(item => item.id === oid)
})

const payNow = () => {
  // 健壮性判断，避免order不存在报错
  if (!order.value) return
  const storeData = getStorage()
  const targetOrder = storeData.orders.find(item => item.id === order.value.id)
  if (!targetOrder) return

  targetOrder.status = 'paid'
  setStorage(storeData)
  order.value = { ...targetOrder }

  alert('支付操作成功！')
  setTimeout(() => {
    router.push('/orders')
  }, 2000)
}
</script>