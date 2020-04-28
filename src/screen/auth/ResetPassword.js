import React, { Component } from "react";
import styles from "./style";
import { Keyboard, Text, View, TextInput, Picker, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Image, StatusBar, ActivityIndicator, Platform } from 'react-native';
import { Icon, Header, Left, Button } from 'native-base';
import logo from '../../../assets/logo.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button as ElementButton } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {resetPassword} from '../../actions/api';

export default class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            errors: {
                errorText: '',
                showError: false,
            }
        };
    }

    render() {
        return (
             <KeyboardAwareScrollView style={styles.containerView}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.login_form}>
                            <Image source={logo} style={styles.images}  resizeMode='contain'  />
                            {this.state.errors.showError ? (
                                <Text style={ styles.error_text} >{this.state.errors.errorText}</Text>
                            ) : null}
                            <Text style={styles.normal_text}>Please fill out your email. A link to reset password will be sent there.</Text>
                            <Text style={styles.normal_text}>Email Address</Text>
                            <TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text) => this.setState({email: text, errors: { showError: false, errorText: '' }})} />
                            {!this.state.loading ?
                                <ElementButton
                                    buttonStyle={styles.loginButton}
                                    onPress={() => this.onSendPress()}
                                    textStyle={{ color: "#FFFFFF", fontSize: hp('2.2%'), fontWeight: "bold" }}
                                    title="SEND"
                                /> :
                                <View style={styles.loginButton}>
                                    <ActivityIndicator size="large" color="#fff" style={{ marginTop: 7 }} />
                                </View>}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        );
    }

    componentDidMount() {
        // let { route } = this.props;
        // let param = route.params;
        // console.log("param: "+param.token)
    }

    componentWillUnmount() {
    }

    onSendPress() {
        const email = this.state.email;
        let that = this;
        if(this.state.email.length == 0) {
                this.setState({errors:{ showError: true , errorText: 'The Email is empty!'}});
        }else{
            this.setState({loading: true})
            resetPassword(email).then(function (responseJson) {
                if(responseJson.success){
                    alert("Please check your email")
                    that.props.navigation.navigate('Login');
                    that.setState({loading: false})
                    that.setState({ errors: { showError: true, errorText: '' } });
                } else {
                    that.setState({loading: false})
                    that.setState({ errors: { showError: true, errorText: responseJson.message } });
                }
            })
        }
    }

}
