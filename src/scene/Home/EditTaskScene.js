import React, { PureComponent } from 'react'
import { View, Text, ScrollView ,TouchableOpacity,Alert, ListView, Image, StatusBar, FlatList, StyleSheet, TextInput, Button,DeviceEventEmitter } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import MyDatePicker from '../../widget/MyDatePicker'
import MySwitch from '../../widget/MySwitch'

import PostUrl from '../../widget/PostUrl'

class EditTaskScene extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        tabBarVisible: false,
        headerTitle: '编辑任务',
        headerRight: (
            <TouchableOpacity
                style={{padding: 10, marginRight:5, marginTop:3}}
                onPress={()=> Alert.alert('提示','你确定删除这个任务吗?',[
                    {text:'确定',onPress:()=>{
                        let url = PostUrl.deleteTasksJsonUrl;
                        let formData = new FormData();

                        formData.append('t_id',navigation.state.params.t_id);

                        let sign = '{t_id:"' + navigation.state.params.t_id + '"},';

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
                            DeviceEventEmitter.emit('changeTasksInfo','aa');
                            Alert.alert('提示',responseText.message, [
                                {text:'ok', onPress:()=>{
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
    });

    constructor(props){
        super(props);
        this.state = {
            t_id: props.navigation.state.params.t_id,
            u_id: props.navigation.state.params.u_id,
            c_id: props.navigation.state.params.c_id,
            date:'',
            t_name: '',
            c_name: '',
            t_desc: '',
            status: false,
        };
    }

    componentDidMount() {
        let url = PostUrl.getTaskInfoJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', PostUrl.userId);
        formData.append('t_id', this.state.t_id);
        formData.append('u_id',this.state.u_id);

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
                    date: responseText.dataValue.t_date,
                    t_name: responseText.dataValue.t_name,
                    c_name: responseText.dataValue.c_name,
                    t_desc: responseText.dataValue.t_desc,
                    status: responseText.dataValue.t_status,
                })
            })
            .catch((error) => {
                alert(error)
            })
    }

    postRequest(){
        if (this.state.date == '' || this.state.t_name == '' || this.state.t_status == ''){
            Alert.alert('提示','必填项不能为空');
        }

        let url = PostUrl.editTasksJsonUrl;

        let formData = new FormData();
        formData.append('t_name',this.state.t_name);
        formData.append('t_date',this.state.date);
        formData.append('c_name',this.state.c_name);
        formData.append('t_desc',this.state.t_desc);
        formData.append('t_status',this.state.t_status);
        formData.append('t_id',this.state.t_id);
        formData.append('u_id',this.state.u_id);
        formData.append('c_id',this.state.c_id);

        let sign = '{t_name:"' + this.state.t_name + '"},' +
                    '{t_date:"' + this.state.date + '"},' +
                    '{c_name:"' + this.state.c_name + '"},' +
                    '{t_desc:"' + this.state.t_desc + '"},' +
                    '{t_status:"' + this.state.t_status + '"},'+
                    '{t_id:"' + this.state.t_id + '"},'+
                    '{u_id:"' + this.state.u_id + '"},'+
                    '{c_id:"' + this.state.c_id + '"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');

        var md = forge.md.md5.create();

        md.update(sign, 'utf8');

        let signVal = md.digest().toHex();

        formData.append('signVal', signVal);
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', PostUrl.userId);

        let opts = {
            method: 'POST',
            body: formData
        };

        fetch(url,opts).then((response)=>{
            return response.json();
        }).then((responseText)=>{

            DeviceEventEmitter.emit('changeTasksInfo', this.state)
            Alert.alert('提示',responseText.message);
        }).catch((error)=>{
            alert(error);
        });
    }

    set_c_gettime(date){
        this.setState({date: date})
    }

    set_t_status(status){
        this.setState({t_status:status});
    }

    render(){

        if (this.state.date == ''){
            this.state.status == 1 ? true: false;
            return (
                <Text>loading...</Text>
            )
        }else{
            return(
                <ScrollView>
                    <View>
                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>执行日期*</Text>
                            </View>

                            <View style={{alignItems: "flex-end"}}>
                            <MyDatePicker style={styles.TextInputs}
                                          set_c_gettime={date=>this.set_c_gettime(date)}
                                          date={this.state.date}
                            />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>任务名称*</Text>
                            <TextInput placeholder='任务名称'
                                       style={styles.TextInputs} underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({t_name:text})}
                                       defaultValue={this.state.t_name}
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户名称*</Text>
                            <TextInput placeholder='客户姓名'
                                       style={styles.TextInputs} underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({c_name:text})}
                                       defaultValue={this.state.c_name}
                            />
                        </View>

                        <View style={styles.fristformRow}>
                            <Text style={[styles.lineHeightAllDate,styles.lineHeightAll,{lineHeight:35}]}>任务状态*</Text>
                            <MySwitch style={[styles.textInput]} set_t_status={status=>this.set_t_status(status)} value={this.state.status} />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>备注</Text>
                            <TextInput style={styles.TextInputs}
                                       placeholder="备注内容"
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({t_desc:text})}
                                       defaultValue={this.state.t_desc}
                            />
                        </View>
                        <View style={styles.formBtnRow}>
                            <TouchableOpacity style={styles.submitBtn} onPress={this.postRequest.bind(this)}>
                                <Text style={styles.submitBtnText}>修改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            );
        }

    }
}

export default EditTaskScene;