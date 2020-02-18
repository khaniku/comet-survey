import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    View,
    StyleSheet, TextInput
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class PasswordInputText extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            icEye: 'visibility-off',
            password: true
        }
    }

    changePwdType = () => {
        let newState;
        if (this.state.password) {
            newState = {
                icEye: 'visibility',
                password: false
            }
        } else {
            newState = {
                icEye: 'visibility-off',
                password: true
            }
        }

        // set new state value
        this.setState(newState)

    };

    render() {
        return (
            <View style={styles.view_style}>
                <TextInput {...this.props}
                           secureTextEntry={this.state.password} style={styles.loginFormTextInput}/>
                <Icon style={styles.icon}
                      name={this.state.icEye}
                      size={this.props.iconSize}
                      color={this.props.iconColor}
                      onPress={this.changePwdType}
                />
            </View>
        );
    }
}


export const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: 15,
        right: 10

    },
    loginFormTextInput: {
        height: hp('5.7%'),
        fontSize: hp('2%'),
        borderRadius: hp('1%'),
        borderWidth: 1,
        borderColor: '#eaeaea',
        paddingLeft: wp('4%'),
        marginTop: 4,
        color: '#2c2c2c',
    },
    view_style: {
       marginLeft: 15,
        marginRight: 15,
    },
});

PasswordInputText.defaultProps = {
iconSize:22,
label: '',
    iconColor: '#b5b5b5'
}

