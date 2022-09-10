import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Pressable } from 'react-native';
//Importing the background image from the assest folder.
import bgScreenImage from '../assets/background-image.png'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Start extends Component {
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
    green: "#B9C6AE",
    blue: "#1B70A0",
  };

  render() {
    return (
      <View style={ styles.container }>
        <ImageBackground source={ bgScreenImage } style={styles.backgroundImage}>
          <Text style={styles.title}>
            FoliFF {"\n"} Chat App
          </Text>
          <View style={styles.mainBox}>
            {/*This is the input box to enter your name*/}
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your name"
              />
            </View>

            <View style={styles.colorWrapper}>
              <Text style={styles.chooseColor}>
                {" "}
                Choose your backgroud color:
                {" "}
              </Text>
            </View>

            {/* The colours to change the background are here */}
            <View style={styles.colorRow}>
              <TouchableOpacity 
                style={styles.color1} 
                onPress={ () => this.changeBgColor(this.colors.black)}
              />
              <TouchableOpacity 
                style={styles.color2} 
                onPress={ () => this.changeBgColor(this.colors.purple)}
              />
              <TouchableOpacity 
                style={styles.color3} 
                onPress={ () => this.changeBgColor(this.colors.grey)}
              />
              <TouchableOpacity 
                style={styles.color4} 
                onPress={ () => this.changeBgColor(this.colors.green)}
              />
            </View>

            {/*Allows the user to click on the button and be redirected to the chat page. */}
            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

//Chat Apps stylesheet for sizes, centering and colouring
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //The demension of the background image according to the project brief
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    alignItems: "center",
  },
  
  //Dimension for the title name of my app :D
  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    padding: '20%',
    textAlign: 'center'
  },
  
  //Dimension for the box that will contain to start chatting.
  mainBox: {
    flex: 1,
    width: '88%',
    height: '44%',
    backgroundColor: '#FFFFFF',
    justifyContent: "space-around",
    alignItems: 'center'
  },

  inputBox: {
    width: '88%',
    paddingLeft: 20,
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },

  colorWrapper:{
    marginRight: "auto",
    paddingLeft: 15,
    width: '88%',
    alignItems: "center"
  },

  chooseColor: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
  },

  colorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%"
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