import baseAxios from './base'
import { IMovie } from './../models/index'

const baseUrl = 'movies'

export const movieList = (params: any) => {
  return baseAxios.get(baseUrl, {
    params
  })
}

export const movieCategoryList = () => {
  return baseAxios.get(`${baseUrl}/categories`)
}

export const movieCreate = (data: IMovie) => {
  return baseAxios.post(`${baseUrl}/store`, data)
}

export const movieDetail = (id: number) => {
  return baseAxios.get(`${baseUrl}/detail/${id}`)
}

export const movieUpdate = (id: number, data: IMovie) => {
   return baseAxios.post(`${baseUrl}/edit/${id}`, data)
}

export const movieDelete = (id: number) => {
  return baseAxios.delete(`${baseUrl}/delete/${id}`)
}
