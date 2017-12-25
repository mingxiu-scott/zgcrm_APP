import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,Alert, TextInput, RadiModal } from 'react-native'

import styles from '../../widget/FormStyle'
import MyDatePicker from '../../widget/MyDatePicker'
import PostUrl from '../../widget/PostUrl'
import MyIcon from '../../widget/MyIcon'


import Moment from 'moment'

class CreatLogScene extends PureComponent {
    static navigationOptions =({navigation})=>({
        headerTitle: '写日志',
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
        super(props);

        this.state = {
            l_date : Moment(new Date()).format("YYYY-MM-DD"),
            l_desc:'',
            isDisabledBtn: true,

            submitBtnSytle: styles.submitBtn,
            submitBtnDisabled: false,
        };
    }

    postRequest(){

        if (this.state.l_desc == ''){
            Alert.alert('提示','必填不能为空');
            return;
        }

        this._set_submitBtnDisabled();

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
            <View>
                <View style={styles.formRow}>
                    <Text style={styles.lineHeightAll}>日期*</Text>
                    <TextInput
                        style={styles.TextInputs}
                        underlineColorAndroid="transparent"
                        keyboardType='numeric'
                        maxLength={18}
                        defaultValue ={this.state.l_date}
                        editable={false}
                    />
                </View>
                <View style={styles.formRowContents}>
                    <Text style={styles.lineHeightAll}>内容</Text>

                    <TextInput style={styles.TextInputContents} placeholder="内容" underlineColorAndroid="transparent"
                               onChangeText={(text) => this.setState({l_desc: text})}  multiline ={true} />
                </View>

                <View style={styles.formBtnRow}>
                    <TouchableOpacity
                        style={this.state.submitBtnSytle}
                        disabled={this.state.submitBtnDisabled}
                        onPress={this.postRequest.bind(this)}
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