import React, {useEffect, useState} from 'react';
import {Platform, Alert, Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AppString from '../utils/appString/AppString';

const LocationComponent = ({onLocationChange, navigation}) => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const getMaxRetries = 3;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const alertPopup = () => {
    Alert.alert(
      AppString.LOCATION_PERMISSION,
      AppString.LOCATION_PERMISSION_DESC,
      [
        {
          text: AppString.CANCEL,
          style: 'cancel',
          onPress: () => navigation.goBack(),
        },
        {
          text: AppString.ENABLE_PERMISSION,
          onPress: () => {
            navigation.goBack();
            Linking.openSettings();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const getCurrentLocation = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      setPermissionStatus(result);
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            onLocationChange({latitude, longitude, permissionStatus});
            setRetryCount(0); // Reset retry count on successful location retrieval
          },
          error => {
            console.error(error?.message);
            if (retryCount < getMaxRetries) {
              setRetryCount(retryCount + 1);
              setTimeout(getCurrentLocation, 1000); // Retry Fetch Location here
            } else {
              console.log('Failed to retrieve location');
            }
          },
          {enableHighAccuracy: false, timeout: 30000, maximumAge: 10000},
        );
      } else if (result === RESULTS.DENIED) {
        alertPopup();
      } else if (result === RESULTS.BLOCKED) {
        alertPopup();
      } else if (result == RESULTS.UNAVAILABLE) {
        Alert.alert(AppString.LOCATION_UNAVALABLE);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return null; // No UI elements to render
};

export default LocationComponent;
