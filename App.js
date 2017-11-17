/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';


//import AppleHealthKit from 'rn-apple-healthkit'

import CommonDataManager from './CommonDataManager';
import HealthKitManager from "./HealthKitManager";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    healthKitManager = HealthKitManager.getInstance()

    constructor() {
        super()
        this.reloadData = this.reloadData.bind(this);
        this.healthKitManager.setReloadCallback(this.reloadData)
        this.state = {
            age: 0,
            sex: 'Unknown',
            available: false,
            stepCount: 0
        }
    }


    reloadData() {
        this.setState({
            age: this.healthKitManager.getAge(),
            sex: this.healthKitManager.getSex(),
            stepCount: this.healthKitManager.getStepCount()
        })
    }

    render() {
        console.debug('render')

        return (
            <View style={styles.container}>
                <Text>Age: {this.state.age}</Text>
                <Text>Sex: {this.state.sex}</Text>
                <Text>Step Count: {this.state.stepCount}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
