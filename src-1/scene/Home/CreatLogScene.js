import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,Alert,DeviceEventEmitter, ListView, Image, StatusBar, FlatList, StyleSheet, TextInput, Button, RadiModal } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import MyDatePicker from '../../widget/MyDatePicker'
import PostUrl from '../../widget/PostUrl'

import Moment from 'moment'


class CreatLogScene extends PureComponent {
    static navigationOptions = {
        headerTitle: '写日志',
        tabBarVisible: false,
    };

    constructor(props){
        super(props);

        this.state = {
            l_date : Moment(new Date()).format("YYYY-MM-DD"),
            l_desc:'',
            isDisabledBtn: true,
        };
    }
    postRequest(){
        this.state.isDisabledBtn = true;
        if (this.state.l_desc == ''){
            Alert.alert('提示','必填不能为空');
            return;
        }

        let url = PostUrl.createLogUrl;

        let formDate = new FormData();

        formDate.append('l_date',this.state.l_date);
        formDate.append('l_desc',this.state.l_desc);

        let sign =
            '{l_date:"'+ this.state.l_date + '"},'+
            '{l_desc:"'+ this.state.l_desc + '"},'+
            '{u_id:"'+ PostUrl.userId + '"},';

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
            Alert.alert('提示', responseText.message);
        }).catch((error)=>{
            alert(error);
        })
    }

    set_c_gettime(date){
        this.setState({l_date: date})
    }

    render(){
        return(
            <ScrollView>
            <View>
                <View style={styles.fristformRow}>
                    <View style={styles.lineHeightAllDate}>
                        <Text style={styles.lineHeightAll}>日期*</Text>
                    </View>

                    <MyDatePicker style={styles.TextInputs} set_c_gettime={date=>this.set_c_gettime(date)} />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>内容</Text>
                    <TextInput style={styles.TextInputs} placeholder="内容" underlineColorAndroid="transparent"
                               onChangeText={(text) => this.setState({l_desc: text})} />
                </View>

                <View style={styles.formBtnRow}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.postRequest.bind(this)}
                        disabled={this.state.isDisabledBtn}
                    >
                        <Text style={styles.submitBtnText}>保存</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        );
    }
}

export default CreatLogScene;