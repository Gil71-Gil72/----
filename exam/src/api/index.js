// exam/src/api/index.js
// 简单模拟远程 API：延迟 + 可配置失败概率（适合学生演示）

// 本地图片帮助函数（保持不变）
const getImage = (num) => {
  return new URL(`../assets/images/t${num}.jpg`, import.meta.url).href
}

const products = [
  { id: 1, name: '白色纯棉短袖', price: 59, img: getImage(1), desc: '100%纯棉，透气舒适' },
  { id: 2, name: '黑色潮流短袖', price: 69, img: getImage(2), desc: '潮流印花，百搭款式' },
  { id: 3, name: '蓝色简约短袖', price: 49, img: getImage(3), desc: '简约大气，通勤必备' },
  { id: 4, name: '灰色运动短袖', price: 55, img: getImage(4), desc: '轻薄透气，运动首选' },
  { id: 5, name: '粉色少女短袖', price: 65, img: getImage(5), desc: '温柔显白，青春活力' },
  { id: 6, name: '绿色休闲短袖', price: 58, img: getImage(6), desc: '休闲百搭，日常首选' },
  { id: 7, name: '紫色时尚短袖', price: 72, img: getImage(7), desc: '时尚配色，超显气质' },
  { id: 8, name: '黄色阳光短袖', price: 53, img: getImage(8), desc: '明亮阳光，清爽舒适' },
  { id: 9, name: '红色喜庆短袖', price: 66, img: getImage(9), desc: '喜庆大气，优质面料' }
]

// 配置：演示用失败率和延迟
// DEV_FAIL_PROB 在开发时生效（只在 import.meta.env.DEV === true 时启用），
// 方便在生产时自动关闭失败模拟。
const DEFAULT_DELAY = 200              // 毫秒，模拟网络延迟
const DEV_FAIL_PROB = 1           // 开发环境下失败概率，0.01 = 1%
// 若要强烈模拟失败，课堂演示可把上面改为 0.99 (99% 失败)

// 辅助：决定本次请求是否失败
function shouldFail() {
  // 仅在开发环境按概率失败；生产 (build) 默认不失败
  if (!import.meta.env.DEV) return false
  return Math.random() < DEV_FAIL_PROB
}

// 获取商品列表
export function getProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error('网络异常，请求商品列表失败（模拟）'))
        return
      }
      resolve(products)
    }, DEFAULT_DELAY)
  })
}

// 根据 id 获取单个商品
export function getProductById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error('网络异常，请求商品详情失败（模拟）'))
        return
      }
      const item = products.find(p => p.id == id)
      resolve(item)
    }, DEFAULT_DELAY)
  })
}

// 创建订单（模拟）
export function createOrderAPI(orderData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error('创建订单失败（模拟）'))
        return
      }
      resolve({ code: 200, orderId: Date.now().toString() })
    }, DEFAULT_DELAY)
  })
}

// 支付订单（模拟）
export function payOrderAPI(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error('支付失败（模拟）'))
        return
      }
      resolve('ok')
    }, DEFAULT_DELAY)
  })
}