import { appendFormData } from 'helpers'
import baseAxios from './base'

export const uploadFile = (data: any) => {
  return baseAxios.post('common/upload-file', appendFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
