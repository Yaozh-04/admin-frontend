import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// request interceptor
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    const res = response.data
    // Business error (Result.java returns code = 500/401)
    if (res.code && res.code !== 200) {
      ElMessage.error(res.msg || 'Error')
      if (res.code === 401) {
        localStorage.removeItem('adminToken')
        router.push('/login')
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  error => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default request
