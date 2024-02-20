import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {}

export const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    saveUserInfo: (state: any, value: any) => {
      return value.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { saveUserInfo } = userInfo.actions

export default userInfo.reducer
