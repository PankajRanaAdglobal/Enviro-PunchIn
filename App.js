import { View, Text } from 'react-native';
import React from 'react';
import StackNavigation from './src/navigation/stack/Stack';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import LocalPushNotification from './src/component/PushNotification';
export default function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />
        <LocalPushNotification/>
      </PersistGate>
    </Provider>
  )
}
