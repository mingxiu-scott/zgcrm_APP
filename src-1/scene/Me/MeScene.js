import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList, StyleSheet, TextInput } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'

import NavStyle from '../../widget/NavStyle'

class MeScene extends PureComponent {
    static navigationOptions = {
        headerTitle: '我',
    };

    render() {
        return (
            //加button,跳回主界面
        <View>
          <Text>111</Text>
        </View>
        )
    }
}

const MeStack = StackNavigator({
    MeScene: {
        screen: MeScene,
    },
},{
    navigationOptions: {
        headerTitleStyle: NavStyle.stackNavHeaderStyle,

        headerStyle: NavStyle.stackNavStyle,
    },
});
export default MeStack;