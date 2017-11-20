import React, {Component} from 'React'
import {View, Text, Button} from 'react-native'
import GoogleFitManager from './GoogleFitManager'

export default class AndroidGoogleFit extends React.Component {

    googleFitManager = GoogleFitManager.getInstance()

    constructor() {
        console.log('constructor')
        super();
        this.reloadData = this.reloadData.bind(this)
        this.googleFitManager.setReloadCallback(this.reloadData)
        this.state = {
            step: 0,
            weight: 0,
        }
    }

    reloadData() {
        this.setState({
                step: this.googleFitManager.getStepCount(),
                weight: this.googleFitManager._retrieveWeight()
            }
        )
    }

    render() {
        return (
            <View>
                <Text>
                    Step: {this.state.step}
                </Text>
                <Text>
                    Weight: {this.state.weight}
                </Text>
            </View>
        )
    }
}