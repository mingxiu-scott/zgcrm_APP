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
    Alert,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostUrl from '../../widget/PostUrl';
import MyIcon from '../../widget/MyIcon'
import DatePickerYYMM from '../../widget/DatePickerYYMM'
import UserPicker from '../../widget/UserPicker'
import YearMonthPicker from '../../widget/YearMonthPicker';

class ReturnListScene extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        headerTitle:'下属列表',
        tabBarVisible: false,
        headerLeft: (
            <TouchableOpacity
                style={{padding: 10, marginLeft:5, marginTop:3}}
                onPress={()=> {
                    UserPicker.closeUserPicker();
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
        };
    }

    componentDidMount() {

        this._getSubordinateJson('','');
    }

    _getSubordinateJson(username,deleteId){

        let url = PostUrl.getSubordinateListsUrl;
        let formData = new FormData();
        formData.append('userId', PostUrl.userId);

        if (username != '')
        {
            formData.append('username', username);
        }
        if (deleteId != '')
        {

            formData.append('deleteId', deleteId);
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
                this.setState({
                    data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(responseText),
                });
            })
            .catch((error) => {
                alert(error)
            })
    }
    _searchUser(data){

        this._getSubordinateJson(data,'');
    }

    _deleteSubordinate(roleId){
        Alert.alert('提示','确定删除下属吗？',[{
            text: '确定',onPress:()=>{
                
                this._getSubordinateJson('',roleId);
            }
        },{
            text: '取消',
        }])
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
                                placeholder={'请输入下属名称'}  //占位符
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
                                placeholder={'请输入下属名称'}  //占位符
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
            //{/*<TouchableOpacity*/}
                // onPress={()=>{
                // UserPicker.closeUserPicker()
                // navigate('ReturnListInfoScene',{o_id: rowData.o_id})
                // }}
           // {/*>*/}
                <View>
                <View style={style.itemConnect}>

                    <View style={style.nameView}>
                        <Text style={style.nameVal}>u_id:{rowData.u_id}</Text>
                    </View>
                    <View style={style.nameView}>
                        <Text style={style.nameVal}>姓名:{rowData.u_name}</Text>
                    </View>
                    <View style={style.nameView}>
                        <Text style={style.nameVal}>r_id:{rowData.r_id}</Text>
                    </View>

                    <TouchableOpacity
                        style={{position:'absolute',right:20,top:18,}}
                        onPress={()=> {
                            this._deleteSubordinate(rowData.r_id);
                        }}
                    >
                        <MyIcon sorceName={'trash-o'} sorceSize={20} sorceColor={'red'}/>
                    </TouchableOpacity>

                </View>
                </View>
            //{/*</TouchableOpacity>*/}
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
        marginLeft: 20,
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