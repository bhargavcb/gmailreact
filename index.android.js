/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ToastAndroid,
  Image,
  ListView,
  Dimensions,
  Navigator
} from 'react-native';
import Inbox from './Inbox';
import Compose from './Compose';


var _navigator;

class Gmail extends Component {


RouteMapper(route,navigationOperations)

{
  _navigator = navigationOperations;
  if(route.name=="compose")
  {
    debugger;
    return
    (
      
      <Compose navigator={navigationOperations} />
      )
  }
  else if(route.name=="inbox")
  {
    return(
        <Inbox navigator={navigationOperations} />
      )
  }
}

 render()
 {

  var initialRoute = {name:'inbox'};

  return(
       <Navigator
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this.RouteMapper} />
    );
 }



 
}




AppRegistry.registerComponent('Gmail', () => Gmail);

