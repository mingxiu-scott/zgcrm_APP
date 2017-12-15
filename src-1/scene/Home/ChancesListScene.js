import React, { PureComponent } from 'react'
import { View, Text,DeviceEventEmitter, TouchableOpacity, ListView, StyleSheet, TextInput, Picker, Platform} from 'react-native'

import ListStyle from '../../widget/ListStyle'
import PostUrl from "../../widget/PostUrl";
import DatePickerYYMM from '../../widget/DatePickerYYMM'

import EditChanceScene from './EditChanceScene';
import Moment from 'moment'

//和机会列表、任务列表一样
class ChancesListScene extends PureComponent{

    static navigationOptions = {
        headerTitle:'机会列表',
        tabBarVisible: false,
    };
    constructor(props){
        super(props);
        this.state = {
            data : null,
            select_uid: PostUrl.userId,
            select_uid_list: null,
            date: Moment(new Date()).format("YYYY-MM"),
        };
    }
    _changeStateData(){
        this._getChancesJson(this.state.select_uid, this.state.date);
    }

    componentWillMount() {

        this._getUsersListsJson();

        DeviceEventEmitter.addListener('changeChance', () => { this._changeStateData() });
        this._getChancesJson(this.state.select_uid, this.state.date);
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

    set_c_gettime(date){
        this.setState({date: date});
        this._getChancesJson(this.state.select_uid, date)
    }

    _changeListUid(changeUid){
        this.setState({
            select_uid: changeUid,
        })
        this._getChancesJson(changeUid, this.state.date)
    }

    _renderPicker(key, i){
        return <Picker.Item key={i} label={key.u_name} value={key.u_id}/>
    }

    _getChancesJson(userId, date){
        let url = PostUrl.getChanceJsonUrl;
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
                    onPress={() => navigate('EditChanceScene', {
                        ch_id: rowData.ch_id,
                        u_id: rowData.u_id,
                        c_id: rowData.c_id
                    })}
                >
                    <View style={ListStyle.item}>
                        <View>
                            <View style={ListStyle.itemTitle}>
                                <Text style={ListStyle.itemTitleLeft}>客户：{rowData.c_name}</Text>
                                <Text style={ListStyle.itemTitleCenter}>经理：{rowData.u_name}</Text>
                                <Text style={ListStyle.itemTitleRight}>{rowData.ch_date}</Text>
                            </View>
                            <Text style={ListStyle.itemConnect}>{rowData.ch_desc}</Text>
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
                            <Text style={ListStyle.itemTitleRight}>{rowData.ch_date}</Text>
                        </View>
                        <Text style={ListStyle.itemConnect}>{rowData.ch_desc}</Text>
                    </View>
                </View>
            );
        }
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
                                {this.state.select_uid_list.map((key,i) => this._renderPicker(key,i))}
                            </Picker>
                        </View>

                        <View style={styles.selectDate}>
                            <DatePickerYYMM style={{textAlign: 'center'}} set_c_gettime={date=>this.set_c_gettime(date)} />
                        </View>

                    </View>

                    <ListView
                        dataSource={this.state.data}
                        renderRow={this._renderRow.bind(this)}
                        style={{marginBottom: 60}}
                    />
                </View>
            );

        }

    }}

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
})

export default ChancesListScene;