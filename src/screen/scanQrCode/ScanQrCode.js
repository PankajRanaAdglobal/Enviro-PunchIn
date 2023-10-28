import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {styles} from './Style';
import CustomText from '../../component/CustomText';
import CustomButton from '../../component/CustomButton';
import AppLoader from '../../utils/appLoader/AppLoader';
import {CAMERA_SCAN_VIEW, CLOSE} from '../../utils/assetsImages/AssetImage';
import AppString from '../../utils/appString/AppString';
import PunchInFailedModal from '../../utils/modal/PunchInFailedModal';
import PunchInSuccessModal from '../../utils/modal/PunchInSuccessModal';
import useApiEffect from '../../hooks/useApiEffect';
import {setAccessToken, setRefrestToken} from '../../redux/slices/TokenSlice';
import {ShowToast, handleStackNavigation} from '../../utils/constant/Constant';
import NavString from '../../utils/navString/NavString';
import {LOGIN} from '../../sevices/ApiEndPoint';
import {useDispatch} from 'react-redux';
import {isLoggedIn, loginSuccess} from '../../redux/slices/AuthSlice';

export default function ScanQrCode({navigation}) {
  const dispatch = useDispatch();
  const {makeApiRequest, loading} = useApiEffect();
  const [isPunchFail, setIsPunchFail] = useState(false);
  const [isPunchSuccess, setIsPunchSuccess] = useState(false);

  // Click On Close
  const handleCloseClick = () => {
    navigation.goBack();
  };

  const onSuccess = async e => {
    const apiData = await makeApiRequest({
      url: LOGIN,
      method: 'POST',
      isToken: false,
      data: {token: e?.data, login_type: 'punchin'},
    });
    if (apiData?.status == true) {
      dispatch(loginSuccess(apiData));
      dispatch(setAccessToken(apiData?.data?.jwtToken));
      dispatch(setRefrestToken(apiData?.data?.jwtRefreshToken));
      dispatch(isLoggedIn(true));
      setIsPunchSuccess(true);
    } else {
      console.log('LOGIN ERROR: ', apiData);
      setIsPunchFail(true);
    }
  };

  const handlePunchInFailedPopup = type => {
    if (type == 'close') {
      navigation.goBack();
      setIsPunchFail(false);
    }
  };

  const handlePunchInSuccessPopup = type => {
    if (type == 'close') {
      navigation.goBack();
      setIsPunchSuccess(false);
    } else {
      setIsPunchSuccess(false);
    }
  };

  return (
    <View style={{flex: !isPunchFail ? 1 : 0}}>
      <QRCodeScanner
        showMarker={true}
        cameraStyle={{height: '100%'}}
        topViewStyle={styles.qrScannerTopBottomViewStyle}
        bottomViewStyle={styles.qrScannerTopBottomViewStyle}
        onRead={onSuccess}
        customMarker={<Image source={CAMERA_SCAN_VIEW} />}
        flashMode={RNCamera.Constants.FlashMode.auto}
        vibrate
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
          <TouchableOpacity onPress={handleCloseClick}>
            <View style={styles.closeButtonStyle}>
              <Image source={CLOSE} style={styles.closeImage} />
            </View>
          </TouchableOpacity>
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
