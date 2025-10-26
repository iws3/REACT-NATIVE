import { registerRootComponent } from 'expo';

// import App from './App.js';
import Layout from './Layout.jsx';
// import PermissionScreen, { Camera } from './tutorial/Camera.jsx';
import Data from './tutorial/Data.jsx';
import List from './tutorial/FlatList.jsx';
import Camera from './tutorial/Camera.jsx';
import DimensionScreen from './tutorial/Dimension'
import App from './MyLayout.jsx';
// import App from './tutorial/Tab.jsx';
// import { Dimensions } from 'react-native';




// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
