import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput, RadiModal, DeviceEventEmitter } from 'react-native'
import { StackNavigator, } from 'react-navigation';

import Moment from 'moment'

import MyDatePicker from '../../widget/MyDatePicker'
import MyIcon from '../../widget/MyIcon'
import styles from '../../widget/FormStyle'
import PostUrl from '../../widget/PostUrl'

class CustomEditScene extends PureComponent {

    static navigationOptions = {
        headerTitle: '编辑详情',
        tabBarVisible: false,
    }

    constructor(props){
        super(props)
        this.state = {
            data: null,
            c_id: props.navigation.state.params.c_id,

            c_gettime: Moment(new Date()).format("YYYY-MM-DD"),
            c_name: '',
            c_sex: '女',
            c_telphone: '',
            c_bankname: '',
            c_idcard: '',
            c_address: '',
            c_called: '',
            c_birthday: '',
            c_source: '',
            c_desc: '',
            c_age: '',
        }
    }


    componentDidMount() {
        let url = PostUrl.getCustomsInfoJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', PostUrl.userId);
        formData.append('c_id', this.state.c_id);

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
                    data: responseText,

                    c_gettime: responseText.c_gettime,
                    c_name: responseText.c_name,
                    c_sex: responseText.c_sex,
                    c_telphone: responseText.c_telphone,
                    c_bankname: responseText.c_bankname,
                    c_bankcard: responseText.c_bankcard,
                    c_idcard: responseText.c_idcard,
                    c_address: responseText.c_address,
                    c_called: responseText.c_called,
                    c_birthday: responseText.c_birthday,
                    c_source: responseText.c_source,
                    c_desc: responseText.c_desc,
                    c_age: responseText.c_age,
                })
            })
            .catch((error) => {
                alert(error)
            })
    }

    postRequest() {

        if (
            this.state.c_gettime == '' ||
            this.state.c_name == '' ||
            this.state.c_telphone == '' ||
            this.state.c_bankname == '' ||
            this.state.c_bankcard == '' ||
            this.state.c_idcard == ''
        ) {
            Alert.alert('提示','必填项不可为空');
            return;
        }

        let url = PostUrl.editCustomInfoUrl;
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

        formData.append('c_id', this.state.c_id);
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
                DeviceEventEmitter.emit('changeCustomInfo', this.state)
                Alert.alert('提示', responseText.message);
                // this.props.navigation.goBack();
            })
            .catch((error) => {
                alert(error)
            })
    }

    set_c_gettime(date){
        this.setState({c_gettime: date})
    }

    render() {

        if (!this.state.data){
            return(
                <Text>loading...</Text>
            )
        }
        else{
            return(
                <ScrollView>
                    <View>
                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>获取时间*</Text>
                            </View>

                            <MyDatePicker style={styles.TextInputs} set_c_gettime={date=>this.set_c_gettime(date)} date={this.state.data.c_get_time}/>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户名称*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="客户姓名"
                                maxLength={5}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({c_name: text})}
                                defaultValue={this.state.data.c_name}
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
                                defaultValue={this.state.data.c_telphone}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>身份证编号*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="身份证编号"
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'
                                maxLength={18}
                                onChangeText={(text) => this.setState({c_idcard: text})}
                                defaultValue={this.state.data.c_idcard}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>银行卡开户行*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="银行卡开户行"
                                underlineColorAndroid="transparent"
                                maxLength={20}
                                onChangeText={(text) => this.setState({c_bankname: text})}
                                defaultValue={this.state.data.c_bankname}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>银行卡号*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="银行卡号"
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'
                                maxLength={19}
                                onChangeText={(text) => this.setState({c_bankcard: text})}
                                defaultValue={this.state.data.c_bankcard}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>性别</Text>
                            <TextInput
                                style={styles.TextInputs}
                                maxLength={1}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({c_sex: text})}
                                defaultValue={this.state.data.c_sex}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>家庭住址</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="家庭住址"
                                underlineColorAndroid="transparent"
                                maxLength={30}
                                onChangeText={(text) => this.setState({c_address: text})}
                                defaultValue={this.state.data.c_address}
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
                                defaultValue={this.state.data.c_called}
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
                                defaultValue={this.state.data.c_age}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>生日</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="生日"
                                keyboardType='numeric'
                                underlineColorAndroid="transparent"
                                maxLength={12}
                                onChangeText={(text) => this.setState({c_birthday: text})}
                                defaultValue={this.state.data.c_birthday}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户来源</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="客户来源"
                                underlineColorAndroid="transparent"
                                maxLength={30}
                                onChangeText={(text) => this.setState({c_source: text})}
                                defaultValue={this.state.data.c_source}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>备注</Text>
                            <TextInput
                                style={styles.TextInputsRows}
                                placeholder="备注"
                                underlineColorAndroid="transparent"
                                multiline={true}
                                onChangeText={(text) => this.setState({c_desc: text})}
                                defaultValue={this.state.data.c_desc}
                            />
                        </View>
                        <View style={styles.formBtnRow}>
                            <TouchableOpacity style={styles.submitBtn} onPress={this.postRequest.bind(this)}>
                                <Text style={styles.submitBtnText}>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            )
        }



    }
}

export default CustomEditScene;