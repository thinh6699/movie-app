export interface IMovie {
  id?: number
  title: string
  rating: number | null
  categories: number[]
  background_url?: string
  description: string
}

export interface IHeaderMenu {
  id: number
  title: string
  url: string
}

export interface ICelebrity {
  id: number
  name: string
  image_url: string
}

export interface IMovieCategory {
  id: number
  name: string
}

export interface ILogin {
  email: string
  password: string
}
