/**
 * @format
 */
import 'node-libs-react-native/globals';
import { install } from 'react-native-quick-crypto';
global.Buffer = require('buffer');

install();
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
