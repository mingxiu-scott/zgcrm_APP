import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList, StyleSheet, TextInput, Button,Alert } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import MyDatePicker from '../../widget/MyDatePicker'
import PostUrl from "../../widget/PostUrl";
import Moment from 'moment'
class CreateFollowScene extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            f_gettime:Moment(new Date()).format("YYYY-MM-DD"),
            c_id: '',
            c_name:'客户姓名',
            f_content:'',

            submitBtnSytle: styles.submitBtn,
            submitBtnDisabled: false,

        }
    }
    static navigationOptions = {
        headerTitle: '写跟进',
        tabBarVisible: false,
    };

    postRequest() {
        if (
            this.state.c_name == '' ||
            this.state.f_content == ''
        ) {
            Alert.alert('提示','必填项不可为空');
            return;
        }

        this._set_submitBtnDisabled();

        let url = PostUrl.createFollowUrl;

        let formData = new FormData();
        formData.append('f_gettime', this.state.f_gettime);
        formData.append('c_name', this.state.c_name);
        formData.append('f_content', this.state.f_content);

        let sign =
            '{f_gettime:"' + this.state.f_gettime + '"},' +
            '{c_name:"' + this.state.c_name + '"},' +
            '{f_content:"' + this.state.f_content + '"},'+
            '{u_id:"'+PostUrl.userId+'"},'+
             '{customId:"'+this.state.c_id+'"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');
        var md = forge.md.md5.create();
        md.update(sign, 'utf8');
        let signVal = md.digest().toHex();

        formData.append('signVal', signVal);
        formData.append('userId', PostUrl.userId);
        formData.append('customId', this.state.c_id);

        var opts = {
            method: 'POST',
            body: formData,
        }
        fetch(url, opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                if (responseText.code != 'success'){
                    this._set_submitBtn();
                }
                Alert.alert('提示', responseText.message);
            })
            .catch((error) => {
                alert(error)
            })
    }
    set_c_gettime(date){
        this.setState({f_gettime: date})
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
                        <Text style={styles.lineHeightAll}>跟进日期*</Text>
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
                    <Text style={styles.lineHeightAll}>内容</Text>
                    <TextInput
                        style={styles.TextInputs}
                        placeholder="内容"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({f_content: text})}
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

export default CreateFollowScene;