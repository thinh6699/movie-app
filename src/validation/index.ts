import { setLocale } from 'yup'
import i18n from 'i18next'

setLocale({
  mixed: {
    required: ({ path }) => {
      return i18n.t('validation_message.required', {
        path: i18n.t(`validation_field.${path}`)
      })
    }
  }
})
