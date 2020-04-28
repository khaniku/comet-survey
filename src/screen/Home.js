import React, {useState, useEffect} from 'react';
import { View, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Survey from './surveys';
import DrawerContent from '../components/sidebar'
import LoginScreen from "./auth/Login";
import { useSelector, useDispatch } from "react-redux";
import SignupScreen from './auth/SignUp';
import ResetPasswordScreen from './auth/ResetPassword';
import AuthLoadingScreen from './auth/AuthLoading';
import SurveyDetailsScreen from './surveyDetails'
import Profile from './profile'
import * as Device from 'expo-device';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { storePushToken } from "../actions/api";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Login() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: 'pop',
          headerShown: false
        }}
        component={LoginScreen} />
      <Stack.Screen name="Sign_up" options={{title: null}} component={SignupScreen} />
      <Stack.Screen name="Reset_password" options={{title: null}} component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}


function Surveys() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Survey" options={{
        headerShown: false
        }}
        component={Survey} 
      />
      <Stack.Screen name="Details" component={SurveyDetailsScreen} options={({ route }) => ({ title: route.params.title })} />
      <Stack.Screen name="profile" options={{
        headerShown: false
        }} component={Profile} />
    </Stack.Navigator>
  );
}

function mainDrawer() {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator drawerContent={props => DrawerContent(props, user, dispatch)}>
        <Drawer.Screen name="Home" component={Surveys} />
    </Drawer.Navigator>
  )
}

async function registerForPushNotificationsAsync(user, auth) {

  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    console.log('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  storePushToken(user.userId, token, user.accessToken, Device.brand)
}



export default function App() { 
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    registerForPushNotificationsAsync(user, auth);
    
  }, [])
  
  return (
    <Stack.Navigator>
       <Stack.Screen options={{ headerShown: false}}  name="Home" component={mainDrawer} />
       <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  DrawersContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  DrawersSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});