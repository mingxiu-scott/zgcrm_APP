import React, { PureComponent } from 'react'
import { View, Text, ScrollView, Button, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { StackNavigator, } from 'react-navigation';

import MyIcon from '../../widget/MyIcon'
import styles from '../../widget/FormStyle'
import PostUrl from '../../widget/PostUrl'
import UserPicker from "../../widget/UserPicker";

class OrderListInfoScene extends PureComponent{
    static navigationOptions = ({navigation}) => ({
        headerTitle: '理财详情',
        tabBarVisible: false,
        headerRight: (
            <View>
                <Text> </Text>
            </View>
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
            o_id: props.navigation.state.params.o_id,
        }
    }

    _changeStateData = function (data) {
        this.setState({
            data: data
        })
    }

    componentDidMount() {

        DeviceEventEmitter.addListener('changeOrderInfo', (data) => { this._changeStateData(data) })

        let url = PostUrl.getOrderListInfoUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('userId', PostUrl.userId);
        formData.append('o_id', this.state.o_id)

        var opts = {
            method:"POST",
            body:formData
        }
        fetch(url,opts)
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {

            // alert(responseText[0].o_id);
                this.setState({
                    data: responseText
                })
            })
            .catch((error) => {
                alert(error)
            })
    }

    render(){
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
                            <Text style={styles.valueLabel}>理财日期</Text>
                            <Text style={styles.valueText}> {this.state.data.o_date}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>客户名称</Text>
                            <Text style={styles.valueText}> {this.state.data.c_name}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>理财名称</Text>
                            <Text style={styles.valueText}>{this.state.data.g_name}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>理财天数</Text>
                            <Text style={styles.valueText}> {this.state.data.o_days} 天</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>理财金额</Text>
                            <Text style={styles.valueText}> {this.state.data.o_money}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>回款金额</Text>
                            <Text style={styles.valueText}> {this.state.data.o_return_money}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>福利</Text>
                            <Text style={styles.valueText}> {this.state.data.w_name}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>备注</Text>
                            <Text style={styles.valueText}> {this.state.data.o_desc}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>理财经理</Text>
                            <Text style={styles.valueText}> {this.state.data.u_name}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>创建时间</Text>
                            <Text style={styles.valueText}> {this.state.data.create_time}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>所在门店</Text>
                            <Text style={styles.valueText}> {this.state.data.s_name}</Text>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}

export default OrderListInfoScene;