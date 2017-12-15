import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput, RadiModal, DeviceEventEmitter } from 'react-native'
import { StackNavigator, } from 'react-navigation';

import Moment from 'moment'

import MyDatePicker from '../../widget/MyDatePicker'
import MyIcon from '../../widget/MyIcon'
import styles from '../../widget/FormStyle'
import PostUrl from '../../widget/PostUrl'

class OrderListEditScene extends PureComponent{

    static navigationOptions = ({navigation}) => ({
        headerTitle: '理财编辑',
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
    });

    constructor(props){
        super(props)
        this.state = {
            data: null,
            o_id: props.navigation.state.params.o_id,

            create_time: Moment(new Date()).format("YYYY-MM-DD"),
            g_name: '',
            o_money:'',
            o_return_money:'',
            c_id:'',//客户ID
            u_id:'',//经理ID，不知到是不是

        }
    }

    componentDidMount() {
        let url = PostUrl.getOrderListInfoUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('o_id', this.state.o_id)
        var opts = {
            method:"POST",
            body:formData
        }
        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {

                this.setState({
                    data: responseText,

                    o_date  : responseText.o_date,
                    g_id: responseText.g_id,//理财产品ID
                    o_money: responseText.o_money,
                    o_return_money: responseText.o_return_money,
                    c_id: responseText.c_id,
                    u_id: responseText.u_id,
                    o_id: responseText.o_id,
                });
            })
            .catch((error) => {
                alert(error)
            })
    }

    postRequest() {

        if (
            this.state.o_date == '' ||
            this.state.g_id == '' ||
            this.state.o_money == '' ||
            this.state.o_return_money == '' ||
            this.state.c_id == '' ||
            this.state.u_id == ''
        ) {
            Alert.alert('提示','必填项不可为空');
            return;
        }

        let url = PostUrl.getOrderListEditUrl;
        let formData = new FormData();
        formData.append('o_date', this.state.o_date);
        formData.append('g_id', this.state.g_id);
        formData.append('o_money', this.state.o_money);
        formData.append('o_return_money', this.state.o_return_money);
        formData.append('c_id', this.state.c_id);
        formData.append('u_id', this.state.u_id);

        let sign =
            '{o_date:"' + this.state.o_date + '"},' +
            '{g_id:"' + this.state.g_id + '"},' +
            '{o_money:"' + this.state.o_money + '"},' +
            '{o_return_money:"' + this.state.o_return_money + '"},' +
            '{c_id:"' + this.state.c_id + '"},' +
            '{u_id:"' + this.state.u_id + '"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');
        var md = forge.md.md5.create();
        md.update(sign, 'utf8');
        let signVal = md.digest().toHex();

        formData.append('signVal', signVal);
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('o_id',this.state.o_id);

        var opts = {
            method:"POST",
            body:formData
        }
        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                DeviceEventEmitter.emit('changeOrderInfo', this.state)
                Alert.alert('提示', responseText.message);
                // this.props.navigation.goBack();
            })
            .catch((error) => {
                alert(error)
            })
    }
    set_o_gettime(date){
        this.setState({o_date: date})
    }

    render(){
        if (!this.state.data){
            return(
                <Text>loading...</Text>
            )
        }else{
            return(
                <ScrollView>
                    <View>

                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>理财名称*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="理财名称"
                                maxLength={5}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({g_id: text})}
                                defaultValue={this.state.data.g_id}
                            />
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>理财金额*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="理财金额"
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'
                                maxLength={11}
                                onChangeText={(text) => this.setState({o_money: text})}
                                defaultValue={this.state.data.o_money}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>回款金额*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="回款金额"
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'
                                maxLength={18}
                                onChangeText={(text) => this.setState({o_return_money: text})}
                                defaultValue={this.state.data.o_return_money}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>客户名称*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="客户姓名"
                                maxLength={5}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({c_id: text})}
                                defaultValue={this.state.data.c_id}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>经理名称*</Text>
                            <TextInput
                                style={styles.TextInputs}
                                placeholder="经理姓名"
                                maxLength={5}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({u_id: text})}
                                defaultValue={this.state.data.u_id}
                            />
                        </View>
                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>日期*</Text>
                            </View>
                            <MyDatePicker style={styles.TextInputs} set_o_gettime={date=>this.set_o_gettime(date)} date={this.state.data.o_date}/>
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

export default OrderListEditScene;