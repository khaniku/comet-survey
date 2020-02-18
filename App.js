import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const imageInfo = {
    uri: "http://myawesomesite.com/myawesomeimage.png"

  }
  return (
    <View style={styles.container}>

      <Text style={styles.textColor}>Edited by Gokhan</Text>
      <Image src={{imageInfo}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor : {
    color: '#000'
  }
});
