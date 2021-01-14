import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppScreens from './src/navigations';


export default function App() {
    return (
            <View style={{flex:1}}>
                <AppScreens/>
            </View>
    )
}
