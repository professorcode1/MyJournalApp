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
import { IDiaryEntry, loadEntry } from "../../redux/current_entry";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setScreen } from "../../redux/screen";
import { setEntriesMapAndMarkedDates } from "../../redux/homepage";
import { ColorInterpolator } from "../../redux/homepage";

const SelectedDateEntires:React.FC<{selectedDate:string|null}> = ({selectedDate}) =>{
    if(selectedDate === null){
        return null
    }
    const dispatcher = useAppDispatch()
    const {entriesMap} = useAppSelector(s => s.homepage)
    return (
        <View className="m-1 border-t border-black mt-2 pt-2 ml-1">
        <Text className="text-xl">Entries on {selectedDate}</Text>
        <ScrollView horizontal>
            {(entriesMap[selectedDate] || []).map((entry,index) => {
                return (
                    <TouchableOpacity key={`KEY_PROP_FOR_REACT_LIST_OF_ENTRIES_IN_ENTRY_SELECTOR_HOMEPAGE${index}`} className="rounded-full h-8 w-8 m-1 p-1 border border-black" style={{
                        backgroundColor:ColorInterpolator(entry.importance/100.0)
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
    )

}

const HomeCalendar:React.FC<{}> = () => {
    const dispatcher = useAppDispatch()
    const {markedDates, entriesMap, currentMonthDate} = useAppSelector(s => s.homepage)
    const populateEntries = async (date_:Date)=>{
        dispatcher(setEntriesMapAndMarkedDates([
            await get_all_entries_for_this_month(date_.getMonth()+1, date_.getFullYear()),
            date_.toLocaleDateString("en-GB").split('/').reverse().join('-')
            ]))
    };
    const [selectedDate, setSelectedDate] = React.useState<string|null>(null)
    React.useEffect(()=>{
        if(markedDates === null){ //first render of homepage
            populateEntries(new Date())
        }else{
            populateEntries(new Date(currentMonthDate))
        }
    }, [])
    return (
        <View className="w-full bg-white p-1 relative ">
            <View className={ markedDates === null ? "opacity-25" : ""}>

                <Text className="text-3xl border-b border-slate-500 m-1">
                    View Entries
                </Text>
                <Calendar 
                    className="m-1"
                    markedDates={markedDates}
                    current={currentMonthDate}
                    onDayPress={input=>{
                        setSelectedDate(input.dateString.split('-').reverse().join('/'))
                    }}
                    onMonthChange={input=>{
                        setSelectedDate(null)
                        populateEntries(new Date(input.dateString))
                    }}
                />
                <SelectedDateEntires selectedDate={selectedDate} />

            </View>
            {markedDates === null && 
                <ActivityIndicator size="large" className="absolute top-1/2 left-1/2 opacity-100 " />}
        </View>
    )
}

export {HomeCalendar}