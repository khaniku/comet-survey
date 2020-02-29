import React, { Component } from 'react';
import { View, StatusBar} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingScreen from './Pending.js';
import CompletedScreen from './Completed.js';
import { Container, Header, Content, Card, CardItem, Thumbnail, Title, Text, Button, Icon, Left, Right, Body } from 'native-base';
import styles from "./styles";

const Tab = createMaterialTopTabNavigator();

export default class SurveyScreen extends Component {
  render() {
    return (
      <Container>
      <Header style={styles.headerStyle}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name="menu" style={styles.iconStyle} color='#000000' />
                </Button>
            </Left>
          </Header>
          <Tab.Navigator>
              <Tab.Screen name="Pending" nav component={PendingScreen} />
              <Tab.Screen name="Completed" component={CompletedScreen} />
          </Tab.Navigator>
        </Container>
    );
  }
}
