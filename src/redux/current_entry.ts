import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { decrypt_message } from '../io/encryption'
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
      },
      decryptCurrentEntryInplace:(state, key:PayloadAction<string>)=>{
        const result:IDiaryEntry = JSON.parse(JSON.stringify(EmptyDiaryEntry))
        if(state.notes){
          result.notes = decrypt_message(state.notes, key.payload)
        }
        if(state.tldr){
          result.tldr = decrypt_message(state.tldr, key.payload)
        }
        result.importance = state.importance
        result.date = state.date
        result.entries = state.entries.map(discrete_entry => {return {type:discrete_entry.type, content:decrypt_message(discrete_entry.content, key.payload)}})
        return result
      }
    }
  }
)

export const { 
  updateSingleAttributeOfDiaryEntry,
  appendTextEntry,
  appendImageEntry,
  loadEmptyEntry,
  loadEntry,
  decryptCurrentEntryInplace
} = createEntrySlice.actions

export default createEntrySlice.reducer

export type { IDiaryEntryDiscrete, EDiaryEntry, IDiaryEntry }