//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';


// import BackIcon from './../../../assets/images/SVG/backIcon'
import { useNavigation } from '@react-navigation/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import backImg from '../../assets/image/backPNG.png'
import { FontName } from '../theme/FontName';
// create a component
const HeaderCompo = ({
    onPressBack,
    headerStyl,
    label,
}) => {
    const navigaton = useNavigation()
    const goBack = () => {
        navigaton.goBack()
    }

    return (
        <View style={{ ...styles.container, ...headerStyl }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                onPress={!!onPressBack ? onPressBack : () => goBack()}>



                <Image style={{ width: moderateScale(9), height: moderateScale(19) }} source={backImg} />
                <Text style={{
                    paddingTop: Platform.OS === 'ios' ? moderateScale(0) : null,
                    marginLeft: moderateScale(8),
                    fontSize: 20, fontWeight: '700',
                    fontFamily: FontName.Gordita_Regular,
                    color: 'black',
                    // backgroundColor: 'green',




                }}>{label}</Text>


                {/* <BackIcon /> */}

            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: moderateScale(10),
        marginVertical: moderateVerticalScale(28),


    },
});

//make this component available to the app
export default HeaderCompo;


