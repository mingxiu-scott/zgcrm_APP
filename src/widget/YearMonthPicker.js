import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Moment from 'moment';
import PostUrl from './PostUrl'
import Picker from 'react-native-picker';

export default class UserPicker extends Component {

    constructor(props){
        super(props)
        this.state = {
            date: props.date ? props.date : Moment(new Date()).format("YYYY-MM"),
            dateList: null,
        }
    }

    ownerChange = function (date) {
        this.props.set_c_gettime(date);
        this.setState({date: date});
    }

    _createYearMonthData() {

        let pickerKey = new Array();

        let pickerValue = new Array();

        let pickerData = PostUrl.dateList;

        for (var key in pickerData) {

            pickerKey.push(key);
            pickerValue.push(pickerData[key])
        }

        this.setState({
            keyList: pickerKey,
            valueList: pickerValue,
        });

        return pickerValue;
    }

    static closeYearMonthPicker(){
        Picker.hide();
    }

    _showYearMonthPicker() {
        Picker.init({
            pickerData: this._createYearMonthData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [255, 0 ,0, 1],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '月份',
            onPickerConfirm: (pickedValue, pickedIndex) => {
                this.ownerChange(pickedValue);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                return;
            },
            onPickerSelect: (pickedValue, pickedIndex) => {

            }
        });
        Picker.show();
    }

    render() {
        return (
            <View style={usersStyles.container}>
                <TouchableOpacity style={usersStyles.button} onPress={this._showYearMonthPicker.bind(this)}>
                    {/*<Text>{this.state.userName}</Text>*/}
                    <Text>{this.state.date}</Text>
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