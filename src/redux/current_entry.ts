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
  tldr?:string
  notes?:string,
  importance:number
}
const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse posuere ullamcorper nibh vitae posuere. Cras quis purus tincidunt, dapibus mi in, blandit felis. Ut aliquam risus at tempor feugiat. Etiam vel justo sed massa cursus condimentum id vel tellus. In id odio gravida lectus scelerisque euismod at dapibus erat. Ut lobortis magna vel ligula suscipit, eu porttitor odio ultrices. Mauris pulvinar eu elit sit amet laoreet. Proin est nunc, tincidunt in vehicula ac, lacinia ac magna. Aenean dapibus vitae nibh sed consequat. Nam sit amet dolor imperdiet mi interdum ultrices nec vitae odio.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent porta fermentum egestas. Suspendisse augue ex, finibus vel suscipit eget, pretium eu eros. Sed venenatis tellus vel metus tincidunt iaculis. Morbi non est volutpat nulla aliquet iaculis vitae ac eros. Vestibulum vulputate velit id sem rutrum varius. Cras urna justo, lacinia in nisl eget, tristique maximus eros.

Sed feugiat non ipsum nec lobortis. Suspendisse eget tortor nec sem imperdiet suscipit. Praesent id enim nec magna pulvinar iaculis id vitae elit. In vel leo dapibus, rutrum leo sed, auctor enim. Etiam eget nisl orci. Maecenas malesuada sit amet ipsum a finibus. Donec nec diam nec magna egestas ultricies porttitor molestie orci. Suspendisse elit risus, tempus faucibus ipsum a, rutrum posuere arcu. Quisque metus nibh, gravida sed est vel, rhoncus blandit dolor. Vivamus ut eros vitae turpis tristique sollicitudin. Donec nec suscipit urna, vel fermentum neque. Mauris semper congue suscipit. In iaculis enim at iaculis tempor. Nunc urna turpis, suscipit id massa eget, pharetra congue mi. Aenean arcu ante, pretium et tortor vitae, dictum rutrum erat.

Nunc tempor nisi et elit fringilla, vitae tincidunt quam volutpat. Nulla et aliquet risus. Aenean elementum lacinia ante vitae sollicitudin. Vivamus cursus vitae turpis vel consectetur. Duis tristique odio sit amet tristique euismod. Proin vestibulum orci sit amet euismod auctor. Morbi feugiat sem eu augue condimentum tempor. Praesent pharetra fringilla orci, nec bibendum tortor luctus et.

Phasellus vel maximus elit. Integer sed nisl at ipsum dapibus placerat ac eu mauris. Proin laoreet efficitur ex, sit amet auctor sapien sodales vitae. Duis nec neque vulputate, aliquam lectus in, luctus dolor. Suspendisse vulputate enim quam. Maecenas nec justo tristique, congue arcu pretium, pellentesque est. Nunc ultricies lacus id massa placerat, ac varius massa accumsan. Sed eget tempus risus. Morbi non finibus lectus, ut aliquet dolor. Cras commodo cursus nisl eget iaculis. In massa neque, sodales ut lectus in, accumsan lacinia tortor. Suspendisse potenti.`

const EmptyDiaryEntry:IDiaryEntry = {
  entries:[{content:catimage, type:"IMAGE"}, {content:loremIpsum, type:"TEXT"}],
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

export type {IDiaryEntryDiscrete, EDiaryEntry }