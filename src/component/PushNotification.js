import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";
import { Linking, Alert, Platform } from "react-native";
import {
  checkNotifications,
  requestNotifications,
} from "react-native-permissions";

function LocalPushNotification() {
  const checkAndRequestNotificationPermission = async () => {
    try {
      const { status } = await checkNotifications();
      if (status === "blocked") {
        showAlert(
          "Permission Blocked",
          "To enable notifications, go to Settings > Notifications and enable the app."
        );
      } else if (status === "denied") {
        showAlert(
          "Permission Blocked",
          "To enable notifications, go to Settings > Notifications and enable the app."
        );
      } else if (status === "granted") {
      } else {
        const requestResult = await requestNotifications([
          "alert",
          "sound",
          "badge",
        ]);
        if (requestResult.status === "granted") {
          // Permission granted after the request
        } else if (requestResult.status === "blocked") {
          Alert.alert(
            "Permission Blocked",
            "To enable notifications, go to Settings > Notifications and enable the app."
          );
        } else {
          Alert.alert(
            "Permission Denied",
            "You need to enable notifications to receive them."
          );
        }
      }
    } catch (error) {
      console.error(
        "Error checking or requesting notification permission:",
        error
      );
    }
  };

  const showAlert = (title, msg) => {
    Alert.alert(
      title,
      msg,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Enable", onPress: () => Linking.openSettings() },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    // CHECK NOTIFICATION PERMISSION
    // checkAndRequestNotificationPermission();

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {}
    );

    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  return null;
}

export default LocalPushNotification;

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    PushNotification.createChannel(
      {
        channelId: "local-channel", // (required)
        channelName: "Enviro Push", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification({
      channelId: "local-channel",
      title: notification?.title,
      message: notification?.message,
      bigText: notification?.message,
      data: notification,
      id: "1",
      vibrate: true,
      soundName: "default",
      playSound: true,
    });
  },
});
