import { createSlice } from '@reduxjs/toolkit'

const initialState: any = null

export const slice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveToken: (state: any, value: any) => {
      return value.payload
    },
    clearToken: (state: any) => {
      return null
    }
  }
})

// Action creators are generated for each case reducer function
export const { saveToken, clearToken } = slice.actions

export default slice.reducer
