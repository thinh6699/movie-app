export interface IMovie {
  id: number
  title: string
  rating: number | null
  categories: string[]
  background_url: string
  type: string
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
