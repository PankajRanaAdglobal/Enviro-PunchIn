
import { Alert, Share, Platform } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const regex = /\u00A0/g;

// make first word capital of any string
export const capitalizeFirstLetter = (str) => {
    // Split the string into words
    const words = str?.split(' ');
    // Capitalize the first letter of each word
    const capitalizedWords = words?.map((word) => {
        if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
            return ''; // Handle empty words (e.g., multiple spaces)
        }
    });
    // Join the words back together to form the final string
    return capitalizedWords?.join(' ');
};
export const ShowToast = (msg, length = Toast.SHORT) => Toast.showWithGravity(
    msg,
    length,
    Toast.BOTTOM,
);
export const createFormData = (imageKey, imageUri, body = {}) => {
    const data = new FormData();
    if (imageUri != null) {
        data.append(imageKey, {
            uri: Platform.OS === "android"
                ? imageUri?.assets[0]?.uri
                : imageUri?.assets[0]?.uri.replace("file://", ""),
            name: imageUri?.assets[0]?.fileName,
            type: imageUri?.assets[0]?.type,
        });
    }

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });
    return data;
};