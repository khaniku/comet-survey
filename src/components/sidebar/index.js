import React, { Component } from "react";
import { View, TouchableOpacity, Image, AppState } from "react-native";
import * as actions from '../../actions';
import {
  Content,
  Text,
  Icon,
  Container,
  Tabs, Tab
} from "native-base";
import { connect } from 'react-redux';
import { Avatar, Divider } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import { SecureStore } from 'expo';


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

   logOut() {
    let that = this;
    this.props.navigation.navigate('Auth')
    SecureStore.deleteItemAsync('access_token')
    that.props.User(null)
    that.props.Auth(null)
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", backgroundColor: '#1275bc', paddingVertical: 30, color: '#fff' }}
        >

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 30 }}>
            <Avatar source={{ uri: this.props.user.photo }} size={50} rounded />
            <View style={{ marginLeft: 5 }}>
              <Text style={{ color: '#fff', marginBottom: 5 }}>{this.props.user.names.fullname}</Text>
              <TouchableOpacity onPress={() => { this.props.navigation.closeDrawer(); this.props.navigation.navigate('EditProfile') }}>
                <Text style={{ color: '#fff', fontSize: 12, textDecorationLine: 'underline' }}>Edit profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Divider style={{ backgroundColor: '#fff3', height: 1 }} />
              <View style={{ flex: 1, backgroundColor: '#1275bc' }}>
                <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => { this.props.navigation.closeDrawer(); this.props.navigation.navigate('FolderView') }}>
                    <Icon name='folder' type='MaterialIcons' style={{ color: '#fff', fontSize: 24 }} />
                    <Text style={{ color: '#fff', marginLeft: 10 }}>Folder Cabinet</Text>
                  </TouchableOpacity>
                  {this.props.navigator !== true ? (
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => { this.props.navigation.closeDrawer(); this.props.navigation.navigate('WorkingFiles') }}>
                      <Icon name='filetext1' type='AntDesign' style={{ color: '#fff', fontSize: 24 }} />
                      <Text style={{ color: '#fff', marginLeft: 10 }}>Documents</Text>
                    </TouchableOpacity>) : null}
                </View>
                <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => { this.logOut() }}>
                    <Icon name='login-variant' type='MaterialCommunityIcons' style={{ color: '#fff', fontSize: 24 }} />
                    <Text style={{ color: '#fff', marginLeft: 10 }}>Logout</Text>
                  </TouchableOpacity>
                </View>
                <Divider style={{ backgroundColor: '#fff3', height: 1 }} />
              </View>
            
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {

  return {  navigator: state.navigators, accessToken: state.accessToken }
}


export default connect(mapStateToProps, actions)(SideBar)
