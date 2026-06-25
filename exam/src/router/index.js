import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Pay from '../views/Pay.vue'
import OrderList from '../views/OrderList.vue'
import OrderDetail from '../views/OrderDetail.vue'
import NotFound from '../views/NotFound.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/products', component: ProductList },
  { path: '/product/:id', component: ProductDetail },
  { path: '/cart', component: Cart },
  { path: '/pay', component: Pay },
  { path: '/orders', component: OrderList },
  { path: '/order/:id', component: OrderDetail },
  { path: '/about', component: About }, // ← 新增这一行
  // 404 固定放最后一行！！！
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router