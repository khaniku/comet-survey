import React, { Component } from 'react';
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import { Container, Header, Left, Body, Right, Icon, Title } from 'native-base';

const fields = [{
    name: 'Height',
    value: ''
  },

  {
    name: 'Width',
    value: ''
  }];

const SECTIONS = [
  {
    title: 'Pylon',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Nozzle',
    content: 'Lorem ipsum...',
  },
];

export default class Details extends Component {
  state = {
    activeSections: [],
    data: fields,
    title: ''
  };

  // header = ({ scene, previous, navigation }) => {
  //   const { options } = scene.descriptor;
  //   const title =
  //     options.headerTitle !== undefined
  //       ? options.headerTitle
  //       : options.title !== undefined
  //       ? options.title
  //       : scene.route.name;
  
  //   return (
  //     <MyHeader
  //       title={title}
  //       leftButton={
  //         previous ? <MyBackButton onPress={navigation.goBack} /> : undefined
  //       }
  //       style={options.headerStyle}
  //     />
  //   );
  // };

  async componentDidMount(){
    let { route } = this.props;
    let param = route.params;
    this.setState({title: param.title});
}
  

  _renderHeader = (section, index) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
        <MaterialIcons style={styles.caret} name={this.state.activeSections.includes(index) ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={32} color="#000" />
      </View>
    );
  };

  _renderContent = section => {
    const array = fields.map((data, i) => {
        return (
          <View key={i}>
            <TextInput
                label={this.state.data[i].name}
                value={this.state.data[i].value}
                onChangeText={(value)  => this.onChange(i, value)}
                style={styles.input}
              />
          </View>
        )
      })
    return (
      <View style={styles.content}>
        {/* <Text>{section.content}</Text> */}
        {array}
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Add Image
        </Button>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections, collapsed: !this.state.collapsed });
  };

  onChange(index, value) {
    let fields = this.state.data;
    fields[index].value = value;
    this.setState({data: fields})
  }

  render() {
    return (
      <Container>
        <Accordion
          sections={SECTIONS}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#73d7d6',
      paddingTop: Constants.statusBarHeight,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20,
    },
    header: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent:'space-between',
      height:56,
      paddingLeft:25,
      paddingRight:18,
      alignItems:'center',
      borderBottomWidth :2,
      borderBottomColor: '#a4a4a4',
    },
    headerText: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      padding: 20,
      backgroundColor: '#cbdfef',
    },
    active: {
      backgroundColor: '#62727b',
    },
    inactive: {
      backgroundColor: 'rgba(245,252,255,1)',
    },
    selectTitle: {
      fontSize: 10,
      fontWeight: '500',
      padding: 10,
    },
    multipleToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 30,
      alignItems: 'center',
    },
    multipleToggle__title: {
      fontSize: 16,
      marginRight: 4,
    },
    caret: {
       justifyContent: 'flex-end'
    }
  });