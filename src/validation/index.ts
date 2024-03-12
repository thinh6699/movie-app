import { setLocale } from 'yup'
import i18n from 'i18next'

setLocale({
  mixed: {
    required: ({ path }) => {
      return i18n.t('validation_message.required', {
        path: i18n.t(`validation_field.${path}`)
      })
    }
  },
  string: {
    max: ({ max, path }) => {
      return i18n.t('validation_message.max_length', {
        path: i18n.t(`validation_field.${path}`),
        max
      })
    },
    email: ({ path }) => {
      return i18n.t('validation_message.wrong_format', {
        path: i18n.t(`validation_field.${path}`)
      })
    },
    url: ({ path }) => {
      return i18n.t('validation_message.wrong_format', {
        path: i18n.t(`validation_field.${path}`)
      })
    },
    matches: ({ path }) => {
      return i18n.t('validation_message.wrong_format', {
        path: i18n.t(`validation_field.${path}`)
      })
    }
  }
})
