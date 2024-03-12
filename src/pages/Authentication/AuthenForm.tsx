import { Formik, Form } from 'formik'
import { loginInitialValues, loginSchema } from 'utils/schema/authentication'
import { useRef } from 'react'
import FormItem from 'components/FormItem'
import { useTranslation } from 'react-i18next'
import { MAX_INPUT_TEXT, MAX_PASSWORD_TEXT } from 'helpers/constants'
import Button from '@mui/material/Button'
import { ILogin } from 'models'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Path from 'routers/Path'
import { signUp, signIn } from 'services/AuthService'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { saveToken } from 'stores/Token'

function AuthenForm() {
  const formikRef = useRef<any>()
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname, state } = location
  const previousRoute = state?.from?.pathname || Path.home

  const isLoginPage = () => {
    return pathname === Path.login
  }

  const login = async (values: ILogin, context: any) => {
    const { email, password } = values
    const { resetForm } = context
    const payload = {
      email,
      password
    }
    const apiUrl = isLoginPage() ? signIn(payload) : signUp(payload)
    try {
      const response = await apiUrl
      toast.success(response.data.message)
      if (isLoginPage()) {
        dispatch(saveToken(response.data.access_token))
        navigate(previousRoute)
      } else {
        resetForm()
        navigate(Path.login)
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='container'>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='max-w-[500px] w-full'>
          <div className='uppercase text-[28px] mb-10 text-center'>
            {isLoginPage() ? t('common.login') : t('common.sign_up')}
          </div>
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginSchema}
            onSubmit={login}
            innerRef={formikRef}
          >
            {() => {
              return (
                <Form className='flex flex-col gap-4'>
                  <FormItem
                    label={t('validation_field.email')}
                    fieldName='email'
                    maxLength={MAX_INPUT_TEXT}
                    required
                  />

                  <FormItem
                    label={t('validation_field.password')}
                    fieldName='password'
                    maxLength={MAX_PASSWORD_TEXT}
                    type='password'
                    required
                  />

                  <div className='flex items-center justify-center pt-10'>
                    <Button
                      type='submit'
                      variant='contained'
                      classes={{
                        root: '!uppercase !bg-loginBtnBg !font-semibold w-full'
                      }}
                    >
                      {isLoginPage() ? t('common.login') : t('common.sign_up')}
                    </Button>
                  </div>

                  {isLoginPage() ? (
                    <Link to={Path.sign_up} className='text-center'>
                      Don't have account yet? Click here to sign up
                    </Link>
                  ) : (
                    <Link to={Path.login} className='text-center'>
                      Already had account? Click here to login
                    </Link>
                  )}
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='light'
        limit={3}
      />
    </div>
  )
}

export default AuthenForm
