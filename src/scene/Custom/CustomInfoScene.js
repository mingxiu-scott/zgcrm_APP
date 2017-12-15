import React, { PureComponent } from 'react'
import { View, Text, ScrollView, Button, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { StackNavigator, } from 'react-navigation';

import MyIcon from '../../widget/MyIcon'
import styles from '../../widget/FormStyle'
import PostUrl from '../../widget/PostUrl'
import UserPicker from '../../widget/UserPicker'

class CustomInfoScene extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        headerTitle: '客户详情',
        tabBarVisible: false,
        headerRight: (
            <TouchableOpacity
                style={{padding: 10, marginRight:5, marginTop:3}}
                onPress={()=> navigation.navigate('CustomEditScene',{c_id: navigation.state.params.c_id})}
            >
                <MyIcon sorceName={'pencil-square-o'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity
                style={{padding: 10, marginLeft:5, marginTop:3}}
                onPress={()=> {
                    UserPicker.closeUserPicker()
                    navigation.goBack()
                }}
            >
                <MyIcon sorceName={'reply'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
    })

    constructor(props){
        super(props)
        this.state = {
            data: null,
            c_id: props.navigation.state.params.c_id,
        }
    }

    _changeStateData = function (data) {
        this.setState({
            data: data
        })
    }

    componentDidMount() {

        DeviceEventEmitter.addListener('changeCustomInfo', (data) => { this._changeStateData(data) })

        let url = PostUrl.getCustomsInfoJsonUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', PostUrl.userId);
        formData.append('c_id', this.state.c_id)

        var opts = {
            method:"POST",
            body:formData
        }
        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                this.setState({
                    data: responseText
                })

            })
            .catch((error) => {
                alert(error)
            })
    }

    render() {

        if (!this.state.data){
            return(
                <Text>loading...</Text>
            )
        }
        else{
            return(
                <ScrollView>
                    <View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>获取时间*</Text>
                            <Text style={styles.valueText}>{this.state.data.c_gettime}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>客户名称*</Text>
                            <Text style={styles.valueText}> {this.state.data.c_name}</Text>
                        </View>

                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>联系电话*</Text>
                            <Text style={styles.valueText}> {this.state.data.c_telphone}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>身份证编号*</Text>
                            <Text style={styles.valueText}> {this.state.data.c_idcard}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>银行卡开户行*</Text>
                            <Text style={styles.valueText}> {this.state.data.c_bankname}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>银行卡号*</Text>
                            <Text style={styles.valueText}> {this.state.data.c_bankcard}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>性别</Text>
                            <Text style={styles.valueText}> {this.state.data.c_sex}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>家庭住址</Text>
                            <Text style={styles.valueText}> {this.state.data.c_address}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>客户称呼</Text>
                            <Text style={styles.valueText}> {this.state.data.c_called}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>年龄</Text>
                            <Text style={styles.valueText}> {this.state.data.c_age}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>生日</Text>
                            <Text style={styles.valueText}> {this.state.data.c_birthday}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>客户来源</Text>
                            <Text style={styles.valueText}> {this.state.data.c_source}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>备注</Text>
                            <Text style={styles.valueText}> {this.state.data.c_desc}</Text>
                        </View>

                    </View>
                </ScrollView>

            )
        }
    }
}

export default CustomInfoScene;