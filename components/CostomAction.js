import React from "react";
import { StyleSheet, View, Container, Button } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { TouchableOpacity } from "react-native-gesture-handler";

class CustomActions extends React.Component{
    state = {
        image: null,
        location: null,
    };

    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
     
        if(status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',})
                .catch(error => console.log(error));     
            if (!result.cancelled) {
                this.setState({
                    image: result
                });  
            }
        }
    };

    takePhoto = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status === 'granted') {
            let result = await ImagePicker.launchCameraAsync().catch(error => console.log(error));
            if (!result.cancelled) {
                this.setState({
                    image: result
                });
            }
        }
    };

    getLocation = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if(status === 'granted') {
            let result = await Location.getCurrentPositionAsync({});
            if (result) {
                this.setState({
                    location: result
                });
            }
        }
    };

    onActionPress = () => {
        const options = ['Choose From Library', 'Take Pictures', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length -1;
        //this.context.actionSheet().showActionSheetWithOptions()
    };

    render(){
        return(
            <TouchableOpacity style={styles.container} onPress={this.onActionPress}>
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});




{/*
                <Button title="Pick an image from the library" onPress={this.pickImage}/>
                    <Button title="Take a photo" onPress={this.takePhoto} />
                    {this.state.image &&
                        <Image source={{ uri: this.state.image.uri }} style={{ width: 200, height: 200 }} />
                    }

                    <Button title="Get my location" onPress={this.getLocation} />
                    {this.state.location && 
                        <MapView 
                            style={{ width: 300, height: 200 }}
                            region={{
                                latitude: this.state.location.coords.latitude,
                                longitude: this.state.location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />
                    }
*/}