
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const React = require("react-native");

const { StyleSheet } = React;

export default {

  containerView: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  loginScreenContainer: {
    backgroundColor: '#fff',
  },

  error_text: {
    fontSize: hp('1.83%'),
    marginLeft: wp('3.5%'),
    marginTop: hp('2%'),
    color: '#bb3333',
  },
  error_input: {
    borderWidth: 1,
    borderColor: '#bb3333',

  },

  loginFormTextInput: {
    height: hp('5.7%'),
    fontSize: hp('2%'),
    borderRadius: hp('1%'),
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#ffffff',
    paddingLeft: wp('4%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: hp('0.62%'),
    marginBottom: hp('0.62%'),
    color: '#2c2c2c',

  },

  loginFormTextInputs: {
    height: hp('5.7%'),
    fontSize: hp('2%'),
    borderRadius: hp('1%'),
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#ffffff',
    paddingLeft: wp('4%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: hp('0.62%'),
    marginBottom: hp('0.62%'),
    color: '#2c2c2c',
    width: wp('60%')
  },

  loginFormTextInput_error: {
    height: hp('5.7%'),
    fontSize: hp('2%'),
    borderRadius: hp('1%'),
    borderWidth: 1,
    borderColor: '#ff0000',
    backgroundColor: '#ffffff',
    paddingLeft: wp('4%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: hp('0.62%'),
    marginBottom: hp('0.62%'),
    color: '#2c2c2c',
  },
  images: {
    width: wp('65%'),
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
    height: wp('19%'),
    overflow: 'hidden',
    marginLeft: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp('65%'),
    marginTop: hp('12%'),
    marginBottom: hp('5%'),
    height: wp('19%'),
    overflow: 'hidden',
    marginLeft: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_form: {
    marginLeft: wp('9%'),
    marginRight: wp('9%'),

  },
  normal_text: {
    fontSize: hp('1.83%'),
    marginLeft: wp('3.5%'),
    marginTop: hp('2%'),
    color: '#8f8f8f',
  },

  forgot_password_text: {
    color: '#2c2c2c',
    textAlign: "center",
    marginTop: hp('15%'),
    width: '100%',
    fontSize: hp('1.9%'),
  },

  blue_text: {
    textAlign: 'center',
    color: '#1275bc',
    fontWeight: 'bold'
  },

  loginButton: {
    backgroundColor: '#089629',
    borderRadius: hp('1.3%'),
    height: hp('7.2%'),
    marginTop: hp('4.2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 1

  },
  iconStyle: {
    fontSize: hp('3.4%'),
    color: '#000000'
},
  fbLoginButton: {
    height: hp('7.2%'),
    marginTop: hp('1.6%'),
    borderRadius: hp('1.3%'),
    backgroundColor: '#9b9b9b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 1
  },

  dropdownContainer: {
    width: '100%',
    height: hp('5.2%'),
    fontSize: hp('1.83%'),
    borderRadius: hp('1%'),
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#ffffff',
    marginRight: wp('8%'),
    marginTop: 0,
    marginLeft: wp('4%'),

  },

  first_name: {
    width: wp('35%'),
    height: hp('5.7%'),
    fontSize: hp('2%'),
    borderRadius: hp('1%'),
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#ffffff',
    paddingLeft: wp('4%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: hp('0.62%'),
    marginBottom: hp('0.62%'),
  },
  row_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  column_container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};
