import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class TestScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Run your test here</Text>
      </View>
    );
  }
}