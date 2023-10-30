// PermissionHandler.js

import {Platform, PermissionsAndroid, Alert, Linking} from 'react-native';
import {check, request} from 'react-native-permissions'; // You need to install react-native-permissions package

export async function requestPermission(permission) {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(permission);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const status = await requestIosPermission(permission);
      return status === 'granted';
    }
  } catch (error) {
    console.error(`Error requesting ${permission} permission:`, error);
    return false;
  }
}

export async function checkPermission(permission) {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(permission);
      return granted === true;
    } else {
      const status = await checkIosPermission(permission);
      return status === 'granted';
    }
  } catch (error) {
    console.error(`Error checking ${permission} permission:`, error);
    return false;
  }
}

export async function openAppSettings() {
  if (Platform.OS === 'android') {
    Linking.openSettings();
  } else {
    Linking.openURL('app-settings:');
  }
}

async function requestIosPermission(permission) {
  try {
    const status = await request(permission);
    return status;
  } catch (error) {
    console.error(`Error requesting iOS ${permission} permission:`, error);
    return 'denied';
  }
}

async function checkIosPermission(permission) {
  try {
    const status = await check(permission);
    return status;
  } catch (error) {
    console.error(`Error checking iOS ${permission} permission:`, error);
    return 'denied';
  }
}
