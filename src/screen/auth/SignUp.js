import React, { Component } from "react";
import styles from "./style";
import { Keyboard, Text, View, TextInput, Picker, TouchableWithoutFeedback,SafeAreaView, StatusBar, Alert, KeyboardAvoidingView, Image, Platform, ActivityIndicator } from 'react-native';
import logo from '../../../assets/logo.png';
import { Button as ELementButton } from "react-native-elements";
import { Icon, Header, Left, Button } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PasswordInputText from "../../components/passwordInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class SignupScreen extends Component {

    constructor(pros) {
        super(pros);
        this.state = {
            loading: false,
            user: {
                email: '',
                lastName: '',
                firstName: '',
                username: '',
                password: '',
                role: 'Surveyor'
            },
            errors: {
                errorText: '',
                showError: false,
            }

        };
    }

    render() {
        return (
            <KeyboardAwareScrollView style={{backgroundColor: "#fff", flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.containerView}>
                        <View style={styles.login_form}>
                        <Image source={logo} style={styles.image}  resizeMode='contain'  />
                        {this.state.errors.showError ? (
                            <Text style={ styles.error_text} >{this.state.errors.errorText}</Text>
                        ) : null}
                        <Text style={styles.normal_text}>First name</Text>
                        <TextInput placeholder="First Name"  onChangeText={(text) => this.state.user.firstName = text}
                                    placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                                />
                        <Text style={styles.normal_text}>Last name</Text>
                        <TextInput placeholder="Last Name"  onChangeText={(text) => this.state.user.lastName = text}
                                    placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                                />
                        <Text style={styles.normal_text}>Email</Text>
                        <TextInput placeholder="Email"  onChangeText={(text) => this.state.user.email = text}
                                    placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                                />
                        <Text style={styles.normal_text}>Username</Text>
                        <TextInput placeholder="Username"  onChangeText={(text) => this.state.user.username = text}
                                    placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                                />
                        <Text style={styles.normal_text}>Password</Text>

                        <PasswordInputText placeholder="Password"  onChangeText={(text) => this.state.user.password = text}
                                            placeholderColor="#c4c3cb" style = {styles.error_input}/>
                        {!this.state.loading ?
                            <ELementButton
                                buttonStyle={styles.loginButton}
                                onPress={() => this.signUp()}
                                textStyle={{ color: "#FFFFFF", fontSize: hp('2.2%'), fontWeight: "bold" }}
                                title="SIGN UP"
                            /> :
                            <View style={styles.loginButton}>
                                <ActivityIndicator size="large" color="#fff" style={{ marginTop: 8 }} />
                            </View>}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    async signUp() {

        if (this.state.user.email.length === 0) {
            this.setState({ errors: { showError: true, errorText: 'The Email is empty!' } });
        }
        else if (this.state.user.firstName.length === 0) {
            this.setState({ errors: { showError: true, errorText: 'The First Name is empty!' } });
        }
        else if (this.state.user.lastName.length === 0) {
            this.setState({ errors: { showError: true, errorText: 'The Last Name is empty!' } });
        }
        else if (this.state.user.username.length === 0) {
            this.setState({ errors: { showError: true, errorText: 'The Username is empty!' } });
        }
        else {
            this.setState({ loading: true })
            let user = this.state.user;
            await fetch("http://localhost:5000/api/auth/signup", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then((response) => {
                response.json().then(responseJson => {
                if(responseJson.success){
                    this.setState({loading: false})
                    this.setState({errors:{ showError: false , errorText: ''}});
                    this.props.navigation.navigate('Home');
                } else {
                    this.setState({loading: false})
                    this.setState({errors:{ showError: true , errorText: responseJson.message}});
                }
                });
            })
            .catch((error) => {
            this.setState({loading: false})
            this.setState({errors:{ showError: true , errorText: 'Something went wrong. Please try again!'}});
            console.log(error);
            });
        }

    }

}
