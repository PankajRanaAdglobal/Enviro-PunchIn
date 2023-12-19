import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  BLACK,
  GREY,
  LINE_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR_GREY,
  WHITE,
} from '../../../theme/AppColor';
import {FontName, FontSize} from '../../../theme/FontName';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(2),
    marginHorizontal: hp(1),
  },
  view: {backgroundColor: WHITE, marginTop: hp(2), padding: hp(2)},
  flatlistView: {

    flexDirection: 'row',

    justifyContent:'flex-start'
    
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  nameView: {
    marginLeft: hp(2),
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'flex-start',
    marginTop:hp(2),
    textAlign:'left'
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: hp(1),
    marginTop: hp(2.5),
    backgroundColor: BLACK,
    height: 42,
    width: 42,
    justifyContent: 'center',
    borderRadius: 8,
  },
  rightImage: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: hp(0),
    marginTop: hp(1),
    height: 42,
    width: 42,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Medium,
  },
  otherText: {
    fontSize: FontSize(13),
    fontFamily: FontName.Gordita_Regular,
    color: TEXT_COLOR_GREY,
    lineHeight: 17,
    marginTop: hp(1),
    width: '100%',
  },
  timeText: {
    marginLeft: hp(1),
    fontSize: FontSize(12),
    color: TEXT_COLOR_GREY,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: LINE_COLOR,
  },
  lineVertical: {
    width: 1,
    height: '100%',
    backgroundColor: LINE_COLOR,
  },
  checkInView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp(2),
    marginTop: hp(2),
  },
  checkinText: {fontSize: FontSize(13)},
  checkinTime: {
    fontFamily: FontName.Gorditas_Bold,
    marginTop: hp(0.5),
    fontSize: FontSize(13),
  },
});
