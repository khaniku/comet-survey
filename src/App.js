import React from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage, StatusBar, ActivityIndicator } from 'react-native';
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
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

Asset;

const AuthStackNavigator = createStackNavigator({

  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: null,
      headerShown: false,
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
      headerShown: false
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
  key: "root90", // name of the key for storing the data
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


export default () =>

  <Provider store={store}>
    <PersistGate loading={renderLoading()} persistor={persistor}>
      <Root>
        {/* <StatusBar barStyle="dark-content" hidden={true}  /> */}
        <PaperProvider>
          <NavigationContainer>
            <AppContainer />
          </NavigationContainer>
        </PaperProvider>
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


// import * as React from 'react';
// import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const AuthContext = React.createContext();

// function SplashScreen() {
//   return (
//     <View>
//       <Text>Loading...</Text>
//     </View>
//   );
// }

// function HomeScreen() {
//   const { signOut } = React.useContext(AuthContext);

//   return (
//     <View>
//       <Text>Signed in!</Text>
//       <Button title="Sign out" onPress={signOut} />
//     </View>
//   );
// }

// function SignInScreen() {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const { signIn } = React.useContext(AuthContext);

//   return (
//     <View>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Sign in" onPress={() => signIn({ username, password })} />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// export default function App({ navigation }) {
//   const [state, dispatch] = React.useReducer(
//     (prevState, action) => {
//       switch (action.type) {
//         case 'RESTORE_TOKEN':
//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//           };
//         case 'SIGN_IN':
//           return {
//             ...prevState,
//             isSignout: false,
//             userToken: action.token,
//           };
//         case 'SIGN_OUT':
//           return {
//             ...prevState,
//             isSignout: true,
//             userToken: null,
//           };
//       }
//     },
//     {
//       isLoading: true,
//       isSignout: false,
//       userToken: null,
//     }
//   );

//   React.useEffect(() => {
//     // Fetch the token from storage then navigate to our appropriate place
//     const bootstrapAsync = async () => {
//       let userToken;

//       try {
//         userToken = await AsyncStorage.getItem('userToken');
//       } catch (e) {
//         // Restoring token failed
//       }

//       // After restoring token, we may need to validate it in production apps

//       // This will switch to the App screen or Auth screen and this loading
//       // screen will be unmounted and thrown away.
//       dispatch({ type: 'RESTORE_TOKEN', token: userToken });
//     };

//     bootstrapAsync();
//   }, []);

//   const authContext = React.useMemo(
//     () => ({
//       signIn: async data => {
//         // In a production app, we need to send some data (usually username, password) to server and get a token
//         // We will also need to handle errors if sign in failed
//         // After getting token, we need to persist the token using `AsyncStorage`
//         // In the example, we'll use a dummy token

//         dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
//       },
//       signOut: () => dispatch({ type: 'SIGN_OUT' }),
//       signUp: async data => {
//         // In a production app, we need to send user data to server and get a token
//         // We will also need to handle errors if sign up failed
//         // After getting token, we need to persist the token using `AsyncStorage`
//         // In the example, we'll use a dummy token

//         dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
//       },
//     }),
//     []
//   );

//   return (
//     <AuthContext.Provider value={authContext}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           {state.isLoading ? (
//             // We haven't finished checking for the token yet
//             <Stack.Screen name="Splash" component={SplashScreen} />
//           ) : state.userToken == null ? (
//             // No token found, user isn't signed in
//             <Stack.Screen
//               name="SignIn"
//               component={SignInScreen}
//               options={{
//                 title: 'Sign in',
//             // When logging out, a pop animation feels intuitive
//                 animationTypeForReplace: state.isSignout ? 'pop' : 'push',
//               }}
//             />
//           ) : (
//             // User is signed in
//             <Stack.Screen name="Home" component={HomeScreen} />
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthContext.Provider>
//   );
// }
