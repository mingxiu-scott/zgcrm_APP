import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ListView,
    Platform,
    Picker,
    Alert,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostUrl from '../../widget/PostUrl';
import DatePickerYYMM from '../../widget/DatePickerYYMM'
import UserPicker from '../../widget/UserPicker'
import MyIcon from '../../widget/MyIcon'
import OrderListInfo from './OrderListInfoScene';

import Moment from 'moment'

class OrderListScene extends Component{

    static navigationOptions = ({navigation}) => ({
        headerTitle:'理财列表',
        tabBarVisible: false,
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
        this.state = {
            data: null,
            select_uid: PostUrl.userId,
            select_uid_list: null,
            date: Moment(new Date()).format("YYYY-MM"),
            u_name: '',
        };
    }

    componentDidMount() {
        this._getOrderListsJson(this.state.select_uid, this.state.date, this.state.u_name);
    }

    _getOrderListsJson(select_uid, date, u_name){

        UserPicker.closeUserPicker()

        let url = PostUrl.getOrderListsJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', select_uid);

        if (date != ''){
            formData.append('date', date);
        }

        if (select_uid != ''){
            formData.append('select_uid', select_uid);
        }

        if (u_name != ''){
            formData.append('u_name', u_name);
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

                if (responseText.code == 'fail'){
                    this.setState({
                        data: null,
                    })
                }else{
                    this.setState({
                        data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(responseText),
                    });
                }
            })
            .catch((error) => {
                alert(error)
            })
    }

    _searchCustom(data){
        this.setState({u_name: data})
        this._getOrderListsJson(this.state.select_uid, this.state.date, data)
    }

    _changeListUid(changeUid){
        this.setState({
            select_uid: changeUid,
            u_name: ''
        })
        this._getOrderListsJson(changeUid, this.state.date, '')
    }

    set_c_gettime(date){
        this.setState({date: date})
        this._getOrderListsJson(this.state.select_uid, date, this.state.u_name)
    }

    set_userInfo(userId,userName){
        this._changeListUid(userId)
    }

    _renderRow(rowData, sectionId, rowID, highlightRow) {

        const { navigate } = this.props.navigation;

        return (
            <TouchableOpacity
                onPress={() => {
                    UserPicker.closeUserPicker()
                    navigate('OrderListInfo', {o_id: rowData.o_id})
                }}
            >
                <View style={styles.listItem}>
                    <View style={styles.listItemCont}>
                        <View style={styles.goodsName}>
                            <Text style={styles.goodsNameText}>{rowData.g_name}</Text>
                        </View>
                        <View style={styles.flexColumn}>
                            <View>
                                <Text style={styles.moneyLabel}>理财：</Text>
                            </View>
                            <View>
                                <Text style={styles.moneyInVal}>{rowData.o_money}</Text>
                            </View>

                        </View>
                        <View style={styles.flexColumn}>
                            <View>
                                <Text style={styles.moneyLabel}>回款：</Text>
                            </View>
                            <View>
                                <Text style={styles.moneyRetVal}>{rowData.o_return_money}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.listItemBottom}>
                        <View style={styles.flexRow}>
                            <View>
                                <Text>客户：</Text>
                            </View>
                            <View>
                                <Text>{rowData.c_name}</Text>
                            </View>
                        </View>
                        <View style={styles.flexRow}>
                            <View>
                                <Text>经理：</Text>
                            </View>
                            <View>
                                <Text>{rowData.u_name}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>{rowData.o_date}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        if(!this.state.data){
            return(

                <View style={styles.container}>

                    <View style={styles.topBox}>
                        <View style={styles.searchBox}>
                            <FontAwesome name="search" size={16} color="gray" style={styles.searchIcon}/>
                            <TextInput
                                style={styles.searchInput}
                                underlineColorAndroid='transparent' //设置下划线背景色
                                onChangeText = {this._searchCustom.bind(this)}
                                value = {this.state.u_name}
                            />
                        </View>

                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>
                        <DatePickerYYMM set_c_gettime={date=>this.set_c_gettime(date)} />
                    </View>
                    <View>
                        <Text>无数据</Text>
                    </View>
                </View>
            );
        }else{
            return(

                <View style={styles.container}>

                    <View style={styles.topBox}>
                        <View style={styles.searchBox}>
                            <FontAwesome name="search" size={16} color="gray" style={styles.searchIcon}/>
                            <TextInput
                                style={styles.searchInput}
                                underlineColorAndroid='transparent' //设置下划线背景色
                                onChangeText = {this._searchCustom.bind(this)}
                                value = {this.state.u_name}
                            />
                        </View>

                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>
                        <DatePickerYYMM set_c_gettime={date=>this.set_c_gettime(date)} />

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

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        //backgroundColor:'white',
    },
    topBox: {
        flexDirection:'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBox:{
        flex: 1,
        flexDirection: 'row',
        height: 35,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    searchIcon: {
        marginLeft: 5,
    },
    searchInput: {
        padding: 5,
        flex: 1,
    },
    selectIcon: {
        position: 'absolute',
        right: 5,
    },
    selectUser: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        padding: 0,
        justifyContent: 'center',
        borderWidth: 1,
        height: 30,
        borderColor: '#e3e3e3',
    },
    selectDate: {
        flex: 1,
        marginRight: 5,
        padding: 0,
        justifyContent: 'center',
        borderWidth: 1,
        height: 30,
        borderColor: '#e3e3e3',

    },
    listItem: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
        padding: 10,
        marginBottom: 10,
    },
    listItemCont: {
        flexDirection:'row',
        paddingTop: 5,
        paddingBottom: 5,
    },
    goodsName: {
        width: '45%',
    },
    goodsNameText: {
        fontSize: 14,
        lineHeight: 23,
    },
    flexColumn: {
        flex: 1,
        flexDirection: 'column',
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
    },
    moneyLabel:{
        fontSize: 10,
    },
    moneyInVal: {
        fontSize: 18,
        lineHeight: 22,
        color: '#FF9800',
    },
    moneyRetVal: {
        fontSize: 18,
        lineHeight: 22,
        color: '#00ff02',
    },
    listItemBottom: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        marginTop: 10,
        paddingTop: 10,
        marginBottom: 5,
    }
});

export default OrderListScene;
