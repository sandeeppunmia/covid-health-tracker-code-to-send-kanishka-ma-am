import { RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_RTP_AVP } from 'expo-av/build/Audio';
import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import App from '../screens/AlarmSetting';
import NearbyAvailable from '../screens/NearbyAvailable';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
    NearbyAvailable:{
        screen:NearbyAvailable
    },
    Alarm:{
        screen:App
    }
   },
   {
       contentComponent:CustomSideBarMenu
   },
   {
       initialRouteName:'Home'
   }
)