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
}