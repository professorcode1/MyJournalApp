import { IDiaryEntry } from "../redux/current_entry";
import { encrpyt_message } from "./encryption";
import { create_file, delete_file, get_all_file_names, read_file_from_fs } from "./filesyste";
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
async function get_all_entries_file_names(){
    const file_list =  await get_all_file_names()
    const entries_file = file_list.filter(file_name => file_name.match(/^EntryAT\d+\.json$/) !== null)
    return entries_file
}
async function get_all_entries_for_this_month(month:number, year:number){
    const entries_file = await get_all_entries_file_names()
    const entries_file_of_month = entries_file.map(async entry_file => {
        const entry:IDiaryEntry=  JSON.parse(await read_file_from_fs(entry_file))
        const [_,entry_month,entry_year] = entry.date.split('/').map(Number)
        if(entry_month === month && entry_year == year){
            return entry
        }else{
            return null
        }
    })
    return (await Promise.all(entries_file_of_month)).filter(entry_promise => Boolean( entry_promise))
}
function convert_entries_array_to_map(entries:IDiaryEntry[]):Map<string, IDiaryEntry[]>{
    const result:Map<string, IDiaryEntry[]> = new Map()
    for(const entry of entries){
        if(result.has(entry.date)){
            result.get(entry.date).push(entry)
        }else{
            result.set(entry.date, [entry])
        }
    }
    return result
}
async function delete_all_entries(){
    await Promise.all((await get_all_entries_file_names()).map(file_name => delete_file(file_name, false)))
}

export {write_entry_to_disk, get_all_entries_for_this_month, delete_all_entries, convert_entries_array_to_map}