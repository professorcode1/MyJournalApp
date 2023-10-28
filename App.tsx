/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useAppSelector } from './src/redux/store';
import { SCREEN_NAME_TO_SCREEN_COMPONENT_MAP } from './src/pages/screen';
import {store} from './src/redux/store'
import { Provider } from 'react-redux'
import { print_all_file_names } from './src/io/filesyste';
import { delete_all_entries } from './src/io/entries';
function Screen(): JSX.Element {
  const screen_name = useAppSelector(s => s.screen)
  const ScreenJSX = SCREEN_NAME_TO_SCREEN_COMPONENT_MAP.get(screen_name)!
  console.log("Mounting screen ::\t", screen_name )
  return <ScreenJSX />
}
function App(): JSX.Element {
  React.useEffect(()=>{
    (async ()=>{

    })()
  },[])
  return (  
    <Provider store={store}>
          <Screen />
    </Provider>
  );
}

export default App;
