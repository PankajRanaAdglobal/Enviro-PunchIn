import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RED } from '../../src/theme/AppColor';
import { FontName, FontSize } from '../../src/theme/FontName';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const ErrorMessage = ({
  error,
  marginTop = heightPercentageToDP(0.2),
  marginLeft = heightPercentageToDP(3),
  marginRight = heightPercentageToDP(3),

}) => {
  if (!error) {
    return null;
  }
  const combinedStyles = [
    styles.errorText,
    { marginTop, marginLeft, marginRight },
  ];

  return <Text style={combinedStyles}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: RED,
    fontSize: FontSize(14),
    fontFamily: FontName.Geo_Auto_Regular,
    marginBottom: heightPercentageToDP(2)
  },
});

export default ErrorMessage;
