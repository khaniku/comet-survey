import * as Expo from "expo";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from "react";

import App from "../App";


export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentDidMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Entypo: require("native-base/Fonts/Entypo.ttf"),
      Feather: require("native-base/Fonts/Feather.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
      // MaterialIcons: require("native-base/Fonts/MaterialIcons.ttf"),
      // MaterialCommunityIcons: require("native-base/Fonts/MaterialCommunityIcons.ttf"),
      Octicons: require("native-base/Fonts/Octicons.ttf"),
      // Zocial: require("@expo/vector-icons/fonts/Zocial.šttf"),
      // SimpleLineIcons: require("native-base/Fonts/SimpleLineIcons.ttf"),
      // EvilIcons: require("native-base/Fonts/EvilIcons.ttf"),
      // ...Ionicons.font,
    });
    this.setState({ isReady: true });

  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
        <App />
    );
  }
}