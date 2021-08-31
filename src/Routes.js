import React, { useRef, useEffect, useContext } from "react";
import { Image } from 'react-native';
import { AppState, AsyncStorage } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useHttp} from "./hooks/http.hook";
import {Icon} from "./components/icon/Icon";

import ChatsScreen from './screens/chats/ChatsScreen';
import ChatScreen from './screens/chats/chat/ChatScreen';


import ProfileScreen from './screens/profile/ProfileScreen';
import UseProfileScreen from './screens/profile/useProfile/UseProfileScreen';

import SubscriptionsScreen from './screens/profile/subscri/SubscriptionsScreen';
import SubscribersScreen from './screens/profile/subscri/SubscribersScreen';

import ComplaintScreen from './screens/profile/complaint/ComplaintScreen';
import NextComplaintScreen from './screens/profile/complaint/nexComplaint/NextComplaintScreen';

import SetingScreen from './screens/profile/seting/SetingScreen';
import UpdateAccountScreen from './screens/profile/seting/updateAccount/UpdateAccountScreen';
import AboutUsScreen from './screens/profile/seting/aboutUs/AboutUsScreen';
import ContactScreen from './screens/profile/seting/contact/ContactScreen';


import NewEventScreen from './screens/newEvent/NewEventScreen';
import NewEventNextScreen from './screens/newEvent/NewEventNextScreen';
import EventScreen from './screens/event/EventScreen';
import EditingEventScreen from './screens/event/editingEvent/EditingEventScreen';
import GoProfilesScreen from './screens/event/goProfiles/GoProfilesScreen';
import SetingEventScreen from './screens/event/seting/SetingEventScreen';

import HomeScreen from './screens/home/HomeScreen';
import CategoryEventsScreen from './screens/home/categoryEvents/CategoryEventsScreen';
import NotificationsScreen from './screens/home/notifications/NotificationsScreen';

import GeolocationScreen from './screens/geolocation/GeolocationScreen';


import InfoScreen from './screens/auth/registr/info/InfoScreen';
import AuthorizationScreen from './screens/auth/login/AuthorizationScreen';
import RegistrationScreen from './screens/auth/registr/RegistrationScreen';
import CodeCheckScreen from './screens/auth/registr/codeCheck/CodeCheckScreen';

import TelephoneScreen from './screens/auth/login/passwordRecovery/TelephoneScreen';
import CodeScreen from './screens/auth/login/passwordRecovery/CodeScreen';
import PasswordScreen from './screens/auth/login/passwordRecovery/PasswordScreen';
import OkScreen from './screens/auth/login/passwordRecovery/OkScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackRoutes = () => (
  <Tab.Navigator
    initialRouteName='Home'
    tabBarOptions={{
      keyboardHidesTabBar: true
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          if (!focused)
          return (
            <Icon name="home" size={32} />
          ); 
          else 
          return (
            <Icon name="home" size={32} menuU={true}/>
          ); 
        } else if (route.name === 'Geolocation') {
          if (!focused)
          return (
            <Icon name="place" size={31} />
          )
          else 
          return (
            <Icon name="place" size={31} menuU={true}/>
          )
        } else if (route.name === 'NewEvent') {
          if (!focused)
          return (
            <Icon name="add-circle-outline" size={32}/>
          ); 
          else 
          return (
            <Icon name="add-circle-outline" size={32} menuU={true}/>
          ); 
        } else if (route.name === 'Chats') {
          if (!focused)
          return (
            <Icon name="mail-outline" size={32} />
          ); 
          else 
          return (
            <Icon name="mail-outline" size={32} menuU={true}/>
          ); 
        } else if (route.name === 'Profile') {
          if (!focused)
          return (
            <Icon name="perm-identity" size={32} />
          ); 
          else 
          return (
            <Icon name="perm-identity" size={32} menuU={true}/>
          ); 
        }
      }
    })}
  >
    <Tab.Screen name ='Home' component={HomeScreen} options={{ headerShown: false, tabBarLabel:() => {return null} }}/>
    <Tab.Screen name ='Geolocation' component={GeolocationScreen} options={{ headerShown: false, tabBarLabel:() => {return null} }}/>
    <Tab.Screen name ='NewEvent' component={NewEventScreen} options={{ headerShown: false, tabBarLabel:() => {return null} }}/>
    <Tab.Screen name ='Chats' component={ChatsScreen} options={{ headerShown: false, tabBarLabel:() => {return null} }}/>
    <Tab.Screen name ='Profile' component={ProfileScreen} options={{ headerShown: false, tabBarLabel:() => {return null} }}/>
  </Tab.Navigator>
);

export const Routes = isAuthenticated => {
  const {loading, request, error, clearError} = useHttp();

  const appState = useRef(AppState.currentState);

  const config = {
    screens: {
      event: 'event/:itemId',
    },
  };

  const linking = {
    prefixes: ['https://www.moveon-app.com', 'moveon://'],
    config,
  };

  useEffect(() => {0
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // вернулся из background
    }
    appState.current = nextAppState;
    const jwt = await AsyncStorage.getItem("JWT");
    if (appState.current == "background") {
      try {
        await request('/api/profiles/not-online', 'POST', null, {
          Authorization: `${jwt}`
        });
      } catch (e) {}
    } else {
      try {
        await request('/api/profiles/online', 'POST', null, {
          Authorization: `${jwt}`
        });
      } catch (e) {}
    }
  };

  return ( 
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator linking={linking} initialRouteName='Home'>
          <Stack.Screen name='Home' component={StackRoutes} options={{ headerShown: false }}/>
          <Stack.Screen name='Chat' component={ChatScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Seting' component={SetingScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Subscribers' component={SubscribersScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Subscriptions' component={SubscriptionsScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='UseProfile' component={UseProfileScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Event' component={EventScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='EditingEvent' component={EditingEventScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='NewEventNext' component={NewEventNextScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='CategoryEvents' component={CategoryEventsScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='GoProfiles' component={GoProfilesScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='SetingEvent' component={SetingEventScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Notifications' component={NotificationsScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='UpdateAccount' component={UpdateAccountScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Complaint' component={ComplaintScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='NextComplaint' component={NextComplaintScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='AboutUs' component={AboutUsScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Contact' component={ContactScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      ) : ( 
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={AuthorizationScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='Register' component={RegistrationScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='CodeCheck' component={CodeCheckScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Info' component={InfoScreen} options={{ headerShown: false }}/>

          <Stack.Screen name='Telephone' component={TelephoneScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Code' component={CodeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Password' component={PasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Ok' component={OkScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      )} 
    </NavigationContainer>
  );
}