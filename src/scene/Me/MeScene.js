import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,AsyncStorage, Alert, TextInput } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'

import NavStyle from '../../widget/NavStyle'
import PostUrl from  '../../widget/PostUrl'
import styles from '../../widget/FormStyle'

class MeScene extends PureComponent {

    static navigationOptions =  ({navigation}) =>({
        headerTitle: '我',
        headerRight: (
            <TouchableOpacity
                style={{padding: 10, marginRight:5, marginTop:3}}
                onPress={()=> Alert.alert('提示','你确定注销账号吗？',[{
                    text: '确定',onPress:()=>{
                        AsyncStorage.removeItem('uid',function (error) {
                            if (error){
                                return;
                            }
                            Alert.alert('提示','注销成功');
                        });

                        //跳转后清空路由
                        navigation.navigate('LoginScreen');
                        const reAction =  NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName:'LoginScreen'})//要跳转到的页面名字
                            ]
                        });
                        navigation.dispatch(reAction);
                    }
                },{
                    text: '取消',
                }])}
            >
                <Text style={{color:'white'}}>退出</Text>
            </TouchableOpacity>
        ),
    });
    constructor(props){
        super(props);
        this.state ={
            data : null,
            old_pass: '',
            new_pass : '',
            check_pass : '',
        }
    }
    componentWillMount(){
        this._getUserJson(PostUrl.userId);
    }
    _getUserJson(userId){

        let url = PostUrl.getUsersJson;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);

        formData.append('userId', userId);


        var opts = {
            method:"POST",
            body:formData
        };

        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {

                if (responseText.code == 'fail' || responseText.dataValue == ''){

                    this.setState({
                        data: null,
                    })
                }
                this.setState({
                    data: responseText.dataValue,
                })

            })
            .catch((error) => {
                alert(error)
            });
    }

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
        if (this.state.data == null){
            return(
                <View>
                    <Text>Loading</Text>
                </View>
            );
        }else {
            return(
                <ScrollView>

                    <View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>用户名</Text>
                            <Text style={styles.valueText}> {this.state.data.u_username}</Text>
                        </View>

                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>昵称</Text>
                            <Text style={styles.valueText}> {this.state.data.u_name}</Text>
                        </View>

                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>年龄</Text>
                            <Text style={styles.valueText}> {this.state.data.u_age}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>电话号码</Text>
                            <Text style={styles.valueText}> {this.state.data.u_telphone}</Text>
                        </View>
                    </View>
                    <Text style = {{marginTop:10,marginLeft:15,fontSize:17,marginBottom:10,color:'red'}}>修改密码:</Text>
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

}


const MeStack = StackNavigator({
    MeScene: {
        screen: MeScene,
    },
},{
    navigationOptions: {
        headerTitleStyle: NavStyle.stackNavHeaderStyle,
        headerStyle: NavStyle.stackNavStyle,
    },
});
export default MeStack;