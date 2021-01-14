import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';
import DashboardNavigations from './DashboardNavigations';

const Stack = createStackNavigator();

export default function MainNavigation() {

    return (
       <Stack.Navigator headerMode='none'>
            <Stack.Screen name="LoginScreen" component={LoginScreen}  />
            <Stack.Screen name="DashboardScreens" component={DashboardNavigations} />
      </Stack.Navigator>
    )
}
