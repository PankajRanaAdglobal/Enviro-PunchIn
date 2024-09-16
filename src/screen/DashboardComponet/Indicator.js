// components/Dashboard/Indicator.js
import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {BLACK} from '../../theme/AppColor';

const Indicator = ({translateX, width}) => (
  <Animated.View
    style={[
      styles.indicator,
      {
        width,
        transform: [{translateX}],
      },
    ]}
  />
);

export default React.memo(Indicator);

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    height: '80%',
    backgroundColor: BLACK,
    borderRadius: 5,
    top: '10%',
    left: 10,
  },
});
