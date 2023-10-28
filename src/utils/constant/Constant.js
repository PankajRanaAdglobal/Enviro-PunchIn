
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

// CLEAR PREVIOUS STACK OF NAVIGATION
export const handleStackNavigation = (screenName, navigation) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName }],
      }),
    );
  };