import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,Alert, TextInput, DeviceEventEmitter } from 'react-native'

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import MyDatePicker from '../../widget/MyDatePicker'
import PostUrl from '../../widget/PostUrl'


class EditLogScene extends PureComponent {
    static navigationOptions = ({navigation}) =>({
        headerTitle: '编辑日志',
        tabBarVisible: false,
        headerRight: (
            <TouchableOpacity
                style={{padding: 10, marginRight:5, marginTop:3}}
                onPress={()=> Alert.alert('提示','你确定删除这个工作日志吗?',[
                    {text:'确定',onPress:()=>{
                        let url = PostUrl.deleteLogJsonUrl;
                        let formData = new FormData();

                        formData.append('l_id',navigation.state.params.l_id);

                        let sign = '{l_id:"' + navigation.state.params.l_id + '"},';

                        sign += PostUrl.signCode;

                        var forge = require('node-forge');

                        var md = forge.md.md5.create();

                        md.update(sign, 'utf8');

                        let signVal = md.digest().toHex();

                        formData.append('signVal', signVal);
                        formData.append('tokenVal', PostUrl.tokenVal);

                        let opts = {
                            method: 'POST',
                            body: formData
                        };
                        fetch(url,opts).then((response)=>{
                            return response.json();
                        }).then((responseText)=>{
                            DeviceEventEmitter.emit('changeLogInfo', 'a');

                            Alert.alert('提示',responseText.message, [
                                {text:'ok', onPress:()=>{

                                    navigation.goBack();
                                }}
                            ]);
                            //跳转返回上个页面
                        }).catch((error)=>{
                            alert(error);
                        });
                    }},
                    {text:'取消'}
                ])}
            >
                <MyIcon sorceName={'times-circle'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
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
            l_id : props.navigation.state.params.l_id,
            u_id: props.navigation.state.params.u_id,
            date : '',
            l_desc:'',
        };
    }

    componentDidMount() {
        let url = PostUrl.getLogInfoJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('l_id', this.state.l_id);
        formData.append('u_id',this.state.u_id);

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
                    data: responseText.dataValue,
                    date: responseText.dataValue.l_date,
                    l_desc: responseText.dataValue.l_desc,
                })
            })
            .catch((error) => {
                alert(error)
            })
    }

    postRequest(){
        if (this.state.l_desc == ''){
            Alert.alert('提示','必填不能为空');
            return;
        }

        let url = PostUrl.editLogInfoUrl;

        let formDate = new FormData();

        formDate.append('l_date',this.state.date);
        formDate.append('l_desc',this.state.l_desc);
        formDate.append('l_id', this.state.l_id);
        formDate.append('u_id',this.state.u_id);


        let sign =
            '{l_date:"'+ this.state.date + '"},'+
            '{l_desc:"'+ this.state.l_desc + '"},'+
            '{l_id:"'+ this.state.l_id + '"},'+
            '{u_id:"'+ this.state.u_id + '"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');

        var md = forge.md.md5.create();

        md.update(sign,'utf8');

        let signValue = md.digest().toHex();

        formDate.append('signVal',signValue);
        formDate.append('tokenVal',PostUrl.tokenVal);

        var opts = {
            method:"POST",
            body: formDate
        };

        fetch(url,opts).then((response)=>{
            return response.json();
        }).then((responseText)=>{
            DeviceEventEmitter.emit('changeLogInfo', this.state)
            Alert.alert('提示', responseText.message);
        }).catch((error)=>{
            alert(error);
        })
    }

    set_c_gettime(date){
        this.setState({date: date})
    }
    render(){
        if (this.state.date == ''){
            return(
                <Text>Loading</Text>
            );
        }else{
            return(
                <ScrollView>
                    <View>
                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>日期*</Text>
                            </View>

                            <View style={{alignItems: "flex-end"}}>
                            <MyDatePicker style={styles.TextInputs}
                                          set_c_gettime={date=>this.set_c_gettime(date)}
                                          date = {this.state.data.l_date}
                            />
                            </View>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.lineHeightAll}>内容</Text>
                            <TextInput style={styles.TextInputs} placeholder="内容" underlineColorAndroid="transparent"
                                       onChangeText={(text) => this.setState({l_desc: text})}
                                       defaultValue={this.state.data.l_desc}
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
}

export default EditLogScene;