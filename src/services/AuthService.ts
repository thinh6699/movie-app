import baseAxios from './base'

export const signUp = (data: any) => {
  return baseAxios.post('sign-up', data)
}

export const signIn = (data: any) => {
  return baseAxios.post('login', data)
}

