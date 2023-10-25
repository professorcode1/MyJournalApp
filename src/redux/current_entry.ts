import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { catimage } from './catimage'
const DIARY_ENTRY_TYPES = ["IMAGE", "TEXT"] as const 
type EDiaryEntry = typeof DIARY_ENTRY_TYPES[number]
interface IDiaryEntryDiscrete{
  content:string
  type:EDiaryEntry
}
interface IDiaryEntry{
  entries:IDiaryEntryDiscrete[]
  date:string
  tldr:string
  notes:string,
  importance:number
}

const EmptyDiaryEntry:IDiaryEntry = {
  entries:[{content:catimage, type:"IMAGE"}, {content:"hello word", type:"TEXT"}],
  date:(new Date()).toLocaleDateString('en-GB') ,
  tldr:"",
  notes:"",
  importance:50
}

type EDiaryEntryKeys = keyof IDiaryEntry

export const createEntrySlice = createSlice({
  name: 'create_entry',
  initialState:EmptyDiaryEntry , 
  reducers: {
      updateSingleAttributeOfDiaryEntry:(state, newEntry:PayloadAction<{entry_name:EDiaryEntryKeys, value:string|number}>) => {
        return {...state, [newEntry.payload.entry_name]:newEntry.payload.value}
      },
      appendEntry:(state, newEntry:PayloadAction<IDiaryEntryDiscrete>)=>{
        return {...state, entries: [...state.entries, newEntry.payload]}
      }
    }
  }
)

export const { 
  updateSingleAttributeOfDiaryEntry,
  appendEntry,
} = createEntrySlice.actions

export default createEntrySlice.reducer

export type {IDiaryEntryDiscrete }