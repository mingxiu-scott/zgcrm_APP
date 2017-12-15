import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

import PostUrl from './PostUrl'
import Picker from 'react-native-picker';

class ModalExample extends Component {

    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }

    setModalVisible(visible) {
        //this.setState({modalVisible: visible});
        this._showUserPicker();
    }

    _createUserData() {

        let pickerKey = new Array();
        let pickerValue = new Array();

        let pickerData = PostUrl.subUserList;

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
                let userId = this.state.keyList[pickedIndex]
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

    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >

                </Modal>

                <TouchableHighlight onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

export default ModalExample;