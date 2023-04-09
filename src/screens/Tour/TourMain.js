import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tour1 from './tour1';
import Tour2 from './tour2';
import Tour3 from './tour3';
import Signin from '../AuthScreen/Signin';
import Signup from '../AuthScreen/Signup';
import GetStarted from './GetStarted';
import ForgotPassword from '../AuthScreen/ForgotPassword'


const Stack = createStackNavigator();

export default function TourMain() {
    return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Tour1" component={Tour1} />
          <Stack.Screen name="Tour2" component={Tour2} />
          <Stack.Screen name="Tour3" component={Tour3} />

          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  
        </Stack.Navigator>
    )
}
