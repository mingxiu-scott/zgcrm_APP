import React, { PureComponent }from 'react'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';

class DatePickerYYMM extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            date: props.date ? props.date : Moment(new Date()).format("YYYY-MM"),
        }
    }

    ownerChange = function (date) {
        this.props.set_c_gettime(date);
        this.setState({date: date});
    };

    render(){
        return (
            <DatePicker
                style={{flex:1, borderWidth:1,borderColor: '#e3e3e3',justifyContent: 'center',alignItems: 'center',paddingTop: 0,marginRight: 5, height: 35,}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM"
                minDate="2017-11"
                showIcon={false}
                onDateChange={(date) => {this.ownerChange(date)}}
                disabled={this.props.disabled}
            />
        )
    }
}

export default DatePickerYYMM;