import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput,Alert } from 'react-native'

import styles from '../../widget/FormStyle'
import MyIcon from '../../widget/MyIcon'

class AboutScene extends PureComponent {
    constructor(props){
        super(props);
    }
    static navigationOptions =({navigation})=>({
        headerTitle: '关于',
        tabBarVisible: false,
        headerLeft: (
            <TouchableOpacity
                style={{padding: 10, marginLeft:5, marginTop:3}}
                onPress={()=> {
                    navigation.goBack();
                }}
            >
                <MyIcon sorceName={'reply'} sorceSize={18} sorceColor={'#ffffff'}/>
            </TouchableOpacity>
        ),
    });
    render() {
        return (
            <ScrollView>
                <View >
                    <View style={styles.valueRow}>
                        <Text style={styles.valueLabel}>关于软件：</Text>
                        <Text style={styles.valueText}>测试版</Text>
                    </View>
                    <View style={styles.valueRow}>
                        <Text style={styles.valueLabel}>版本号：</Text>
                        <Text style={styles.valueText}>1.0.0.1</Text>
                    </View>
                    <View style={styles.valueRow}>
                        <Text style={styles.valueLabel}>关于更新：</Text>
                        <Text style={styles.valueText}> 敬请期待</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default AboutScene;