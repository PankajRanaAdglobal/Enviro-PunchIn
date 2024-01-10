import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavString from "../../utils/navString/NavString";

import VerificatioinCode from "../../screen/OTPDetail/VerificatioinCode";
import Detail from "../../screen/OTPDetail/Detial";
import OTP from "../../screen/OTP/OTP";
import {
  EmployeListAll,
  EmployeHomeList,
  EmployeList,
  Login,
  ScanQrCode,
  GenerateQrCode,
  GaurdsLogin
} from "../../screen";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const user = useSelector((state) => state?.auth?.isLoggedIn);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            user === true ? NavString.GENERATE_QR_CODE : NavString.GAURD_LOGIN
          }
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={NavString.GAURD_LOGIN} component={GaurdsLogin} />
          <Stack.Screen name={NavString.LOGIN} component={Login} />
          <Stack.Screen name={NavString.SCAN_QR_CODE} component={ScanQrCode} />
          <Stack.Screen name={NavString.DETAIL} component={Detail} />
          <Stack.Screen
            name={NavString.VERIFICATION_CODE}
            component={VerificatioinCode}
          />
          <Stack.Screen name={NavString.Otp} component={OTP} />
          <Stack.Screen
            name={NavString.EMPLOYE_LIST_HOME}
            component={EmployeHomeList}
          />
          <Stack.Screen
            name={NavString.GENERATE_QR_CODE}
            component={GenerateQrCode}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default StackNavigation;
