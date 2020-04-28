import React from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage, StatusBar, ActivityIndicator } from 'react-native';
import { Root, StyleProvider } from "native-base";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
import { createStackNavigator } from '@react-navigation/stack';
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
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, useLinking } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import { Linking } from 'expo';
import ChangePasswordScreen from './screen/auth/ChangePassword.js';

Asset;
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        gestureEnabled: false
        }}
        component={LoginScreen} 
      />
      <Stack.Screen name="Sign_up" component={SignupScreen}  options={{
        title: "Sign Up"
        }}/>
      <Stack.Screen name="Reset_password" options={{
        title: "Reset Password"
        }} component={ResetPasswordScreen} />
      <Stack.Screen name="changePassword" options={{
        title: "Change Password"
        }} component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" options={{
          headerShown: false,
          title: "Survey"
          }}
          component={HomeScreen} 
        />
        
    </Stack.Navigator>
  )
}

function AuthCheck() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="AuthLoading" options={{
        headerShown: false,
        }}
        component={AuthLoadingScreen} 
      />
      <Stack.Screen name="Home" options={{
        headerShown: false
        }} component={Home}  />
      <Stack.Screen name="Auth" options={{
        headerShown: false,
        gestureEnabled: false
        }} component={AuthStack} />
    </Stack.Navigator>
  )
}

// const AuthStackNavigator = createStackNavigator({

//   Login: {
//     screen: LoginScreen,
//     navigationOptions: {
//       title: null,
//       headerShown: false,
//       headerStyle: {
//         backgroundColor: 'none',
//       },
//     },
//   },
//     Sign_up: {
//       screen: SignupScreen,
//       navigationOptions: {
//         title: null,
//         backgroundColor: 'none',
//       },
//       headerShown: false,
//     },
//     Reset_password: {
//       screen: ResetPasswordScreen,
//       navigationOptions: {
//         title: null,
//       },
//     },
// });

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {
//       title: 'Survey',
//       headerShown: false
//     },
//   },
// })


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

const persistConfig = {
  key: "root", // name of the key for storing the data
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

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const prefix = Linking.makeUrl("/");

export default function App() {
  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      changePassword: "changePassword/:token"
    }
  });


  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150)
      ),
    ])
      .catch(e => {
        console.error(e);
      })
      .then(state => {
        if (state !== undefined) {
          console.log(state)
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return(
    <Provider store={store}>
      <PersistGate loading={renderLoading()} persistor={persistor}>
        <Root>
          {/* <StatusBar barStyle="dark-content" hidden={true}  /> */}
          <PaperProvider>
            <NavigationContainer initialState={initialState} ref={ref}>
              <AuthCheck />
              <FlashMessage position="top" /> 
            </NavigationContainer>
          </PaperProvider>
        </Root>
      </PersistGate>
    </Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

