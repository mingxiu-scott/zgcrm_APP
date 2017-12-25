import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput,Alert } from 'react-native'

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'
import PostUrl from "../../widget/PostUrl";

class ChangePassScene extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            u_id: props.navigation.state.params.u_id,
            old_pass: '',
            new_pass : '',
            check_pass : '',
        }
    }

    static navigationOptions =({navigation})=>({
        headerTitle: '更改密码',
        tabBarVisible: false,
        headerLeft: (
            <TouchableOpacity
                style={{padding: 10, marginLeft:5, marginTop:3}}
                onPress={()=> {
                    navigation.goBack();
                }}
            >
                <MyIcon sorceName={'reply'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
    });

    _changePassword() {
        if (
            this.state.old_pass == '' ||
            this.state.new_pass == '' ||
            this.state.check_pass == ''
        ) {
            Alert.alert('提示','必填项不可为空');
            return;
        }
        if (this.state.new_pass != this.state.check_pass){
            Alert.alert('提示','两次输入的密码不一致');
            return;
        }

        let url = PostUrl.changePassJson;

        let formData = new FormData();

        formData.append('old_pass', this.state.old_pass);
        formData.append('new_pass', this.state.new_pass);
        formData.append('check_pass',this.state.check_pass);
        formData.append('userId',PostUrl.userId);

        let sign =
            '{old_pass:"' + this.state.old_pass + '"},' +
            '{new_pass:"' + this.state.new_pass + '"},'+
            '{check_pass:"' + this.state.check_pass + '"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');
        var md = forge.md.md5.create();
        md.update(sign, 'utf8');
        let signVal = md.digest().toHex();

        formData.append('signVal', signVal);

        var opts = {
            method: 'POST',
            body: formData,
        }
        fetch(url, opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {

                this.setState({
                    old_pass: null,
                    new_pass : '',
                    check_pass : '',
                })
                Alert.alert('提示', responseText.message);
            })
            .catch((error) => {
                alert(error)
            })
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <View style={styles.formRow}>
                        <Text style={styles.lineHeightAll}>
                        旧密码*
                        </Text>
                        <TextInput
                            style={styles.TextInputs}
                            value={this.state.old_pass}
                            underlineColorAndroid="transparent"
                            maxLength={10}
                            onChangeText={(text) => this.setState({old_pass: text})}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.lineHeightAll}>
                        新密码*
                        </Text>
                        <TextInput
                            style={styles.TextInputs}
                            value={this.state.new_pass}
                            underlineColorAndroid="transparent"
                            maxLength={10}
                            onChangeText={(text) => this.setState({new_pass: text})}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.lineHeightAll}>
                        再次确认密码*
                        </Text>
                        <TextInput
                            style={styles.TextInputs}
                            value={this.state.check_pass}
                            underlineColorAndroid="transparent"
                            maxLength={10}
                            onChangeText={(text) => this.setState({check_pass: text})}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={styles.formBtnRow}>
                    <TouchableOpacity style={styles.submitBtn} onPress={this._changePassword.bind(this)}>
                        <Text style={styles.submitBtnText}>确认修改</Text>
                     </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}


export default ChangePassScene;