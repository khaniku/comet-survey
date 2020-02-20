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
                lastname: '',
                first_name: '',
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
            <KeyboardAwareScrollView style={{backgroundColor: "#fff", flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.containerView}>
                        <View style={styles.login_form}>
                        <Image source={logo} style={styles.image}  resizeMode='contain'  />
                        {this.state.errors.showError ? (
                            <Text style={ styles.error_text} >{this.state.errors.errorText}</Text>
                        ) : null}
                        <Text style={styles.normal_text}>First name</Text>
                        <TextInput placeholder="First Name"  onChangeText={(text) => this.state.user.firstname = text}
                                    placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                                />
                        <Text style={styles.normal_text}>Last name</Text>
                        <TextInput placeholder="Last Name"  onChangeText={(text) => this.state.user.lastname = text}
                                    placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                                />
                        <Text style={styles.normal_text}>Email</Text>
                        <TextInput placeholder="Email"  onChangeText={(text) => this.state.user.email = text}
                                    placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                                />
                        <Text style={styles.normal_text}>Password</Text>

                        <PasswordInputText placeholder="Password"  onChangeText={(text) => this.state.user.password = text}
                                            placeholderColor="#c4c3cb" style = {styles.error_input}/>
                        {!this.state.loading ?
                            <ELementButton
                                buttonStyle={styles.loginButton}
                                onPress={() => this.onGetStarted()}
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

    onGetStarted() {

        if (this.state.user.email.length === 0) {
            this.setState({ errors: { showError: true, errorText: 'The Email is empty!' } });
        }
        else if (this.state.user.first_name.length === 0) {
            this.setState({ errors: { showError: true, errorText: 'The First Name is empty!' } });
        }
        else if (this.state.user.lastname.length === 0) {
            this.setState({ errors: { showError: true, errorText: 'The Last Name is empty!' } });
        }
        else {
                // this.setState({ loading: true })
                // let user = this.state.user;
                // user.master_doman = user.master_doman;
                // console.log(JSON.stringify(user));
                // fetch("http://ubuxaapi.ubuxa.net/site/customer-signup/", {
                //     method: 'POST',
                //     headers: {
                //         Accept: 'application/json',
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(user),
                // })
                //     .then((responseJson) => {
                //         responseJson = responseJson._bodyText;
                //         console.log(responseJson);
                //         responseJson = responseJson.substring(0, responseJson.length - 4);
                //         let data = JSON.parse(responseJson);
                //         this.setState({ loading: false })
                //         if (data.status === 1) {
                //             this.setState({ errors: { showError: false, errorText: '' } });
                //             Globals.email = this.state.user.master_email;
                //             this.props.navigation.navigate('Validate_Code');
                //         }
                //         else {
                //             // this.setState({errors:{ showError: true , errorText: data.errors.maser_email}});
                //             if (data.errors.master_email != null)
                //                 this.setState({ errors: { showError: true, errorText: data.errors.master_email } });
                //             if (data.errors.master_doman != null)
                //                 this.setState({ errors: { showError: true, errorText: data.errors.master_doman } });
                //         }
                //     })
                //     .catch((error) => {
                //         this.setState({ loading: false })
                //         console.log(error);
                //     });
        }

    }

}
