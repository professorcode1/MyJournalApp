/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useAppSelector } from './src/redux/store';
import { SCREEN_NAME_TO_SCREEN_COMPONENT_MAP } from './src/pages/screen';
import {store} from './src/redux/store'
import { Provider } from 'react-redux'
function Screen(): JSX.Element {
  const screen_name = useAppSelector(s => s.screen)
  const ScreenJSX = SCREEN_NAME_TO_SCREEN_COMPONENT_MAP.get(screen_name)!
  return <ScreenJSX />
}
function App(): JSX.Element {

  return (  
    <Provider store={store}>
      <SafeAreaView >
        <ScrollView>
        <Screen />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
