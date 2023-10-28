import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { EScreen } from '../pages/screen'
export const screenSlice = createSlice({
  name: 'screen',
  initialState:"HOME" as EScreen, 
  reducers: {
    setScreen: (state:EScreen, data:PayloadAction<EScreen>) => {
      return data.payload
    }
  }
})

export const { setScreen } = screenSlice.actions

export default screenSlice.reducer