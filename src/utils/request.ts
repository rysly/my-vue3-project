import Request from 'luch-request'

const httpService = new Request({
  baseURL: 'http://120.46.46.120/', // 121.37.128.28
  header: {}
})

httpService.interceptors.request.use(
  (config) => {
    if (config && config.header) {
      config.header['Access-Control-Allow-Origin'] = '*'
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