//import liraries
import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppLogo from '../../../assets/image/svg/app_logo.svg';
import AssetImage from '../../utils/assetsImages/AssetImage';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import CustomText from '../../component/CustomText';
import TextInputWithLabel from '../../component/TextInputWithLabel';
import UserIcon from '../../../assets/image/userPNG.png';
import ShowHidePass from '../../../assets/image/eyeOnPNG.png';
import EyeOffPNG from '../../../assets/image/eyeOffPNG.png';
import ClockPNG from '../../../assets/image/phonePNG.png';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CustomButton from '../../component/CustomButton';
import {FontName} from '../../theme/FontName';
import {BLACK} from '../../theme/AppColor';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useApiEffect from '../../hooks/useApiEffect';
import AppLoader from '../../utils/appLoader/AppLoader';
import {useDispatch, useSelector} from 'react-redux';
import NavString from '../../utils/navString/NavString';
import {ShowToast} from '../../utils/constant/Constant';
import {GAURD_PUNCH_IN, PUNCH_IN} from '../../sevices/ApiEndPoint';
// import { useDispatch } from 'react-redux';
import {isLoggedIn, loginSuccess} from '../../redux/slices/AuthSlice';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// create a component

const GaurdsLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const {makeApiRequest, loading} = useApiEffect();
  const [empID, setEmpID] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [locationPermission, setLocationPermission] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const locationStatus = await requestLocationPermission();
    const cameraStatus = await requestCameraPermission();

    setLocationPermission(locationStatus);
    setCameraPermission(cameraStatus);

    if (
      locationStatus === RESULTS.GRANTED &&
      cameraStatus === RESULTS.GRANTED
    ) {
      // Both permissions granted, proceed with your login logic
    } else {
      // Handle the case where one or both permissions are not granted
    }
  };

  const requestLocationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return result;
  };

  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    return result;
  };

  const verificationHandel = () => {
    if (empID === '') {
      ShowToast('Please enter name');
    } else if (password === '') {
      ShowToast('Please enter contact number');
    } else {
      gaurdLoginAPI();
    }
  };

  const showHidePass = () => {
    setPasswordShow(!passwordShow);
  };

  // login Api Called Here
  const gaurdLoginAPI = async () => {
    const body = {
      employee_id: empID,
      password: password,
    };
    const apiData = await makeApiRequest({
      url: GAURD_PUNCH_IN,
      method: 'POST',
      isToken: false,
      data: body,
    });
    if (apiData != undefined)
      if (apiData?.status == true) {
        dispatch(loginSuccess(apiData));
        //  dispatch(isLoggedIn(true));
        ShowToast(apiData?.message);
        navigation.navigate(NavString.LOGIN);
      } else {
        ShowToast(apiData?.error?.message);
      }
  };

  return (
    // <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
    //     <View style={{ marginVertical: moderateScale(20) }}>
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        {/* <AppLogo width={150} height={80} marginTop={moderateScale(100)} /> */}
        <Image style={styles.logoImage} source={AssetImage.LOGO} />
        <CustomText
          children={'Welcome'}
          fontSize={20}
          fontWeight={'700'}
          style={{marginTop: moderateScale(20)}}
        />
        <CustomText
          children={'Login your account to continue'}
          fontSize={14}
          fontWeight={'400'}
          style={{
            marginTop: moderateScale(5),
            color: '#000000A6',
            marginBottom: moderateScale(20),
          }}
        />
      </View>

      <TextInputWithLabel
        placeholder="Empployee Id"
        inputStyle={{marginBottom: moderateVerticalScale(20)}}
        textInputStyle={{marginRight: 10}}
        leftIcon={UserIcon}
        onChangeText={text => setEmpID(text)}
        value={empID}
      />
      <TextInputWithLabel
        placeholder="Password"
        inputStyle={{marginBottom: moderateVerticalScale(20)}}
        textInputStyle={{marginRight: 10}}
        leftIcon={ClockPNG}
        onChangeText={text => setPassword(text)}
        secureTextEntry={!passwordShow}
        onPressRight={showHidePass}
        rightIcon={passwordShow === true ? ShowHidePass : EyeOffPNG}
        value={password}
      />
      <CustomButton
        title={'Login'}
        textStyle={{
          fontSize: 16,
          fontWeight: '500',
          fontFamily: FontName.Gordita_Regular,
        }}
        style={{
          backgroundColor: BLACK,
          borderRadius: 8,
          width: widthPercentageToDP(95),
          height: heightPercentageToDP(5),
          maringHorizontal: 20,
        }}
        onPress={() => verificationHandel()}
      />
      <AppLoader isLoading={loading} />
    </View>

    //     </View>

    // </KeyboardAwareScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRightImageStyle: {alignSelf: 'flex-end', position: 'absolute', right: -15},
  logoImage: {
    width: 80,
    height: 80,
    marginTop: moderateScale(100),
  },
});

//make this component available to the app
export default GaurdsLogin;
