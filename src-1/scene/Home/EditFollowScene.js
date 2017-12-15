import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,DeviceEventEmitter ,ListView, Image, StatusBar, FlatList, StyleSheet, TextInput, Button,Alert } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import MyDatePicker from '../../widget/MyDatePicker'
import PostUrl from "../../widget/PostUrl";
import Moment from 'moment'

class EditFollowScene extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            fl_id: props.navigation.state.params.fl_id,
            c_id: props.navigation.state.params.c_id,
            u_id:props.navigation.state.params.u_id,
            fl_date:'',
            c_name:'',
            fl_desc:''
        }
    }

    static navigationOptions =({navigation})=>({
        headerTitle: '编辑跟进记录',
        tabBarVisible: false,
        headerRight: (
            <TouchableOpacity
                style={{padding: 10, marginRight:5, marginTop:3}}
                onPress={()=> Alert.alert('提示','你确定删除这个跟进记录吗?',[
                    {text:'确定',onPress:()=>{
                        let url = PostUrl.deleteFollowJsonUrl;
                        let formData = new FormData();

                        formData.append('fl_id',navigation.state.params.fl_id);

                        let sign = '{fl_id:"' + navigation.state.params.fl_id + '"},';


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
                            Alert.alert('提示',responseText.message, [
                                {text:'ok', onPress:()=>{
                                    DeviceEventEmitter.emit('changeFlowsInfo','aa');
                                    navigation.goBack();
                                }}
                            ]);
                            //跳转返回上个页面
                        }).catch((error)=>{
                            alert(error);
                        });
                    }},
                    {text:'取消'}
                ])}
            >
                <MyIcon sorceName={'times-circle'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        )
    });

    componentDidMount() {
        let url = PostUrl.getFollowInfoJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('fl_id', this.state.fl_id);

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
                    fl_date: responseText.dataValue.fl_date,
                    fl_desc: responseText.dataValue.fl_desc,
                    c_name: responseText.dataValue.c_name,
                })
            })
            .catch((error) => {
                alert(error)
            })
    }

    postRequest() {

        if (
            this.state.c_name == '' ||
            this.state.fl_date == ''
        ) {
            Alert.alert('提示','必填项不可为空');
            return;
        }

        let url = PostUrl.EditFollowUrl;

        let formData = new FormData();

        formData.append('c_name', this.state.c_name);
        formData.append('fl_desc', this.state.fl_desc);
        formData.append('fl_date',this.state.fl_date);
        formData.append('fl_id',this.state.fl_id);
        formData.append('c_id',this.state.c_id);
        formData.append('u_id',this.state.u_id);

        let sign =
            '{c_name:"' + this.state.c_name + '"},' +
            '{fl_desc:"' + this.state.fl_desc + '"},'+
            '{fl_date:"' + this.state.fl_date + '"},'+
            '{fl_id:"' + this.state.fl_id + '"},'+
            '{c_id:"' + this.state.c_id + '"},'+
            '{u_id:"' + this.state.u_id + '"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');
        var md = forge.md.md5.create();
        md.update(sign, 'utf8');
        let signVal = md.digest().toHex();

        formData.append('signVal', signVal);

        var opts = {
            method: 'POST',
            body: formData,
        }
        fetch(url, opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                DeviceEventEmitter.emit('changeFlowsInfo','aa');
                Alert.alert('提示', responseText.message);
            })
            .catch((error) => {
                alert(error)
            })
    }

    set_c_gettime(date){
        this.setState({fl_date: date})
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
                                <Text style={styles.lineHeightAll}>跟进日期*</Text>
                            </View>

                            <MyDatePicker style={styles.TextInputs}
                                          set_c_gettime={date => this.set_c_gettime(date)}
                                          date={this.state.data.fl_date}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户名称*</Text>
                            <TextInput
                                placeholder='客户姓名'
                                style={styles.TextInputs}
                                underlineColorAndroid="transparent"
                                maxLength={5}
                                onChangeText={(text) => this.setState({c_name: text})}
                                defaultValue={this.state.data.c_name}
                                editable={false}
                            >
                            </TextInput>
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>内容</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="内容"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({fl_desc: text})}
                                defaultValue={this.state.data.fl_desc}

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

export default EditFollowScene;