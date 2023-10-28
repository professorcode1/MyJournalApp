import * as React from "react"
import {Calendar} from 'react-native-calendars';
import { 
    View,
    Text,
    ActivityIndicator 
} from "react-native";
import { MarkedDates } from "react-native-calendars/src/types";
import { get_all_entries_for_this_month,convert_entries_array_to_map } from "../../io/entries";
import interpolate from "color-interpolate";
import { IDiaryEntry } from "../../redux/current_entry";
const HomeCalendar:React.FC<{}> = () => {
    const [markedDates,setMarkedDates] = React.useState<MarkedDates|null>(null)
    const [selectedDate, setSelectedDate] = React.useState<string|null>(null)
    const importanceColormap = React.useRef(interpolate(["rgb(187 247 208)", "rgb(5 46 22)"]))
    const [entriesMap, setEntriesMap] = React.useState<Map<string, IDiaryEntry[]>|null>(null)
    const populateEntries = async (date_:Date)=>{
        const entries_map = convert_entries_array_to_map(await get_all_entries_for_this_month(date_.getMonth()+1, date_.getFullYear()));
        const marked_dates_object:MarkedDates = {}
        for(const [entry_date, entries] of entries_map.entries()){
            
            marked_dates_object[entry_date.split('/').reverse().join('-')] = {selected:true, selectedColor:importanceColormap.current(Math.max(...entries.map(entry=>entry.importance))/100.0)}
        }
        setEntriesMap(entries_map)
        setMarkedDates(marked_dates_object)
    };
    React.useEffect(()=>{
        populateEntries(new Date( ))
    }, [])
    return (
        <View className="w-full bg-white p-1 relative ">
            <View className={ markedDates === null ? "opacity-25" : ""}>

                <Text className="text-3xl border-b border-slate-500 m-1">
                    Veiw Entries
                </Text>
                <Calendar 
                    className="m-1"
                    markedDates={markedDates}
                    onDayPress={input=>{
                        console.log(input)
                    }}
                    onMonthChange={input=>{
                        setMarkedDates(null)
                        populateEntries(new Date(input.dateString))
                    }}
                    />
            </View>
            {markedDates === null && 
                <ActivityIndicator size="large" className="absolute top-1/2 left-1/2 opacity-100 " />}
        </View>
    )
}

export {HomeCalendar}