import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {connect} from 'react-redux';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let userToken = '';
    await SecureStore.getItemAsync('access_token').then(function(data) {
        userToken = data;
    })
    console.warn("usertoken "+ this.props.accessToken)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Home' : 'Auth');
    if(this.props.accessToken == null){
      SecureStore.deleteItemAsync('access_token')
      this.props.navigation.replace('Auth')
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {accessToken: state.accessToken}
}

export default connect(mapStateToProps)(AuthLoadingScreen)