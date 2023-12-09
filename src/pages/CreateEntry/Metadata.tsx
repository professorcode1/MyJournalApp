import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
    Image,
    Text,
    View,
    TextInput,
    ScrollView,
    SafeAreaView ,
    Button,
    TouchableOpacity
  } from 'react-native';
import { updateSingleAttributeOfDiaryEntry } from '../../redux/current_entry';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from "react-native-slider";

const MetaDataSingleInput: React.FC<{
    name:string, 
    value:string, 
    onChange:(text:string)=>void,
    numericKeyboard?:boolean,
    viewOnly:boolean
}> = (props) => {
    props.numericKeyboard = props.numericKeyboard === undefined ? false : props.numericKeyboard
    return (
    <>
            <Text className='m-4 text-xl mb-1'> {props.name}</Text>
            {props.viewOnly || <TextInput className='border border-black m-4 p-4 mt-0 mb-0 rounded-md text-base ' 
                    value={props.value}
                    onChangeText={props.onChange}
                    multiline={true}
                    keyboardType={props.numericKeyboard ? "numeric" : "default"}
                />}
            {props.viewOnly && <Text className='border border-black m-4 p-4 mt-0 mb-0 rounded-md text-base ' >
            {props.value}</Text>}
    </>
)}

const DateInput: React.FC<{}> = (props) => {
    const {date} = useAppSelector(s => s.currentEntry)
    const [show, setShow] = React.useState(false)
    const dateObject = new Date(date.split('/').reverse().join('-'))
    // const dateObject = date.split('/')
    const dispatcher = useAppDispatch()
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        dispatcher(updateSingleAttributeOfDiaryEntry({
            entry_name:"date",
            value:currentDate.toLocaleDateString("en-GB")
        }))
      };
    return (
    <>
        <Text className='m-4 text-xl mb-1'> Date</Text>
        <TouchableOpacity onPress={()=>{setShow(true)}}>
            <Text className='border border-black m-4 p-4 mt-0 mb-0 rounded-md text-base '>
                {date}
            </Text>
        </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateObject}
              mode='date'
              onChange={onChange}
            />
        )}
    </>
    )
}

const ImportanceInput: React.FC<{viewOnly:boolean}> = ({viewOnly}) =>{
    const importance = useAppSelector(s => s.currentEntry.importance)
    const dispatcher = useAppDispatch()
    return (
        <View >
            <Text className='m-4 text-xl mb-1'>Importance :: {importance}%</Text>
            <Slider
                className='m-4 p-4 mt-0 mb-0'
                value={importance/100.0}
                disabled={viewOnly}
                onValueChange={(newImp)=>{
                    dispatcher(updateSingleAttributeOfDiaryEntry({
                        entry_name:"importance",
                        value:Math.floor(newImp * 100.0)
                    }));
                }}
            />
        </View>
    )
}

const Metadata : React.FC<{viewOnly?:boolean}> = ({viewOnly}) => {
    const {
        date,
        tldr,
        notes} = useAppSelector(s => s.currentEntry)
    const dispatcher = useAppDispatch()
    viewOnly = viewOnly === undefined ? false : viewOnly
    return (
        <View className='border border-black bg-white m-4 pb-4'>

            {viewOnly || <DateInput />}
            {viewOnly  && <MetaDataSingleInput
                viewOnly={true}
                value={date}
                onChange={(t)=>{}}
                name='Date'
             />}


            <MetaDataSingleInput 
                viewOnly={viewOnly}
                name='TLDR' 
                value={tldr} 
                onChange={newTLDR => dispatcher(updateSingleAttributeOfDiaryEntry({
                    entry_name:"tldr",
                    value:newTLDR
                }))} 
            />
            <MetaDataSingleInput 
                name='Notes' 
                viewOnly={viewOnly}
                value={notes} 
                onChange={newNotes => dispatcher(updateSingleAttributeOfDiaryEntry({
                    entry_name:"notes",
                    value:newNotes
                }))} 
            />
            <ImportanceInput viewOnly={viewOnly} />
            
        </View>
    )
}

export {Metadata}