import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { connectActionSheet } from "@expo/react-native-action-sheet";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import firebase from "firebase";
import firestore from "firebase";

class CustomActions extends React.Component{
    state = {
        image: null,
        location: null,
    };

    // Allowing the user to pick images from their device.
    pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        try{
            if(status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    }).catch(error => console.log(error));     
                if (!result.cancelled) {
                    const imageUrl = await this.uploadImage(result.uri);
                    this.props.onSend({ image: imageUrl });
                }
            }
        } catch (error){
            console.log(error.message);
        }
    };

    // Uploading Images to chat
    uploadImage = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function(){
                resolve(xhr.response);
            };
            xhr.onerror = function(e){
                console.log(e);
                reject(new TypeError('Network Request Failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        const imageNameBefore = uri.split("/");
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        const ref = firebase.storage().ref().child(`images/${imageName}`);

        const snapshot = await ref.put(blob);
        blob.close();

        return await snapshot.ref.getDownloadURL();
    };

    // Allows the user to use their camera to take a photo.
    takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        try {
            if (status === "granted") {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    }).catch((error) => console.log(error));
                if (!result.cancelled) {
                    const imageUrl = await this.uploadImage(result.uri);
                    this.props.onSend({ image: imageUrl });
                }
            }
        } catch (error) {
          console.log(error.message);
        }
    };

    // Permision to get the GPS location of the user
    getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        try{
            if(status === 'granted') {
                let result = await Location.getCurrentPositionAsync({});
                if (result) {
                    this.props.onSend({
                        location: {
                            longitude: result.coords.longitude,
                            latitude: result.coords.latitude,
                        },
                    });
                }
            }
        } catch(error){
            console.log(error.message);
        }
    };

    // Action Sheet
    onActionPress = () => {
        const options = ['Choose From Library', 
            'Take Pictures', 
            'Send Location', 
            'Cancel'
        ];
        const cancelButtonIndex = options.length -1;
        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex){
                    case 0:
                        console.log('User wants to pick a image');
                        this.pickImage();
                        break;
                    case 1:
                        console.log('User wants to take a picture');
                        this.takePhoto();
                        break;
                    case 2:
                        console.log('User wants to get their location');
                        this.getLocation();
                        break;
                    default:
                        break;
                }
            }
        );
    };

    render(){
        return(
            <TouchableOpacity 
                accessible={true}
                accessibilityLabel="Options"
                accessibilityHint="You can choose to send an image or your location"
                accessibilityRole="button"
                style={styles.container} 
                onPress={this.onActionPress}
            >
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

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};

const ConnectedApp = connectActionSheet(CustomActions);

export default ConnectedApp;