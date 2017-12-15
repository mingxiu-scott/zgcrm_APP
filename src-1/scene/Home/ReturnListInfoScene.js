import React, { PureComponent } from 'react'
import { View, Text, ScrollView, Button, TouchableOpacity, DeviceEventEmitter,Alert, Navigator,} from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'

import MyIcon from '../../widget/MyIcon'
import styles from '../../widget/FormStyle'
import PostUrl from '../../widget/PostUrl'


class ReturnListInfoScene extends PureComponent{

    static navigationOptions = ({navigation}) => ({

        headerTitle:'回款详情',
        tabBarVisible: false,
        headerRight: (
            <TouchableOpacity
                style={{padding: 10, marginRight:5, marginTop:3}}
                // onPress={()=> navigation.navigate('ReturnEditScene',{o_id: navigation.state.params.o_id})}
            >
                <MyIcon sorceName={'pencil-square-o'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity
                style={{padding: 10, marginLeft:5, marginTop:3}}
                onPress={()=> navigation.goBack()}
            >
                <MyIcon sorceName={'reply'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
    });

    constructor(props){
        super(props);
        this.state = {
            data:null,
            o_id: props.navigation.state.params.o_id,
            status:'',
        }
    }

    _changeStateData = function(data){
        this.setState({
            data:data,
        })
    }

    componentDidMount() {

        let url = PostUrl.getReturnUrl;
        let formData = new FormData();
        formData.append('tokenVal', PostUrl.tokenVal);
        formData.append('o_id', this.state.o_id);

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
                    data: responseText,
                    status: responseText.state,
                })
            })
            .catch((error) => {
                alert(error)
            })
    }

    ReturnMoney(){

        Alert.alert(
            '',
            '是否回款',
            [
                {'text':'确定',onPress:()=>this.SureReturn()},
                {'text':'取消',onPress:()=>this.CancelReturn()},
            ]
        )
    }
    SureReturn() {
        // alert(this.state.data.o_id);
        let url = PostUrl.SureReturnUrl;
        let formData = new FormData();
        formData.append('o_id', this.state.o_id);
        var opts = {
            method: "POST",
            body: formData,
        }

        fetch(url, opts)
            .then((response) =>{
                return response.json();
            })
            .then((responseText) =>{
                Alert.alert(
                    '',
                    responseText.message
                );

                if (responseText.code == 'success'){

                    DeviceEventEmitter.emit('changeReturnInfo', (data) => { this._changeStateData(data) })

                    this.setState({
                        status : 1
                    })
                }
            })
            .catch((error) => {
                alert(error);
            })
        ;
    }
    CancelReturn(){

    }

    ReturnButtonShow(){
        if(this.state.status == 1){
            return null;
        }else{
            return(
                <TouchableOpacity style={styles.submitBtn} onPress={() => this.ReturnMoney()}>
                    <Text style={styles.submitBtnText}>回款</Text>
                </TouchableOpacity>
            );
        }
    }


    render(){
        const { navigate } = this.props.navigation;
        if(!this.state.data){
            return(
                <Text>loading...</Text>
            )
        }else{
            return(

                <ScrollView>
                    <View>

                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>回款日期*</Text>
                            <Text style={styles.valueText}>{this.state.data.o_return_date}</Text>
                        </View>
                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>客户名称*</Text>
                            <Text style={styles.valueText}>{this.state.data.c_name}</Text>
                        </View>

                        <View style={styles.valueRow}>
                            <Text style={styles.valueLabel}>回款金额*</Text>
                            <Text style={styles.valueText}>{this.state.data.o_return_money}</Text>
                        </View>

                        {this.ReturnButtonShow()}

                    </View>
                </ScrollView>
            );
        }
    }
}

export default ReturnListInfoScene;