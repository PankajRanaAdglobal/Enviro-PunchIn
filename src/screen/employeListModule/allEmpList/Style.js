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
    padding: hp(2),
    borderRadius: 5,
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
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: hp(2),
    marginTop: hp(2.5),
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
    width: '85%',
  },
  timeText: {
    marginLeft: hp(1),
    fontSize: FontSize(12),
    color: TEXT_COLOR_GREY,
  },
});
