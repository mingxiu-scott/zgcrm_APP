import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    Picker,
    DeviceEventEmitter,
} from 'react-native';

import { StackNavigator} from 'react-navigation';

import NavStyle from '../../widget/NavStyle'
import MyIcon from '../../widget/MyIcon'
import DatePickerYYMM from '../../widget/DatePickerYYMM'
import PostUrl from "../../widget/PostUrl";
import UserPicker from '../../widget/UserPicker'

import Moment from 'moment'

class ReportScene extends PureComponent {

    static navigationOptions = {
        headerTitle: '报表',
    }

    constructor(props){
        super(props);
        this.state = {
            data : null,
            select_uid: PostUrl.userId,
            select_uid_list: null,
            date: Moment(new Date()).format("YYYY-MM"),
        };
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('changeLogInfo', (data) => {
            this._getReportJson(this.state.select_uid, this.state.date)
        });

        this._getReportJson(PostUrl.userId, this.state.date)
    }

    _changeListUid(changeUid){
        this.setState({
            select_uid: changeUid,
        })
        this._getReportJson(changeUid, this.state.date)
    }

    set_c_gettime(date){
        this.setState({date: date})
        this._getReportJson(this.state.select_uid, date)
    }

    _getReportJson(userId, date){

        UserPicker.closeUserPicker()

        let url = PostUrl.getReportJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', userId);
        formData.append('date', date)

        var opts = {
            method:"POST",
            body:formData
        };

        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {

                if (responseText.code == 'fail' || responseText.dataValue == ''){
                    this.setState({
                        data: null,
                    })
                }else{
                    this.setState({
                        data: responseText,
                    });
                }

            })
            .catch((error) => {
                alert(error)
            });
    }

    set_userInfo(userId,userName){
        this._changeListUid(userId)
    }

    render() {
        if(this.state.data == null){
            return (
                <View>
                    <View style={styles.topBox}>
                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>
                        <DatePickerYYMM set_c_gettime={date=>this.set_c_gettime(date)} />
                    </View>
                </View>
            )
        }else {
            return (
                <View>

                    <View style={styles.topBox}>
                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>
                        <DatePickerYYMM set_c_gettime={date=>this.set_c_gettime(date)} />
                    </View>

                    <ScrollView>
                        <View style={style.itemConnect}>
                            <View style={style.dateView}>
                                <Text style={style.nameVal}><MyIcon sorceName={'users'} sorceColor={'#259B24'}
                                                                    sorceSize={16}/></Text>
                            </View>
                            <View style={style.nameView}>
                                <Text style={style.nameVal}>客户数</Text>
                            </View>
                            <View style={style.moneyView}>
                                <Text style={style.moneyVal}>{this.state.data.customNum} 个</Text>
                            </View>
                        </View>
                        <View style={style.itemConnect}>
                            <View style={style.dateView}>
                                <Text style={style.nameVal}><MyIcon sorceName={'jpy'} sorceColor={'#FF9800'}
                                                                    sorceSize={16}/></Text>
                            </View>
                            <View style={style.nameView}>
                                <Text style={style.nameVal}>理财总额</Text>
                            </View>
                            <View style={style.moneyView}>
                                <Text style={style.moneyVal}>{this.state.data.o_money} 元</Text>
                            </View>
                        </View>
                        <View style={style.itemConnect}>
                            <View style={style.dateView}>
                                <Text style={style.nameVal}><MyIcon sorceName={'exchange'} sorceColor={'#009688'}
                                                                    sorceSize={16}/></Text>
                            </View>
                            <View style={style.nameView}>
                                <Text style={style.nameVal}>回款总额</Text>
                            </View>
                            <View style={style.moneyView}>
                                <Text style={style.moneyVal}>{this.state.data.return_money} 元</Text>
                            </View>
                        </View>
                        <View style={style.itemConnect}>
                            <View style={style.dateView}>
                                <Text style={style.nameVal}><MyIcon sorceName={'money'} sorceColor={'#E51C23'}
                                                                    sorceSize={16}/></Text>
                            </View>
                            <View style={style.nameView}>
                                <Text style={style.nameVal}>成交单数</Text>
                            </View>
                            <View style={style.moneyView}>
                                <Text style={style.moneyVal}>{this.state.data.orderCount} 单</Text>
                            </View>
                        </View>
                        <View style={style.itemConnect}>
                            <View style={style.dateView}>
                                <Text style={style.nameVal}><MyIcon sorceName={'comments'} sorceColor={'#8BC34A'}
                                                                    sorceSize={16}/></Text>
                            </View>
                            <View style={style.nameView}>
                                <Text style={style.nameVal}>跟进次数</Text>
                            </View>
                            <View style={style.moneyView}>
                                <Text style={style.moneyVal}>{this.state.data.followsCount} 次</Text>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor:'white',
    },
    topBox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
        height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏
        alignItems: 'center',
    },
    searchBox: {
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
});

const style = StyleSheet.create({
    itemConnect: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
    },
    dateView: {
        height: 40,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameView: {
        height: 40,
        justifyContent: 'center',
        marginLeft: 10,
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

const ReportStack = StackNavigator({
    ReportScene: {
        screen: ReportScene,
    },
},{
    navigationOptions: {
        headerTitleStyle: NavStyle.stackNavHeaderStyle,

        headerStyle: NavStyle.stackNavStyle,
    },
});
export default ReportStack;