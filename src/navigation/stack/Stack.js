import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavString from '../../utils/navString/NavString';

import VerificatioinCode from '../../screen/OTPDetail/VerificatioinCode';
import Detail from '../../screen/OTPDetail/Detial';
import OTP from '../../screen/OTP/OTP';
import { EmployeListAll, EmployeHomeList, EmployeList, Login, ScanQrCode } from '../../screen';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={NavString.LOGIN} component={Login} />
          <Stack.Screen name={NavString.SCAN_QR_CODE} component={ScanQrCode} />
          <Stack.Screen name={NavString.DETAIL} component={Detail} />
          <Stack.Screen name={NavString.VERIFICATION_CODE} component={VerificatioinCode} />
          <Stack.Screen name={NavString.Otp} component={OTP} />
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
