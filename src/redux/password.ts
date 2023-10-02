import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export const passwordSlice = createSlice({
  name: 'password',
  initialState:"", 
  reducers: {
    setPassword: (state:string, data:PayloadAction<string>) => {
      return data.payload
    }
  }
})

export const { setPassword } = passwordSlice.actions

export default passwordSlice.reducer