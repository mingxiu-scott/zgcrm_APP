/**
 * Bootstrap of PickerTest
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';

import PostUrl from './PostUrl'
import Picker from 'react-native-picker';

export default class UserPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: null,
            keyList: null,
            valueList: null,
            userName: '我',
        }
    }

    _createUserData() {

        let pickerKey = new Array();
        let pickerValue = new Array();

        let pickerData = PostUrl.subUserList;

        if (pickerData == null){
            let url = PostUrl.getUsersListsJsonUrl;
            let formData = new FormData();
            formData.append('tokenVal', PostUrl.tokenVal);
            formData.append('userId', PostUrl.userId);

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
            pickerData = PostUrl.subUserList;
        }

        for(var key in pickerData){

            pickerKey.push(key);
            pickerValue.push(pickerData[key])
        }

        this.setState({
            keyList: pickerKey,
            valueList: pickerValue,
        });

        return pickerValue;
    }

    static closeUserPicker(){
        Picker.hide();
    }

    _showUserPicker() {
        Picker.init({
            pickerData: this._createUserData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [255, 0 ,0, 1],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '用户',
            onPickerConfirm: (pickedValue, pickedIndex) => {
                let userId = this.state.keyList[pickedIndex];
                this._set_userInfo(userId, pickedValue)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                //alert(pickedValue + ' ' + pickedIndex);
                return;
            },
            onPickerSelect: (pickedValue, pickedIndex) => {

            }
        });
        Picker.show();
    }

    _set_userInfo = function (pickerKey, pickerValue) {
        this.props.set_userInfo(pickerKey, pickerValue);
        this.setState({userName: pickerValue});
    }

    render() {
        return (
            <View style={usersStyles.container}>
                <TouchableOpacity style={usersStyles.button} onPress={this._showUserPicker.bind(this)}>
                    <Text>{this.state.userName}</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const usersStyles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        margin: 10,
        borderWidth: 1,
        borderColor: '#e3e3e3',
    }
});


