import React from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, Platform  } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
//Firebase Database
const firebase = require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzXc8inzPKXzu-p-Y1u3u0pPUXFAxUoow",
  authDomain: "chatapp-db941.firebaseapp.com",
  projectId: "chatapp-db941",
  storageBucket: "chatapp-db941.appspot.com",
  messagingSenderId: "111432154554",
  appId: "1:111432154554:web:0c8398043a2e2e5958b183"
};

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    };
  
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    //Refering to Firestore collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount(){
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    /*
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello Developer!',
          createdAt: new Date(),
          user: {
            _id:2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true
        },
      ]
    });
    */

    //User authentication
    
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });

    this.unsubscribeMessages = this.referenceChatMessages
      .orderBy('createdAt', 'desc')
      .onSnapshot(this.onCollectionUpdate);
    
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    })), () => {
      this.addMessages();
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages: messages,
    });
  }

  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  };

  renderBubble(props){
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#efb65d'
          }
        }}
      />
    )
  }

  componentWillUnmount(){
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribeMessages();
  }

  render() {
    const { name, bgColor } = this.props.route.params;

    this.props.navigation.setOptions({ title: name })

    return (
      <View style={{flex: 1, backgroundColor: bgColor}}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: name,
            avatar: this.state.user.avatar,
          }}
        />
        <Button 
          title='Go to Start'
          onPress={() => this.props.navigation.navigate("Start")}
        />
        { /* This make sure that there will be no error displaying of keyboard for android devices */ }
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}

/*
const styles = StyleSheet.create({
  
})
*/