import Request from 'luch-request'
import { userInfoStore } from '@/stores/user'

const userInfo = userInfoStore()

const httpService = new Request({
  baseURL: 'https://www.xyfuye.com/', // http://121.37.128.28/  http://120.46.46.120/  https://www.xyfuye.com/
  header: {}
})

httpService.interceptors.request.use(
  (config) => {
    if (config && config.header) {
      config.header['Access-Control-Allow-Origin'] = '*'
	    config.header['Authorization'] = userInfo.userList.token || '' // '7b47647f438d48269fc1ca3c30d20da2'
    }
    return config
  },
  (error) => {
    uni.showToast({ title: 'Data request failed!', icon: 'none' })
    return Promise.reject(error)
  }
)

httpService.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    try {
      uni.showToast({ title: error.data.message || '服务异常，请稍候重试', icon: 'none' })
    } finally {
      return Promise.reject(error)
    }
  }
)

export default httpService