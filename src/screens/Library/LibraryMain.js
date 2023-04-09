import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Library from './Library'
import ExperimentScreen from './ExperimentScreen'
const Stack = createStackNavigator();
export default function LibraryMain() {
    return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Library" component={Library} />
          <Stack.Screen name="Experiment" component={ExperimentScreen} />
        </Stack.Navigator>
    )
}
