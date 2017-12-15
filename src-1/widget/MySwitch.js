import React, { PureComponent }from 'react'

import {
    Switch,
} from 'react-native';

class MySwitch extends PureComponent{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value: true
        };
    }

    ownerChange = function (value) {
        this.props.set_t_status(value);
        this.setState({value: value});
    };

    render() {
        return (
            <Switch
                style={{width: 50,height:20,marginTop:15}}
                 value={this.state.value}
                //当切换开关室回调此方法
               onValueChange={(value)=>{this.ownerChange(value)}}
            />
        )
    }
}
export default MySwitch;