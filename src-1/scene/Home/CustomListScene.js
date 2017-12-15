import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, ListView, Image, StyleSheet, TextInput,DeviceEventEmitter, Picker } from 'react-native'

import CustomInfoScene from '../Custom/CustomInfoScene';
import PostUrl from '../../widget/PostUrl';

class CustomListScene extends PureComponent {

    static navigationOptions = {
        headerTitle: '下属客户',
        tabBarVisible: false,
    }

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
        this._getUsersListsJson()
        this._getCustomsJson(PostUrl.userId, '')
    }

    _searchCustom(data){

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
                if (!responseText.dataValue){
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

    _getUsersListsJson(){
        let url = PostUrl.getUsersListsJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', PostUrl.userId);

        var opts = {
            method:"POST",
            body:formData
        }
        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                this.setState({
                    select_uid_list: responseText,
                });
            })
            .catch((error) => {
                alert(error)
            })
    }

    _renderPicker(key, i){
        return <Picker.Item key={i} label={key.u_name} value={key.u_id}/>
    }

    _changeListUid(changeUid){
        this.setState({
            select_uid: changeUid,
            u_name: ''
        })
        this._getCustomsJson(changeUid, '')
    }

    render() {

        if (!this.state.select_uid_list){
            return(
                <Text>loading...</Text>
            )
        }
        else if (!this.state.data){
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
                            placeholder={'   请输入客户名'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchCustom.bind(this)}
                            value = {this.state.u_name}
                        />

                        <Picker
                            selectedValue={this.state.select_uid}
                            onValueChange={(itemValue, itemIndex) => this._changeListUid(itemValue)}
                            style={{flex: 1}}
                        >
                            {this.state.select_uid_list.map((key,i) => this._renderPicker(key,i))}
                        </Picker>

                    </View>
                </View>
            )

        }else{
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
                            placeholder={'   请输入客户名'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchCustom.bind(this)}
                            value = {this.state.u_name}
                        />

                        <Picker
                            selectedValue={this.state.select_uid}
                            onValueChange={(itemValue, itemIndex) => this._changeListUid(itemValue)}
                            style={{flex: 1}}
                        >
                            {this.state.select_uid_list.map((key,i) => this._renderPicker(key,i))}
                        </Picker>

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
                onPress={() => navigate('CustomSubInfoScene', {c_id: rowData.c_id, editState: false})}
            >
                <View style={customerStyles.itemConnect}>
                    <View style={customerStyles.itemImgView}>
                        <Image
                            source={{uri: 'https://img.alicdn.com/tps/TB1OvT9NVXXXXXdaFXXXXXXXXXX-520-280.jpg'}}></Image>
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