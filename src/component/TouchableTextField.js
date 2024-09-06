import React, { Component } from 'react';

import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { FontName } from '../theme/FontName';



const TouchableTextField = ({
    value,
    placeholder,
    onPressTextFiled,
    inputStyle = {},
    rightIcon,
    leftIcon,
    textInputStyle,
    onPressRight = {},
    ...props
}) => {
    return (
        <View style={{ ...styles.inputStyle, ...inputStyle }}>
            {/* {
                label != null ? <Text>{label}</Text> : null
            } */}
            <TouchableOpacity onPress={onPressTextFiled}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    height: 40
                }}>
                    {
                        !!leftIcon ? <Image source={leftIcon} style={{

                            height: moderateScale(16),
                            width: moderateScale(16), marginRight: 10, marginLeft: 10, alignSelf: 'center'
                        }} /> : null

                    }
                    <Text style={{
                        flex: 1, fontSize: 14, fontWeight: '400',
                        fontFamily: FontName.Gordita_Regular,
                        color: value != '' ? '#000000' : '#00000059',
                        paddingLeft:5

                    }}>

                        {value != '' ? value : placeholder}
                    </Text>
                    {/* <TextInput
                    placeholder={placeholder}
                    style={{ paddingVertical: moderateVerticalScale(8), flex: 1, ...textInputStyle }}
                    {...props}
                /> */}
                    {!!rightIcon ? <TouchableOpacity
                        activeOpacity={0.8}
                    // onPress={onPressRight}
                    >
                        <Image source={rightIcon} style={{
                            height: moderateScale(14),
                            width: moderateScale(14), marginRight: 10, marginLeft: 5
                        }} />
                    </TouchableOpacity> : null
                    }

                </View>
            </TouchableOpacity >
        </View >
    );
};

// define your styles
const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: .5,
        borderRadius: 4,
        borderColor: '#D9D9D9',
        marginHorizontal: moderateScale(8)

        // backgroundColor: 'green'

    }
});

//make this component available to the app
export default TouchableTextField;

