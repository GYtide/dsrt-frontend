// 封装axios
// 实例化  请求拦截器 响应拦截器

import axios from 'axios'
const http = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 5000
})


export { http }