import React, { Component } from 'react';
import { View, StatusBar, Text, KeyboardAvoidingView, ActivityIndicator, Platform } from 'react-native'
import { Body, Button, Header, Icon, Left, Right, Title, Tabs, Tab, StyleProvider, Content } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Input } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagePicker, Permissions } from 'expo';
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { updateUser } from "../../actions/api";

import { Caption } from 'react-native-paper';

import styles from './style';




class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            User: [],
            firstname: this.props.user.firstName,
            lastName: this.props.user.lastName,
            username: this.props.user.username,
            email: this.props.user.email,
            fullname: this.props.user.firstName+" "+this.props.user.lastName,
            role: this.props.user.role[0].authority,
            profile_image: '',
            isError: {
                errorText: '',
                showError: false,
            },
            loading: false,
        }

        /*this.handlelastName = this.handlelastName.bind(this);
        this.handleFirstname = this.handleFirstname.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);*/
        this.updateProfile = this.updateProfile.bind(this);
        this.updateProfileImage = this.updateProfileImage.bind(this);
        // this.accessToken = this.props.accessToken;
    }

    async updateProfile() {
        this.setState({loading: true})
        let that = this;
        await updateUser(this.props.user.userId, this.state.firstname, this.state.lastName, this.props.user.accessToken).then(function (data) {
            if (data !== null) {
                that.setState({loading: false})
                that.props.updateUser(that.state.firstname, that.state.lastName);
                that.setState({isError:{ showError: false , errorText: ''}});
            }else{
                that.setState({loading: false})
                that.setState({errors:{ showError: true , errorText: 'Something went wrong, try again later!'}});
            }
        })
    }

    async updateProfileImage(id, accessToken) {
        
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // you would probably do something to verify that permissions
        // are actually granted, but I'm skipping that for brevity
    };


    _pickImage = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });


        if (!result.cancelled) {
            this.setState({ profile_image: result.uri });
        }
    };



    handleFirstName = (text) => {
        this.setState({ firstname: text })
    }
    handlelastName = (text) => {
        this.setState({ lastName: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handleUsername = (text) => {
        this.setState({ username: text })
    }

    render() {
        
            return (
                <KeyboardAwareScrollView style={styles.loginScreenContainer} behavior={Platform.OS === 'ios' ? "padding" : null}>

                    <Header style={styles.headerStyle}>
                        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                        <Left style={{ flex: 1 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="ios-arrow-back" size={32} color="#1275bc" />
                            </Button>
                        </Left>
                        
                        <Right style={{ flex: 1 }}>
                        </Right>
                    </Header>
                    <Content style={{ marginTop: 20, paddingHorizontal: 30 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Avatar
                                size={wp('30%')}
                                source={this.state.profile_image !== null || this.state.profile_image !== '' ? { uri: 'https://ui-avatars.com/api/?name='+this.props.user.firstName+' '+this.props.user.lastName+'?rounded=true' } : {uri: 'https://ui-avatars.com/api/?name='+this.props.user.firstName+' '+this.props.user.lastName+'?rounded=true'}}
                                rounded
                                containerStyle={{ padding: 5, borderColor: '#1275bc', borderWidth: 1.5 }}
                                showEditButton={true}
                                onEditPress={this._pickImage}
                                editButton={
                                    {
                                        name: 'md-camera', type: 'ionicon', size: 30,
                                        underlayColor: '#aaa',
                                        style: { bottom: 5, right: 5, padding: 2, backgroundColor: '#fff' },
                                        containerStyle: { backgroundColor: '#1275bc', width: 26, height: 26, borderRadius: 13, alignItems: 'center' },
                                        iconStyle: { fontSize: 15, marginTop: 5 }
                                    }
                                }
                            />
                            <Text style={{ fontWeight: '600', fontSize: 18, color: '#555', marginTop: 7 }}>{this.props.user.firstName+" "+this.props.user.lastName}</Text>
                            <Caption style={styles.caption}>{this.state.role}</Caption>
                        </View>
                        {this.state.isError.showError ? (
                            <Text style={styles.error_text} >{this.state.isError.errorText}</Text>
                        ) : null}
                        <Input label='First Name' defaultValue={this.props.user.firstName} onChangeText={this.handleFirstName} inputStyle={{}} inputContainerStyle={{ borderRadius: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: '#9393933f', height: 50 }} labelStyle={{ color: '#5557', fontSize: 12, fontWeight: '600', marginBottom: 7 }} containerStyle={{ marginBottom: 15 }} />
                        <Input label='Last Name' defaultValue={this.props.user.lastName} onChangeText={this.handlelastName} inputStyle={{}} inputContainerStyle={{ borderRadius: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: '#9393933f', height: 50 }} labelStyle={{ color: '#5557', fontSize: 12, fontWeight: '600', marginBottom: 7 }} containerStyle={{ marginBottom: 15 }} />
                        <Input label='Username'  disabled={true} value={this.state.username} editable={false} selectTextOnFocus={false} inputStyle={{}} inputContainerStyle={{ borderRadius: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: '#9393933f', height: 50 }} labelStyle={{ color: '#5557', fontSize: 12, fontWeight: '600', marginBottom: 7 }} containerStyle={{ marginBottom: 15 }} />
                        <Input label='Email Address' disabled={true} value={this.state.email} editable={false} selectTextOnFocus={false} inputStyle={{}} inputContainerStyle={{ borderRadius: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: '#9393933f', height: 50 }} labelStyle={{ color: '#5557', fontSize: 12, fontWeight: '600', marginBottom: 7 }} containerStyle={{ marginBottom: 15 }} />
                        <Button block onPress={() => { this.updateProfile() }} style={{ backgroundColor: '#1275bc', marginHorizontal: 10, borderRadius: 15, height: 50, marginTop: 20 }}>
                            {this.state.loading == false ?
                                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>SAVE</Text>
                                : <ActivityIndicator />
                            }
                        </Button>
                    </Content>
                </KeyboardAwareScrollView>
            )
    }
}

const mapStateToProps = state => {
    return { user: state.user, accessToken: state.accessToken }
}



export default connect(mapStateToProps, actions)(Profile);