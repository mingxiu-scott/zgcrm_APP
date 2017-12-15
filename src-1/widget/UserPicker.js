import React, { PureComponent }from 'react'
import {
    View,
    Text,
    DeviceEventEmitter,
    Alert ,
    TouchableOpacity,
    ListView,
    TextInput,
    Picker,
} from 'react-native'

class UserPicker extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            select_uid: PostUrl.userId,
            select_uid_list: null,
            u_name: '',
        }
    }

    _changeListUid(changeUid){
        this.setState({
            select_uid: changeUid,
            u_name: ''
        })
        this.props._changeListUid(changeUid);
    }

    _getUsersListsJson(){
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
                this.setState({
                    select_uid_list: responseText,
                });
            })
            .catch((error) => {
                alert(error)
            })
    }

    _renderPicker(key, i){
        return <Picker.Item key={i} label={key.u_name} value={key.u_id}/>
    }

    render(){
        return (
            <Picker
                selectedValue={this.state.select_uid}
                onValueChange={(itemValue, itemIndex) => this._changeListUid(itemValue)}
                style={{flex: 1}}
            >
                {this.state.select_uid_list.map((key,i) => this._renderPicker(key,i))}
            </Picker>
        )
    }
}

export default UserPicker;