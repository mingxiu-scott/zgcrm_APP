import React, { PureComponent } from 'react'
import RootScene from './src/RootScene'
import LoginSceen from './src/scene/Login/LoginScreen'

import SplashScreen from 'rn-splash-screen';

export default class ZgCRM extends PureComponent {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
    }
    render() {
        return (
            <LoginSceen/>
        )
    }
}