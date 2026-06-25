// 本地图片（你原来的，完全不动）
const getImage = (num) => {
  return new URL(`../assets/images/t${num}.jpg`, import.meta.url).href
}

// 商品数据（本地图片不变）
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

// ==============================
// 你要的功能：模拟远程API + 99%失败
// ==============================
export function getProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 99% 失败，1% 成功
      if (Math.random() > 0.01) {
        resolve(products)
      } else {
        reject(new Error("网络异常，请求失败"))
      }
    }, 200)
  })
}

export function getProductById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = products.find(p => p.id == id)
      resolve(item)
    }, 200)
  })
}

export function createOrderAPI() {
  return new Promise(resolve => setTimeout(() => resolve({ code: 200 }), 200))
}

export function payOrderAPI() {
  return new Promise(resolve => setTimeout(() => resolve('ok'), 200))
}