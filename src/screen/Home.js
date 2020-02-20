// import React from 'react';
// import { StyleSheet, Text, View, StatusBar } from 'react-native';
// import { Root } from "native-base";

// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import LoginScreen from './auth/Login.js';
// import Pending from './surveys/Pending.js';
// import SignupScreen from "./auth/SignUp.js";
// import ResetPasswordScreen from "./auth/ResetPassword";
// import SideBar from "../components/sidebar";
// import AuthLoadingScreen from "./auth/AuthLoading";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// const Drawer1 = createDrawerNavigator(
//   {
//     PendingSurveys: { screen: Pending },
//   },

//   {
//     initialRouteName: "PendingSurveys",
//     contentOptions: {
//       activeTintColor: "#e91e63"
//     },
//     drawerWidth: wp('80%'),
//     contentComponent: props => <SideBar {...props} />
//   }
// );

// const AuthStackNavigator = createStackNavigator({

//   Login: {
//     screen: LoginScreen,
//     navigationOptions: {
//       headerStyle: { display: "none" },
//       headerLeft: null
//     },
//   },

// });

// const AppNavigator = createStackNavigator({
//   Drawer1: { screen: Drawer1 },
// },
//   {
//     initialRouteName: "Drawer1",
//     headerMode: "none"
//   }
// );
// const AuthContainer = createAppContainer(createSwitchNavigator(
//   {
//     AuthLoading: {
//       screen: AuthLoadingScreen,
//       navigationOptions: {
//         headerStyle: { display: "none" },
//         headerLeft: null
//       },
//     },
//     Home: AppNavigator,
//     Auth: AuthStackNavigator,
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   }
// ));

// const AppContainer = createAppContainer(AuthContainer);

// export default () =>
//   <Root>
//     <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
//     <AppContainer />
//   </Root>;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ff1',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}