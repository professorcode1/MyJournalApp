import { IDiaryEntry } from "../redux/current_entry";
import { encrpyt_message } from "./encryption";
import { create_file } from "./filesyste";
async function write_entry_to_disk(entry:IDiaryEntry, key:string){
    if(entry.tldr !== undefined){
        entry.tldr = encrpyt_message(entry.tldr, key)
    }
    if(entry.notes !== undefined){
        entry.notes = encrpyt_message(entry.notes, key)
    }
   entry.entries.forEach(discrete_entry => discrete_entry.content = encrpyt_message(discrete_entry.content, key))
   const filename = "EntryAT"+String(+(new Date()))+".json"
   await create_file(filename, JSON.stringify(entry))
}

export {write_entry_to_disk}