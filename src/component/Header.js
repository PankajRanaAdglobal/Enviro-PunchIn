import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FontName, FontSize} from '../theme/FontName';
import {BLACK, LIGHT_BLUE} from '../theme/AppColor';
import {BACK} from '../utils/assetsImages/AssetImage';
import CustomText from './CustomText';

const Header = ({title, rightText, onPress, isEdit}) => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.headerContent}>
        <Image source={BACK} />
        <CustomText style={styles.title}>{title}</CustomText>
      </TouchableOpacity>
      {!isEdit ? (
        <Text style={styles.rightText} onPress={onPress}>
          {rightText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(6),
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
});

export default Header;
