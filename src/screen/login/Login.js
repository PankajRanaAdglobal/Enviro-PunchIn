import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AssetImage, {LOGO, MENU} from '../../utils/assetsImages/AssetImage';
import {BLACK, BUTTON_BACKGROUND} from '../../theme/AppColor';
import {styles} from './Style';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomText from '../../component/CustomText';
import AppString from '../../utils/appString/AppString';
import CustomButton from '../../component/CustomButton';
import AppLogo from '../../../assets/image/svg/AppLogo.svg';
import NavString from '../../utils/navString/NavString';

const Login = ({navigation}) => {
  const handleScanClick = () => {
    navigation.navigate(NavString.SCAN_QR_CODE);
  };
  const handleManualClick = () => {};
  const handleMenuClick = () => {
    navigation.navigate(NavString.EMPLOYE_LIST_HOME);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#C2E7FF10', '#FFF', '#FFF', '#C2E7FF50']}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.view}>
          <Image
            style={styles.topRightImageStyle}
            source={AssetImage.LOGIN_PAGE_TOP_IMAGE}
          />
          <Image tintColor={BLACK} source={MENU} style={styles.appLogoStyle} />
          <View style={styles.qrViewStyle}>
            <Image style={styles.qrImage} source={AssetImage.QRCODE} />
            <View style={styles.roundedView}>
              <Image source={AssetImage.PHONE} />
            </View>
            <View style={styles.buttonBgView}>
              <Image source={AssetImage.PHONE} />
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
      </LinearGradient>
      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuClick}>
        <Image source={MENU} />
      </TouchableOpacity>
    </View>
  );
};

export default Login;
