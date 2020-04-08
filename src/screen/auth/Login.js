import React, { Component } from "react";
import styles from "./style";
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  Platform
} from 'react-native';
import { Button } from 'react-native-elements';
import logo from '../../../assets/logo.png';
import PasswordInputText from "../../components/passwordInput";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as SecureStore from 'expo-secure-store';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: {
        email: '',
        password: ''
      },
      errors: {
        errorText: '',
        showError: false,
      }
    };
  }
  render() {
    return (
      <KeyboardAwareScrollView style={styles.containerView} >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>

          <View style={styles.loginFormView} style={styles.login_form}>
            <Image source={logo} style={styles.image}  resizeMode='contain'  />
            {this.state.errors.showError ? (
                <Text style={ styles.error_text} >{this.state.errors.errorText}</Text>
            ) : null}
            <Text style={styles.normal_text}>Email</Text>
            <TextInput placeholder="Email"  onChangeText={(text) => this.state.user.email = text}
                        placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                      />
            <Text style={styles.normal_text}>Password</Text>

            <PasswordInputText placeholder="Password"  onChangeText={(text) => this.state.user.password = text}
                                 placeholderColor="#c4c3cb" style = {styles.error_input}/>
            {!this.state.loading ? 
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                textStyle={{ color: "#FFFFFF", fontSize: hp('2.4%'),fontWeight: "bold" }}
                title="LOGIN"
              />:
              <View style={styles.loginButton}>
                <ActivityIndicator size="large" color="#fff" style={{marginTop: 7}}/>
              </View> }
            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onSignUpPress()}
              textStyle={{ color: "#FFFFFF", fontSize:  hp('2.4%'),fontWeight: "bold" }}
              title="SIGN UP"
              color="#ffffff"
            />
          </View>
          <Text  style={styles.forgot_password_text}>Forgot your password? <Text onPress={() => this.onForgotBtnPress()} style={styles.blue_text}>Reset password</Text></Text>

        </View>

      </TouchableWithoutFeedback>

      </KeyboardAwareScrollView>
    );
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onLoginPress() {
    if(this.state.user.email.length == 0)
    {
       this.setState({errors:{ showError: true , errorText: 'The Username is empty!'}});
    }
    else if(this.state.user.password.length == 0)
    {
      this.setState({errors:{ showError: true , errorText: 'The Password is empty!'}});
    }
    else {
      this.setState({loading: true})
      this.login();
    }
  }

  async login () {
    let user = this.state.user;
    await fetch("http://159.203.100.198:5000/api/auth/signin", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usernameOrEmail: user.email,
        password: user.password
      }),
    })
        .then((response) => {
          if (response.ok) {
            response.json().then(responseJson => {
              this.setState({loading: false})
              SecureStore.setItemAsync('access_token', responseJson.accessToken);
              this.props.Auth(responseJson.accessToken);
              this.props.User(responseJson);
              this.setState({errors:{ showError: false , errorText: ''}});
              this.props.navigation.navigate('Home');
            });
          }else{
            this.setState({loading: false})
            this.setState({errors:{ showError: true , errorText: 'The Username or Password is incorrect!'}});
          }
        })
        .catch((error) => {
          this.setState({loading: false})
          this.setState({errors:{ showError: true , errorText: 'Something went wrong. Please try again!'}});
          console.log(error);
        });
  }

  async onSignUpPress() {
    this.props.navigation.navigate('Sign_up')
  }

  onForgotBtnPress() {
    this.props.navigation.navigate('Reset_password')
  }

}
export default connect(null, actions)(LoginScreen)

