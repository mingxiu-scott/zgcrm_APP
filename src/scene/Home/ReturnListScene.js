import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ListView,
    DeviceEventEmitter,
    Picker,
    Platform,
} from 'react-native';

import Moment from 'moment'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostUrl from '../../widget/PostUrl';
import MyIcon from '../../widget/MyIcon'
import DatePickerYYMM from '../../widget/DatePickerYYMM'
import UserPicker from '../../widget/UserPicker'

import ReturnListInfoScene from './ReturnListInfoScene';

class ReturnListScene extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        headerTitle:'回款记录',
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
        headerRight: (
            <View>
                <Text> </Text>
            </View>
        ),
    });

    constructor(props){
        super(props);

        this.state = {
            data: null,
            select_uid: PostUrl.userId,
            select_uid_list: null,
            u_name: '',
            date: Moment(new Date()).format("YYYY-MM"),
        };
    }

    componentDidMount() {

        DeviceEventEmitter.addListener('changeReturnInfo', () => { this._changeStateData() })
        this._getReturnJson(this.state.select_uid, this.state.date, this.state.u_name);
    }

    _getReturnJson(userId, date, userName){

        UserPicker.closeUserPicker()

        let url = PostUrl.getReturnListsUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', userId);

        if (userName != ''){
            formData.append('search_cname', userName);
        }

        if (date != ''){
            formData.append('date', date);
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

    _changeStateData(){
        this._getReturnJson(this.state.select_uid, this.state.date, this.state.u_name);
    }

    _searchCustom(data){
        this.setState({u_name: data})
        this._getReturnJson(this.state.select_uid, this.state.date, data)
    }

    _changeListUid(changeUid){
        this.setState({
            select_uid: changeUid,
            u_name: ''
        })
        this._getReturnJson(changeUid, this.state.date, '')
    }

    set_userInfo(userId,userName){
        this._changeListUid(userId)
    }

    set_c_gettime(date){
        this.setState({date: date})
        this._getReturnJson(this.state.select_uid, date, this.state.u_name)
    }
    showdatepicker(){
        UserPicker.closeUserPicker();
    }

    render() {

        if(!this.state.data){
            return (
                <View>

                    <View style={style.topBox}>
                        <View style={style.searchBox}>
                            <FontAwesome name="search" size={16} color="gray" style={style.searchIcon}/>
                            <TextInput
                                style={style.searchInput}
                                underlineColorAndroid='transparent' //设置下划线背景色
                                onChangeText = {this._searchCustom.bind(this)}
                                value = {this.state.u_name}
                                placeholder={'请输入客户名'}  //占位符
                                onFocus={this.showdatepicker = this.showdatepicker.bind(this)}

                            />
                        </View>

                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>
                        <DatePickerYYMM set_c_gettime={date=>this.set_c_gettime(date)} />
                    </View>
                </View>
            )
        }else{
            return(

                <View>
                    <View style={style.topBox}>
                        <View style={style.searchBox}>
                            <FontAwesome name="search" size={16} color="gray" style={style.searchIcon}/>
                            <TextInput
                                style={style.searchInput}
                                underlineColorAndroid='transparent' //设置下划线背景色
                                onChangeText = {this._searchCustom.bind(this)}
                                value = {this.state.u_name}
                                placeholder={'请输入客户名'}  //占位符
                                onFocus={this.showdatepicker = this.showdatepicker.bind(this)}

                            />
                        </View>

                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>
                        <DatePickerYYMM set_c_gettime={date=>this.set_c_gettime(date)} />
                    </View>

                    <ListView

                        style = {{marginBottom:60}}
                        dataSource={this.state.data}
                        renderRow={this._renderRow.bind(this)}

                    />

                </View>


            );
        }
    }

    _renderRow(rowData, sectionId, rowID, highlightRow){
        const { navigate } = this.props.navigation;

        return(
            <TouchableOpacity
                onPress={()=>{
                    UserPicker.closeUserPicker()
                    navigate('ReturnListInfoScene',{o_id: rowData.o_id})
                }}
            >
                <View style={style.itemConnect}>
                    <View style={style.statesView}>
                        <MyIcon sorceName={'circle'} sorceSize={12} sorceColor={rowData.state == 0 ? 'red' : 'green'}/>
                    </View>
                    <View style={style.dateView}>
                        <Text style={style.nameVal}>{rowData.o_return_date}</Text>
                    </View>
                    <View style={style.nameView}>
                        <Text style={style.nameVal}>{rowData.c_name}</Text>
                    </View>
                    <View style={style.moneyView}>
                        <Text style={style.moneyVal}>{rowData.o_return_money}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    topBox: {
        flexDirection:'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        alignItems: 'center',
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
    itemConnect: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
    },
    statesView: {
        height: 40,
        justifyContent: 'center',
    },
    dateView: {
        marginLeft: 10,
        height: 40,
        justifyContent: 'center',
    },
    nameView: {
        height: 40,
        justifyContent: 'center',
        marginLeft: 40,
    },
    nameVal: {
        fontSize: 18,
    },
    moneyVal: {
        fontSize: 18,
        color: '#FF9800',
        textAlign: 'right',
    },
    moneyView: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});

export default ReturnListScene;