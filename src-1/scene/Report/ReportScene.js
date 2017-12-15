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

        this._getUsersListsJson();

        DeviceEventEmitter.addListener('changeLogInfo', (data) => {
            this._getReportJson(this.state.select_uid, this.state.date)
        })

        this._getReportJson(PostUrl.userId, this.state.date)
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

    _renderPicker(key, i){
        return <Picker.Item key={i} label={key.u_name} value={key.u_id}/>
    }

    _getReportJson(userId, date){

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

    render() {
        if (!this.state.select_uid_list){
            return(
                <Text>loading...</Text>
            )
        }
        else if(this.state.data == null){
            return (
                <View>
                    <View style={styles.topBox}>

                        <View style={styles.selectUser}>
                            <Picker
                                selectedValue={this.state.select_uid}
                                onValueChange={(itemValue, itemIndex) => this._changeListUid(itemValue)}
                                style={{height: 80}}
                            >
                                {this.state.select_uid_list.map((key,i) => this._renderPicker(key,i))}
                            </Picker>
                        </View>

                        <View style={styles.selectDate}>
                            <DatePickerYYMM style={{textAlign: 'center'}} set_c_gettime={date=>this.set_c_gettime(date)} />
                        </View>

                    </View>
                </View>
            )
        }else {
            return (
                <View>

                    <View style={styles.topBox}>

                        <View style={styles.selectUser}>
                            <Picker
                                selectedValue={this.state.select_uid}
                                onValueChange={(itemValue, itemIndex) => this._changeListUid(itemValue)}
                                style={{height: 80}}
                            >
                                {this.state.select_uid_list.map((key, i) => this._renderPicker(key, i))}
                            </Picker>
                        </View>

                        <View style={styles.selectDate}>
                            <DatePickerYYMM style={{textAlign: 'center'}}
                                            set_c_gettime={date => this.set_c_gettime(date)}/>
                        </View>

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