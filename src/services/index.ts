import baseAxios from './base'

export const movieList = () => {
  return baseAxios.get('movies')
}

export const celebrityList = () => {
  return baseAxios.get('celebrities')
}
