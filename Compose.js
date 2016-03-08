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
  Dimensions
} from 'react-native';


class compose extends Component{

render()
{
	return(
		<View>
			<TextInput placeholder='Sender' />
			<TextInput placeholder ="To"/>
			<TextInput placeholder ="Subject"/>
			<TextInput placeholder ="Content"/>
		</View>

		)
}

}

module.exports = "Compose"