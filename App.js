import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppScreens from './src/navigations';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Provider} from "react-redux";
import {store} from "./src/redux/index"




export default function App() {
    ScreenOrientation.unlockAsync().then().catch();
    
    return (
            <Provider store={store}>
                <View style={{flex:1}}>
                    <AppScreens/>
                </View>
            </Provider>
    )
}
