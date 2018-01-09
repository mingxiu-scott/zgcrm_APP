import React, { PureComponent } from 'react'
import { View, Text,TouchableOpacity,Alert, AsyncStorage,ImageBackground,StyleSheet, TextInput } from 'react-native'

import RootScene from '../../RootScene'
import MyIcon from '../../widget/MyIcon'
import PostUrl from "../../widget/PostUrl";
import { StackNavigator ,NavigationActions} from 'react-navigation'


class LoginScreen extends PureComponent{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
        }
    }

    async componentWillMount(){
       let mess = await AsyncStorage.getItem('uid', function(errs,res){
            if(errs){
                //TODO：存储出错
                return;
            }
            else if(res == null){
                return;
            }
        });
       if (mess != null){
           this._getSubUserList(mess);
           PostUrl.userId = mess;
           this._jumpToHome();
       }
    }

    _postRequest(){
        AsyncStorage.removeItem('uid',function (error) {
            if (error){
                return;
            }
        });
        PostUrl.userId = '';
        PostUrl.subUserList = null;

        if (this.state.username == '' || this.state.password == ''){
            Alert.alert('提示','用户名或者密码为空');
            return;
        }
        let url = PostUrl.LoginJsonUrl;
        let formData = new FormData();

        formData.append('username',this.state.username);
        formData.append('password',this.state.password);

        let sign =
            '{username:"' + this.state.username + '"},' +
            '{password:"' + this.state.password + '"},';

        sign = sign+ PostUrl.signCode;

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
                if(responseText.code == 2){
                    PostUrl.userId = responseText.u_id;
                    AsyncStorage.setItem('uid', responseText.u_id, function(errs){
                        if(errs){
                            //TODO：存储出错
                            return;
                        }
                    });

                    this._getSubUserList(responseText.u_id);
                    this._jumpToHome();
                } else {
                    Alert.alert('提示', responseText.message);
                }
            })
            .catch((error) => {
                alert(error)
            })
    }

    _getSubUserList(u_id){

        let url = PostUrl.getUsersListsJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', u_id);

        var opts = {
            method:"POST",
            body:formData
        }
        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                PostUrl.subUserList = responseText
            })
            .catch((error) => {
                alert(error)
            })
    }

    _jumpToHome(){

      const reAction =  NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName:'RootScene'})//要跳转到的页面名字
            ]
        });

        this.props.navigation.dispatch(reAction);
    }

    render(){
        return(
            <ImageBackground source={require('../../image/Login3.png')} style={{flex:1,}} resizeMode='cover'>
                <View style={{height:200,}}>
                </View>
                <View style={styles.username}>
                    <Text style={styles.labelUsername}>用户账号：</Text>
                    <View style={{flex:1.5}}>
                        <TextInput underlineColorAndroid="transparent"
                                   placeholder={'请输入你的账号'}
                                   style={styles.usernameInput}
                                   onChangeText = {(text)=>this.setState({username:text})}
                        />
                    </View>
                </View>
                <View style={styles.username}>
                    {/*用户密码*/}
                    <Text style={styles.labelUsername}>用户密码：</Text>
                    <View style={{flex:1.5}}>
                        <TextInput underlineColorAndroid="transparent"
                                   placeholder={'请输入您的密码'}
                                   style={styles.usernameInput}
                                   secureTextEntry={true}   //密码不可见****
                                   onChangeText = {(text)=>this.setState({password:text})}
                        >
                        </TextInput>
                    </View>
                </View>
                <View style={styles.buttonLoginView}>
                    <TouchableOpacity style={styles.buttonLogin}
                                    onPress = {this._postRequest.bind(this)}
                    >
                        <Text style={styles.loginText}>登录</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    username:{
        flexDirection:'row',
        height:40,
        marginTop:20
    },
    labelUsername:{
        flex:1,
        textAlign:'right',
        fontSize:20,
        marginTop:5,
        color:'#FFFFFF',
        backgroundColor:'rgba(0,0,0,0)',
    },
    usernameInput:{
        flex:1,
        borderWidth:1,
        borderColor:'black',
        marginRight:50,
        margin:3,
        backgroundColor:'white',
        justifyContent: 'center',
    },
    buttonLoginView:{
        height:50,
        marginTop:20
    },
    buttonLogin:{
        marginLeft:43,
        marginRight:50,
        height:40,
        backgroundColor:'#FFFFFF'
    },
    loginText:{
        flex:1,
        textAlign:'center',
        fontSize:20,
        marginTop:5,
        color:'#FF9800'
    },
    otherText:{
        flexDirection:'row',
    }
})

const LoginStack = StackNavigator({
    LoginScreen:{
        screen:LoginScreen,
    },
    RootScene:{
        screen:RootScene,
    },
},{
    headerMode:'none',
    navigationOptions:{
    }
});

export default LoginStack;