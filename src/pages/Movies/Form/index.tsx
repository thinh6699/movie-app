import { Formik, Form, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'
import { MAX_FILE_SIZE, MAX_INPUT_TEXT, TIMEOUT } from 'helpers/constants'
import { checkValueChange, isNewFileUploading, MenuProps } from 'helpers'
import { IMovie, IMovieCategory } from 'models'
import { Rating } from '@mui/material'
import { useEffect, useState, useRef, useCallback } from 'react'
import {
  movieCategoryList,
  movieCreate,
  movieDelete,
  movieDetail,
  movieUpdate
} from 'services/MovieService'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { uploadFile } from 'services/CommonService'
import { useNavigate, useParams } from 'react-router-dom'
import Path from 'routers/Path'
import { toast } from 'react-toastify'
import LayoutMain from 'layouts/LayoutMain'
import FormItem, { TYPE_INPUT } from 'components/FormItem'
import { movieInitialValues, movieSchema } from 'utils/schema/movie'

function MovieForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id } = useParams()
  const formikRef = useRef<any>()
  const [categoryList, setCategoryList] = useState<IMovieCategory[]>([])
  const [formValues, setFormValues] = useState(null)

  const getMovieCategories = async () => {
    const response = await movieCategoryList()
    setCategoryList([...response.data.data])
  }

  const getMovieDetail = useCallback(async () => {
    try {
      const detailResponse = await movieDetail(Number(id))
      if (formikRef && formikRef.current) {
        const { setValues } = formikRef.current
        const { data } = detailResponse?.data || {}
        const categories = data?.categories?.map((item: any) => item.id) || []
        setFormValues({ ...data, categories })
        setValues({ ...data, categories })
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
      navigate(Path.movies)
    }
  }, [id, navigate])

  useEffect(() => {
    getMovieCategories()

    if (id) {
      getMovieDetail()
    }
  }, [getMovieDetail, id])

  const validateImage = (file: any, setFieldValue: any, setFieldError: any) => {
    // Allowing file type
    const allowedExtensions = /[^\\/.]+(?=(\.png|\.jpeg|\.jpg)$)/

    const errorImageSizeMess = t('validation_message.oversize_file', {
      size: MAX_FILE_SIZE / 1024 / 1024
    })
    const errorFormatMess = t('validation_message.wrong_format_file', {
      format: 'PNG, JPEG, JPG'
    })

    if (!allowedExtensions.test(file.name.toLowerCase())) {
      setFieldError('background_url', errorFormatMess)
    } else if (file.size > MAX_FILE_SIZE) {
      setFieldError('background_url', errorImageSizeMess)
    } else {
      setFieldValue('background_url', file)
    }
  }

  const onImageChange = (
    event: any,
    setFieldValue: any,
    setFieldError: any
  ) => {
    const files = event.target.files || event.dataTransfer.files
    if (!files.length) return
    validateImage(files[0], setFieldValue, setFieldError)
  }

  const deleteMovie = async () => {
    try {
      const deleteResponse = await movieDelete(Number(id))
      const toastPromise = new Promise(resolve => setTimeout(resolve, TIMEOUT))
      toast.promise(toastPromise, {
        success: deleteResponse.data.message
      })
      navigate(Path.movies)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const onSubmit = async (values: IMovie) => {
    const { title, description, rating, categories } = values || {}
    const payload: IMovie = {
      title,
      description,
      rating,
      categories
    }

    if (isNewFileUploading(values.background_url)) {
      const data = {
        file: values.background_url
      }
      const uploadResponse = await uploadFile(data).catch((error: any) => {
        toast.error(error.response.data.message || 'Upload error')
        return Promise.reject(error)
      })
      payload.background_url = uploadResponse.data.url
    } else {
      payload.background_url = values.background_url
    }

    const apiUrl = id ? movieUpdate(Number(id), payload) : movieCreate(payload)

    try {
      const res = await apiUrl
      const toastPromise = new Promise(resolve => setTimeout(resolve, TIMEOUT))
      toast.promise(toastPromise, {
        success: res.data.message
      })
      navigate(Path.movies)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <LayoutMain>
      <div className='container'>
        <div className='flex justify-center'>
          <div className='max-w-[500px] w-full'>
            <Formik
              initialValues={movieInitialValues}
              validationSchema={movieSchema}
              onSubmit={onSubmit}
              innerRef={formikRef}
            >
              {props => {
                const { setFieldValue, setFieldError, values, handleBlur } =
                  props
                const isValuesHasChanged = checkValueChange(
                  formValues,
                  values,
                  false
                )
                return (
                  <Form className='flex flex-col gap-4'>
                    {id && (
                      <div className='flex items-center justify-end'>
                        <Button
                          onClick={deleteMovie}
                          variant='contained'
                          classes={{
                            root: '!uppercase !bg-loginBtnBg !font-semibold !min-w-[100px]'
                          }}
                        >
                          {t('common.delete')}
                        </Button>
                      </div>
                    )}
                    <FormItem
                      label={t('validation_field.title')}
                      fieldName='title'
                      maxLength={MAX_INPUT_TEXT}
                      required
                    />

                    <FormItem
                      label={t('validation_field.description')}
                      fieldName='description'
                      maxLength={MAX_INPUT_TEXT}
                      typeInput={TYPE_INPUT.TEXT_AREA}
                      inputClassName='h-[200px] resize-none'
                      required
                    />

                    <div className='form-item'>
                      <p className='required inline-block text-base mb-1'>
                        {t('validation_field.background_url')}
                      </p>
                      <label
                        htmlFor='background_url'
                        className='block relative pt-[56.25%] overflow-hidden text-center border rounded-[8px] px-3 py-1 cursor-pointer'
                      >
                        {!values.background_url && (
                          <span className='absolute top-1/2 left-1/2 -translate-y-1/2	-translate-x-1/2'>
                            {t('choose_image')}
                          </span>
                        )}
                        <input
                          className='w-0 h-0 overflow-hidden'
                          onClick={(e: any) => {
                            e.target.value = null
                          }}
                          onChange={(e: any) => {
                            onImageChange(e, setFieldValue, setFieldError)
                          }}
                          onBlur={handleBlur}
                          id='background_url'
                          type='file'
                          name='background_url'
                        />
                        {values?.background_url && (
                          <img
                            alt=''
                            className='absolute top-0 left-0 w-full h-full'
                            src={
                              isNewFileUploading(values?.background_url)
                                ? URL.createObjectURL(
                                    values?.background_url as any
                                  )
                                : values?.background_url
                            }
                          />
                        )}
                      </label>
                      <ErrorMessage
                        name='background_url'
                        component='div'
                        className='errors-msg'
                      />
                    </div>

                    <div className='form-item'>
                      <label className='required inline-block text-base mb-1'>
                        {t('validation_field.rating')}
                      </label>
                      <div>
                        <Rating
                          value={values.rating}
                          name='rating'
                          precision={0.1}
                          size='large'
                          onChange={(_: any, newValue: any) => {
                            setFieldValue('rating', newValue)
                          }}
                          classes={{
                            icon: '!text-[#FAAF00]'
                          }}
                        />
                      </div>
                      <ErrorMessage
                        name='rating'
                        component='div'
                        className='errors-msg'
                      />
                    </div>

                    <div className='form-item'>
                      <label className='required inline-block text-base mb-1'>
                        {t('validation_field.categories')}
                      </label>
                      <div>
                        <FormControl sx={{ width: '100%', maxWidth: 300 }}>
                          <InputLabel className='!text-white'>
                            {t('validation_field.categories')}
                          </InputLabel>
                          <Select
                            name='categories'
                            multiple
                            value={values.categories}
                            onChange={(event: any) => {
                              const { value } = event.target
                              setFieldValue(
                                'categories',
                                typeof value === 'string'
                                  ? value.split(',')
                                  : value
                              )
                            }}
                            input={
                              <OutlinedInput
                                classes={{
                                  root: 'border border-solid border-white'
                                }}
                              />
                            }
                            renderValue={() => {
                              const selectedValue = categoryList
                                .filter((item: IMovieCategory) =>
                                  values.categories.includes(item.id)
                                )
                                .map((item: IMovieCategory) => item.name)
                              return selectedValue.join(', ')
                            }}
                            MenuProps={MenuProps}
                            classes={{
                              icon: '!text-white',
                              outlined: '!text-white'
                            }}
                          >
                            {categoryList.map((category: IMovieCategory) => (
                              <MenuItem key={category.id} value={category.id}>
                                <Checkbox
                                  checked={
                                    values.categories.indexOf(category.id) > -1
                                  }
                                />
                                <ListItemText primary={category.name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <ErrorMessage
                        name='categories'
                        component='div'
                        className='errors-msg'
                      />
                    </div>

                    <div className='flex items-center justify-center pt-4'>
                      <Button
                        disabled={!isValuesHasChanged}
                        type='submit'
                        variant='contained'
                        classes={{
                          root: '!uppercase !bg-loginBtnBg !font-semibold !min-w-[100px]'
                        }}
                      >
                        {id ? t('common.save') : t('common.create')}
                      </Button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}

export default MovieForm
