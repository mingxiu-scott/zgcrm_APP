import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,Alert, TextInput, RadiModal } from 'react-native'

import styles from '../../widget/FormStyle'
import MyDatePicker from '../../widget/MyDatePicker'
import PostUrl from '../../widget/PostUrl'
import MyIcon from '../../widget/MyIcon'


import Moment from 'moment'

class CreateUserScene extends PureComponent {
    static navigationOptions =({navigation})=>({
        headerTitle: '新建员工信息',
        tabBarVisible: false,
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
        headerRight: (
            <View>
                <Text> </Text>
            </View>
        ),
    });

    constructor(props){
        super(props);

        this.state = {
             u_username:'',
            u_name:'',
            u_telphone:'',
            u_age:'',

            isDisabledBtn: true,
            submitBtnSytle: styles.submitBtn,
            submitBtnDisabled: false,
        };
    }

    postRequest(){

        if (this.state.u_username == '' ||this.state.u_name == '' || this.state.u_telphone == ''){
            Alert.alert('提示','必填不能为空');
            return;
        }

        this._set_submitBtnDisabled();

        let url = PostUrl.createUserJsonUrl;
        let formDate = new FormData();

        formDate.append('u_username',this.state.u_username);
        formDate.append('u_name',this.state.u_name);
        formDate.append('u_telphone',this.state.u_telphone);
        formDate.append('u_age',this.state.u_age);

        let sign =
            '{u_username:"'+ this.state.u_username + '"},'+
            '{l_name:"'+ this.state.u_name + '"},'+
            '{u_telphone:"'+ this.state.u_telphone + '"},'+
            '{u_age:"'+ this.state.u_age + '"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');

        var md = forge.md.md5.create();

        md.update(sign,'utf8');

        let signValue = md.digest().toHex();

        formDate.append('signVal',signValue);
        formDate.append('tokenVal',PostUrl.tokenVal);
        formDate.append('userId',PostUrl.userId);

        var opts = {
            method:"POST",
            body: formDate
        };

        fetch(url,opts).then((response)=>{
            return response.json();
        }).then((responseText)=>{
            if (responseText.code != 'success'){
                this._set_submitBtn();
            }
            Alert.alert('提示', responseText.message);
        }).catch((error)=>{
            alert(error);
        })
    }

    set_c_gettime(date){
        this.setState({l_date: date})
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
        return(
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>登录名*</Text>
                    <TextInput style={styles.TextInputs} placeholder="登录名"
                               underlineColorAndroid="transparent"
                               onChangeText={(text) => this.setState({u_username: text})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>客户名称*</Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder="客户姓名"
                        maxLength={5}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({u_name: text})}
                    />
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>联系电话*</Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder="联系电话"
                        underlineColorAndroid="transparent"
                        keyboardType='numeric'
                        maxLength={11}
                        onChangeText={(text) => this.setState({u_telphone: text})}
                    />
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>年龄</Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder="年龄"
                        keyboardType='numeric'
                        underlineColorAndroid="transparent"
                        maxLength={2}
                        onChangeText={(text) => this.setState({u_age: text})}
                    />
                </View>

                <View style={styles.formBtnRow}>
                    <TouchableOpacity style={this.state.submitBtnSytle} disabled={this.state.submitBtnDisabled} onPress={this.postRequest.bind(this)}>
                        <Text style={styles.submitBtnText}>保存</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

export default CreateUserScene;