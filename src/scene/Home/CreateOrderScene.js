import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,TextInput,DeviceEventEmitter, Alert} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import MyDatePicker from '../../widget/MyDatePicker'
import GetUserLabel from '../../widget/GetUserLabel'
import Moment from 'moment'
import PostUrl from "../../widget/PostUrl";

class CreateOrderScene extends PureComponent{

    constructor(props){
        super(props);
        this.state = {
            o_gettime:Moment(new Date()).format("YYYY-MM-DD"),
            o_customName:'客户姓名',
            o_cid: '',
            o_name:'',
            o_money:'',
            o_cycle:'',
            o_endTime:Moment(new Date()).format("YYYY-MM-DD"),
            o_returnMoney:'',
            o_welfare:'',
            o_remark:'',

            submitBtnSytle: styles.submitBtn,
            submitBtnDisabled: false,
        }
    }

    postRequest(){
        if(
            this.state.o_gettime == '' ||
            this.state.o_customName == '' ||
                this.state.o_name == '' ||
                this.state.o_money == '' ||
                this.state.o_cycle == '' ||
                this.state.o_endTime == '' ||
                this.state.o_returnMoney == ''
        ){
            Alert.alert('提示','必填项不可为空');
            return;
        }

        this._set_submitBtnDisabled();

        let url = PostUrl.createOrderUrl;
        let formData = new FormData();

        formData.append('o_gettime',this.state.o_gettime);
        formData.append('o_customName',this.state.o_customName);
        formData.append('o_name',this.state.o_name);
        formData.append('o_money',this.state.o_money);
        formData.append('o_cycle',this.state.o_cycle);
        formData.append('o_endTime',this.state.o_endTime);
        formData.append('o_returnMoney',this.state.o_returnMoney);
        formData.append('o_welfare',this.state.o_welfare);
        formData.append('o_remark',this.state.o_remark);
        formData.append('c_idcard',this.state.c_idcard);
        formData.append('c_bankname',this.state.c_bankname);
        formData.append('c_bankcard',this.state.c_bankcard);

        let sign =
            '{o_gettime:"' + this.state.o_gettime + '"},' +
            '{o_customName:"' + this.state.o_customName + '"},' +
            '{o_name:"' + this.state.o_name + '"},' +
            '{o_money:"' + this.state.o_money + '"},' +
            '{o_cycle:"' + this.state.o_cycle + '"},' +
            '{o_endTime:"' + this.state.o_endTime + '"},' +
            '{o_returnMoney:"' + this.state.o_returnMoney + '"},' +
            '{o_welfare:"' + this.state.o_welfare + '"},' +
            '{o_remark:"' + this.state.o_remark + '"},'+
            '{c_idcard:"' + this.state.c_idcard + '"},' +
            '{c_bankname:"' + this.state.c_bankname + '"},' +
            '{c_bankcard:"' + this.state.c_bankcard + '"},' ;

        sign += PostUrl.signCode;

        var forge = require('node-forge');
        var md = forge.md.md5.create();
        md.update(sign, 'utf8');
        let signVal = md.digest().toHex();

        formData.append('signVal', signVal);
        formData.append('tokenVal', PostUrl.tokenVal);

        formData.append('customId',this.state.o_cid);
        formData.append('userId', PostUrl.userId);
        formData.append('storId',PostUrl.storId);

        var opts = {
            method:'POST',
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
                DeviceEventEmitter.emit('changeLogInfo','aa');
                Alert.alert('提示', responseText.message);
            })
            .catch((error) => {
                alert(error)
            })
    }

    static navigationOptions = {
        headerTitle: '录理财',
        tabBarVisible: false,
    }


    changeUserName(customInfo){
        this.setState({
            o_customName: customInfo.c_name,
            o_cid: customInfo.c_id,
        });
    }

    set_c_gettime(date){
        this.setState({c_gettime: date})
    }

    set_c_gettime2(data){
        this.setState({o_endTime:data})
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
            <View>
                <View style={styles.fristformRow}>
                    <View style={styles.lineHeightAllDate}>
                        <Text style={styles.lineHeightAll}>获取时间*</Text>
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
                        <Text>{this.state.o_customName}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>身份证号*</Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder="身份证号"
                        underlineColorAndroid="transparent"
                        keyboardType='numeric'
                        maxLength={18}
                        onChangeText={(text) => this.setState({c_idcard: text})}
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
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>
                        理财名称*
                    </Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder='产品名称'
                        underlineColorAndroid="transparent"
                        maxLength={10}
                        onChangeText={(text) => this.setState({o_name: text})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>
                        理财金额*
                    </Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder='0.0'
                        underlineColorAndroid="transparent"
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({o_money: text})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>
                        理财周期*
                    </Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder='天'
                        keyboardType='numeric'
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({o_cycle: text})}
                    />
                </View>
                <View style={styles.fristformRow}>
                    <View style={styles.lineHeightAllDate}>
                        <Text style={styles.lineHeightAll}>到期日期*</Text>
                    </View>
                    <View style={{alignItems: "flex-end"}}>
                        <MyDatePicker style={styles.TextInputs} set_c_gettime={date=>this.set_c_gettime2(date)} />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>
                        回款金额*
                    </Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder='0.00'
                        underlineColorAndroid="transparent"
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({o_returnMoney: text})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>福利</Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder="福利"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({o_welfare: text})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>备注</Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder="备注内容"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({o_remark: text})}
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

export default CreateOrderScene;