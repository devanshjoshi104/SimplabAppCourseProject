import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  PermissionsAndroid,
} from 'react-native';
//import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
//import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../Profile/Profile';
import Teams from '../Teams/Teams';
import alerts from '../alerts/alerts';
import Experiments from '../Experiments/Experiments';
import Settings from '../Settings/Settings';
import Lib from '../Library/LibraryMain';
import Router from '../Team/router';
import ExperimentDetail from '../ExperimentDetail/ExperimentDetail';
import settings from '../Settings/Settings';
import experiments from '../Team/experiments';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Teams"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: 'black',
        },
        labelStyle: {
          fontSize: 14,
          margin: 0,
          padding: 0,
        },
        activeTintColor: '#F37A27',
        inactiveTintColor: '#FFFFFF',
      }}>
      <Tab.Screen
        name="Teams"
        component={Teams}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('./images/focus-team.png')
                  : require('./images/white-team.png')
              }
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Alerts"
        component={alerts}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('./images/focus-alert.png')
                  : require('./images/white-alert.png')
              }
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Experiments"
        component={Experiments}
        options={{
          tabBarLabel: 'Experiments',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('./images/focus-exp.png')
                  : require('./images/white-exp.png')
              }
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('./images/focus-settings.png')
                  : require('./images/white-settings.png')
              }
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

export default function Home() {
  useEffect(() => {}, []);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Home" component={HomeTabs} />
      <RootStack.Screen name="Profile" component={Profile} />
      <RootStack.Screen name="Library" component={Lib} />
      <RootStack.Screen name="Router" component={Router} />
      <RootStack.Screen name="ExperimentDetail" component={ExperimentDetail} />
      <RootStack.Screen name="settings" component={settings} />
      <RootStack.Screen name="experiments" component={experiments} />
    </RootStack.Navigator>
  );
}
