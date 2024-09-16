import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontName, FontSize} from '../theme/FontName';
import {BLACK} from '../theme/AppColor';

const CustomText = ({
  children,
  fontWeight,
  fontSize,
  style,
  numberOflines,
  ellipsizeMode,
}) => {
  const textStyles = [
    styles.text,
    fontWeight && {fontWeight},
    fontSize && {fontSize},
    style,
  ];

  return (
    <Text
      numberOfLines={numberOflines}
      ellipsizeMode={ellipsizeMode}
      style={textStyles}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(15),
    color: BLACK,
  },
});

export default CustomText;
