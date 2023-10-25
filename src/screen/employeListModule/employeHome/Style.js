import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BUTTON_BACKGROUND, WHITE} from '../../../theme/AppColor';
import {FontName, FontSize} from '../../../theme/FontName';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: hp(1),
    paddingVertical: hp(1),
  },
  tabBarContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: hp(2),
  },
  tabButton: {
    paddingHorizontal: hp(3),
    height: hp(4.5),
    borderRadius: hp(1),
    marginLeft: hp(1),
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomColor: BUTTON_BACKGROUND,
    borderBottomWidth: 1,
  },
  activeTextColor: {
    backgroundColor: BUTTON_BACKGROUND,
    color: WHITE,
  },
  tabText: {
    fontSize: FontSize(12),
    fontFamily: FontName.Gordita_Regular,
  },
  content: {
    fontSize: FontSize(15),
    textAlign: 'center',
    marginTop: hp(2),
  },
});
