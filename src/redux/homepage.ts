import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarkedDates } from "react-native-calendars/src/types";
import { IDiaryEntry, loadEntry } from "./current_entry";
import { convert_entries_array_to_map } from "../io/entries";
import interpolate from "color-interpolate";

interface IHomepage{
    currentMonthDate:string,
    markedDates:MarkedDates|null
    entriesMap:{[key:string]:IDiaryEntry[]}|null
}

const InitialHomePage:IHomepage = {
    currentMonthDate: (new Date()).toLocaleDateString('en-GB').split("/").reverse().join('-'),
    markedDates:null,
    entriesMap:null,
}

const ColorInterpolator:(index:number)=>string = interpolate(["rgb(187 247 208)", "rgb(5 46 22)"])


export const homepageSlice = createSlice({
  name: 'homepage',
  initialState:InitialHomePage, 
  reducers: {
    setEntriesMapAndMarkedDates:(state, data:PayloadAction<[IDiaryEntry[], string]>)=>{
        
        const [entries_,currentMonthDate] = data.payload
        const entriesMap = convert_entries_array_to_map(entries_);
        const markedDates:MarkedDates = {}
        for(const [entry_date, entries] of entriesMap.entries()){
            
            markedDates[entry_date.split('/').reverse().join('-')] = {selected:true, selectedColor:ColorInterpolator(Math.max(...entries.map(entry=>entry.importance))/100.0)}
        }
        
        return {...state, entriesMap:Object.fromEntries(entriesMap.entries()), markedDates, currentMonthDate}
    }
  }
})

export const { setEntriesMapAndMarkedDates } = homepageSlice.actions

export {ColorInterpolator}
export default homepageSlice.reducer