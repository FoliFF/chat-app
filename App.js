import * as React from 'react';
//Importing Screens (1&2)
import Start from './components/Start';
import Chat from './components/Chat';

//Importing react native gesture handler
import 'react-native-gesture-handler';

//Import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start}/>
          <Stack.Screen name="Chat" component={Chat}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
  }
}