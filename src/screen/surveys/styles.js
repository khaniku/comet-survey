
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default {

    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerStyle:{
        backgroundColor: 'white' ,
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
    tabContainerStyle:{
        elevation:0,
        backgroundColor: "transparent",
        height: hp('5.6%'),
        marginTop: hp('1.2%'),
        borderBottomWidth: 0
    },
    publicFolderTabStyle:{
        backgroundColor: '#f3f3f3',
        borderTopRightRadius: hp('3%'),
        borderBottomRightRadius: hp('3%'),
    },
    publicFolderActiveTabStyle:{
        backgroundColor: '#1275bc',
        borderTopRightRadius: hp('3%'),
        borderBottomRightRadius: hp('3%')
    },
    privateFolderTabStyle:{
        backgroundColor: '#f3f3f3',
        borderTopRightRadius: hp('3%'),
        borderBottomRightRadius: hp('3%'),
        borderTopLeftRadius: hp('3%'),
        marginLeft: wp('1.5%'),
        marginRight: wp('1.5%'),
        borderBottomLeftRadius: hp('3%')
    },
    privateFolderActiveTabStyle:{
        backgroundColor: '#1275bc',
        borderTopRightRadius: hp('3%'),
        borderBottomRightRadius: hp('3%'),
        borderTopLeftRadius: hp('3%'),
        marginLeft: wp('2.5%'),
        marginRight: wp('2.5%'),
        borderBottomLeftRadius: hp('3%')
    },
    sharedFolderTabStyle:{
        backgroundColor: '#f3f3f3',
        borderTopLeftRadius: hp('3%'),
        borderBottomLeftRadius: hp('3%')
    },
    sharedFolderActiveTabStyle:{
        backgroundColor: '#1275bc',
        borderTopLeftRadius: hp('2.96%'),
        borderBottomLeftRadius: hp('3%')
    },
    tabTextStyle:{
        color: '#222',
        fontSize:hp('1.95%')
    },
    folderItemStyle:{
      width: wp('13%'),
      height: wp('13%'),
    },
    subFolderItemStyle:{
        width: wp('9%'),
        height: wp('9%'),
    },
    activeTextStyle:{
        color: '#fff',
        fontWeight: 'normal',
        fontSize:hp('1.95%')
    },
    folderItemContent: {
        padding: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    folderItemSelected:{
        position: 'absolute',
        top: 0,
        left: wp('3.4%'),
        width: wp('24%'),
        height:wp('26%'),
        borderRadius: hp('0.2%'),
        // Set border width.
        borderWidth: 1,
        // Set border Hex Color Code Here.
        borderColor: '#1376bd',
    },
    
    subFolderLabel:{
        backgroundColor: '#eeeeee',
        borderTopRightRadius:  hp('3%'),
        borderBottomRightRadius:  hp('3%'),
        borderTopLeftRadius:  hp('3%'),
        borderBottomLeftRadius:  hp('3%'),
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('60%')
    },
    subFolderText:{
        textAlign: 'center',
        fontSize: hp('2.1%'),
        color: '#131415',
        textAlignVertical: "center",
        padding: 5
    },
    subFolderLabelContainer: {
        marginTop:hp('0.2%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width:wp('100%'),
        height: hp('7.5%')
    },
    
    horizontalLineStyle:{
        backgroundColor: '#eeeeee',
        height: 2,
        width: wp('20%')
    },
    horizontalFullLineStyle:{
        backgroundColor: '#eeeeee',
        height: 2,
        width: wp('100%'),
        marginTop: hp('2.5%')
    },
    horizontalLine:{
        backgroundColor: '#eeeeee',
        height: 2,
        width: wp('100%'),
    },
    verticalLineStyle:{
        backgroundColor: '#eeeeee',
        marginTop: hp('3.5%'),
        height: hp('7%'),
        width: 2
    },
    subFolderDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width:wp('100%'),
        height: hp('8%')
    },
    subFolderViewContainer: {
        marginTop: hp('1%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width:wp('100%'),
        height: hp('14%')
    },
    detailPropertyContainer:{
        flexDirection: 'column',
        marginTop: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width:wp('30%'),
        height: hp('13%')
    },
    detailPropertyTopLabel:{
        marginTop: hp('0%'),
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:hp('2.8%'),
        textAlign: 'center',
        fontWeight: 'bold',
        width:wp('30%'),
    },

    detailPropertyBottomLabel:{
        marginTop: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#131415',
        width:wp('30%'),
        fontSize:hp('1.6%'),
    },
    addButton: {
        backgroundColor: '#1275bc',
        marginBottom: hp('1.5%'),
        width: hp('7%'),
        height: hp('7%'),
        borderRadius: hp('7%'),
        alignItems: 'center',
        justifyContent: 'center',
      //  elevation: 8,
        position: 'relative'
    },
    addButtonText: {
        color: '#fff',
        fontSize: hp('5.8%'),
        position: 'absolute',
        top:-2
    },
    addNewFolderText:{
        fontSize: hp('2.1%'),
        textAlignVertical: 'center',
        marginLeft: wp('5%'),
        color: '#999',
    },
    addFolderContainer: {
        flexDirection: "row",
        marginTop: hp('2.5%'),
        marginLeft:wp('5%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    subFolderName:{
        marginTop: hp('1.1%'),
        fontSize: hp('2.1%'),
        color: '#222222'

    },
    subFolderStatus:{
        color: '#8d8d8d',
        fontSize: hp('1.6%')
    }
};
