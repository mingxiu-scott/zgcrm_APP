import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ListView, DeviceEventEmitter, StyleSheet, Picker, Platform } from 'react-native'

import ListStyle from '../../widget/ListStyle'
import PostUrl from "../../widget/PostUrl";
import DatePickerYYMM from '../../widget/DatePickerYYMM'
import UserPicker from '../../widget/UserPicker'
import MyIcon from '../../widget/MyIcon'

import EditTaskScene from './EditTaskScene';
import Moment from 'moment'

//和机会列表、任务列表一样
class TasksListScene extends PureComponent{

    static navigationOptions = ({navigation}) => ({
        headerTitle:'任务列表',
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
            data : null,
            select_uid: PostUrl.userId,
            select_uid_list: null,
            date: Moment(new Date()).format("YYYY-MM"),
        };
    }

    componentDidMount() {

        DeviceEventEmitter.addListener('changeTasksInfo', () => {
            this._getTaskListJson(this.state.select_uid, this.state.date)
        })

        this._getTaskListJson(PostUrl.userId, this.state.date)
    }

    _changeListUid(changeUid){
        this.setState({
            select_uid: changeUid,
        })
        this._getTaskListJson(changeUid, this.state.date)
    }

    set_c_gettime(date){
        this.setState({date: date})
        this._getTaskListJson(this.state.select_uid, date)
    }

    set_userInfo(userId,userName){
        this._changeListUid(userId)
    }

    _getTaskListJson(userId, date){

        UserPicker.closeUserPicker()

        let url = PostUrl.getTaskJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', userId);
        formData.append('date', date);

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
                        data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(responseText.dataValue),
                    });
                }
            })
            .catch((error) => {
                alert(error)
            });
    }

    _renderRow(rowData, sectionId, rowID, highlightRow){
        const { navigate } = this.props.navigation;

        if (PostUrl.userId == rowData.u_id) {
            return (
                <TouchableOpacity
                    onPress={() => {

                        UserPicker.closeUserPicker()

                        navigate('EditTaskScene', {
                            t_id: rowData.t_id,
                            u_id: rowData.u_id,
                            c_id: rowData.c_id
                        })
                    }}
                >
                    <View style={ListStyle.item}>
                        <View>
                            <View style={ListStyle.itemTitle}>
                                <Text style={ListStyle.itemTitleLeft}>客户：{rowData.c_name}</Text>
                                <Text style={ListStyle.itemTitleCenter}>经理：{rowData.u_name}</Text>
                                <Text style={ListStyle.itemTitleRight}>{rowData.t_date}</Text>
                            </View>
                            <Text style={ListStyle.itemConnect}>{rowData.t_desc}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }else{
            return (
                <View style={ListStyle.item}>
                    <View>
                        <View style={ListStyle.itemTitle}>
                            <Text style={ListStyle.itemTitleLeft}>客户：{rowData.c_name}</Text>
                            <Text style={ListStyle.itemTitleCenter}>经理：{rowData.u_name}</Text>
                            <Text style={ListStyle.itemTitleRight}>{rowData.t_date}</Text>
                        </View>
                        <Text style={ListStyle.itemConnect}>{rowData.t_desc}</Text>
                    </View>
                </View>
            );
        }
    }
    render() {
        if(this.state.data == null){
            return (
                <View>
                    <View style={styles.topBox}>
                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>
                        <DatePickerYYMM style={{textAlign: 'center'}} set_c_gettime={date=>this.set_c_gettime(date)} />
                    </View>
                </View>
            )
        }else {
            return (
                <View>
                    <View style={styles.topBox}>
                        <UserPicker set_userInfo={(userId,userName)=>this.set_userInfo(userId,userName)}/>
                        <DatePickerYYMM style={{textAlign: 'center'}} set_c_gettime={date=>this.set_c_gettime(date)} />
                    </View>

                    <ListView
                        dataSource={this.state.data}
                        renderRow={this._renderRow.bind(this)}
                        style = {{marginBottom:60}}
                    />
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
        alignItems: 'center',
    },
    searchBox: {
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
});
export default TasksListScene;