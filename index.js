import { registerRootComponent } from 'expo';

import App from './App.js';
import Counter from './Counter.jsx';
import Wintro from './Wintro.jsx';
import Test from './test.jsx';
import Input from './input.jsx';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
