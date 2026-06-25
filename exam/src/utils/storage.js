// utils/storage.js
export function getStorage() {
  const data = localStorage.getItem('shopData')
  if (!data) {
    return {
      cart: [],
      orders: []
    }
  }
  return JSON.parse(data)
}

export function setStorage(obj) {
  localStorage.setItem('shopData', JSON.stringify(obj))
  // 广播一个自定义事件，通知其他组件本地存储已更新
  try {
    window.dispatchEvent(new Event('shopDataChanged'))
  } catch (e) {
    // 在非浏览器环境或老浏览器容错
    // console.warn('cannot dispatch shopDataChanged', e)
  }
}