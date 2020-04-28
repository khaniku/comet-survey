import React, { Component } from 'react';
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    FlatList,
    Image,
  } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { Container, Header, Left, Body, Right, Icon, Title } from 'native-base';
import { fetchAssets, fetchMeasurements, updateMeasurement, uploadPhoto, fetchPictures} from '../../actions/api';
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as actions from '../../actions';

let items = [];
let count = 1;

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      assets: [],
      //data: fields,
      title: '',
      surveyId: 0,
      loading: true,
      measurements: [],
      imageuri: '',
      ModalVisibleStatus: false,
      image: null,
      assetId: null
    }
  }

  async componentDidMount(){
    this.getPermissionAsync();
    let { route } = this.props;
    let param = route.params;
    let assetIds = [];
    this.setState({title: param.title, surveyId: param.surveyId});
    let that = this
    await fetchAssets(param.surveyId, this.props.user.accessToken).then(function (responseJson) {
      that.setState({assets: responseJson, loading: false})
    })
    if(this.state.assets.length !== 0){
      this.state.assets.map((data, i) => {
        assetIds.push(data.id)
      })
    }
    await fetchMeasurements(assetIds, this.props.user.accessToken).then(function (responseJson) {
      that.setState({measurements: responseJson, loading: false})
    })

    await fetchPictures(assetIds, this.props.user.accessToken).then(function (data) {
      that.props.addPictures(data)
    })
    // let items = Array.apply(null, Array(3)).map((v, i) => {
    //   return { id: i, src: 'https://unsplash.it/400/400?image=' + (i + 1) };
    // });

    this.setState({
      dataSource: items,
    });
  }

  ShowModalFunction = (visible, imageURL) => {
    //handler to handle the click on image of Grid
    //and close button on modal
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL,
    });
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async (assetId) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      let that = this;
      if (!result.cancelled) {
        result.id = count;
        result.assetId = assetId;
        items.push(result);
        this.setState({ image: result.uri, dataSource: items});
        await uploadPhoto(this.state.image, assetId, this.props.user.accessToken).then(function(data){
          that.props.addPictures(data)
        })
        count++;
      }

      //console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  imageViewer = (active, assetId) => {
    if (this.state.ModalVisibleStatus) {
      return (
        <Modal
          transparent={false}
          animationType={'fade'}
          visible={this.state.ModalVisibleStatus}
          onRequestClose={() => {
            this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
          }}>
          <View style={styles.modelStyle}>
            <Image
              style={styles.fullImageStyle}
              source={{ uri: this.state.imageuri }}
              //resizeMode={Image.resizeMode.contain}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              onPress={() => {
                this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
              }}>
              <Image
                source={{
                  uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/close.png',
                }}
                style={{ width: 35, height: 35, marginTop: 16 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
      return (
        <View >
            <FlatList
              data={this.props.picture.pictures[active]}
              renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: 'column', margin: 1}}>
                  {assetId == this.state.assets[active].id ?
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      this.ShowModalFunction(true, item.src);
                    }}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.fileLocation,
                      }}
                    />
                  </TouchableOpacity>: ''}
                </View>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={() => this._pickImage(assetId)} >
              {this.state.documentLoading ?
                <Progress.Circle size={50} indeterminate={true} style={{backgroundColor: '#D8D8D8', borderRadius: 30, marginRight: 20}}>
                    <Icon style={{ color: 'white', position: 'absolute', top: 10, right: 10, fontSize: 27 }} name='attachment' type='MaterialIcons' />
                </Progress.Circle>:
                <View style={{flexDirection: 'row'}}> 
                  <Avatar
                      rounded
                      icon={{ name: 'plus', type: 'font-awesome' }}
                      size={50}
                      overlayContainerStyle={{ backgroundColor: '#ec1461' }}
                      containerStyle={{ borderWidth: 1, borderColor: '#ec1461', backgroundColor: 'white', marginRight: 20, marginTop: 10 }}
                  />
                  <Text style={{ color: '#41454E', fontSize: 15, marginTop: 25 }}>Add pictures</Text>
                </View>
              }
            </TouchableOpacity>
        </View>
      );
    }
  }

  _renderHeader = (assets, index) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{assets.assetType}</Text>
        <MaterialIcons style={styles.caret} name={this.state.activeSections.includes(index) ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={32} color="#000" />
      </View>
    );
  };

  dataArray = (active) => {
    if(active !== undefined ){
      if(typeof this.state.measurements[active] !== 'undefined' ){
        return (
            <View >
              {this.state.measurements[active].map((data, i) => 
              <View key={i}>
                <TextInput
                    label={this.state.measurements[active][i].description}
                    value={String(this.state.measurements[active][i].value)}
                    onChangeText={(value)  => this.onChange(active, i, value)}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
              </View>
                )}
            </View>
        )
      }else{
        return (
          <View style={{flex: 1}}>
              <Text style={{fontFamily: 'Arial-ItalicMT', color: '#a7a2a2'}}>No measurements</Text>
          </View>
        )
      }
    }
  }

    _renderContent = section => {
      const active =  this.state.activeSections[0];
      let description = '';
      let assetId = null;
      if(active === undefined || active === null){
        description = '';
      }else{
        description = this.state.assets[active].description;
        assetId = this.state.assets[active].id;
      }

      let array = <Text>No measurements</Text>
      
      return (
        <View style={styles.content}>
          <Text style={styles.description}>Description: {description}</Text>
          {/* {array} */}
          {this.dataArray(active)}
          {this.imageViewer(active, assetId)}
          {!this.state.loading ? 
              <Button
                buttonStyle={styles.button}
                onPress={() => this._onSave(active, )}
                textStyle={{ color: "#FFFFFF", fontSize: hp('2.4%'),fontWeight: "bold" }}
                title="SAVE"
              />:
              <View style={styles.button}>
                <ActivityIndicator size="large" color="#fff" style={{marginTop: 7}}/>
              </View> }
        </View>
      );
    };

  _updateSections = activeSections => {
    this.setState({ activeSections, collapsed: !this.state.collapsed });
  };

  _onSave = (active, assetId) => {
    let that = this;
    updateMeasurement(this.state.measurements[active], this.props.user.accessToken).then(function (responseJson) {
      that.setState({loading: false})
    })
    showMessage({
      message: this.state.title,
      description: "Measurement Saved",
      type: "success",
      floating: true
    });
  }

  onChange(active, index, value) {
    let fields = this.state.measurements;
    fields[active][index].value = value;
    this.setState({measurements: fields})
  }

  render() {
    if(!this.state.loading){
      if(this.state.assets.length !== 0){
        return <KeyboardAwareScrollView>
                <Container>
                  <Accordion
                    sections={this.state.assets}
                    activeSections={this.state.activeSections}
                    renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                  />
                </Container>
              </KeyboardAwareScrollView>
      }else{
        return <View style={{flex: 1}}>
                <Text style={{fontFamily: 'Arial-ItalicMT', fontSize: 20, marginTop: "2%", color: '#a7a2a2'}}>No site assets</Text>
            </View>
      }
    }else{
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
  return {user: state.user, picture: state.picture}
}

export default connect(mapStateToProps, actions)(withNavigation(Details));

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#73d7d6',
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
    },
    description: {
      marginBottom: "3%",
      fontSize: 15
    },
  
    button: {
      backgroundColor: '#089629',
      borderRadius: hp('1.3%'),
      height: hp('6.0%'),
      marginTop: hp('4.2%'),
      marginLeft: "25%",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 1,
      elevation: 1,
      width: '50%',
      justifyContent: "center",
      alignItems: "center"
    },
    image: {
      height: 120,
      width: '100%',
    },
    fullImageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '98%',
      resizeMode: 'contain',
    },
    modelStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    closeButtonStyle: {
      width: 25,
      height: 25,
      top: 9,
      right: 9,
      position: 'absolute',
    },
  });