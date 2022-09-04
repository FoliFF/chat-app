import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native-web';

export default class Start extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      name:'',
      bgColor: this.colors.red,
    };
  }

  //The function to update the background color for Chat Screen chosen by the user.
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };
  //The different backgroud colors to choose from
  colors = {
    black: "#090C08",
    purple: "#474056",
    grey: "#8A95A5",
    green: "B9C6AE",
    blue: "#1B70A0",
  };

  render() {
    return (
      <View style={ styles.container }>
        <ImageBackground 
        source={ backgroundImage }
        >

          
        </ImageBackground>
        <Text>Hello! Welcome to Homescreen!</Text>

        <Button
          title="Go to Chat"
          onPress={() => 
            this.props.navigation.navigate('Chat', {name: this.setState.name})
          }
        />
      </View>
    )
  }
}

//Chat Apps stylesheet for sizes, centering and colouring
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    height: "40%",
    width: "88%",
    alignItems: "center",
    paddingTop: 100,
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  box1: {
    backgroundColor: "#FFFFFF",
    height: "46%",
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "grey",
    width: "88%",
    height: 60,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },

  colorBox: {
    marginRight: "auto",
    paddingLeft: 15,
    width: "88%",
  },

  chooseColor: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
  },

  colorArray: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  color1: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color2: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color3: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color4: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  button: {
    width: "88%",
    height: 70,
    borderRadius: 8,
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});