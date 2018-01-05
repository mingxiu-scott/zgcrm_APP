import React, { PureComponent } from 'react'
import { View, Text, ScrollView ,TouchableOpacity,Alert,Switch, ListView, Image, StatusBar, FlatList, StyleSheet, TextInput, Button,DeviceEventEmitter } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Moment from 'moment'
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
                    navigation.goBack();
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
            t_feedback: '',
            t_status: '',
            t_finishtime:  Moment(new Date()).format("YYYY-MM-DD"),
            status: '未完成',
        };
    }

    componentWillMount() {
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
                    status: responseText.dataValue.t_status == 1 ? '已完成':'未完成',
                    t_endtime: responseText.dataValue.t_endtime,
                    t_feedback: responseText.dataValue.t_feedback,
                    t_finishtime: responseText.dataValue.t_finishtime,
                })
            })
            .catch((error) => {
                alert(error)
            })
    }

    postRequest(){
        if ( this.state.t_name == ''|| this.state.t_finishtime == '' || this.state.t_feedback == ''){
            Alert.alert('提示','必填项不能为空');
            return;
        }

        let url = PostUrl.editTasksJsonUrl;

        let formData = new FormData();

        formData.append('t_name',this.state.t_name);
        formData.append('t_date',this.state.date);
        formData.append('c_name',this.state.c_name);
        formData.append('t_desc',this.state.t_desc);
        formData.append('t_status',this.state.status);
        formData.append('t_id',this.state.t_id);
        formData.append('u_id',this.state.u_id);
        formData.append('c_id',this.state.c_id);
        formData.append('t_finishtime',this.state.t_finishtime);
        formData.append('t_feedback',this.state.t_feedback);

        let sign = '{t_name:"' + this.state.t_name + '"},' +
                    '{t_date:"' + this.state.date + '"},' +
                    '{c_name:"' + this.state.c_name + '"},' +
                    '{t_desc:"' + this.state.t_desc + '"},' +
                    '{t_status:"' + this.state.status + '"},'+
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
            DeviceEventEmitter.emit('changeTasksInfo', this.state);
            Alert.alert('提示',responseText.message);
        }).catch((error)=>{
            alert(error);
        });
    }

    set_c_gettime(date){
        this.setState({t_finishtime: date})
    }

    set_t_status(status){
        this.setState({status:status});
    }

    changeStatus(){
        if(this.state.status == '未完成'){
            this.setState({status:'已完成'});
        }else{
            this.setState({status:'未完成'});
        }
    }
    render(){

        if (this.state.date == ''){
            return (
                <Text>loading...</Text>
            )
        }else{
            return(
                <ScrollView>
                    <View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>开始日期*</Text>
                            <TextInput placeholder='任务名称'
                                       style={styles.TextInputs} underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({t_name:text})}
                                       defaultValue={this.state.date}
                                       editable={false}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>截止日期*</Text>
                            <TextInput placeholder='任务名称'
                                       style={styles.TextInputs} underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({t_name:text})}
                                       defaultValue={this.state.t_endtime}
                                       editable={false}
                            />
                        </View>
                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>完成日期*</Text>
                            </View>
                            <View style={{alignItems: "flex-end"}}>
                            <MyDatePicker style={styles.TextInputs}
                                          set_c_gettime={date=>this.set_c_gettime(date)}
                                          date = {this.state.t_finishtime}
                            />
                            </View>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>任务名称*</Text>
                            <TextInput placeholder='任务名称'
                                       style={styles.TextInputs} underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({t_name:text})}
                                       defaultValue={this.state.t_name}
                                       editable={false}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户名称*</Text>
                            <TextInput placeholder='客户姓名'
                                       style={styles.TextInputs} underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({c_name:text})}
                                       defaultValue={this.state.c_name}
                                       editable={false}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>完成状态*</Text>
                            <Text placeholder='完成状态'
                                  style={{position:'absolute',right:15, border: 1}}
                                  onPress={()=>this.changeStatus()}
                            >{this.state.status}</Text>
                        </View>
                        <View style={styles.formRowContents}>
                            <Text style={styles.lineHeightAll}>任务内容</Text>
                            <TextInput style={styles.TextInputContents}
                                       placeholder="任务内容"
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({t_desc:text})}
                                       defaultValue={this.state.t_desc}
                                       multiline={true}
                                       editable={false}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>任务反馈*</Text>
                            <TextInput placeholder='任务反馈'
                                       style={styles.TextInputs} underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({t_feedback:text})}
                                       defaultValue={this.state.t_feedback}
                            />
                        </View>
                        <View style={styles.formBtnRow}>
                            <TouchableOpacity style={styles.submitBtn} onPress={this.postRequest.bind(this)}>
                                <Text style={styles.submitBtnText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}

export default EditTaskScene;