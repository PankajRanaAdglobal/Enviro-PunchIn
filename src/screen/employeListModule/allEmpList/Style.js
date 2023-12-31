import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TEXT_COLOR_GREY, WHITE} from '../../../theme/AppColor';
import {FontName, FontSize} from '../../../theme/FontName';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(2),
    marginHorizontal: hp(1),
  },
  flatlistView: {
    backgroundColor: WHITE,
    marginTop: hp(2),
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'flex-start',
    padding: hp(2),
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  nameView: {
    marginLeft: hp(2),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: hp(2),
    marginTop: hp(0.5),
  },
  timeOut: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: hp(2),
    bottom: 0,
    marginBottom: 5,
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
  },
  timeText: {
    marginLeft: hp(1),
    fontSize: FontSize(12),
    color: TEXT_COLOR_GREY,
  },
});
