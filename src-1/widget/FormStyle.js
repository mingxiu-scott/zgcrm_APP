import { StyleSheet } from 'react-native'
const FormStyle = StyleSheet.create({
    fristformRow: {
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: '#fff',
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection:'row',
    },
    formBtnRow: {
        backgroundColor: '#fff',
    },
    lineHeightAllDate: {
        flex: 1,
        justifyContent: 'center',
    },
    submitBtn: {
        backgroundColor: '#FF9800',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 25,
        marginBottom: 25,
        justifyContent: 'center',
        height: 50,
    },
    disable_submitBtn: {
        backgroundColor: '#8a8a8a',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 25,
        marginBottom: 25,
        justifyContent: 'center',
        height: 50,
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    textred:{
        color:'red',
    },
    textgray:{
        color:'gray',
        marginLeft:20,
    },
    cof:{
        marginRight:20
    },

    formRow:{
        backgroundColor:'#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth:1,
        borderBottomColor:'#e4e4e4',
        height: 50,
        justifyContent: 'center',
    },
    lineHeightAll:{
        fontSize: 16,
    },
    submit:{
        backgroundColor:'orange',
        width:'90%',
        marginLeft:'5%',
        marginTop:10
    },
    buttonStyle:{
        width:'25%',
        height:40,
        flex:1,
        // fontSize:22,
        backgroundColor:'white',
        borderRightWidth:.4,borderRightColor:'#ebebeb',
        borderBottomWidth:.4,borderBottomColor:'#ebebeb',
    },
    buttonText:{
        fontSize:8,
        lineHeight:20,
        flex:1,
        textAlign:"center"
    },
    buttonContainer:{
        width:'100%',
        height:'auto',
        backgroundColor:'white',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    TextInputs:{
        width:400,
        position:'absolute',
        right: 0,
        height:40,
        textAlign:'right'
    },
    TextInputsRows: {
        width:400,
        position:'absolute',
        right: 0,
        textAlign:'right'
    },
    SearchInput:{
        width:'40%',
        height:20,
        borderRadius:5,
        borderWidth:.5,
        borderColor:'gray',
        marginTop:10,
        marginLeft:10,
    },
    getCustomLabel: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
    },
    getCustomLabelText: {
        textAlign: 'right',
    },
    valueRow: {
        backgroundColor:'#fff',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#e4e4e4',
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    valueLabel: {
        flex: 1,
        alignItems: 'flex-start'
    },
    valueText: {
        flex: 1,
        textAlign: 'right',
    },
});

export default FormStyle;