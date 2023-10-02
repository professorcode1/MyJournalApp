import * as React from 'react'
import {
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
  } from 'react-native';

const Waiting : React.FC<{}> = () =>{
    const writingVideo = require("../../assets/writing.gif")
    const [dots,setDots] = React.useState(0)
    React.useEffect(()=>{
        const dotsInterval = setInterval(()=>{
            setDots(dots => ((dots + 1) % 3))
        }, 1000)

        return () => clearInterval(dotsInterval)
    },[])
    return (
        <View className='bg-theme-blue h-screen flex flex-col p-2 justify-center items-center'>
            <View className='h-64'>
                <Image source={writingVideo}  className='h-full object-contain 'style={{
                    objectFit:"contain"
                }}   />
            </View>
            <View >
                <Text className='text-4xl text-white pl-6'>Please Wait {".".repeat(dots)}</Text>
            </View>
        </View>
    )
} 

export {Waiting}