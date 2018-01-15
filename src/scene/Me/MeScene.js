import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,AsyncStorage, Alert, TextInput } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'

import NavStyle from '../../widget/NavStyle'
import PostUrl from  '../../widget/PostUrl'
import styles from '../../widget/FormStyle'
import ChangePassScene from './ChangePassScene'
import AboutScene from './AboutScene';

import MyIcon from '../../widget/MyIcon'

class MeScene extends PureComponent {

    static navigationOptions =  ({navigation}) =>({
        headerTitle: '我的',
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


    render() {
        if (this.state.data == null){
            return(
                <View>
                    <Text>Loading</Text>
                </View>
            );
        }else {
            const { navigate } = this.props.navigation;

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

                    <TouchableOpacity style={{marginTop:20}}
                                      onPress={()=>{
                                          navigate('ChangePassScene',{u_id: PostUrl.userId})
                                      }}
                    >
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>修改密码</Text>
                            <MyIcon  sorceName={'angle-right'} sorceColor={'#7C868F'} sorceSize={20}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop:20}}
                                      onPress={()=> Alert.alert('提示','你确定注销账号吗？',[{
                                          text: '确定',onPress:()=>{
                                              AsyncStorage.removeItem('uid',function (error) {
                                                  if (error){
                                                      return;
                                                  }
                                                  Alert.alert('提示','注销成功');
                                              });

                                              navigate('LoginScreen');
                                              const reAction =  NavigationActions.reset({
                                                  index: 0,
                                                  actions: [
                                                      NavigationActions.navigate({routeName:'LoginScreen'})//要跳转到的页面名字
                                                  ]
                                              });
                                              this.props.navigation.dispatch(reAction);
                                          }
                                      },{
                                          text: '取消',
                                      }])}
                    >
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>退出登录</Text>
                            <MyIcon  sorceName={'angle-right'} sorceColor={'#7C868F'} sorceSize={20}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop:20}}
                                      onPress={()=>{
                                          navigate('AboutScene');
                                      }}
                    >
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>关于</Text>
                            <MyIcon  sorceName={'angle-right'} sorceColor={'#7C868F'} sorceSize={20}/>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            );
        }
    }
}
const MeStack = StackNavigator({
    MeScene: {
        screen: MeScene,
    },
    ChangePassScene:{
        screen:ChangePassScene,
    },
    AboutScene:{
        screen:AboutScene,
    }
},{
    navigationOptions: {
        headerTitleStyle: NavStyle.stackNavHeaderStyle,
        headerStyle: NavStyle.stackNavStyle,
        headerBackTitleStyle: NavStyle.stackBackStyle,
    },
});
export default MeStack;