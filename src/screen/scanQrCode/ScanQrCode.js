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

export default function ScanQrCode({navigation}) {
  const [isPunchFail, setIsPunchFail] = useState(true);
  const [isPunchSuccess, setIsPunchSuccess] = useState(false);

  // Click On Close
  const handleCloseClick = () => {
    navigation.goBack();
  };

  const onSuccess = e => {};

  const handlePunchInFailedPopup = () => {
    setIsPunchFail(false);
  };
  const handlePunchInSuccessPopup = () => {
    setIsPunchSuccess(false);
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
      <AppLoader isLoading={false} />
      {isPunchFail && (
        <PunchInFailedModal
          onCancel={handlePunchInFailedPopup}
          onPress={handlePunchInFailedPopup}
        />
      )}
      {isPunchSuccess && (
        <PunchInSuccessModal
          onCancel={handlePunchInSuccessPopup}
          onPress={handlePunchInSuccessPopup}
        />
      )}
    </View>
  );
}
