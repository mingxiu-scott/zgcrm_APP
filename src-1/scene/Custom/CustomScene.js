import React, { PureComponent } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TextInput, ListView, TouchableOpacity, DeviceEventEmitter} from 'react-native'
import { StackNavigator, } from 'react-navigation';

import NavStyle from '../../widget/NavStyle'
import PostUrl from '../../widget/PostUrl'

import CustomInfoScene from './CustomInfoScene'
import CustomEditScene from './CustomEditScene'

import CreateCustomScene from '../Home/CreatCustomScene'

class CustomScene extends PureComponent{
    static navigationOptions = {
        headerTitle: '客户',
    }

    constructor(props){
        super(props);

        this.state = {
            data: null,
        };
    }

    componentWillMount() {

        DeviceEventEmitter.addListener('changeCustomInfo', () => { this._changeStateData() });

        DeviceEventEmitter.addListener('CreateCustomScene',()=>{this._changeStateData()});

        this._getCustomsJson('');
    }

    _getCustomsJson(cname){

        let url = PostUrl.getCustomsJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', PostUrl.userId);

        if (cname != '')
        {
            formData.append('search_cname', cname);
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

                if (responseText.dataValue != '')
                {
                    this.setState({
                        data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(responseText.dataValue),
                    });
                }else{
                    this.setState({
                        data: 'noResault',
                    })
                }
            })
            .catch((error) => {
                alert(error)
            })
    }

    _changeStateData(){
        this._getCustomsJson('');
    }

    _searchCustom(data){
        this._getCustomsJson(data);
    }

    render() {

        if (!this.state.data){
            return (
                <Text>loading...</Text>
            )

        }else if (this.state.data == 'noResault'){

            return (
                <View style={customerStyles.container}>
                    <View style={{flexDirection:'row', height:60,backgroundColor:'white',marginBottom: 10}}>
                        <TextInput
                            style={{ flex:2,
                                borderWidth:1,
                                margin:12,
                                borderColor: '#ccc',
                                borderRadius: 7,
                            }}
                            placeholder={'   请输入客户名'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchCustom.bind(this)}
                        />
                    </View>

                    <Text>no data ...</Text>

                </View>
            );

        }else{
            return (
                <View style={customerStyles.container}>
                    <View style={{flexDirection:'row', height:60,backgroundColor:'white',marginBottom: 10}}>
                        <TextInput
                            style={{ flex:2,
                                borderWidth:1,
                                margin:12,
                                borderColor: '#ccc',
                                borderRadius: 7,
                            }}
                            placeholder={'   请输入客户名'}  //占位符
                            underlineColorAndroid='transparent' //设置下划线背景色
                            onChangeText = {this._searchCustom.bind(this)}
                        />
                    </View>

                    <ListView
                        dataSource={this.state.data}
                        renderRow={this._renderRow.bind(this)}
                    />

                </View>
            );
        }

    }

    _onItemPress(e) {
        let num = 0 ;
        if (Number.isFinite(e) == false){
            num = Number.parseInt(e) + 1;
        }else{
            num = e + 1;
        }
        alert("click on the" + num + 'row');
    }

    _renderRow(rowData, sectionId, rowID, highlightRow) {

        const { navigate } = this.props.navigation;

        return (
            <TouchableOpacity
                onPress={()=>navigate('CustomInfoScene',{c_id: rowData.c_id})}
            >
            <View style={customerStyles.itemConnect}>
                <View style={customerStyles.itemImgView}>
                    <Image source={{uri:'https://img.alicdn.com/tps/TB1OvT9NVXXXXXdaFXXXXXXXXXX-520-280.jpg'}}></Image>
                </View>
                <View style={customerStyles.itemContentView}>
                    <View style={customerStyles.itemRow}>
                        <View style={customerStyles.itemRowOne}>
                            <Text style={customerStyles.itemRowLabel}>姓名：</Text>
                            <Text style={customerStyles.itemRowVal}>{rowData.c_name}</Text>
                        </View>
                    </View>
                    <View style={customerStyles.itemRow}>
                        <View style={customerStyles.itemRowOne}>
                            <Text style={customerStyles.itemRowLabel}>称呼：</Text>
                            <Text style={customerStyles.itemRowVal}>{rowData.c_called}</Text>
                        </View>
                    </View>
                    <View style={customerStyles.itemRow}>
                        <View style={customerStyles.itemRowOne}>
                            <Text style={customerStyles.itemRowLabel}>理财总额：</Text>
                            <Text style={customerStyles.itemRowVal}>{rowData.o_money}</Text>
                        </View>
                    </View>
                    <View style={customerStyles.itemRow}>
                        <View style={customerStyles.itemRowOne}>
                            <Text style={customerStyles.itemRowLabel}>收益总额：</Text>
                            <Text style={customerStyles.itemRowVal}>{rowData.o_return_money}</Text>
                        </View>
                    </View>

                    <View style={customerStyles.itemRow}>
                        <View style={customerStyles.itemRowOne}>
                            <Text style={customerStyles.itemRowLabel}>联系电话：</Text>
                            <Text style={customerStyles.itemRowVal}>{rowData.c_telphone}</Text>
                        </View>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
}

const customerStyles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        //backgroundColor:'white',
    },
    textInput:{
        borderWidth:1,
        marginLeft: 10,
        marginRight:10,
        marginTop:10,
        paddingLeft:1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    itemConnect: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    itemImgView: {
        width: 60,
        height: 60,
    },
    itemContentView: {
        marginLeft: 40,
    },
    itemRow: {
        flexDirection: 'row',
        marginBottom: 3,
    },
    itemRowTwo: {
        flexDirection: 'row',
        width: 240,
    },
    itemRowOne: {
        flexDirection: 'row',
        width: 240,
    },
    itemRowLabel: {
        width: 80,
        lineHeight: 20,
        fontSize: 14,
    },
    itemRowVal: {
        width: 180,
        fontSize: 16,
        lineHeight: 22,
    }

});

const CustomStack = StackNavigator({
    CustomScene: {
        screen: CustomScene,
    },
    CustomInfoScene: {
        screen: CustomInfoScene,
    },
    CustomEditScene: {
        screen: CustomEditScene,
    }
},{
    navigationOptions: {
        headerTitleStyle: NavStyle.stackNavHeaderStyle,
        headerStyle: NavStyle.stackNavStyle,
        headerBackTitleStyle: NavStyle.stackBackStyle,
    },
});
export default CustomStack;