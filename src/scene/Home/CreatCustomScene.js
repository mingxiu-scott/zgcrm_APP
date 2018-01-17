import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput,DeviceEventEmitter, RadiModal,KeyboardAvoidingView } from 'react-native'
import styles from '../../widget/FormStyle'
import MyDatePicker from '../../widget/MyDatePicker'
import PostUrl from '../../widget/PostUrl'
import CheckInput from  '../../widget/CheckInput';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

import Moment from 'moment'
import MyIcon from '../../widget/MyIcon'

class CreatCustomScene extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            c_gettime: Moment(new Date()).format("YYYY-MM-DD"),
            c_name: '',
            c_sex: '男',
            c_telphone: '',
            c_bankname: '',
            c_bankcard:'',
            c_idcard: '',
            c_address: '',
            c_called: '',
            c_birthday: Moment(new Date()).format("YYYY-MM-DD"),
            c_source: '',
            c_desc: '',
            c_age: '',
            submitBtnSytle: styles.submitBtn,
            submitBtnDisabled: false,
        }
    }

    static navigationOptions =({navigation})=>({
        headerTitle: '录客户',
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
    postRequest() {
        if (
            this.state.c_gettime == '' ||
            this.state.c_name == '' ||
            this.state.c_telphone == ''
        ) {
            Alert.alert('提示','必填项不可为空');
            return;
        }

        if (CheckInput.isPhone(this.state.c_telphone)){
            alert('手机号码不正确');
            return;
        }

        this._set_submitBtnDisabled();

        let url = PostUrl.createCustomUrl;
        let formData = new FormData();
        formData.append('c_gettime', this.state.c_gettime);
        formData.append('c_name', this.state.c_name);
        formData.append('c_telphone', this.state.c_telphone);
        formData.append('c_idcard', this.state.c_idcard);
        formData.append('c_bankname', this.state.c_bankname);
        formData.append('c_bankcard', this.state.c_bankcard);
        formData.append('c_sex', this.state.c_sex);
        formData.append('c_address', this.state.c_address);
        formData.append('c_called', this.state.c_called);
        formData.append('c_age', this.state.c_age);
        formData.append('c_birthday', this.state.c_birthday);
        formData.append('c_source', this.state.c_source);
        formData.append('c_desc', this.state.c_desc);

        let sign =
            '{c_gettime:"' + this.state.c_gettime + '"},' +
            '{c_name:"' + this.state.c_name + '"},' +
            '{c_telphone:"' + this.state.c_telphone + '"},' +
            '{c_idcard:"' + this.state.c_idcard + '"},' +
            '{c_bankname:"' + this.state.c_bankname + '"},' +
            '{c_bankcard:"' + this.state.c_bankcard + '"},' +
            '{c_sex:"' + this.state.c_sex + '"},' +
            '{c_address:"' + this.state.c_address + '"},' +
            '{c_called:"' + this.state.c_called + '"},' +
            '{c_age:"' + this.state.c_age + '"},' +
            '{c_birthday:"' + this.state.c_birthday + '"},' +
            '{c_source:"' + this.state.c_source + '"},' +
            '{c_desc:"' + this.state.c_desc + '"}';

        sign += PostUrl.signCode;

        var forge = require('node-forge');
        var md = forge.md.md5.create();
        md.update(sign, 'utf8');
        let signVal = md.digest().toHex();

        formData.append('signVal', signVal);
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
                if (responseText.code != 'success'){
                    this._set_submitBtn();
                }
                DeviceEventEmitter.emit('changeCustomInfo','aaa');
                DeviceEventEmitter.emit('changeLogInfo','aa');
                Alert.alert('提示', responseText.message);
            })
            .catch((error) => {
                alert(error)
            })
    }
    onSelect(index,value){
        this.setState({
            c_sex:value
        })
    }

    set_c_gettime(date){
        this.setState({c_gettime: date})
    }

    set_c_gettime2(data){
        this.setState({c_birthday:data})
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
                    <View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>获取时间*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'
                                maxLength={18}
                                defaultValue ={this.state.c_gettime}
                                editable={false}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户名称*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="客户姓名"
                                maxLength={5}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({c_name: text})}
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
                                onChangeText={(text) => this.setState({c_telphone: text})}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>性别</Text>
                            <RadioGroup style={{
                                position:'absolute',
                                right:0,
                                flexDirection:'row',
                                flexWrap:'wrap',
                                alignItems:'flex-start',
                                flex: 1,}}
                                        selectedIndex={0}
                                        onSelect ={(index,value)=>this.onSelect(index,value)}
                            >
                                <RadioButton  value={'男'} slected={true}>
                                    <Text>男</Text>
                                </RadioButton>
                                <RadioButton  value={'女'}>
                                    <Text>女</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>家庭住址</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="家庭住址"
                                underlineColorAndroid="transparent"
                                maxLength={30}
                                onChangeText={(text) => this.setState({c_address: text})}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户称呼</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="客户称呼"
                                underlineColorAndroid="transparent"
                                maxLength={5}
                                onChangeText={(text) => this.setState({c_called: text})}
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
                                onChangeText={(text) => this.setState({c_age: text})}
                            />
                        </View>
                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>生日</Text>
                            </View>
                            <View style={{alignItems: "flex-end"}}>
                                <MyDatePicker style={styles.TextInputs} set_c_gettime={date=>this.set_c_gettime2(date)} />
                            </View>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户来源</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="客户来源"
                                underlineColorAndroid="transparent"
                                maxLength={30}
                                onChangeText={(text) => this.setState({c_source: text})}
                            />
                        </View>
                        <View style={styles.formRowContents}>
                            <Text style={styles.lineHeightAll}>备注</Text>
                            <TextInput
                                style={styles.TextInputContents}
                                placeholder="备注"
                                underlineColorAndroid="transparent"
                                multiline={true}
                                onChangeText={(text) => this.setState({c_desc: text})}
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

export default CreatCustomScene;