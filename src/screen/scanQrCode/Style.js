import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FontName, FontSize} from '../../theme/FontName';
import {TIMESHEET_ITEM_HEADER, WHITE} from '../../theme/AppColor';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  qrScannerTopBottomViewStyle: {flex: 0, height: 0},
  viewOverlayStyle: {
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeButtonStyle: {
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#fff4',
    width: 50,
    height: 50,
  },
  flipCameraButtonStyle: {
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#fff4',
    width: 50,
    height: 50,
  },
  scanCodeTextStyle: {
    marginTop: hp(18),
    fontSize: FontSize(15),
    textAlign: 'center',
    color: WHITE,
    fontFamily: FontName.Gorditas_Bold,
  },
  scanCodeMsgTextStyle: {
    color: TIMESHEET_ITEM_HEADER,
    paddingHorizontal: 30,
    fontSize: FontSize(13),
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
  },
  closeImage: {
    width: 20,
    height: 20,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
});
