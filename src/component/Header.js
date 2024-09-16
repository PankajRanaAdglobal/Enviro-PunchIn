import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FontName, FontSize} from '../theme/FontName';
import {BLACK, LIGHT_BLUE, SEARCHICON_BACKGROUND} from '../theme/AppColor';
import {BACK} from '../utils/assetsImages/AssetImage';
import CustomText from './CustomText';
import Filter from '../../assets/image/svg/filter.svg';

const Header = ({title, rightText, onPress, isEdit = true, onPressBack}) => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    console.warn(navigation);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={!!onPressBack ? onPressBack : () => handleBackPress}
        style={styles.headerContent}>
        <Image source={BACK} />
        <CustomText style={styles.title}>{title}</CustomText>
      </TouchableOpacity>
      {/* {isEdit ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.filterIcon}>
          <Filter width={20} height={20} />
        </TouchableOpacity>
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(6),
    width: '100%',
    alignSelf: 'center',
    paddingRight: hp(2),
  },

  headerContent: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize(15),
    color: BLACK,
    marginLeft: hp(1),
    fontFamily: FontName.Gordita_Medium,
  },
  rightText: {
    fontSize: 16,
    color: LIGHT_BLUE,
    marginRight: 15,
    fontWeight: '700',
    fontFamily: FontName.Gorditas_Bold,
  },
  filterIcon: {
    backgroundColor: SEARCHICON_BACKGROUND,
    padding: 10,
    borderRadius: 100,
  },
});

export default Header;
