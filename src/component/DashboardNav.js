//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowBack from '../../assets/image/svg/arrowback.svg';
import Calendar from '../../assets/image/svg/calanderIcon.svg';
import {FontName} from '../theme/FontName';
import {useNavigation} from '@react-navigation/native';
// create a component
const DashboardNav = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBackPress}>
            <ArrowBack />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 16,
              paddingLeft: 10,
              fontFamily: FontName.Gorditas_Bold,
              color: '#000000',
            }}>
            Adglobal360
          </Text>
        </View>
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#F4F4F4',
            height: 42,
            width: 42,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 21,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            elevation: 2,
          }}>
          <Calendar />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 50,
    padding: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

//make this component available to the app
export default DashboardNav;
