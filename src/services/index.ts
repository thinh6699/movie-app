import baseAxios from './base'

export const celebrityList = () => {
  return baseAxios.get('celebrities')
}
