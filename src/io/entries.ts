import { IDiaryEntry } from "../redux/current_entry";
import { encrpyt_message } from "./encryption";
import { create_file, delete_file, get_all_file_names, read_file_from_fs } from "./filesyste";
async function write_entry_to_disk(entry_input:IDiaryEntry, key:string){
    const entry:typeof entry_input = JSON.parse(JSON.stringify(entry_input))
    if(entry.tldr !== undefined){
        entry.tldr = encrpyt_message(entry.tldr, key)
    }
    if(entry.notes !== undefined){
        entry.notes = encrpyt_message(entry.notes, key)
    }
   entry.entries.forEach(function(discrete_entry, index, array) {
    array[index].content = encrpyt_message(discrete_entry.content, key)
   });
    if(entry.filename === null){
       entry.filename = "EntryAT"+String(+(new Date()))+".json"
    }
    const {filename} = entry
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

function get_previous_and_next_entry(
    entiresMap:{[key:string]:IDiaryEntry[]}, current_entry:IDiaryEntry
):[IDiaryEntry|null, IDiaryEntry|null]{
    const date_string_to_date:(date_string:string)=>Date = (date_string) => new Date(date_string.split('/').reverse().join('-'))
    const current_entry_index_in_its_parent_day_array = entiresMap[current_entry.date].findIndex((e) => e.filename === current_entry.filename)
    const this_entires_date_object = date_string_to_date(current_entry.date)
    let previous_entry:IDiaryEntry|null = null, 
        next_entry:IDiaryEntry|null = null;
    if(current_entry_index_in_its_parent_day_array > 0){
        previous_entry = entiresMap[current_entry.date][current_entry_index_in_its_parent_day_array -1];
    }else{

        const potential_previous_entires = Object.keys(entiresMap).map(date_string_to_date).filter(
            date_ => date_ < this_entires_date_object
        ).sort()
        if(potential_previous_entires.length > 0){
            const previous_entry_date = potential_previous_entires[potential_previous_entires.length-1]
            const previous_entires_ = entiresMap[previous_entry_date.toLocaleDateString('en-GB')]
            previous_entry = previous_entires_[previous_entires_.length -1]
        }
    }

    if(current_entry_index_in_its_parent_day_array < (entiresMap[current_entry.date].length - 1)){
        next_entry = entiresMap[current_entry.date][current_entry_index_in_its_parent_day_array+1]
    }else{
        const potential_next_entires = Object.keys(entiresMap).map(
            date_string_to_date
        ).filter(
            date_ => date_ > this_entires_date_object
        ).sort()
        if(potential_next_entires.length > 0){
            const next_entry_date = potential_next_entires[0]
            const next_entries = entiresMap[next_entry_date.toLocaleDateString('en-GB')]
            next_entry = next_entries[0]
        }
    }

    return [previous_entry, next_entry]
}


export {
    write_entry_to_disk, 
    get_all_entries_for_this_month, 
    delete_all_entries, 
    convert_entries_array_to_map,
    get_previous_and_next_entry
}