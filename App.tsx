/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


function App(): JSX.Element {

  return (
    <SafeAreaView >
      <ScrollView>
        <View>
            <Text>Hello World</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
