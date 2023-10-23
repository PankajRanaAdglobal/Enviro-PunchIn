import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavString from '../../utils/navString/NavString';
import {Login, ScanQrCode, EmployeList} from '../../screen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={NavString.LOGIN} component={Login} />
        <Stack.Screen name={NavString.SCAN_QR_CODE} component={ScanQrCode} />
        <Stack.Screen name={NavString.EMPLOYE_LIST} component={EmployeList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
