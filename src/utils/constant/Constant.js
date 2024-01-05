import { Alert, Share, Platform, createContext, useContext } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
const regex = /\u00A0/g;

// make first word capital of any string
export const capitalizeFirstLetter = str => {
  // Split the string into words
  const words = str?.split(' ');
  // Capitalize the first letter of each word
  const capitalizedWords = words?.map(word => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return ''; // Handle empty words (e.g., multiple spaces)
    }
  });
  // Join the words back together to form the final string
  return capitalizedWords?.join(' ');
};
export const ShowToast = (msg, length = Toast.SHORT) =>
  Toast.showWithGravity(msg, length, Toast.BOTTOM);

export const createFormData = (imageKey, imageUri, body = {}) => {
  const data = new FormData();
  if (imageUri != null) {
    data.append(imageKey, {
      uri:
        Platform.OS === 'android'
          ? imageUri?.assets[0]?.uri
          : imageUri?.assets[0]?.uri.replace('file://', ''),
      name: imageUri?.assets[0]?.fileName,
      type: imageUri?.assets[0]?.type,
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};

// CLEAR PREVIOUS STACK OF NAVIGATION
export const handleStackNavigation = (screenName, navigation) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenName }],
    }),
  );
};
// Save the token
export const saveToken = async token => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error saving token: ', error);
  }
};

// Retrieve the token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Error retrieving token: ', error);
  }
};

// formate date
export const formatDate = date => {
  if (typeof date === 'string') {
    return date; // Already in the desired format
  } else if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  } else {
    return ''; // Handle invalid date input as needed
  }
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
// Function to format the selected time as HH:MM with leading zeros
export const formatTime = time => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const amPm = hours < 12 ? 'AM' : 'PM';
  const formattedHours = String(hours % 12 || 12).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};

// This function first parses the selected time into a Date object, then extracts the hours, minutes,
// and AM/PM values. It also converts the hours to a 12-hour format.
export function convertTimeToHoursMinutesSeconds(inputTime) {
  if (
    typeof inputTime !== 'string' ||
    !inputTime.match(/^\d{2}:\d{2} [APap][Mm]$/)
  ) {
    return 'Invalid time format';
  }

  const timeComponents = inputTime.split(' ');
  const time = timeComponents[0];
  const meridiem = timeComponents[1];
  const [hours, minutes] = time.split(':');

  const isPM = meridiem.toLowerCase() === 'pm';
  let hours24 = parseInt(hours, 10);

  if (isPM && hours24 !== 12) {
    hours24 += 12;
  } else if (!isPM && hours24 === 12) {
    hours24 = 0;
  }

  return `${String(hours24).padStart(2, '0')}:${minutes}:00`;
}

// getCurrentTime that creates a Date object, extracts the hours, minutes, and seconds,
export function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0'); // Ensure two-digit format
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export function convertUtcToLocal(utcTimeString) {
  if (!utcTimeString) {
    return null; // Handle empty input gracefully
  }

  // Split the time string into hours, minutes, and seconds
  const timeParts = utcTimeString.split(':');
  if (timeParts.length !== 3) {
    return null; // Handle invalid input
  }

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return null; // Handle invalid input with non-numeric values
  }

  // Create a new Date object for the current date
  const currentDate = new Date();

  // Set the hours, minutes, and seconds in UTC
  currentDate.setUTCHours(hours, minutes, seconds);

  // Get the local time zone offset in minutes
  const localTimeOffset = currentDate.getTimezoneOffset();

  // Calculate the local time by adding the offset
  const localDate = new Date(currentDate.getTime() - localTimeOffset * 60000);

  // Format the local time as a string
  const localTimeString = localDate.toLocaleTimeString();

  return localTimeString;
}



export const convertTextToUpperCase = (defaultText) => {
  // To convert Upper Case
  return upperCaseText = defaultText
    .split(' ')
    .map(function (word, index) {
      // First character upper case else lower case
      return word.charAt(0)
        .toUpperCase() + word.slice(1)
          .toLowerCase();
    })
    .join(' ');

};