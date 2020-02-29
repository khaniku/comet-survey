import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet , Text} from 'react-native';
const fields = [{
      name: 'Height',
      value: ''
    },

    {
      name: 'Width',
      value: ''
    }];
export default class CompletedScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: fields 
    };
  }
  
  onSubmit() {
    const { Height, Width } = this.state;
    Alert.alert('Info', `${Height} + ${Width}`);
  }

  onChange(index, value) {
    let fields = this.state.data;
    fields[index].value = value;
    this.setState({data: fields})
  }

  render() {
    const array = fields.map((data, i) => {
      return (
        <View key={i}>
          <TextInput
              value={this.state.data[i].value}
              onChangeText={(value)  => this.onChange(i, value)}
              placeholder={this.state.data[i].name}
              style={styles.input}
            />
        </View>
      )
    })
    return (
      <View style={styles.container}>
        {array}
        <Text>testing here{fields.Height}</Text>
        <Button
          title={'Submit'}
          style={styles.input}
          onPress={this.onSubmit.bind(this)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});