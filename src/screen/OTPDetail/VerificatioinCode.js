//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderCompo from './HeaderCompo';
import TextInputWithLabel from './TextInputWithLabel';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import UserIcon from '../../../assets/images/PNG/userPNG.png'
import ClockPNG from '../../../assets/images/PNG/clockPNG.png'
import ButtonComponet from './ButtonComponet';
import NavString from '../../utils/navString/NavString';
import { FontName } from '../../theme/FontName';
// create a component
const VerificatioinCode = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderCompo label={'OTP Details'} />
            <TextInputWithLabel
                placeholder='Enter Name'
                inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                textInputStyle={{ marginRight: 10 }}
                leftIcon={UserIcon}
            />
            <TextInputWithLabel
                placeholder='Enter Contact Number'
                inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                textInputStyle={{ marginRight: 10 }}
                keyboardType="email-address"
                leftIcon={ClockPNG}
            />

            <ButtonComponet
                btnText={'Send Verification Code'}

                onPress={() => navigation.navigate(NavString.Otp)}
                ContbtnStyl={{ maringLeft: 100, fontSize: 100, borderRadius: moderateScale(8) }}
                txtStyle={{ fontSize: 16, fontWeight: '500', fontFamily: FontName.Gordita_Regular }}
            />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default VerificatioinCode;
