<template>
  <div class="container my-4">
    <h3>购物车</h3>
    <div v-if="cart.length === 0" class="alert alert-info">
      购物车暂无商品，去选购商品吧
    </div>
    <div v-else>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>商品名称</th>
            <th>单价</th>
            <th>购买数量</th>
            <th>小计金额</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>{{ item.name }}</td>
            <td>¥{{ item.price }}</td>
            <td>
              <button class="btn btn-sm btn-outline-secondary" @click="changeNum(item, -1)">-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button class="btn btn-sm btn-outline-secondary" @click="changeNum(item, 1)">+</button>
            </td>
            <td>¥{{ item.price * item.quantity }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="delItem(item.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end mt-3">
        <h4>合计总金额：¥{{ totalPrice }}</h4>
        <button class="btn btn-primary mt-2" @click="submitOrder">去结算下单</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getStorage, setStorage } from '../utils/storage.js'

const router = useRouter()
const cart = ref([])

onMounted(() => {
  cart.value = getStorage().cart
})

// 计算总价
const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// 修改数量
const changeNum = (item, step) => {
  if (item.quantity + step < 1) return
  const store = getStorage()
  const curr = store.cart.find(c => c.id === item.id)
  curr.quantity += step
  setStorage(store)
  cart.value = [...store.cart]
}

// 删除商品
const delItem = (id) => {
  const store = getStorage()
  store.cart = store.cart.filter(c => c.id !== id)
  setStorage(store)
  cart.value = [...store.cart]
}

// 提交下单，生成完整订单
const submitOrder = () => {
  if (cart.value.length <= 0) {
    alert('购物车为空，无法下单！')
    return
  }
  const store = getStorage()
  const newOrderId = Date.now().toString()
  const newOrder = {
    id: newOrderId,
    time: new Date().toLocaleString(),
    status: 'pending',
    totalPrice: totalPrice.value,
    items: [...cart.value]
  }
  // 存入订单数组
  store.orders.push(newOrder)
  // 清空购物车
  store.cart = []
  setStorage(store)
  cart.value = []
  // 跳转到支付页
  router.push(`/pay?id=${newOrderId}`)
}
</script>