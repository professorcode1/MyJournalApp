import * as React from "react"
import {Calendar} from 'react-native-calendars';
import { 
    View,
    Text,
    ActivityIndicator, 
    ScrollView,
    TouchableOpacity
} from "react-native";
import { MarkedDates } from "react-native-calendars/src/types";
import { get_all_entries_for_this_month,convert_entries_array_to_map } from "../../io/entries";
import interpolate from "color-interpolate";
import { IDiaryEntry, loadEntry } from "../../redux/current_entry";
import { useAppDispatch } from "../../redux/store";
import { setScreen } from "../../redux/screen";
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
    const dispatcher = useAppDispatch()
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
                        setSelectedDate(input.dateString.split('-').reverse().join('/'))
                    }}
                    onMonthChange={input=>{
                        setMarkedDates(null)
                        populateEntries(new Date(input.dateString))
                        setSelectedDate(null)
                    }}
                />
                {selectedDate !== null && (
                <View className="m-1 border-t border-black mt-2 pt-2 ml-1">
                    <Text className="text-xl">Entries on {selectedDate}</Text>
                    <ScrollView horizontal>
                        {(entriesMap.get(selectedDate) || []).map((entry,index) => {
                            return (
                                <TouchableOpacity key={`KEY_PROP_FOR_REACT_LIST_OF_ENTRIES_IN_ENTRY_SELECTOR_HOMEPAGE${index}`} className="rounded-full h-8 w-8 m-1 p-1 border border-black" style={{
                                    backgroundColor:importanceColormap.current(entry.importance/100.0)
                                }}
                                onPress={()=>{
                                    dispatcher(loadEntry(entry))
                                    dispatcher(setScreen("VIEW_ENTRY"))
                                }}
                                >
                                    <Text className="text-center text-white" >{index+1}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
                )}
            </View>
            {markedDates === null && 
                <ActivityIndicator size="large" className="absolute top-1/2 left-1/2 opacity-100 " />}
        </View>
    )
}

export {HomeCalendar}