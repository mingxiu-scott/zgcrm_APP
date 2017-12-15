import React, { PureComponent }from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

class MyIcon extends PureComponent {
    render() {
        const { sorceName, sorceColor, sorceSize } = this.props;

        return (
            <Icon name={this.props.sorceName} size={this.props.sorceSize} color={this.props.sorceColor}/>
        );
    }
}

export default MyIcon;