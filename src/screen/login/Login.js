import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AssetImage, {LOGO, MENU} from '../../utils/assetsImages/AssetImage';
import {BLACK, BUTTON_BACKGROUND, ORANGE, WHITE} from '../../theme/AppColor';
import {styles} from './Style';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomText from '../../component/CustomText';
import AppString from '../../utils/appString/AppString';
import CustomButton from '../../component/CustomButton';
import AppLogo from '../../../assets/image/svg/app_logo.svg';
import NavString from '../../utils/navString/NavString';
import FourSquaer from '../../../assets/image/svg/FourSquare.svg';

// punching_type description:=
// 1=>office,2=>on-site, 3=>wfh

const Login = ({navigation}) => {
  const handleScanClick = () => {
    navigation.navigate(NavString.SCAN_QR_CODE);
  };

  const handleManualClick = () => {
    navigation.navigate(NavString.VERIFICATION_CODE);
  };

  const handleMenuClick = () => {
    navigation.navigate(NavString.EMPLOYE_LIST_HOME);
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image
          style={styles.topRightImageStyle}
          source={AssetImage.LOGIN_PAGE_TOP_IMAGE}
        />
        <AppLogo width={150} height={80} marginTop={hp(12)} />
        <View style={styles.qrViewStyle}>
          <Image style={styles.qrImage} source={AssetImage.QRCODE} />
          <View style={styles.roundedView}>
            <Image source={AssetImage.PHONE} />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 140,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: 100,
              backgroundColor: BUTTON_BACKGROUND,
            }}>
            <FourSquaer width={15} height={15} />
          </View>
        </View>
        <CustomText
          children={AppString.SCAN_QR_CODE}
          style={styles.scanQrTextStyle}
        />
        <CustomText
          children={AppString.SCAN_QR_MSG}
          style={styles.scanQrMsgStyle}
        />
        <CustomButton
          title={AppString.SCAN_CODE}
          textStyle={styles.buttonTextStyle}
          style={styles.scanButtonStyle}
          onPress={handleScanClick}
        />
        <CustomButton
          title={AppString.Manual_Entry}
          textStyle={styles.manualTextStyle}
          style={styles.manualButtonStyle}
          onPress={handleManualClick}
        />
      </View>

      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuClick}>
        <Image source={MENU} />
      </TouchableOpacity>
    </View>
  );
};

export default Login;
