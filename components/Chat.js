import React from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView  } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }
  componentDidMount(){
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

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
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

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

  render() {
    const { name, bgColor } = this.props.route.params;

    this.props.navigation.setOptions({ title: name })

    return (
      <View style={{flex: 1, backgroundColor: bgColor}}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{ _id: 1 }}
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