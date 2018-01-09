import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, ListView, TouchableOpacity} from 'react-native'

import PostUrl from '../../widget/PostUrl'
import MyIcon from '../../widget/MyIcon'

class MyStorsChooseScene extends PureComponent {

    static  navigationOptions =({navigation})=>({
        tabBarVisible: false,
        headerTitle: '选择门店',
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
        this._getStorsJson('');
    }

    back(state, goBack, customItem){
        state.params.callback(customItem);
        goBack();
    }
    _getStorsJson(cname){

        let url = PostUrl.getStorsJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('cname',cname);
        formData.append('userID',PostUrl.userId);

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
                alert(error);
            })
    }

    _searchRoles(data){
        this._getStorsJson(data);
    }
    _renderRow(rowData, sectionId, rowID, highlightRow) {

        const  {goBack, state} = this.props.navigation;

        return (
            <TouchableOpacity
                onPress={()=>this.back(state, goBack, rowData)}
            >
                <View style={storsStyles.itemConnect}>
                    <View style={storsStyles.itemContentView}>
                        <View style={storsStyles.itemRow}>
                            <View style={storsStyles.itemRowOne}>
                                <Text style={storsStyles.itemRowLabel}>门店：</Text>
                                <Text style={storsStyles.itemRowVal}>{rowData.s_name}</Text>
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
                <View style={storsStyles.container}>
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
                            onChangeText = {this._searchRoles.bind(this)}
                        />
                    </View>
                </View>
            )
        }
        else{
            return (
                <View style={storsStyles.container}>
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
                            onChangeText = {this._searchRoles.bind(this)}
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
const storsStyles=StyleSheet.create({
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

export default MyStorsChooseScene;