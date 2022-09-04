import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default class Chat extends React.Component {
  componentDidMount(){
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello I am the chat screen!</Text>
        <Button 
          title='Go to Start'
          onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    )
  }
}