import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 export default {
    loginScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerStyle:{
        backgroundColor: 'white' ,
        marginTop:hp('2%'),
        height: hp('6%'),
        borderBottomWidth: 0,
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        elevation: 0
    },
    iconStyle: {
        fontSize: hp('3.4%'),
        color: '#000000'
    },
    titleStyle:{
        color:'#000000',
        alignSelf:'center',
        fontSize: hp('2.8%')
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    }
 }