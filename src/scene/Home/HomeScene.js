import React, { PureComponent } from 'react'
import { View, Text, ScrollView, Alert,TouchableOpacity, StyleSheet , AsyncStorage, BackHandler } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'

import MyIcon from '../../widget/MyIcon'

import CreateOrderScene from './CreateOrderScene'
import CreatCustomScene from './CreatCustomScene'
import CreateFollowScene from './CreateFollowScene'
import CreateTaskScene from './CreateTaskScene'
import CreatLogScene from './CreatLogScene'
import CreateChanceScene from "./CreateChanceScene";
import LogsListScene from './LogsListScene'
import ChancesListScene from './ChancesListScene'
import TasksListScene from './TasksListScene'
import OrderListScene from './OrderListScene'
import ReturnListScene from './ReturnListScene'
import FlowsListScene from './FlowsListScene'
import CustomListScene from './CustomListScene'
import MyCustomChooseScene from '../Custom/MyCustomChooseScene'
import CustomSubInfoScene from '../Custom/CustomSubInfoScene'
import ChangePassScene from '../Me/ChangePassScene'

import OrderListEditScene from './OrderListEditScene'
import OrderListInfo from './OrderListInfoScene';
import ReturnListInfoScene from  './ReturnListInfoScene'

import EditTaskScene from './EditTaskScene';
import EditLogScene from './EditLogScene';
import EditFollowScene from './EditFollowScene';
import EditChanceScene from './EditChanceScene';
import MySubordinateChooseScene from  './MySubordinateChooseScene';

import NavStyle from '../../widget/NavStyle'
import UserPicker from '../../widget/UserPicker'
import Welfare from './Welfare'

class HomeScene extends PureComponent {

    static navigationOptions = {
        headerTitle: '工作台',
    };

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',function(){
            UserPicker.closeUserPicker();
        });
    }

    render() {

        const { navigate } = this.props.navigation;
        const myIconSize = 34;

        return (
            <ScrollView style={styles.bigContainer}>

                <Text style={styles.listText}>快捷操作</Text>
                <View style={styles.rowChild}>
                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('CreateOrderScene') }
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'money'} sorceColor={'#FF9800'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>录理财</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('CreatCustomScene') }
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'users'} sorceColor={'#3F6EB5'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>录客户</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('CreateFollowScene') }
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'comment'} sorceColor={'#19C594'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>写跟进</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('CreateLogScene') }
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'calendar'} sorceColor={'#F1745E'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>写日志</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowChild}>
                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('CreateChanceScene') }
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'thumbs-o-up'} sorceColor={'#5F97F4'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>录机会</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('CreateTaskScene') }
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'universal-access'} sorceColor={'#9C89B9'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>录任务</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TOStyle}>
                        <Text style={styles.contentText }/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TOStyle}>
                        <Text style={styles.contentText }/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.listText}>客户管理</Text>
                <View style={styles.rowChild}>


                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('CustomListScene')}
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'users'} sorceColor={'#50AAF0'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>下属客户</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={() => navigate('FlowsListScene')}
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'comments'} sorceColor={'#F1745E'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>跟进记录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TOStyle}>
                        <Text style={styles.contentText }/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TOStyle}>
                        <Text style={styles.contentText }/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.listText}>理财管理</Text>
                <View style={styles.rowChild}>
                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('OrderListScene') }
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'list-alt'} sorceColor={'#9C89B9'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>理财列表</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('ReturnListScene') }
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'exchange'} sorceColor={'#19C594'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>回款记录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TOStyle}>
                        <Text style={styles.contentText }/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TOStyle}>
                        <Text style={styles.contentText }/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.listText}>我的工作</Text>
                <View style={styles.rowChild}>

                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('LogsListScene') }
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'calendar'} sorceColor={'#F7B55D'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>工作日志</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('ChancesListScene')}
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'thumbs-o-up'} sorceColor={'#7C868F'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>机会列表</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.TOStyle}
                        onPress={ () => navigate('TasksListScene')}
                    >
                        <Text style={styles.myIconText}>
                            <MyIcon sorceName={'universal-access'} sorceColor={'#5F97F4'} sorceSize={myIconSize}/>
                        </Text>
                        <Text style={styles.contentText }>任务列表</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TOStyle}>
                        <Text style={styles.contentText }/>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

//工作台对应的样式
const styles = StyleSheet.create({
    listText:{
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
    },
    bigContainer:{
        flex: 1,
        flexDirection: 'column',  //row 水平方向
        //justifyContent: 'flex-start',
        //alignItems:'flex-start',
    },
    rowChild:{
        flexDirection: 'row',
        backgroundColor:'white',
        height:90,
    },
    TOStyle:{
        flex:1,
        borderStyle:'solid',
        borderColor:'#F5F5F5',
        borderWidth:1,
        borderLeftWidth:0,
        borderTopWidth:0
    },
    myIconText:{
        paddingTop:15,
        textAlign:'center',
    },
    contentText:{
        color:'black',
        textAlign:'center',
        marginTop: 5,
    },
    buttonStyles:{
        flex:1,
        color:'gray',
    },
});

const HomeStack = StackNavigator({
    Home: {
        screen: HomeScene,
    },
    CreateOrderScene: {
        screen: CreateOrderScene
    },
    CreatCustomScene: {
        screen: CreatCustomScene
    },
    CreateFollowScene: {
        screen: CreateFollowScene
    },
    CreateTaskScene: {
        screen: CreateTaskScene
    },
    CreateLogScene: {
        screen: CreatLogScene
    },
    CreateChanceScene: {
        screen: CreateChanceScene
    },
    LogsListScene: {
        screen: LogsListScene
    },
    ChancesListScene: {
        screen: ChancesListScene
    },
    TasksListScene: {
        screen: TasksListScene
    },
    OrderListScene: {
        screen: OrderListScene
    },
    ReturnListScene: {
        screen: ReturnListScene
    },
    FlowsListScene: {
        screen: FlowsListScene,
    },
    CustomListScene: {
        screen: CustomListScene,
    },
    MyCustomChooseScene: {
        screen: MyCustomChooseScene,
    },
    OrderListEditScene: {
        screen: OrderListEditScene,
    },
    OrderListInfo: {
        screen: OrderListInfo,
    },
    EditTaskScene: {
        screen: EditTaskScene,
    },
    EditLogScene:{
        screen: EditLogScene,
    },
    EditFollowScene:{
        screen: EditFollowScene,
    },
    EditChanceScene : {
        screen: EditChanceScene,
    },
    ReturnListInfoScene: {
        screen: ReturnListInfoScene,
    },
    CustomSubInfoScene: {
        screen: CustomSubInfoScene,
    },
    ChangePassScene:{
        screen:ChangePassScene,
    },
    Welfare:{
        screen: Welfare,
    },
    MySubordinateChooseScene:{
        screen: MySubordinateChooseScene,
    }
},{
    navigationOptions: {
        headerTitleStyle: NavStyle.stackNavHeaderStyle,
        headerStyle: NavStyle.stackNavStyle,
    },
});

export default HomeStack;