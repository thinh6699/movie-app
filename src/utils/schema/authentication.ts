import { ILogin } from 'models/index'
import * as Yup from 'yup'
import { emailRegex, passwordRegex } from 'helpers/constants'

export const loginInitialValues: ILogin = {
  email: '',
  password: ''
}

export const loginSchema = () => {
  return Yup.object().shape({
    email: Yup.string().required().trim().matches(emailRegex),
    password: Yup.string().required().trim().matches(passwordRegex)
  })
}
