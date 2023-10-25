//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { PRIMARY_COLOR } from '../../theme/AppColor';

// create a component
const ButtonComponet = ({
    txtStyle,
    ContbtnStyl,
    btnText,
    onPress,
    enableDisable,
    img,
}) => {
    return (

        <TouchableOpacity style={{ ...styles.btnStyle, ...ContbtnStyl }}
            // activeOpacity={0.8}
            disabled={enableDisable}
            onPress={onPress}

        >
            {!!img ? <Image source={img} /> :
                <Text style={{ ...styles.btnTextStyle, ...txtStyle }}>{btnText}</Text>
            }
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    btnStyle: {
        height: moderateScale(42),
        backgroundColor: PRIMARY_COLOR,
        borderRadius: moderateScale(8),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: moderateScale(10),

    },
    btnTextStyle: {
        fontSize: scale(12),
        fontWeight: '500',
        color: 'white',
        textTransform: 'uppercase'
    }
});

//make this component available to the app
export default ButtonComponet;
