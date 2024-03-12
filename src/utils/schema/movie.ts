import { IMovie } from 'models/index'
import * as Yup from 'yup'
import i18next from 'i18next'

export const movieInitialValues: IMovie = {
  title: '',
  rating: null,
  categories: [],
  background_url: '',
  description: ''
}

export const movieSchema = () => {
  return Yup.object().shape({
    title: Yup.string().required().trim(),
    rating: Yup.number().required(),
    categories: Yup.array()
      .required()
      .min(
        1,
        i18next.t('validation_message.required', {
          path: i18next.t(`validation_field.categories`)
        })
      ),
    background_url: Yup.string().required().trim(),
    description: Yup.string().required().trim()
  })
}
