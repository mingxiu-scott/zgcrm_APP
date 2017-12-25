import React, { PureComponent } from 'react'
import { View, Text, ScrollView,DeviceEventEmitter ,TouchableOpacity,Alert ,ListView, Image, StatusBar, FlatList, StyleSheet, TextInput, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import MyDatePicker from '../../widget/MyDatePicker'
import Moment from 'moment'
import PostUrl from "../../widget/PostUrl";

class EditChanceScene extends PureComponent {
    static navigationOptions =({navigation})=>({
        tabBarVisible: false,
        headerTitle: '编辑机会',
        headerRight: (
            <TouchableOpacity
                style={{padding: 10, marginRight:5, marginTop:3}}
                onPress={()=> Alert.alert('提示','你确定删除这个机会吗?',[
                    {text:'确定',onPress:()=>{
                        let url = PostUrl.deleteChanceUrl;
                        let formData = new FormData();

                        formData.append('ch_id',navigation.state.params.ch_id);

                        let sign = '{ch_id:"' + navigation.state.params.ch_id + '"},';

                        sign += PostUrl.signCode;

                        var forge = require('node-forge');

                        var md = forge.md.md5.create();

                        md.update(sign, 'utf8');

                        let signVal = md.digest().toHex();

                        formData.append('signVal', signVal);
                        formData.append('tokenVal', PostUrl.tokenVal);

                        let opts = {
                            method: 'POST',
                            body: formData
                        };
                        fetch(url,opts).then((response)=>{
                            return response.json();
                        }).then((responseText)=>{
                            DeviceEventEmitter.emit('changeChance','aa');
                            Alert.alert('提示',responseText.message, [
                                {text:'ok', onPress:()=>{
                                    DeviceEventEmitter.emit('changeChance','aa');
                                    navigation.goBack();
                                }}
                            ]);
                        }).catch((error)=>{
                            alert(error);
                        });
                    }},
                    {text:'取消'}
                ])}
            >
                <MyIcon sorceName={'times-circle'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity
                style={{padding: 10, marginLeft:5, marginTop:3}}
                onPress={()=> {
                    navigation.goBack()
                }}
            >
                <MyIcon sorceName={'reply'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
    })
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            ch_id: props.navigation.state.params.ch_id,
            c_id: props.navigation.state.params.c_id,
            u_id:props.navigation.state.params.u_id,
            ch_name: '',
            c_name: '',
            ch_date: '',
            ch_money: '',
            ch_desc: '',
        };
    }

    componentDidMount() {
        let url = PostUrl.getChanceInfoJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('ch_id', this.state.ch_id);

        var opts = {
            method:"POST",
            body:formData
        };
        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                this.setState({
                    data: responseText.dataValue,
                    ch_money: responseText.dataValue.ch_money,
                    ch_date: responseText.dataValue.ch_date,
                    ch_desc: responseText.dataValue.ch_desc,
                    c_name: responseText.dataValue.c_name,
                    ch_name:responseText.dataValue.ch_name
                })
            })
            .catch((error) => {
                alert(error)
            })
    }
    postRequest()
    {
        if (this.state.c_name == '' || this.state.ch_name == '' || this.state.ch_money == "" || this.state.ch_date == '') {
            Alert.alert('提示', '必填项不能为空');
            return;
        }

        let url = PostUrl.EditChanceUrl;

        let formDate = new FormData();

        formDate.append('ch_name', this.state.ch_name);
        formDate.append('c_name', this.state.c_name);
        formDate.append('ch_date', this.state.ch_date);
        formDate.append('ch_money', this.state.ch_money);
        formDate.append('ch_desc', this.state.ch_desc);
        formDate.append('ch_id',this.state.ch_id);
        formDate.append('c_id',this.state.c_id);
        formDate.append('u_id',this.state.u_id);


        let sign = '{ch_name:"' + this.state.ch_name + '"},' +
            '{c_name:"' + this.state.c_name + '"},' +
            '{ch_date:"' + this.state.ch_date + '"},' +
            '{ch_money:"' + this.state.ch_money + '"},' +
            '{ch_desc:"' + this.state.ch_desc + '"},'+
            '{ch_id:"' + this.state.ch_id + '"},'+
            '{c_id:"' + this.state.c_id + '"},'+
            '{u_id:"' + this.state.u_id + '"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');

        var md = forge.md.md5.create();

        md.update(sign, 'utf8');

        let signVal = md.digest().toHex();

        formDate.append('signVal', signVal);
        formDate.append("tokenVal", PostUrl.tokenVal);
        formDate.append("userId", PostUrl.userId);

        var opts = {
            method: 'POST',
            body: formDate
        };

        fetch(url, opts).then((response) => {
            return response.json();
        }).then((responseText) => {
            DeviceEventEmitter.emit('changeChance','aa');
            Alert.alert('提示',responseText.message);
        }).catch((error) => {
            alert(error);
        });

    }
    set_c_gettime(date) {
            this.setState({ch_date: date})
    }
    render() {
        if (this.state.data == null) {
            return (
                <Text>Loading</Text>
            );
        } else {
            return (
                <ScrollView>
                    <View>
                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>成交日期*</Text>
                            </View>

                            <View style={{alignItems: "flex-end"}}>
                                <MyDatePicker style={styles.TextInputs}
                                              set_c_gettime={date => this.set_c_gettime(date)}
                                              date={this.state.data.ch_date}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>机会名称*</Text>
                            <TextInput style={styles.TextInputs} placeholder="机会名称"
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text) => this.setState({ch_name: text})}
                                       defaultValue={this.state.data.ch_name}
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户名称*</Text>
                            <TextInput placeholder='客户姓名' style={styles.TextInputs}
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text) => this.setState({c_name: text})}
                                       defaultValue={this.state.data.c_name}
                                       editable={false}
                            />

                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>预期成交金额*</Text>
                            <TextInput placeholder='0.0'
                                       style={styles.TextInputs}
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text) => this.setState({ch_money: text})}
                                       defaultValue={this.state.data.ch_money}
                                       keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>备注</Text>
                            <TextInput style={styles.TextInputs}
                                       placeholder="备注内容"
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text) => this.setState({ch_desc: text})}
                                       defaultValue={this.state.data.ch_desc}
                            />
                        </View>
                        <View style={styles.formBtnRow}>
                            <TouchableOpacity style={styles.submitBtn} onPress={this.postRequest.bind(this)}>
                                <Text style={styles.submitBtnText}>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }

}

export default EditChanceScene;