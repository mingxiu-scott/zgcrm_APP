import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, ListView, Image, StyleSheet, TextInput,DeviceEventEmitter, Picker } from 'react-native'

import CustomInfoScene from '../Custom/CustomInfoScene';
import PostUrl from '../../widget/PostUrl';
import UserPicker from '../../widget/UserPicker'
import MyIcon from '../../widget/MyIcon'

class CustomListScene extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        headerTitle: '下属客户',
        tabBarVisible: false,
        headerLeft: (
            <TouchableOpacity
                style={{padding: 10, marginLeft:5, marginTop:3}}
                onPress={()=> {
                    UserPicker.closeUserPicker();
                    navigation.goBack();
                }}
            >
                <MyIcon sorceName={'reply'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
        headerRight: (
            <View>
                <Text> </Text>
            </View>
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            select_uid: PostUrl.userId,
            select_uid_list: null,
            u_name: '',
        }
    }
    componentDidMount() {
        DeviceEventEmitter.addListener('changeCustomInfo', () => {
            this._changeStateData()
        })
        this._getCustomsJson(PostUrl.userId, '')
    }

    _searchCustom(data){
        UserPicker.closeUserPicker()
        this.setState({u_name: data})
        this._getCustomsJson(this.state.select_uid, data)
    }

    _getCustomsJson(userId, userName) {
        let url = PostUrl.getCustomsJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', userId);

        if (userName != ''){
            formData.append('search_cname', userName);
        }

        var opts = {
            method: 'POST',
            body: formData
        }
        fetch(url, opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                if (!responseText.dataValue || responseText.dataValue == ''){
                    this.setState({
                        data: null
                    })
                }else{
                    this.setState({
                        data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(responseText.dataValue),
                    });
                }
            })
            .catch((error) => {
                alert(error);
            });
    }

    _changeStateData() {
        this._getCustomsJson(this.state.select_uid, this.state.u_name);
    }

    _changeListUid(changeUid){
        this.setState({
            select_uid: changeUid,
            u_name: ''
        })
        this._getCustomsJson(changeUid, '')
    }

    set_userInfo(userId,userName){
        this._changeListUid(userId)
    }

    showdatepicker(){
        UserPicker.closeUserPicker();
    }

    render() {

        if (!this.state.data){
            return (
                <View style={customerStyles.container}>
                    <View style={{flexDirection:'row', height:60,backgroundColor:'white',marginBottom: 10}}>
                        <TextInput
                            style={{ flex:1,
                                borderWidth:1,
                                margin:12,
                                borderColor: '#ccc',
                                borderRadius: 7,
                            }}
                            onFocus={this.showdatepicker = this.showdatepicker.bind(this)}
                            placeholder={'   请输入客户名'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchCustom.bind(this)}
                            value = {this.state.u_name}
                        />

                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>

                    </View>
                </View>
            )

        }else{
            return (
                <View style={customerStyles.container}>
                    <View style={{flexDirection:'row', height:60,backgroundColor:'white',marginBottom: 10,justifyContent:'center'}}>
                        <TextInput
                            style={{ flex:1,
                                borderWidth:1,
                                margin:12,
                                borderColor: '#ccc',
                                borderRadius: 7,
                            }}
                            onFocus={this.showdatepicker = this.showdatepicker.bind(this)}
                            placeholder={'   请输入客户名'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchCustom.bind(this)}
                            value = {this.state.u_name}
                        />

                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>

                    </View>

                    <ListView
                        dataSource={this.state.data}
                        renderRow={this._renderRow.bind(this)}
                    />

                </View>
            );
        }
    }

    _onItemPress(e) {
        let num = 0;
        if (Number.isFinite(e) == false) {
            num = Number.parseInt(e) + 1;
        } else {
            num = e + 1;
        }
        alert("click on the" + num + 'row');
    }

    _renderRow(rowData, sectionId, rowId, highlightRow) {
        const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity
                onPress={() => {
                    UserPicker.closeUserPicker()
                    navigate('CustomSubInfoScene', {c_id: rowData.c_id, editState: false})
                }}
            >
                <View style={customerStyles.itemConnect}>
                    <View style={customerStyles.itemImgView}>
                        <MyIcon sorceName={'user'} sorceColor={'#FF9800'} sorceSize={80}/>
                        {/*<Image*/}
                            {/*source={require('../../image/test.png')}/>*/}
                    </View>
                    <View style={customerStyles.itemContentView}>
                        <View style={customerStyles.itemRow}>
                            <View style={customerStyles.itemRowOne}>
                                <Text style={customerStyles.itemRowLabel}>姓名：</Text>
                                <Text style={customerStyles.itemRowVal}>{rowData.c_name}</Text>
                            </View>
                        </View>
                        <View style={customerStyles.itemRow}>
                            <View style={customerStyles.itemRowOne}>
                                <Text style={customerStyles.itemRowLabel}>称呼：</Text>
                                <Text style={customerStyles.itemRowVal}>{rowData.c_called}</Text>
                            </View>
                        </View>
                        <View style={customerStyles.itemRow}>
                            <View style={customerStyles.itemRowOne}>
                                <Text style={customerStyles.itemRowLabel}>理财总额：</Text>
                                <Text style={customerStyles.itemRowVal}>{rowData.o_money}</Text>
                            </View>
                        </View>
                        <View style={customerStyles.itemRow}>
                            <View style={customerStyles.itemRowOne}>
                                <Text style={customerStyles.itemRowLabel}>收益总额：</Text>
                                <Text style={customerStyles.itemRowVal}>{rowData.o_return_money}</Text>
                            </View>
                        </View>
                        <View style={customerStyles.itemRow}>
                            <View style={customerStyles.itemRowOne}>
                                <Text style={customerStyles.itemRowLabel}>联系电话：</Text>
                                <Text style={customerStyles.itemRowVal}>{rowData.c_telphone}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
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
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    itemImgView: {
        marginLeft: 0,
        width: 60,
        height: 60,
    },
    itemContentView: {
        marginLeft: 20,
    },
    itemRow: {
        flexDirection: 'row',
        marginBottom: 3,
    },
    itemRowTwo: {
        flexDirection: 'row',
        width: 240,
    },
    itemRowOne: {
        flexDirection: 'row',
        width: 240,
    },
    itemRowLabel: {
        width: 80,
        lineHeight: 20,
    },
    itemRowVal: {
        width: 180,
        fontSize: 16,
        lineHeight: 21,
    }

});

export default CustomListScene;