import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, StatusBar, ActivityIndicator } from 'react-native';
import { Root, StyleProvider } from "native-base";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screen/auth/Login.js';
import SignupScreen from "./screen/auth/SignUp.js";
import ResetPasswordScreen from "./screen/auth/ResetPassword.js";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
//import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from "redux-persist/integration/react";
import { Asset } from 'expo-asset';
import AuthLoadingScreen from "./screen/auth/AuthLoading";
import HomeScreen from "./screen/Home";

Asset;

const AuthStackNavigator = createStackNavigator({

  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: null,
      headerStyle: {
        backgroundColor: 'none',
      },
    },
  },
    Sign_up: {
      screen: SignupScreen,
      navigationOptions: {
        title: null,
        backgroundColor: 'none',
      },
      headerShown: false,
    },
    Reset_password: {
      screen: ResetPasswordScreen,
      navigationOptions: {
        title: null,
      },
    },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Survey',
      //headerShown: false
    },
  },
})


const AuthContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen,
      navigationOptions: {
        headerStyle: { display: "none" },
        headerLeft: null
      },
    },
    Home: AppNavigator,
    Auth: AuthStackNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

const AppContainer = createAppContainer(AuthContainer);

const persistConfig = {
  key: "root0", // name of the key for storing the data
  storage: AsyncStorage // storage to use. defaults to AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
renderLoading = () => {
  <View
    style={{
      flex: 1,
      padding: 20,
      alignContent: 'center',
      justifyContent: 'center',

    }}>
    <ActivityIndicator size="large" color="#1275bc" />
  </View>
}


export default () =>

  <Provider store={store}>
    <PersistGate loading={this.renderLoading()} persistor={persistor}>
      <Root>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
        <AppContainer />
      </Root>
    </PersistGate>
  </Provider>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
