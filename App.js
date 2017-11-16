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

    constructor() {
        super()

        let healthKitManager = HealthKitManager.getInstance()
        this.state = {
            healthKitManager: healthKitManager
        }
        this.state = {
            age: 0,
            sex: 'Unknown',
            available: false
        }
    }


    readBiologicalData() {
        let healthKitManager = HealthKitManager.getInstance()
        this.setState({
            age: healthKitManager.getAge(),
            sex: healthKitManager.getSex()
        })
    }

    componentDidMount() {
        this.readBiologicalData()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Age12: {this.state.age}</Text>
                <Text>Sex: {this.state.sex}</Text>


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
