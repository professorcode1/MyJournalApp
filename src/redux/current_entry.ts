import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const DIARY_ENTRY_TYPES = ["IMAGE", "TEXT"] as const 
type EDiaryEntry = typeof DIARY_ENTRY_TYPES[number]
interface IDiaryEntryDiscrete{
  content:string
  type:EDiaryEntry
}
interface IDiaryEntry{
  name:string
  entries:IDiaryEntryDiscrete[]
  date:string
  tldr:string
  notes:string
}

const EmptyDiaryEntry:IDiaryEntry = {
  name:"",
  entries:[],
  date:(new Date()).toLocaleDateString('en-GB') ,
  tldr:"",
  notes:""
}

export const createEntrySlice = createSlice({
  name: 'create_entry',
  initialState:EmptyDiaryEntry , 
  reducers: {
      updateName:(state, newName:PayloadAction<string>)=>{
        return {...state, name:newName.payload}
      },
      updateDate:(state, newDate:PayloadAction<string>)=>{
        return {...state, date:newDate.payload}
      },
      updateTLDR:(state, newTLDR:PayloadAction<string>)=>{
        return {...state, tldr:newTLDR.payload}
      },
      updateNotes:(state, newNotes:PayloadAction<string>)=>{
        return {...state, notes:newNotes.payload}
      },
      appendEntry:(state, newEntry:PayloadAction<IDiaryEntryDiscrete>)=>{
        return {...state, entries: [...state.entries, newEntry.payload]}
      }
    }
  }
)

export const { 
  updateName,
  updateDate,
  updateTLDR,
  updateNotes,
  appendEntry
} = createEntrySlice.actions

export default createEntrySlice.reducer