import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingScreen from './Pending.js';
import CompletedScreen from './Completed.js';

const Tab = createMaterialTopTabNavigator();

export default class SurveyScreen extends Component {
  render() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Pending" component={PendingScreen} />
            <Tab.Screen name="Completed" component={CompletedScreen} />
        </Tab.Navigator>
    );
  }
}
