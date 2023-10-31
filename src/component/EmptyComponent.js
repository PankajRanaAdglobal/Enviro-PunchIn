import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontName, FontSize} from '../theme/FontName';
import CustomText from './CustomText';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const EmptyComponent = ({text}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>{text}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: FontSize(16),
    textAlign: 'center',
    fontFamily: FontName.Gordita_Regular,
  },
});

export default EmptyComponent;
