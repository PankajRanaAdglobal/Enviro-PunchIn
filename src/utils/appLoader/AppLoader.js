import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {APPLOADER_COLOR, WHITE} from '../../theme/AppColor';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AppLoader = ({isLoading}) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  return (
    <>
      {isLoading && (
        <View style={styles.container}>
          <LottieView
            source={require('../../../assets/anim/loaderAnim.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APPLOADER_COLOR,
  },
  lottie: {
    width: wp(40),
    height: hp(40),
  },
});

export default AppLoader;
