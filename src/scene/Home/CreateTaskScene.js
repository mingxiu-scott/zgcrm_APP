import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,Alert, ListView, Image, StatusBar, FlatList, StyleSheet, TextInput, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import MyDatePicker from '../../widget/MyDatePicker'
import MySubordinateChooseScene from  './MySubordinateChooseScene';

import Moment from 'moment'
import PostUrl from '../../widget/PostUrl'

class CreateTaskScene extends PureComponent {
    static navigationOptions =({navigation})=>({
        tabBarVisible: false,
        headerTitle: '录任务',
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
            t_date: Moment(new Date()).format("YYYY-MM-DD"),
            t_name: '',
            c_id: '',
            c_name:'客户姓名',
            t_desc: '',
            t_status: true,
            t_endtime: Moment(new Date()).format("YYYY-MM-DD"),
            submitBtnSytle: styles.submitBtn,
            submitBtnDisabled: false,
            xiashu_name: '下属名称',
            xiashu_id: '',
        };
    }

    postRequest(){


        if (this.state.t_date == '' ||
            this.state.t_name == ''||
            this.state.t_desc == '' ||
            this.state.t_endtime == '' || this.state.xiashu_id == ''){
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
        formData.append('t_endtime',this.state.t_endtime);
        formData.append('xiashu_id',this.state.xiashu_id);

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

    set_c_gettime2(date){
        this.setState({t_endtime: date})
    }

    set_t_status(status){
        this.setState({t_status:status});
    }

    changeXiaShuName(xiashuInfo){
        this.setState({
            xiashu_name: xiashuInfo.u_name,
            xiashu_id: xiashuInfo.u_id,
        })
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
                        <Text style={styles.lineHeightAll}>开始日期*</Text>
                    </View>

                    <View style={{alignItems: "flex-end"}}>
                        <MyDatePicker style={styles.TextInputs} set_c_gettime={date=>this.set_c_gettime(date)} />
                    </View>
                </View>
                <View style={styles.fristformRow}>
                    <View style={styles.lineHeightAllDate}>
                        <Text style={styles.lineHeightAll}>截止日期*</Text>
                    </View>

                    <View style={{alignItems: "flex-end"}}>
                        <MyDatePicker style={styles.TextInputs} set_c_gettime={date=>this.set_c_gettime2(date)} />
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

                <View style={styles.fristformRow}>
                    <View style={styles.lineHeightAllDate}>
                        <Text style={styles.lineHeightAll}>下属名称*</Text>
                    </View>
                    <TouchableOpacity style={styles.getCustomLabel}
                                      onPress={()=>navigate('MySubordinateChooseScene',{callback:(backData)=> this.changeXiaShuName(backData)})}
                    >
                        <Text>{this.state.xiashu_name}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>任务名称*</Text>
                    <TextInput placeholder='任务名称'
                               style={styles.TextInputs} underlineColorAndroid="transparent"
                               onChangeText={(text)=>this.setState({t_name:text})}
                    />
                </View>

                <View style={styles.formRowContents}>
                    <Text style={styles.lineHeightAll}>任务内容*</Text>
                    <TextInput style={styles.TextInputContents}
                               placeholder="任务内容"
                               underlineColorAndroid="transparent"
                               onChangeText={(text)=>this.setState({t_desc:text})}
                               multiline={true}
                    />
                </View>
                <View style={styles.formBtnRow}>
                    <TouchableOpacity style={this.state.submitBtnSytle} disabled={this.state.submitBtnDisabled} onPress={this.postRequest.bind(this)}>
                        <Text style={styles.submitBtnText}>分派任务</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        );
    }
}

export default CreateTaskScene;