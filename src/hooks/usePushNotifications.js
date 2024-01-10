import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { ShowToast } from "../utils/constant/Constant";

const usePushNotifications = () => {
  useEffect(() => {
    const getToken = async () => {
      try {
        const deviceToken = await messaging().getToken();
        console.log("Device Token:", deviceToken);
        // Save or use the device token as needed
      } catch (error) {
        console.error("Error getting device token:", error);
      }
    };

    const requestPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        console.log("Permission Status:", authStatus);

        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          // Permission granted, get the device token
        }
      } catch (error) {
        console.error("Error requesting permission:", error);
      }
    };

    requestPermission();

    // Handle incoming FCM messages
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      console.log("Received FCM Message:", remoteMessage);
      // Handle the incoming message as needed
    });

    return () => {
      // Clean up subscriptions when the component unmounts
      unsubscribe();
    };
  }, []);

  // Function to send a push notification
//   const sendPushNotification = async (deviceToken, title, body) => {
//     try {
//       await messaging().sendMessage({
//         data: {
//           title: title,
//           body: body,
//         },
//         token: "ca9RTa-_Ss2ApTnfMZ-O8B:APA91bEm0J1Ig3GoqN0u3zIz-1rU4cWqrbLEJmYxdYcBV2jfuhnp-NUHcXzU2RoHqt7FIMAtJj-8-Z4yHsNxfC7JT44MW0oNILOSDb_GM-h1zQvVA25BV3ikE_03jxw7cn5qv8hVl1sd",
//       });
//       console.log("Notification sent successfully");
//     } catch (error) {
//       console.error("Error sending notification:", error);
//     }
//   };

  const sendPushNotification = async (deviceToken, title, body) => {
    try {
      const serverKey = 'AAAACzxhoLY:APA91bE1SBRKJ1Ziv46_FFfIDLVqEv6Pynj0N04PW8nVTQgTuDQhlXiY1jrtZRzmBz5Q1SPpKxWcI0wfwHh-UF1jpXYsavS4tsC0Zsh7sq9ityL115mWQUSIY8wfksYvdR0qf-50xR0f';
      const endpoint = 'https://fcm.googleapis.com/fcm/send';
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${serverKey}`,
        },
        body: JSON.stringify({
          to: deviceToken,
          notification: {
            title: title,
            body: body,
            sound: 'default',
            badge: '1',
          },
          data: {
            customData: 'your_custom_data',
          },
        }),
      });
  
      const result = await response.json();
      if(result?.success==1){
        ShowToast('SENT');
      }else {
        ShowToast('failed')
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  

  return { sendPushNotification };
};

export default usePushNotifications;
