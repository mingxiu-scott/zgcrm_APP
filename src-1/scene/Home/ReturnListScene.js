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

import ReturnListInfoScene from './ReturnListInfoScene';

class ReturnListScene extends PureComponent {
    static navigationOptions = {
        headerTitle:'回款记录',
        tabBarVisible: false,
    }

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

    componentWillMount() {

        this._getUsersListsJson();

        DeviceEventEmitter.addListener('changeReturnInfo', () => { this._changeStateData() })
        this._getReturnJson(this.state.select_uid, this.state.date, this.state.u_name);
    }

    _getReturnJson(userId, date, userName){

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
        this._getReturnJson(this.state.select_uid, this.state.u_name);
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

    set_c_gettime(date){
        this.setState({date: date})
        this._getReturnJson(this.state.select_uid, date, this.state.u_name)
    }

    render() {

        if (!this.state.select_uid_list){
            return(
                <Text>loading...</Text>
            )
        }
        else if(!this.state.data){
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
                            />
                        </View>

                        <View style={style.selectUser}>
                            <Picker
                                selectedValue={this.state.select_uid}
                                onValueChange={(itemValue, itemIndex) => this._changeListUid(itemValue)}
                                style={{height: 80}}
                            >
                                {this.state.select_uid_list.map((key,i) => this._renderPicker(key,i))}
                            </Picker>
                        </View>

                        <View style={style.selectDate}>
                            <DatePickerYYMM style={{textAlign: 'center'}} set_c_gettime={date=>this.set_c_gettime(date)} />
                        </View>

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
                            />
                        </View>

                        <View style={style.selectUser}>
                            <Picker
                                selectedValue={this.state.select_uid}
                                onValueChange={(itemValue, itemIndex) => this._changeListUid(itemValue)}
                                style={{height: 80}}
                            >
                                {this.state.select_uid_list.map((key,i) => this._renderPicker(key,i))}
                            </Picker>
                        </View>

                        <View style={style.selectDate}>
                            <DatePickerYYMM style={{textAlign: 'center'}} set_c_gettime={date=>this.set_c_gettime(date)} />
                        </View>

                    </View>

                    <ListView
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
                onPress={()=>navigate('ReturnListInfoScene',{o_id: rowData.o_id})}
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
        paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
        height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏
        alignItems: 'center',
    },
    searchBox:{
        flex: 1,
        flexDirection: 'row',
        height: 30,
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