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

const MetaDataSingleInput: React.FC<{
    name:string, 
    value:string, 
    onChange:(text:string)=>void,
    numericKeyboard:boolean
}> = (props) => {
    return (
    <>
            <Text className='m-4 text-xl mb-1'> {props.name}</Text>
            <TextInput className='border border-black m-4 p-4 mt-0 mb-0 rounded-md text-base ' 
                    value={props.value}
                    onChangeText={props.onChange}
                    multiline={true}
                    keyboardType={props.numericKeyboard ? "numeric" : "default"}
                />
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


const Metadata : React.FC<{}> = () => {
    const {
        importance,
        tldr,
        notes} = useAppSelector(s => s.currentEntry)
    const dispatcher = useAppDispatch()
    return (
        <View className='border border-black bg-white m-4 pb-4'>

            <DateInput />
            <MetaDataSingleInput 
                numericKeyboard={false} 
                name='TLDR' 
                value={tldr} 
                onChange={newTLDR => dispatcher(updateSingleAttributeOfDiaryEntry({
                    entry_name:"tldr",
                    value:newTLDR
                }))} 
            />
            <MetaDataSingleInput 
                numericKeyboard={false} 
                name='Notes' 
                value={notes} 
                onChange={newNotes => dispatcher(updateSingleAttributeOfDiaryEntry({
                    entry_name:"notes",
                    value:newNotes
                }))} 
            />
            <MetaDataSingleInput 
                numericKeyboard={true} 
                name='Importance' 
                value={String(importance)} 
                onChange={newImportance => dispatcher(updateSingleAttributeOfDiaryEntry({
                    entry_name:"importance",
                    value:newImportance
                }))} 
            />
            
        </View>
    )
}

export {Metadata}