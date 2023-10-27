import React from 'react';
import { Alert, Platform } from 'react-native';

const AlertDialog = (title, message, buttonArray = [], onPress) => {
  const items = buttonArray.map(item => ({
    text: item.label,
    onPress: item.onPress,
  }));
  items.push({ text: 'Cancel', onPress: () => { } }); // Adding the Cancel button
  if (Platform.OS === 'android') {
    // On android, remove the cancel button since it's added automatically.
    items.reverse();
  }

  Alert.alert(title, message, items, { cancelable: true });
};

export default AlertDialog;
