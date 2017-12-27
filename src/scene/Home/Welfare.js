import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, ListView, TouchableOpacity} from 'react-native'

import NavStyle from '../../widget/NavStyle'
import PostUrl from '../../widget/PostUrl'
import MyIcon from '../../widget/MyIcon'
import UserPicker from '../../widget/UserPicker'

class Welfare extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        tabBarVisible: false,
        headerTitle: '福利',
        headerLeft: (
            <TouchableOpacity
                style={{padding: 10, marginLeft:5, marginTop:3}}
                onPress={()=> {
                    UserPicker.closeUserPicker()
                    navigation.goBack()
                }}
            >
                <MyIcon sorceName={'reply'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
    });

    constructor(props){
        super(props);
        this.state = ({
            data: null,
        })
    }

    componentDidMount() {
        this._getWelfareJson('');
    }

    _getWelfareJson(wname){
        let url = PostUrl.getWelfareUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);


        if (wname != '')
        {
            formData.append('search_wname', wname);
        }

        var opts = {
            method:"POST",
            body:formData
        }
        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {

                if (responseText.dataValue != '')
                {
                    this.setState({
                        data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(responseText.dataValue),
                    });

                }else{
                    this.setState({
                        data: 'noResault',
                    })
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
    _searchWelfare(data){
        this._getWelfareJson(data);
    }

    back(state, goBack, fuliItem){
        state.params.callback(fuliItem)
        goBack()
    }

    _renderRow(rowData, sectionId, rowID, highlightRow) {

        const  {goBack, state} = this.props.navigation;

        return (
            <TouchableOpacity
                onPress={()=>this.back(state, goBack, rowData)}
            >
                <View style={customerStyles.itemConnect}>
                    <View style={customerStyles.itemContentView}>
                        <View style={customerStyles.itemRow}>
                            <View style={customerStyles.itemRowOne}>
                                <Text style={customerStyles.itemRowLabel}>福利名称：</Text>
                                <Text style={customerStyles.itemRowVal}>{rowData.w_name}</Text>
                            </View>
                            <View style={customerStyles.itemRowOne}>
                                <Text style={customerStyles.itemRowLabel}>福利库存：</Text>
                                <Text style={customerStyles.itemRowVal}>{rowData.w_number}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {

        if (!this.state.data){
            return (
                <Text>loading...</Text>
            )
        }
        else if (this.state.data == 'noResault'){
            return (
                <View style={customerStyles.container}>
                    <View style={{flexDirection:'row', height:60,backgroundColor:'white',marginBottom: 10}}>
                        <TextInput
                            style={{ flex:2,
                                borderWidth:1,
                                margin:12,
                                borderColor: '#ccc',
                                borderRadius: 7,
                            }}
                            placeholder={'   请输入福利名称'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchWelfare.bind(this)}
                        />
                    </View>
                </View>
            )
        }
        else{
            return (
                <View style={customerStyles.container}>
                    <View style={{flexDirection:'row', height:60,backgroundColor:'white',marginBottom: 10}}>
                        <TextInput
                            style={{ flex:2,
                                borderWidth:1,
                                margin:12,
                                borderColor: '#ccc',
                                borderRadius: 7,
                            }}
                            placeholder={'   请输入福利名称'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchWelfare.bind(this)}
                        />
                    </View>
                    <ListView
                        dataSource={this.state.data}
                        renderRow={this._renderRow.bind(this)}
                    />
                </View>
            );
        }

    }
}

const customerStyles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        //backgroundColor:'white',
    },
    textInput:{
        borderWidth:1,
        marginLeft: 10,
        marginRight:10,
        marginTop:10,
        paddingLeft:1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    itemConnect: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#fefefe',
        marginBottom:10,
    },
    itemImgView: {
        width: 60,
        height: 60,
    },
    itemContentView: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    itemRow: {
        flexDirection: 'row',
    },
    itemRowTwo: {
        flexDirection: 'row',
        width: 240,
    },
    itemRowOne: {
        flexDirection: 'row',
        width: 150,
    },
    itemRowLabel: {
        width: 50,
        lineHeight: 20,
        fontSize: 14,
    },
    itemRowVal: {
        width: 180,
        fontSize: 16,
        lineHeight: 22,
    }

});
export default Welfare;