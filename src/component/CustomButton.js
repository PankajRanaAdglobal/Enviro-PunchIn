import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontName, FontSize} from '../theme/FontName';
import {BLACK, WHITE} from '../theme/AppColor';

const CustomButton = ({title, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: BLACK,
    borderRadius: hp(1),
    width: wp(90),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: WHITE,
    fontSize: FontSize(13),
    fontFamily: FontName.Gordita_Regular,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default CustomButton;
