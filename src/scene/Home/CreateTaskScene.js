import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,Alert, ListView, Image, StatusBar, FlatList, StyleSheet, TextInput, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import MyDatePicker from '../../widget/MyDatePicker'
import MySwitch from '../../widget/MySwitch'

import Moment from 'moment'
import PostUrl from '../../widget/PostUrl'

class CreateTaskScene extends PureComponent {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '录任务',
    }

    constructor(props){
        super(props);
        this.state = {
            t_date: Moment(new Date()).format("YYYY-MM-DD"),
            t_name: '',
            c_id: '',
            c_name:'客户姓名',
            t_desc: '',
            t_status: true,

            submitBtnSytle: styles.submitBtn,
            submitBtnDisabled: false,

        };
    }
    postRequest(){

        if (this.state.t_date == '' || this.state.t_name == '' || this.state.t_status == ''){
            Alert.alert('提示','必填项不能为空');
            return;
        }
        this._set_submitBtnDisabled();

        let url = PostUrl.createTasksJsonUrl;

        let formData = new FormData();
        formData.append('create_time',this.state.create_time);
        formData.append('t_name',this.state.t_name);
        formData.append('t_date',this.state.t_date);
        formData.append('c_id', this.state.c_id);
        formData.append('c_name',this.state.c_name);
        formData.append('t_desc',this.state.t_desc);
        formData.append('t_status',this.state.t_status);

        let sign = '{t_name:"' + this.state.t_name + '"},' +
                    '{t_date:"' + this.state.t_date + '"},' +
                    '{c_name:"' + this.state.c_name + '"},' +
                    '{t_desc:"' + this.state.t_desc + '"},' +
                    '{t_status:"' + this.state.t_status + '"},' ;

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
            if (responseText.code != 'success'){
                this._set_submitBtn();
            }
            Alert.alert('提示',responseText.message);
        }).catch((error)=>{
            alert(error);
        });
    }

    set_c_gettime(date){
        this.setState({t_date: date})
    }

    set_t_status(status){
        this.setState({t_status:status});
    }

    changeUserName(customInfo){
        this.setState({
            c_name: customInfo.c_name,
            c_id: customInfo.c_id,
        })
    }

    _set_submitBtnDisabled(){
        this.setState({
            submitBtnDisabled: true,
            submitBtnSytle: styles.submitBtnDisabled,
        })
    }

    _set_submitBtn(){
        this.setState({
            submitBtnDisabled: false,
            submitBtnSytle: styles.submitBtn,
        })
    }

    render(){

        const { navigate } = this.props.navigation;

        return(
            <ScrollView>
            <View>
                <View style={styles.fristformRow}>
                    <View style={styles.lineHeightAllDate}>
                        <Text style={styles.lineHeightAll}>执行日期*</Text>
                    </View>

                    <View style={{alignItems: "flex-end"}}>
                        <MyDatePicker style={styles.TextInputs} set_c_gettime={date=>this.set_c_gettime(date)} />
                    </View>
                </View>

                <View style={styles.fristformRow}>
                    <View style={styles.lineHeightAllDate}>
                        <Text style={styles.lineHeightAll}>客户名称*</Text>
                    </View>
                    <TouchableOpacity style={styles.getCustomLabel}
                        onPress={()=>navigate('MyCustomChooseScene',{callback:(backData)=> this.changeUserName(backData)})}
                    >
                        <Text>{this.state.c_name}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>任务名称*</Text>
                    <TextInput placeholder='任务名称'
                               style={styles.TextInputs} underlineColorAndroid="transparent"
                               onChangeText={(text)=>this.setState({t_name:text})}
                    />
                </View>

                <View style={styles.fristformRow}>
                    <Text style={[styles.lineHeightAllDate,styles.lineHeightAll,{lineHeight:35}]}>任务状态*</Text>
                    <MySwitch style={[styles.textInput]} set_t_status={status=>this.set_t_status(status)} status={this.state.status} />
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>备注</Text>
                    <TextInput style={styles.TextInputs}
                               placeholder="备注内容"
                               underlineColorAndroid="transparent"
                               onChangeText={(text)=>this.setState({t_desc:text})}
                    />
                </View>
                <View style={styles.formBtnRow}>
                    <TouchableOpacity style={this.state.submitBtnSytle} disabled={this.state.submitBtnDisabled} onPress={this.postRequest.bind(this)}>
                        <Text style={styles.submitBtnText}>保存</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        );
    }
}

export default CreateTaskScene;