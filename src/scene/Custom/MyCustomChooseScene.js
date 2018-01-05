import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, ListView, TouchableOpacity} from 'react-native'

import PostUrl from '../../widget/PostUrl'
import MyIcon from '../../widget/MyIcon'

class MyCustomChooseScene extends PureComponent {

    static  navigationOptions =({navigation})=>({
        tabBarVisible: false,
        headerTitle: '选择客户',
        headerLeft: (
            <TouchableOpacity
                style={{padding: 10, marginLeft:5, marginTop:3}}
                onPress={()=> {
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
        this._getCustomsJson('');
    }

    back(state, goBack, customItem){
        state.params.callback(customItem);
        goBack();
    }
    _getCustomsJson(cname){
        let url = PostUrl.getCustomsJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', PostUrl.userId);

        if (cname != '')
        {
            formData.append('search_cname', cname);
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

    _searchCustom(data){
        this._getCustomsJson(data);
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
                                <Text style={customerStyles.itemRowLabel}>姓名：</Text>
                                <Text style={customerStyles.itemRowVal}>{rowData.c_name}</Text>
                            </View>
                            <View style={customerStyles.itemRowOne}>
                                <Text style={customerStyles.itemRowLabel}>昵称：</Text>
                                <Text style={customerStyles.itemRowVal}>{rowData.c_called}</Text>
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
                            placeholder={'   请输入客户名'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchCustom.bind(this)}
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
                            placeholder={'   请输入客户名'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchCustom.bind(this)}
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
    },
    textInput:{
        borderWidth:1,
        marginLeft: 10,
        marginRight:10,
        paddingLeft:1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    itemConnect: {
        marginTop:5,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#B1BAC1',
        borderTopColor:'#B1BAC1',
        borderTopWidth: 1,
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
        marginTop:10
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

export default MyCustomChooseScene;