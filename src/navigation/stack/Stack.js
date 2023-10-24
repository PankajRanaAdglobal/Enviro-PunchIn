import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavString from '../../utils/navString/NavString';
import {Login, ScanQrCode, EmployeListAll, EmployeHomeList} from '../../screen';
import {SafeAreaView} from 'react-native';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={NavString.LOGIN} component={Login} />
          <Stack.Screen name={NavString.SCAN_QR_CODE} component={ScanQrCode} />
          <Stack.Screen
            name={NavString.EMPLOYE_LIST_HOME}
            component={EmployeHomeList}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default StackNavigation;
