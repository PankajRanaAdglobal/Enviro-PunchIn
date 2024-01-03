import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  BLACK,
  BORDER_COLOR,
  BUTTON_BACKGROUND,
  SEARCHICON_BACKGROUND,
  WHITE,
} from '../../../theme/AppColor';
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
    marginLeft: hp(2),
  },
  tabButton: {
    paddingHorizontal: hp(3),
    height: hp(4.5),
    borderRadius: hp(1),
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomColor: BUTTON_BACKGROUND,
    borderBottomWidth: 1,
  },
  activeTextColor: {
    backgroundColor: BLACK,
    color: WHITE,
  },
  tabText: {
    fontSize: FontSize(13),
    fontFamily: FontName.Gorditas_Bold,
    lineHeight: 20,
  },
  content: {
    fontSize: FontSize(15),
    textAlign: 'center',
    marginTop: hp(2),
  },
  searchView: {
    flexDirection: 'row',
    width: '95%',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 100,
    height: 50,
    alignItems: 'center',
    borderColor: BORDER_COLOR,
    marginTop: heightPercentageToDP(2),
    justifyContent: 'space-between',
  },
  textinput: {
    textAlign: 'left',
    fontFamily: FontName.Gordita_Regular,
    borderWidth: 0,
    width: '80%',
    // backgroundColor: 'red',
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 0,
    color:BLACK
  },
  searchIcon: {
    backgroundColor: SEARCHICON_BACKGROUND,
    padding: 10,
    borderRadius: 100,
    marginRight: 5,
  },
  viewCount:{
    position:'absolute',
    right:20,
    marginTop:hp(1)

  },
  countText:{
   
  }
});
