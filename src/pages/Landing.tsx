import * as React from 'react'
import {
    NativeModules,
    Image,
    Text,
    View,
    TextInput
  } from 'react-native';
import CryptoES from 'crypto-es';

const InputPassword:React.FC<{}> = () => {
    const [password, setPassword] = React.useState("")
    console.log("mounted")
    return (
        <View className='  border-4 rounded-lg bg-white border-green-400 mt-10 flex flex-col p-10' >
            <Text className='text-xl font-extrabold'>Log In</Text>
            <TextInput className='border border-black mt-4 rounded-md' 
                secureTextEntry={true}
                value={password}
                onChangeText={text=>setPassword(text)}
                placeholder='Password'
            />
            <Text className='text-xl mt-4 font-bold border rounded-lg p-2 w-[84px]  bg-theme-green'>Submit</Text>	
        </View>
    )
}

const Landing : React.FC<{}> = () =>{
    React.useEffect(()=>{
        (()=>{
            try {
                
                const encrypted = CryptoES.AES.encrypt("message", "mypass");
                console.log(encrypted)
                const encrypted_parts_req = {blockSize:encrypted.blockSize, ciphertext:encrypted.ciphertext, iv:encrypted.iv, ket : encrypted.key, salt:encrypted.salt}
                const decrypted = CryptoES.AES.decrypt(encrypted_parts_req, "mypass");
                console.log(decrypted.toString(CryptoES.enc.Utf8))
                
                const wrongdecrypted = CryptoES.AES.decrypt(encrypted, "notmypass");
                console.log(wrongdecrypted.toString(CryptoES.enc.Utf8))
            } catch (error) {
                console.log(error)
                throw error;
            }
            
        })()
    },[])
    const journalingVideo = require("../../assets/journaling.gif")
    return (
        <View className='bg-theme-blue h-screen flex flex-col p-2 justify-center'>
            <View className='h-1/3 flex items-center'>
                <Image source={journalingVideo}  className='h-full object-contain 'style={{
                    objectFit:"contain"
                }} />
            </View>
            <InputPassword />
        </View>
    )
} 

export {Landing}