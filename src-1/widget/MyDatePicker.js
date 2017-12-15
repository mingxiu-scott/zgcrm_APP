import React, { PureComponent }from 'react'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';

class MyDatePicker extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            date: props.date ? props.date : Moment(new Date()).format("YYYY-MM-DD"),
        }
    }

    ownerChange = function (date) {
        this.props.set_c_gettime(date);
        this.setState({date: date});
    }

    render(){
        return (
            <DatePicker
                style={{width:100, borderWidth:0,justifyContent: 'center',}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2017-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(date) => {this.ownerChange(date)}}
                disabled={this.props.disabled}
            />
        )
    }
}

export default MyDatePicker;