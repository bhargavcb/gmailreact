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




var URL = 'https://gmailclone.firebaseio.com/'

var ProgressBar = require("ProgressBarAndroid")
var ToolbarAndroid = require("ToolbarAndroid")
import Firebase from 'firebase'

import ActionButton from 'react-native-action-button'
import GiftedList from 'react-native-gifted-listview'
var base = reBase.createClass('https://gmailclone.firebaseio.com/');
import reBase from 're-base'


class Inbox extends Component{


  constructor(props)
  {
    super(props);
    this.mailRef = new Firebase('https://gmailclone.firebaseio.com/inboxmails');
    this.state={
        mailDetails: {},
        loading: true,
        dataSource: new ListView.DataSource(
          { rowHasChanged : (row1,row2)=> row1!==row2}),
      
    }
  }

    componentDidMount() {
      this.listenForMails(this.mailRef);
   
  }
  listenForMails(mailRef)
  {
    mailRef.on('value',(snap)=>{
      var mails = []
      snap.forEach((child) => {
        mails.push({
          sender: child.val().sender,
          subject:child.val().subject,
          senderName:child.val().senderName,
          content:child.val().content,
          key: child.key()
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(mails),loading:false
      });
    });
  }

  componentWillUnmount()
  {
    base.removeBinding(this.ref);
  }
 
  render() {
    var height = Dimensions.get('window').height;

    var mail = this.state.mailDetails['0'];
               var content = this.state.loading == true ? 
     <View style = {styles.container}>
     <ProgressBar styleAttr="Inverse" />
    </View> :
    <View style = {{height:height}} >
       <GiftedList

            dataSource = {this.state.dataSource}
            renderRow ={(rowData)=> this.renderMail(rowData)} 
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}/>
    </View>
        ;
   
    return (
      <View style={{height:height}}>
      <ToolbarAndroid title='Gmail'
        style= {styles.toolbar} />
        {content}
        <ActionButton 
          position = "right"
          Icon name ="android-create"
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { ToastAndroid.show("New Mail",ToastAndroid.SHORT)}}
        />
      </View>
    )
  }

  renderMail(mail) {
    return (
      <TouchableNativeFeedback
      onPress = {() => 
      ToastAndroid.show(mail.senderName,ToastAndroid.SHORT)}>
      <View style={styles.container}>
       <Image style={ styles.thumbnail } source={require('./gmail.png')}  resizeMode = {Image.resizeMode.cover}/>
        <View style = {styles.rightContainer}>
        <Text style = {styles.title}>{mail.sender}</Text>
        <Text style={styles.year}>{mail.subject}</Text>
        </View>
      </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer:{
    flex:1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  year: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail:{
     height:50,
    width: 50,
    borderRadius: 34,
  },
   listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  toolbar:
  {
    height:54,
    backgroundColor: 'rgba(231,76,60,1)'

  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});


module.exports = Inbox;