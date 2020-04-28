import React, { Component } from "react";
import styles from "./style";
import { Keyboard, Text, View, TextInput, Picker, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Image, StatusBar, ActivityIndicator, Platform } from 'react-native';
import { Icon, Header, Left, Button } from 'native-base';
import logo from '../../../assets/logo.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button as ElementButton } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {resetPassword, validateToken, changePassword} from '../../actions/api';
import PasswordInputText from "../../components/passwordInput";

export default class ChangePasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            password: '',
            token: '',
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
                            <Text style={styles.normal_text}>Change your password</Text>
                            <Text style={styles.normal_text}>Password</Text>
                            <PasswordInputText placeholder="Password"  onChangeText={(text) => this.state.password = text}
                                 placeholderColor="#c4c3cb" style = {styles.error_input}/>
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

    async componentDidMount() {
        let { route } = this.props;
        let param = route.params;
        let token = param.token;
        this.setState({token: token})
        let that = this;
        await validateToken(token).then(function (responseJson) {
            if(!responseJson.success){
                alert(responseJson.message)
                that.props.navigation.push('Auth')
            }
        })
    }

    componentWillUnmount() {
    }

    onSendPress() {
        const token = this.state.token;
        let that = this;
        if(this.state.password.length <= 4) {
                this.setState({errors:{ showError: true , errorText: 'Password should be longer than 4 characters'}});
        }else{
            this.setState({loading: true})
            changePassword(token, this.state.password).then(function (responseJson) {
                if(responseJson.success){
                    alert("Password changed")
                    that.setState({loading: false})
                    that.setState({ errors: { showError: true, errorText: '' } });
                } else {
                    that.setState({ errors: { showError: true, errorText: responseJson.message } });
                }
            })
        }
    }

}
