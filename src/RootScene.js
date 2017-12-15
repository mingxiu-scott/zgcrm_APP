import React, { PureComponent } from 'react'
import { TabNavigator } from 'react-navigation'

import MyIcon from './widget/MyIcon'

import HomeScene from './scene/Home/HomeScene'
import CustomScene from './scene/Custom/CustomScene'
import ReportScene from './scene/Report/ReportScene'
import MeScene from './scene/Me/MeScene'

const Tab = TabNavigator({
    Home: {
        screen: HomeScene,
        navigationOptions: {
            tabBarLabel: '工作台',
            tabBarIcon: ({ tintColor }) => (
                <MyIcon sorceName={'desktop'} sorceSize={22} sorceColor={tintColor}/>
            ),
        },
    },
    Custom: {
        screen: CustomScene,
        navigationOptions: {
            tabBarLabel: '客户',
            tabBarIcon:({ tintColor }) =>(
                <MyIcon sorceName={'users'} sorceSize={22} sorceColor={tintColor}/>
            ),
        },
    },
    Report: {
        screen: ReportScene,
        navigationOptions: {
            tabBarLabel: '报表',
            tabBarIcon:({ tintColor }) =>(
                <MyIcon sorceName={'bar-chart-o'} sorceSize={22} sorceColor={tintColor}/>
            ),
        },
    },
    Me: {
        screen: MeScene,
        navigationOptions: {
            tabBarLabel: '我',
            tabBarIcon:({ tintColor }) =>(
                <MyIcon sorceName={'user-circle'} sorceSize={22} sorceColor={tintColor}/>
            ),
        },
    }
},{
        tabBarPosition:'bottom',
        animationEnabled:true,
        swipeEnabled:false,
        tabBarOptions: {
            showIcon:true,
            activeTintColor: '#FF9800',
            inactiveTintColor: 'gray',
            style:{
                backgroundColor:'#ffffff',
                borderTopWidth: 1,
                borderLeftWidth: 0,
                borderBottomWidth: 0,
                borderRightWidth: 0,
                borderColor: '#afafaf',
            }
        },
    }
);

export default Tab;