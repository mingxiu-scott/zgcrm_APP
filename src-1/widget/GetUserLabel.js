import React, { PureComponent } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    Navigator,
} from 'react-native';

class GetUserLabel extends PureComponent {

    constructor(props){
        super(props);
        this.state = {};
    }

    _pressButtoon(){
        const { navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'SecondPageComonent',
                component:SecondPageComonent,
            })
        }
    }


    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={ () => navigator.push({name:'SecondPage',component:SecondPage})}
                >
                    <Text>点击跳转11</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class SecondPage extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.headText}>
                        第二页: {this.props.name}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.props.navigator.pop()}>
                    <Text style={styles.buttonText}>
                        返回上一页
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default GetUserLabel;