import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,Alert ,ListView, Image, StatusBar, FlatList, StyleSheet, TextInput, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../widget/FormStyle'
import MyDatePicker from '../../widget/MyDatePicker'
import Moment from 'moment'
import PostUrl from "../../widget/PostUrl";

class CreateChanceScene extends PureComponent {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '录机会',
    }

    constructor(props) {
        super(props);
        this.state = {
            ch_name: '',
            c_id: '',
            c_name:'客户姓名',
            ch_date: Moment(new Date()).format("YYYY-MM-DD"),
            ch_money: '',
            ch_desc: '',
        };
    }
    changeUserName(customInfo){
        this.setState({
            c_name: customInfo.c_name,
            c_id: customInfo.c_id,
        })
    }

    postRequest()
    {

        if (this.state.c_name == '' || this.state.ch_name == '' || this.state.ch_money == "" || this.state.ch_date == '') {
            Alert.alert('提示', '必填项不能为空');
            return;
        }


        let money = this.state.ch_money;

        money = parseFloat(money);

        if (isNaN(money)){
            Alert.alert('添加失败','预期成交金额中包含不是数字的字符，请重新填写');
            return;
        }

        let url = PostUrl.createChancesJsonUrl;

        let formDate = new FormData();

        formDate.append('ch_name', this.state.ch_name);
        formDate.append('c_name', this.state.c_name);
        formDate.append('ch_date', this.state.ch_date);
        formDate.append('ch_money', this.state.ch_money);
        formDate.append('ch_desc', this.state.ch_desc);
        formDate.append('create_time', this.state.create_time);
        formDate.append('c_id', this.state.c_id);

        let sign = '{ch_name:"' + this.state.ch_name + '"},' +
            '{c_name:"' + this.state.c_name + '"},' +
            '{ch_date:"' + this.state.ch_date + '"},' +
            '{ch_money:"' + this.state.ch_money + '"},' +
            '{ch_desc:"' + this.state.ch_desc + '"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');

        var md = forge.md.md5.create();

        md.update(sign, 'utf8');

        let signVal = md.digest().toHex();

        formDate.append('signVal', signVal);
        formDate.append("tokenVal", PostUrl.tokenVal);
        formDate.append("userId", PostUrl.userId);

        var opts = {
            method: 'POST',
            body: formDate
        };

        fetch(url, opts).then((response) => {
            return response.json();
            // return response.text();
            // return response;
        }).then((responseText) => {
             // Alert.alert(responseText);
            Alert.alert('提示',responseText.message);
        }).catch((error) => {
            alert(error);
        });

    }
    set_c_gettime(date) {
        this.setState({ch_date: date})
    }
    render() {

        const { navigate } = this.props.navigation;

        return (
            <ScrollView>
                <View>
                    <View style={styles.fristformRow}>
                        <View style={styles.lineHeightAllDate}>
                            <Text style={styles.lineHeightAll}>成交日期*</Text>
                        </View>

                        <MyDatePicker style={styles.TextInputs} set_c_gettime={date => this.set_c_gettime(date)}/>
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
                        <Text style={styles.lineHeightAll}>机会名称*</Text>
                        <TextInput style={styles.TextInputs} placeholder="机会名称"
                                   underlineColorAndroid="transparent"
                                   onChangeText={(text) => this.setState({ch_name: text})}
                        />
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.lineHeightAll}>预期成交金额*</Text>
                        <TextInput placeholder='0.0'
                                   style={styles.TextInputs}
                                   underlineColorAndroid="transparent"
                                   onChangeText={(text) => this.setState({ch_money: text})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.lineHeightAll}>备注</Text>
                        <TextInput style={styles.TextInputs}
                                   placeholder="备注内容"
                                   underlineColorAndroid="transparent"
                                   onChangeText={(text) => this.setState({ch_desc: text})}
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

export default CreateChanceScene;