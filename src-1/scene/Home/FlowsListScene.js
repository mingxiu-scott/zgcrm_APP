import React, { PureComponent } from 'react'
import {
    View,
    Text,
    DeviceEventEmitter,
    Alert ,
    TouchableOpacity,
    ListView,
    TextInput,
    Picker,
} from 'react-native'

import ListStyle from '../../widget/ListStyle'
import PostUrl from "../../widget/PostUrl";
import EditFollowScene from './EditFollowScene';

//和机会列表、任务列表一样
class FlowsListScene extends PureComponent{
    static navigationOptions = {
        headerTitle:'跟踪记录',
        tabBarVisible: false,
    }

    constructor(props){
        super(props);
        this.state = {
            data : null,
            select_uid: PostUrl.userId,
            select_uid_list: null,
            u_name: '',
        };
    }

    componentWillMount() {
        this._getUsersListsJson();

        DeviceEventEmitter.addListener('changeFlowsInfo', () => { this._changeStateData() });
        this._getFollowsLogJson(this.state.select_uid, '');
    }

    _changeStateData(){
        this._getFollowsLogJson(this.state.select_uid, this.state.u_name);
    }

    _getFollowsLogJson(userId, userName){
        let url = PostUrl.getFollowLogListJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', userId);

        if (userName != ''){
            formData.append('search_cname', userName);
        }

        var opts = {
            method:"POST",
            body:formData
        };
        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                if (responseText.dataValue == ''){
                    this.setState({
                        data: null
                    })
                }else {
                    this.setState({
                        data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(responseText.dataValue),
                    });
                }
            })
            .catch((error) => {
                alert(error)
            });
    }

    _renderRow(rowData, sectionId, rowID, highlightRow){

        const { navigate } = this.props.navigation;

        if (rowData.u_id == PostUrl.userId ){
            return(

                <TouchableOpacity
                    onPress={()=>navigate('EditFollowScene',{fl_id:rowData.fl_id,u_id: rowData.u_id,c_id:rowData.c_id})}
                >
                    <View style={ListStyle.item}>
                        <View>
                            <View style={ListStyle.itemTitle}>
                                <Text style={ListStyle.itemTitleLeft}>客户：{rowData.c_name}</Text>
                                <Text style={ListStyle.itemTitleCenter}>经理：{rowData.u_name}</Text>
                                <Text style={ListStyle.itemTitleRight}>{rowData.fl_date}</Text>
                            </View>
                            <Text style={ListStyle.itemConnect}>{rowData.fl_desc}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            );
        }else{
            return(

                <View style={ListStyle.item}>
                    <View>
                        <View style={ListStyle.itemTitle}>
                            <Text style={ListStyle.itemTitleLeft}>客户：{rowData.c_name}</Text>
                            <Text style={ListStyle.itemTitleCenter}>经理：{rowData.u_name}</Text>
                            <Text style={ListStyle.itemTitleRight}>{rowData.fl_date}</Text>
                        </View>
                        <Text style={ListStyle.itemConnect}>{rowData.fl_desc}</Text>
                    </View>
                </View>

            );
        }

    }

    _searchCustom(data){
        this.setState({u_name: data})
        this._getFollowsLogJson(this.state.select_uid, data)
    }

    _changeListUid(changeUid){
        this.setState({
            select_uid: changeUid,
            u_name: ''
        })
        this._getFollowsLogJson(changeUid, '')
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

    render() {
        if (!this.state.select_uid_list){
            return(
                <Text>loading...</Text>
            )
        }
        else if(this.state.data == null){
            return (
                <View>
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
        }else {
            return (
                <View>
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
}

export default FlowsListScene;