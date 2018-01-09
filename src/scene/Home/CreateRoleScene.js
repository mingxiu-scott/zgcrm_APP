import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity,Alert, TextInput } from 'react-native'

import styles from '../../widget/FormStyle'
import PostUrl from "../../widget/PostUrl";
import MyIcon from '../../widget/MyIcon'

class CreateRoleScene extends PureComponent {
    static navigationOptions =({navigation})=>({
        tabBarVisible: false,
        headerTitle: '录角色',
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
        headerRight: (
            <View>
                <Text> </Text>
            </View>
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            pr_name: '父级角色名称', //父角色名称
            pr_id: '',  //父角色id
            r_name:'',
            submitBtnSytle: styles.submitBtn,
            submitBtnDisabled: false,
        };
    }

    changeUserName(customInfo){
        this.setState({
            pr_name: customInfo.r_name,
            pr_id: customInfo.r_id,
        });
    }

    postRequest()
    {

        if (this.state.pr_id == '' || this.state.r_name == '' ) {
            Alert.alert('提示', '必填项不能为空');
            return;
        }

        this._set_submitBtnDisabled();

        let url = PostUrl.createRoleJsonUrl;

        let formDate = new FormData();

        formDate.append('pr_id', this.state.pr_id);
        formDate.append('r_name', this.state.r_name);

        let sign = '{pr_id:"' + this.state.pr_id + '"},' +
            '{r_name:"' + this.state.r_name + '"},';

        sign += PostUrl.signCode;

        var forge = require('node-forge');

        var md = forge.md.md5.create();

        md.update(sign, 'utf8');

        let signVal = md.digest().toHex();

        formDate.append('signVal', signVal);
        formDate.append("tokenVal", PostUrl.tokenVal);

        var opts = {
            method: 'POST',
            body: formDate
        };

        fetch(url, opts).then((response) => {
            return response.json();
        }).then((responseText) => {
            if (responseText.code != 'success'){
                this._set_submitBtn();
            }
            Alert.alert('提示',responseText.message);
        }).catch((error) => {
            alert(error);
        });
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
    render() {

        const { navigate } = this.props.navigation;

        return (
            <ScrollView>
                <View>
                    <View style={styles.fristformRow}>
                        <View style={styles.lineHeightAllDate}>
                            <Text style={styles.lineHeightAll}>上级角色名称*</Text>
                        </View>
                        <TouchableOpacity style={styles.getCustomLabel}
                                          onPress={()=>navigate('MyRoleChooseScene',{callback:(backData)=> this.changeUserName(backData)})}
                        >
                            <Text>{this.state.pr_name}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.lineHeightAll}>角色名称*</Text>
                        <TextInput placeholder='角色名称'
                                   style={styles.TextInputs}
                                   underlineColorAndroid="transparent"
                                   onChangeText={(text) => this.setState({r_name: text})}
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

export default CreateRoleScene;