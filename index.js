import { AppRegistry, Platform } from 'react-native';
import AppleHealthKit from './AppleHealthKit';

import AndroidGoogleFit from './AndroidGoogleFit'

const InitScreen = Platform.select({
    ios: AppleHealthKit,
    android: AndroidGoogleFit,
});

AppRegistry.registerComponent('HealthKit', () => InitScreen);
