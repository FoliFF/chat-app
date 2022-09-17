import React from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import CustomActions from '../components/CostomAction';
import MapView from 'react-native-maps';

// Firebase Database
const firebase = require('firebase');
require('firebase/firestore');

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
      isConnected: false,
    };
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBzXc8inzPKXzu-p-Y1u3u0pPUXFAxUoow",
      authDomain: "chatapp-db941.firebaseapp.com",
      projectId: "chatapp-db941",
      storageBucket: "chatapp-db941.appspot.com",
      messagingSenderId: "111432154554",
      appId: "1:111432154554:web:0c8398043a2e2e5958b183"
    };
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    // Refering to Firestore collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    // Check the user connection status and fetch data from asyncStorage or Firestore
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        // listens for updates in the collection
        this.unsubscribe = this.referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              return await firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              messages: [],
              user: {
                _id: user.uid,
                name: name,
                avatar: 'https://placeimg.com/140/140/any',
              },
              isConnected: true,
            });
          });
        this.saveMessages();
        console.log('Online');
      } else {
        this.setState({ isConnected: false });
        // get saved messages from local AsyncStorage
        this.getMessages();
        console.log('Offline');
      }
    });
  }

  async getMessages() {
    let messages = '';
    try {
      // getItem() allows to read the messages in storage wichh takes a key
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        // Converting json data to an object.
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      // setItem() allows to save the messages
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  };

  onSend(messages = []) {
    // previousState references to the component’s state at the time the change is applied.
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
        // Storing the messages
        this.saveMessages();
        if(this.state.isConnected === true){
          this.addMessages(this.state.messages[0]);
        }
      }
    );
  };
  
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name
        },
      });
    });
    this.setState({
      messages: messages,
    });
  };

  addMessages = (message) => {
    //const message = this.state.messages[0];
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
        wrapperStyle={styles.bubble}
      />
    )
  }

  // Hides chat to prevent usage when offline.
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar {...props} />
      );
    }
  }

  // creating the circle button
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  // creating the map location
  renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location){
      return(
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3 
          }} 
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  componentWillUnmount(){
    if (this.state.isConnected) {
      // Stop listening to authentication
      this.authUnsubscribe();
      // Stop listening for changes
      this.unsubscribe();
    }
  }

  render() {
    const { name, bgColor } = this.props.route.params;
    this.props.navigation.setOptions({ title: name })

    return (
      <View style={{ backgroundColor: bgColor, flex: 1 }}>
        <GiftedChat
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: name,
            avatar: this.state.user.avatar,
          }}
        />
        { /* This make sure that there will be no error displaying of keyboard for android devices */ }
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  bubble: {
    right: {
      backgroundColor: '#efb65d'
    },

    left: {
      backgroundColor: '#b86182'
    }
  }
})