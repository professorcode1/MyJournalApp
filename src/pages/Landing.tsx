import * as React from 'react'
import {
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
  } from 'react-native';
import { setPassword } from '../redux/password';
import { setScreen } from '../redux/screen';
import { useAppDispatch } from '../redux/store';
import { Waiting } from './Waiting';
import {
    is_this_apps_first_open, 
    create_password_file,
    check_password_is_correct,
    delete_password_file
} from "../io/first_open"
interface IInputPassword{
    submit_click:()=> Promise<void> | void,
    title:string,
    passwordInput:string,
    setPasswordInput:React.Dispatch<React.SetStateAction<string>>
}

const InputPassword:React.FC<IInputPassword> = (props) => {
    
    const journalingVideo = require("../../assets/journaling.gif")
    return (
        <View className='bg-theme-blue h-screen flex flex-col p-2 justify-center'>
            <View className='h-1/3 flex items-center' >
            <TouchableOpacity >
                <Image source={journalingVideo}  className='h-full object-contain 'style={{
                    objectFit:"contain"
                }}  />
            </ TouchableOpacity>
            </View>
            <View className='  border-4 rounded-lg bg-white border-green-400 mt-10 flex flex-col p-10' >
                <Text className='text-xl font-extrabold'>{props.title}</Text>
                <TextInput className='border border-black mt-4 rounded-md p-1' 
                    secureTextEntry={true}
                    value={props.passwordInput}
                    onChangeText={props.setPasswordInput}
                    placeholder='Password'
                    />
                <TouchableOpacity  onPress={props.submit_click} >
                    <Text className='text-xl mt-4 font-bold border rounded-lg p-2 w-[84px]  bg-theme-green'>Submit</Text>	
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Landing : React.FC<{}> = () =>{
    const [waiting, setWaiting] = React.useState(true)
    const [passwordInput, setPasswordInput] = React.useState("")
    const [firstOpen, setFirstOpen] = React.useState(false)
    const dispatcher = useAppDispatch()
    const submit_click_login = async () => {
        if(passwordInput.length === 0 ){
            Alert.alert("Password cannot be empty")
        }else{
            setWaiting(true)
            if(await check_password_is_correct(passwordInput)){
                dispatcher(setPassword(passwordInput))
                dispatcher(setScreen("HOME"))
            }else{
                Alert.alert("Password appears to be incorrect")
            }
            setWaiting(false)

        }
    }
    const submit_click_createPass =async () => {
        if(passwordInput.length === 0 ){
            Alert.alert("Password cannot be empty")
        }else{
            setWaiting(true)
            await create_password_file(passwordInput)
            setWaiting(false)
            dispatcher(setPassword(passwordInput))
            dispatcher(setScreen("HOME"))
        }
    }
    React.useEffect(()=>{
        (async ()=>{
            // await delete_password_file()
            setFirstOpen(await is_this_apps_first_open())
            setWaiting(false)
        })()
    },[])

    if(waiting){
        return <Waiting />
    }
    if(firstOpen){

        return <InputPassword title='Create Password' submit_click={submit_click_createPass} passwordInput={passwordInput} setPasswordInput={setPasswordInput} />
    }else{
        return <InputPassword title='Log In' submit_click={submit_click_login} passwordInput={passwordInput} setPasswordInput={setPasswordInput} />
    }
} 

export {Landing}