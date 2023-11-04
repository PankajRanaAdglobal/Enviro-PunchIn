import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  BLACK,
  BUTTON_BACKGROUND,
  ORANGE,
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
    backgroundColor: '#FFF0EB',
    padding: 20,
    borderRadius: 100,
  },
  scanQrTextStyle: {
    fontFamily: FontName.Gorditas_Bold,
    fontSize: FontSize(18),
    paddingTop: 20,
  },
  scanQrMsgStyle: {
    paddingTop: hp(2),
    paddingLeft: 50,
    textAlign: 'center',
    paddingRight: 50,
    fontSize: FontSize(13),
    color: TEXT_COLOR_GREY,
    lineHeight: 18,
  },
  buttonTextStyle: {
    fontSize: FontSize(13),
    color: WHITE,
    fontFamily: FontName.Gorditas_Bold,
    lineHeight: 17,
  },
  scanButtonStyle: {
    marginTop: hp(6),
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
  buttonBgViewSquare: {
    position: 'absolute',
    top: 12,
    left: 140,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100 / 5,
    backgroundColor: BUTTON_BACKGROUND,
    height: 40,
    width: 43,
    justifyContent: 'center',
  },
});
