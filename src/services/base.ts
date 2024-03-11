import axios from 'axios'

const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

baseAxios.interceptors.request.use(
  (config: any) => {
    return config
  },
  error => Promise.reject(error)
)

baseAxios.interceptors.response.use(
  res => res,
  async err => {
    // const originalConfig = err.config
    // if (err.response.status === 400) {
    //   // handle error
    //   return Promise.reject(new Error("Bad Request"));
    // }
    // if (originalConfig.url !== '/auth/signin' && err.response) {
    //   /* eslint no-underscore-dangle: 0 */
    //   if (err.response.status === 401) {
    //     originalConfig._retry = true
    //     try {
    //       const data = {
    //         refreshToken: store.getState()?.auth.token?.refreshToken || ''
    //       }
    //       if (data) {
    //         const res = await client.post(
    //           'auth/refresh-token',
    //           JSON.stringify(data)
    //         )
    //         const user = jwt(res.data.data.accessToken)
    //         const token = {
    //           accessToken: res.data.data.accessToken,
    //           refreshToken: res.data.data.refreshToken
    //         }
    //         store.dispatch(setAuthUser(user))
    //         store.dispatch(setAuthToken(token))
    //         return client(originalConfig)
    //       }
    //     } catch (_error) {
    //       return Promise.reject(_error)
    //     }
    //   }
    // }
    // if (err.response.status === 403) {
    //   // handle error
    //   return Promise.reject(new Error("Forbidden"));
    // }
    // if (err.response.status === 404) {
    //   // handle error
    //   return Promise.reject(new Error("Not Found"));
    // }
    return Promise.reject(err)
  }
)

export default baseAxios
