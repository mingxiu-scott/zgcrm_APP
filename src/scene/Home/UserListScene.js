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

import YearMonthPicker from '../../widget/YearMonthPicker';

class ReturnListScene extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        headerTitle:'用户列表',
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

    constructor(props){
        super(props);

        this.state = {
            data: null,
        };
    }

    componentDidMount() {

        this._getUserJson('');
    }

     _getUserJson(username){

        let url = PostUrl.getAllUserListsUrl;
        let formData = new FormData();
        formData.append('username', username);

        var opts = {
            method:"POST",
            body:formData,
        };
        fetch(url,opts)
            .then((response) => {

                return response.json();
            })
            .then((responseText) => {
                    this.setState({
                        data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(responseText),
                    });
            })
            .catch((error) => {
                alert(error)
            })
    }

    _searchUser(data){
        this._getUserJson(data);
    }

    render() {
        if(this.state.data == null){
            return (
                <View>
                    <View style={style.topBox}>
                        <View style={style.searchBox}>
                            <FontAwesome name="search" size={16} color="gray" style={style.searchIcon}/>
                            <TextInput
                                style={style.searchInput}
                                underlineColorAndroid='transparent' //设置下划线背景色
                                onChangeText = {this._searchUser.bind(this)}
                                placeholder={'请输入用户名'}  //占位符
                            />
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
                                onChangeText = {this._searchUser.bind(this)}
                                placeholder={'请输入用户名'}  //占位符
                            />
                        </View>
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
            >
                <View style={style.itemConnect}>
                    <View style={style.LeftIcon}>
                        <MyIcon sorceName={'id-card'} sorceColor={'#FF9800'} sorceSize={70}/>
                    </View>
                    <View style={style.rightContent}>
                        <View >
                            <Text >用户名:{rowData.u_username}</Text>
                        </View>

                        <View  >
                            <Text  >姓名:{rowData.u_name}</Text>
                        </View>
                        <View >
                            <Text>电话号码：{rowData.u_telphone}</Text>
                        </View>
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
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        flexDirection: 'row',
        marginBottom:10,
     },
    LeftIcon:{
        width:90,
        height:60,
     },
    rightContent:{
        marginLeft:70,
        paddingBottom:10
    }
});

export default ReturnListScene;