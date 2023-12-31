import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {styles} from './Style';
import CustomText from '../../component/CustomText';
import AppLoader from '../../utils/appLoader/AppLoader';
import {CAMERA_SCAN_VIEW, CLOSE, FLIP} from '../../utils/assetsImages/AssetImage';
import AppString from '../../utils/appString/AppString';
import PunchInFailedModal from '../../utils/modal/PunchInFailedModal';
import PunchInSuccessModal from '../../utils/modal/PunchInSuccessModal';
import useApiEffect from '../../hooks/useApiEffect';
import {setAccessToken, setRefrestToken} from '../../redux/slices/TokenSlice';
import {LOGIN} from '../../sevices/ApiEndPoint';
import {useDispatch, useSelector} from 'react-redux';
import {EmployeloginSuccess, isLoggedIn} from '../../redux/slices/AuthSlice';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {ShowToast} from '../../utils/constant/Constant';
import { BLACK } from '../../theme/AppColor';

export default function ScanQrCode({navigation}) {
  const dispatch = useDispatch();
  const {makeApiRequest, loading} = useApiEffect();
  const [isPunchFail, setIsPunchFail] = useState(false);
  const [isPunchSuccess, setIsPunchSuccess] = useState(false);
  const [flipType, setFlipType] = useState(true);
  const scannerRef = useRef(null);
  const isFocused = useIsFocused();

  const locationId = useSelector(
    state => state?.auth?.loginUser?.data?.guard?.location_id,
  );

  // console.log(
  //   'Login user data--------- ',
  //   useSelector(state => state?.auth?.loginUser?.data?.guard?.location_id),
  // );

  // Click On Close
  const handleCloseClick = async () => {
    navigation.goBack();
  };

  const handleFlipCamera = () => {
    setFlipType(!flipType);
  };

  const onSuccess = async e => {
    const devicetype = Platform.OS == 'ios' ? 1 : 2;
    const apiData = await makeApiRequest({
      url: LOGIN,
      method: 'POST',
      isToken: true,
      data: {
        token: e?.data,
        login_type: 'punchin',
        device_id: DeviceInfo.getDeviceId(),
        device_type: devicetype,
        device_token: 'null',
        location_id: locationId + '',
      },
    });

    // console.log("apidata------------ ",apiData);

    if (apiData != undefined) {
      if (apiData?.status == true) {
        dispatch(EmployeloginSuccess(apiData));
        dispatch(setAccessToken(apiData?.data?.jwtToken));
        dispatch(setRefrestToken(apiData?.data?.jwtRefreshToken));
        setIsPunchSuccess(true);
      } else {
        scannerRef.current.reactivate();
        setIsPunchFail(true);
        ShowToast(apiData?.error?.message);
        console.log('LOGIN API ERROR: ', apiData?.error?.message);
      }
    } else {
      scannerRef.current.reactivate();
      ShowToast('Something went wrong!');
    }
  };

  const handlePunchInFailedPopup = type => {
    scannerRef.current.reactivate();
    if (type == 'close') {
      setIsPunchFail(false);
    }
  };

  const handlePunchInSuccessPopup = type => {
    scannerRef.current.reactivate();
    if (type == 'close') {
      setIsPunchSuccess(false);
    } else {
      setIsPunchSuccess(false);
    }
  };

  // CHECK CAMERA PERMISSION FOR BOTH PLATFORM
  const checkAndRequestCameraPermission = async () => {
    let cameraPermissionStatus = null;
    // Check for camera permission status on both platforms
    if (Platform.OS === 'ios') {
      cameraPermissionStatus = await check(PERMISSIONS.IOS.CAMERA);
    } else if (Platform.OS === 'android') {
      cameraPermissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
    }
    // Check the permission status and act accordingly
    if (cameraPermissionStatus === RESULTS.GRANTED) {
      // Permission has been granted, you can use the camera.
      return true;
    } else if (cameraPermissionStatus === RESULTS.DENIED) {
      console.log(cameraPermissionStatus);
      // Permission has been denied; request it again.
      AlertPopup();
    } else {
      // Handle other cases like blocked or unavailable.
      AlertPopup();
    }
  };

  // CHECK PERMISSION STATUS
  useFocusEffect(
    useCallback(() => {
      checkAndRequestCameraPermission();
    }, []),
  );

  // useEffect runs when the component mounts and when the screen is in focus
  useEffect(() => {
    if (isFocused) {
      // The screen is in focus
      scannerRef.current.reactivate();
      // You can perform any specific actions when the screen is in focus here
    } else {
      // The screen is not in focus
      // You can perform any cleanup or other actions when the screen loses focus
    }
  }, [isFocused]);

  const AlertPopup = () => {
    Alert.alert(
      'Camera Permission Block',
      'Please enable camera permission from device setting',
      [
        {
          text: 'Cancel',
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: 'Enable Permission',
          onPress: () => {
            Linking.openSettings();
            navigation.goBack();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={{flex: !isPunchFail ? 1 : 0}}>
      <QRCodeScanner
        ref={scannerRef}
        showMarker={true}
        cameraStyle={{height: '100%'}}
        topViewStyle={styles.qrScannerTopBottomViewStyle}
        bottomViewStyle={styles.qrScannerTopBottomViewStyle}
        onRead={onSuccess}
        customMarker={<Image source={CAMERA_SCAN_VIEW} />}
        flashMode={RNCamera.Constants.FlashMode.auto}
        vibrate
        cameraType={flipType ? 'front' : 'back'}
      />
      <View style={styles.viewOverlayStyle}>
        <CustomText style={styles.scanCodeTextStyle}>
          {AppString.SCAN_QR_CODE}
        </CustomText>
        <View style={{flex: 1}} />
        <View style={{flex: 0.4}}>
          <CustomText style={styles.scanCodeMsgTextStyle}>
            {AppString.SCAN_QR_MSG}
          </CustomText>
          <View style={styles.buttonView}>
            {/* Close */}
            <TouchableOpacity onPress={handleCloseClick}>
              <View style={styles.closeButtonStyle}>
                <Image tintColor={BLACK} source={CLOSE} style={styles.closeImage} />
              </View>
            </TouchableOpacity>
            {/* Flip Camera */}
            <TouchableOpacity onPress={handleFlipCamera}>
              <View style={styles.flipCameraButtonStyle}>
                <Image source={FLIP} style={styles.closeImage} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <AppLoader isLoading={loading} />
      {isPunchFail && (
        <PunchInFailedModal
          onCancel={handlePunchInFailedPopup}
          isVisible={isPunchFail}
        />
      )}
      {isPunchSuccess && (
        <PunchInSuccessModal
          onCancel={handlePunchInSuccessPopup}
          isVisible={isPunchSuccess}
        />
      )}
    </View>
  );
}
