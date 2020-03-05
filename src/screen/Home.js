import React from 'react';
import { View, StyleSheet } from 'react-native';
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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SignupScreen from './auth/SignUp';
import ResetPasswordScreen from './auth/ResetPassword';
import AuthLoadingScreen from './auth/AuthLoading';
import SurveyDetailsScreen from './surveyDetails'
import Profile from './profile'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Login() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign_up" component={SignupScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
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
      <Stack.Screen name="Details" component={SurveyDetailsScreen} />
      <Stack.Screen name="profile" options={{
        headerShown: false
        }} component={Profile} />
    </Stack.Navigator>
  );
}


export default function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  return (
    <Drawer.Navigator drawerContent={props => DrawerContent(props, user, dispatch)}>
      <Drawer.Screen name="Home" component={Surveys} />
    </Drawer.Navigator>
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