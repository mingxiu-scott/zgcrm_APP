import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput,DeviceEventEmitter, RadiModal,KeyboardAvoidingView } from 'react-native'
import styles from '../../widget/FormStyle'
import PostUrl from '../../widget/PostUrl'

import MyIcon from '../../widget/MyIcon'

class CreateSubordinateScene extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            positionId:'1001',
            positionChange: 0,
            u_name:'请选择下属的名称',
            u_telphone: '',
            u_age: '',
            s_id:'',
            r_id:'',
            u_id:'',
            r_name:'请选择职位',
            s_name:'请选择门店',
            submitBtnSytle: styles.submitBtn,
            submitBtnDisabled: false,
        }
    }

    static navigationOptions =({navigation})=>({
        headerTitle: '录下属',
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

    changeXiaShuName(customInfo){
        this.setState({
           u_name: customInfo.u_name,
            u_id: customInfo.u_id,
        });

    }

    changeUserName(customInfo){
        this.setState({
            r_name: customInfo.r_name,
            r_id: customInfo.r_id,
        });
    }

    changeStoreName(stors){
        this.setState({
           s_id:stors.s_id,
           s_name: stors.s_name
        });
    }

    postRequest() {

        if (
              this.state.s_id == '' ||
            this.state.r_id == '' ||
             this.state.u_id == ''
        ) {
            Alert.alert('提示','必填项不可为空');
            return;
        }
        this._set_submitBtnDisabled();

        let url = PostUrl.createSubordinateJsonUrl;
        let formData = new FormData();

        formData.append('s_id', this.state.s_id);
        formData.append('r_id', this.state.r_id);
        formData.append('u_id', this.state.u_id);

        let sign =
            '{u_id:"' + this.state.u_id + '"},' +
            '{s_id:"' + this.state.s_id + '"},' +
            '{r_id:"' + this.state.r_id + '"},' ;

        sign += PostUrl.signCode;

        var forge = require('node-forge');
        var md = forge.md.md5.create();
        md.update(sign, 'utf8');
        let signVal = md.digest().toHex();

        formData.append('signVal', signVal);
        formData.append('tokenVal', PostUrl.tokenVal);

        var opts = {
            method:"POST",
            body:formData
        };
        fetch(url,opts)
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

    _set_submitBtn(){
        this.setState({
            submitBtnDisabled: false,
            submitBtnSytle: styles.submitBtn,
        })
    }

    _set_submitBtnDisabled(){
        this.setState({
            submitBtnDisabled: true,
            submitBtnSytle: styles.submitBtnDisabled,
        })
    }

    render(){

        const {navigate} = this.props.navigation;

        return(
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={80}
                style={{flex:1,
                    justifyContent: 'center',
                }}
            >
                <ScrollView>
                    <View>
                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>下属名称*</Text>
                            </View>
                            <TouchableOpacity style={styles.getCustomLabel}
                                              onPress={()=>navigate('MySubordinateChooseScene',{callback:(backData)=> this.changeXiaShuName(backData),'xiashuID':'test'})}
                            >
                                <Text>{this.state.u_name}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>职位*</Text>
                            </View>
                            <TouchableOpacity style={styles.getCustomLabel}
                                              onPress={()=>navigate('MyRoleChooseScene',{callback:(backData)=> this.changeUserName(backData)})}
                            >
                                <Text>{this.state.r_name}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.fristformRow}>
                            <View style={styles.lineHeightAllDate}>
                                <Text style={styles.lineHeightAll}>所属门店*</Text>
                            </View>
                            <TouchableOpacity style={styles.getCustomLabel}
                                              onPress={()=>navigate('MyStorsChooseScene',{callback:(backData)=> this.changeStoreName(backData)})}
                            >
                                <Text>{this.state.s_name}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formBtnRow}>
                            <TouchableOpacity style={this.state.submitBtnSytle}
                                              disabled={this.state.submitBtnDisabled}
                                              onPress={this.postRequest.bind(this)}
                            >
                                <Text style={styles.submitBtnText}>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default CreateSubordinateScene;