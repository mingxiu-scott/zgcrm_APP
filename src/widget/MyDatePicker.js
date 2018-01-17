import React, { PureComponent }from 'react'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';

class MyDatePicker extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            date: props.date ? props.date : Moment(new Date()).format("YYYY-MM-DD"),
        }
    }

    ownerChange = function (date) {
        this.props.set_c_gettime(date);
        this.setState({date: date});
    };

    render(){
        return (
            <DatePicker
                style={{width:100,height:35, borderWidth:1,justifyContent: 'center',alignItems:'flex-end',borderColor: '#e3e3e3'}}
                // style={{flex:1, borderWidth:1,borderColor: '#e3e3e3',justifyContent: 'center',alignItems: 'center',paddingTop: 0,marginRight: 5, height: 35,}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2017-01-01"
                showIcon={false}
                onDateChange={(date) => {this.ownerChange(date)}}
                disabled={this.props.disabled}
            />
        )
    }
}

export default MyDatePicker;