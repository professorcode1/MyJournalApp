import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const DIARY_ENTRY_TYPES = ["IMAGE", "TEXT"] as const 
type EDiaryEntry = typeof DIARY_ENTRY_TYPES[number]
interface IDiaryEntryDiscrete{
  content:string
  type:EDiaryEntry
}
interface IDiaryEntry{
  entries:IDiaryEntryDiscrete[]
  date:string
  tldr?:string
  notes?:string,
  importance:number
}

const EmptyDiaryEntry:IDiaryEntry = {
  entries:[],
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
      appendTextEntry:(state, entry:PayloadAction<string>) => {
        return {...state, entries:[...state.entries, {
          content:entry.payload,
          type:"TEXT"
        }]}
      },
      appendImageEntry:(state, entry:PayloadAction<string>) => {
        return {...state, entries:[...state.entries, {
          content:entry.payload,
          type:"IMAGE"
        }]}
      },
      loadEmptyEntry:(state)=>{
        return {...EmptyDiaryEntry,date:(new Date()).toLocaleDateString('en-GB') }
      },
      loadEntry:(state, entry:PayloadAction<IDiaryEntry>)=>{
        return entry.payload
      }
    }
  }
)

export const { 
  updateSingleAttributeOfDiaryEntry,
  appendTextEntry,
  appendImageEntry,
  loadEmptyEntry,
  loadEntry
} = createEntrySlice.actions

export default createEntrySlice.reducer

export type { IDiaryEntryDiscrete, EDiaryEntry, IDiaryEntry }