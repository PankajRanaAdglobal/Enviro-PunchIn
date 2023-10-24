import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  BLACK,
  BUTTON_BACKGROUND,
  QR_BACKGROUND,
  TEXT_COLOR_GREY,
  WHITE,
} from '../../theme/AppColor';
import {FontName, FontSize} from '../../theme/FontName';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    alignItems: 'center',
    width: '100%',
  },
  appLogoStyle: {
    marginTop: hp(8),
    width: 100,
    height: 50,
  },
  qrImage: {
    width: 100,
    height: 100,
    margin: 20,
  },
  topRightImageStyle: {alignSelf: 'flex-end', position: 'absolute', right: -15},
  qrViewStyle: {
    marginTop: hp(8),
    backgroundColor: QR_BACKGROUND,
    padding: 20,
    borderRadius: 100,
  },
  scanQrTextStyle: {
    fontFamily: FontName.Gorditas_Bold,
    fontSize: 20,
    paddingTop: 20,
  },
  scanQrMsgStyle: {
    paddingTop: hp(2),
    paddingLeft: 50,
    textAlign: 'center',
    paddingRight: 50,
    fontSize: 15,
    color: TEXT_COLOR_GREY,
  },
  buttonTextStyle: {
    fontSize: FontSize(13),
    color: WHITE,
    fontFamily: FontName.Gorditas_Bold,
    lineHeight: 17,
  },
  scanButtonStyle: {
    marginTop: hp(10),
    backgroundColor: BLACK,
    borderRadius: 100,
    width: 263,
    height: 55,
  },
  manualButtonStyle: {
    marginTop: hp(4),
    backgroundColor: WHITE,
    borderRadius: 100 / 2,
    width: 263,
    borderWidth: 1,
    height: 55,
  },
  manualTextStyle: {
    fontSize: FontSize(13),
    color: BLACK,
    fontFamily: FontName.Gorditas_Bold,
    lineHeight: 17,
  },
  roundedView: {
    position: 'absolute',
    top: 110,
    left: -12,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    backgroundColor: BUTTON_BACKGROUND,
  },
  buttonBgView: {
    position: 'absolute',
    top: 12,
    left: 140,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    backgroundColor: BUTTON_BACKGROUND,
  },
  menuButton: {
    position: 'absolute',
    top: hp(4),
    right: hp(2),
  },
});
