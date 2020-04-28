import React, { Component } from 'react';
import { View, Image, FlatList, Dimensions, StatusBar, TouchableOpacity, Platform} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Title, Text, Button, Icon, Left, Right, Body } from 'native-base';
import { SearchBar, CheckBox} from 'react-native-elements';
import Modal from "react-native-modal";
import DateTimePicker from "react-native-modal-datetime-picker";
import { withNavigation } from 'react-navigation';
import Moment from 'moment';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions/api'
import { ActivityIndicator } from 'react-native-paper';

const today = new Date();
const tomorrow = today.setDate(today.getDate() + 1);

const DEVICE_WIDTH = Dimensions.get('window').width;
const { width, height } = Dimensions.get('window');

class PendingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      backupSurvey: [],
      search: '',
      filterModal: false,
      addModal: false,
      checked: false,
      dateVisible: false,
      date: '',
      todayChecked: false,
      tomorrowChecked: false,
      resetList: false,
      loading: true
    }
  }

  async componentDidMount() {
    let that = this
    await fetchSurveys(this.props.user.userId, this.props.user.accessToken).then(function (responseJson) {
      that.setState({surveys: responseJson, loading: false})
    })
    this.setState({backupSurvey: this.state.surveys})
  }

  updateSearch = search => {
    this.setState({ search });
  };

  resetSurveySearch = () => {
    this.setState({surveys: this.state.backupSurvey})
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
  let data = this.state.surveys;
  this.setState({resetList: true})
  this.setState({ todayChecked: false, tomorrowChecked: false})
  let newArr = data.filter(o => Moment(o.dueDate).format('MMM DD YYYY')  === Moment(date).format('MMM DD YYYY'));
  this.setState({ surveys: newArr});
  this.hideDatePicker();
};

resetList = () => {
  
}

clear = () => {
  this.search.clear();
};

filterByDate = (date, type) => {
  if(type == 'today'){
    if(this.state.todayChecked){
      this.setState({todayChecked: false, surveys: this.state.backupSurvey})
    }else{
      let newArr = this.state.surveys.filter(o => o.dueDate  === Moment(date).format('MMM DD YYYY'));
      this.setState({todayChecked: true, tomorrowChecked: false, surveys: newArr})
    }
  }else{
    if(this.state.tomorrowChecked){
      this.setState({tomorrowChecked: false, surveys: this.state.backupSurvey})
    }else{
      let newArr = this.state.surveys.filter(o => o.dueDate  === Moment(date).format('MMM DD YYYY'));
      this.setState({todayChecked: false, tomorrowChecked: true, surveys: newArr})
    }
  }
}

searchFilterFunction = text => {
  const newData = this.state.backupSurvey.filter(item => {      
    const itemData = `${item.customerName.toUpperCase()}`;
    const textData = text.toUpperCase();

     return itemData.indexOf(textData) > -1;    
  }); 
  this.setState({ search: text, surveys: newData});    
};

  render() {
    const { search } = this.state;
    if(!this.state.loading){
      if(this.state.surveys.length !== 0){
        return <Container>
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
                                      checked={this.state.todayChecked}
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
                                      onPress={() => this.filterByDate(tomorrow, 'tomorrow')}
                                      checked={this.state.tomorrowChecked}
                                  />
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Text style={{ color: '#fff' }}>Specific date</Text>
                                  <TouchableOpacity onPress={this.showDatePicker} style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                                  {this.state.resetList ?
                                      <Icon style={{ color: 'white', position: 'absolute', top: 1, right: 40, fontSize: 22}} name='times-circle' type='FontAwesome' onPress={() => this.resetSurveySearch()} />
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
                    onClear={text => this.resetSurveySearch()}
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
                <Card style={{flex: 0, marginBottom: 12, backgroundColor: '#e1f5fe'}} key={ele.id}>
                  <TouchableOpacity onPress={() => { this.props.navigation.push('Details', {surveyId: ele.id, title: ele.customerName}) }}>
                  <CardItem style={{marginBottom: -5, backgroundColor: '#e1f5fe'}}>
                    <Left>
                      <Body>
                        <Text>{ele.customerName}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  
                  <CardItem style={{backgroundColor: '#e1f5fe'}}>
                  <View>
                    <Left>
                        <Text note>Requester: {ele.requester.firstName+ ' '+ele.requester.lastName}</Text>
                    </Left>
                    <Right>
                      <Text style={{marginLeft: -8}} note>Due Date: {ele.dueDate}</Text>
                    </Right>
                  </View>
                  </CardItem>
                </TouchableOpacity> 
              </Card>
              

              )}
          </Content>
        </Container>
      }else{
        return <View style={{flex: 1}}>
                <Text style={{fontFamily: 'Arial-ItalicMT', color: '#a7a2a2'}}>No surveys</Text>
            </View>
      }
    } else {
      return <View
                    style={{
                    flex: 1,
                    padding: 20,
                    alignContent :'center',
                    justifyContent :'center',
                    }}>
        
                    <ActivityIndicator size="large" color="#1275bc" />
              </View>
    }
  }
}
const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(withNavigation(PendingScreen));
