import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class Chat extends React.Component {
  componentDidMount(){
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    const { bgColor } = this.props.route.params;

    return (
      <View style={styles.chatView}>
        <Text>Hello I am the chat screen!</Text>
        <Button 
          title='Go to Start'
          onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  chatView: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  }
})