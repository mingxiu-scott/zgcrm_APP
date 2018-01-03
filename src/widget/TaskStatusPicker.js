import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet,} from 'react-native';

import Picker from 'react-native-picker';

export default class TaskStatusPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: null,
            keyList: null,
            valueList: null,
            userName: '完成状态',
        }
    }

    _createUserData() {

        let pickerKey = new Array();

        let pickerValue = new Array();

        let pickerData = {'0':'未完成','1':'已完成','2':'全部'};

        for(var key in pickerData){
            pickerKey.push(key);
            pickerValue.push(pickerData[key]);
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
            pickerTitleText: '任务状态',
            onPickerConfirm: (pickedValue, pickedIndex) => {
                let userId = this.state.keyList[pickedIndex];
                this._set_userInfo(userId, pickedValue)
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                alert(pickedIndex);
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
    };

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