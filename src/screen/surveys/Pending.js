import React, { Component } from 'react';
import { View, Image, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Title, Text, Button, Icon, Left, Right, Body } from 'native-base';
import { SearchBar, CheckBox} from 'react-native-elements';
import Modal from "react-native-modal";
import DateTimePicker from "react-native-modal-datetime-picker";


const surveys = [
  {
    id: 1,
    business_name: 'HEB Survey',
    name: 'Emeka Kanikwu',
    profile_photo: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    background_photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Logo_of_the_HEB_Grocery_Company%2C_LP.png/1598px-Logo_of_the_HEB_Grocery_Company%2C_LP.png',
    description: 'This is just a random test and does not signify anything or mean anything',
    due_date: 'Nov 2'
 },
 {
    id: 2,
    business_name: 'Circle K Survey',
    name: 'Bobby Kanikwu',
    profile_photo: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    background_photo: 'data:image/png;base64,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',
    description: 'This is just a random test and does not signify anything or mean anything',
    due_date: 'Aug 20'
 },
]

const DEVICE_WIDTH = Dimensions.get('window').width;
const { width, height } = Dimensions.get('window');
export default class PendingScreen extends Component {
  state = {
    surveys: surveys,
    search: '',
    filterModal: false,
    addModal: false,
    checked: false,
    dateVisible: false,
    date: '',
    todayCheck: false,
    yesterdayCheck: false
  };

  updateSearch = search => {
    this.setState({ search });
  };

  resetTaskSearch () {
    
  }

  openFilter() {
    this.setState({ filterModal: true })
  }

  showDatePicker = () => {
    this.setState({ dateVisible: true });
};

hideDatePicker = () => {
    this.setState({ dateVisible: false });
};

handleDatePicked = date => {
  
    this.hideDatePicker();
};

resetList = () => {
  
}

searchFilterFunction = text => {    
  const newData = this.state.surveys.filter(item => {      
    const itemData = `${item.business_name.toUpperCase()}`;
    const textData = text.toUpperCase();
    console.log("new "+textData)

     return itemData.indexOf(textData) > -1;    
  }); 

  this.setState({ search: text});    
};

  render() {
    const { search } = this.state;
     return (
      <Container>
        <Modal
            isVisible={this.state.filterModal}
            style={{ backgroundColor: '#1275bcef', borderRadius: 10, marginHorizontal: 30, marginVertical: (height - 400) / 2 }}
            deviceHeight={height}
            backdropColor='transparent'
            onBackdropPress={() => this.setState({ filterModal: false })}
        >
            <View style={{ marginTop: 22, height: 400, paddingVertical: 15, paddingHorizontal: 20 }}>
              <View>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, }}>Filters</Text>
                <Icon style={{ color: 'white', position: 'absolute', top: 0, right: 0 }} name='clear' type='MaterialIcons' onPress={() => this.setState({ filterModal: false })} />
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: '700', marginBottom: 10, color: '#fff' }}>By time</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#fff' }}>Today</Text>
                        <CheckBox
                            containerStyle={{ borderWidth: 0, paddingLeft: 0, backgroundColor: 'transparent', marginLeft: 0, marginRight: 0, padding: 0 }}
                            textStyle={{ fontWeight: 'normal', color: '#fff' }}
                            iconRight={true}
                            right
                            checkedColor='#fff'
                            uncheckedColor='#fff'
                            onPress={() => this.filterByDate(today, 'today')}
                            checked={this.state.todayCheck}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#fff' }}>Tomorrow</Text>
                        <CheckBox
                            containerStyle={{ borderWidth: 0, paddingLeft: 0, backgroundColor: 'transparent', marginLeft: 0, marginRight: 0, padding: 0 }}
                            textStyle={{ fontWeight: 'normal', color: '#fff' }}
                            iconRight={true}
                            right
                            checkedColor='#fff'
                            uncheckedColor='#fff'
                            onPress={() => this.filterByDate(yesterday, 'yesterday')}
                            checked={this.state.yesterdayCheck}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#fff' }}>Specific date</Text>
                        <TouchableOpacity onPress={this.showDatePicker} style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                        {this.state.resetList !== false ?
                            <Icon style={{ color: 'white', position: 'absolute', top: 1, right: 40, fontSize: 22}} name='times-circle' type='FontAwesome' onPress={() => this.resetList()} />
                            : null
                        }
                        <Icon style={{ color: '#fff', fontSize: 24, marginRight: 3 }} name='calendar' type='MaterialCommunityIcons' />
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.dateVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDatePicker}
                            mode='date'
                        />
                    </View>

                </View>
                
            </View>
          </View>
        </Modal>
        <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, marginTop: 20 }}>
          <SearchBar
              placeholder='Search survey'
              round
              onChangeText={text => this.searchFilterFunction(text) }
              value={this.state.search}
              onClear={this.resetTaskSearch()}
              containerStyle={{ backgroundColor: 'transparent', width: width * 0.7, marginRight: 10, borderBottomWidth: 0, borderTopWidth: 0, padding: 0, borderColor: 'transparent' }}
              inputContainerStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderBottomWidth: 1, borderColor: '#939393', height: 40, borderRadius: 5 }}
              inputStyle={{ fontSize: 12 }}
              autoCorrect={false}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ marginRight: 10 }}>Filter</Text>
              <Icon name='filter-list' type='MaterialIcons' style={{ color: '#1275bc' }} onPress={() => this.openFilter()} />
          </View>
        </View>
        <Content>
        {
          this.state.surveys.map((ele, index) => 
            <Card style={{flex: 0, marginBottom: 12}} key={ele.id}>
              <TouchableOpacity onPress={() => { this.props.navigation.push('Details', {surveyId: ele.id, title: ele.business_name}) }}>
              <CardItem>
                <Left>
                <Image  resizeMode="cover" source={{uri: ele.background_photo}} style={{height: 50, width: 100}}/>
                  <Body>
                    <Text>{ele.business_name}</Text>
                    <Text note>{ele.description}</Text>
                  </Body>
                </Left>
              </CardItem>
              
              <CardItem>
              <View style={{flexDirection: 'row'}}>
                <Left>
                    <Text note>Requester: {ele.name}</Text>
                </Left>
                <Right>
                  <Text note>Due Date: {ele.due_date}</Text>
                </Right>
              </View>
              </CardItem>
            </TouchableOpacity> 
          </Card>
          

          )}
        </Content>
      </Container>
    );
  }
}