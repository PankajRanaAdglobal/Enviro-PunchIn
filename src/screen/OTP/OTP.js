//import liraries
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import OTPInput from './OTPInput';
import { ButtonContainer, ButtonText } from "./styles";
import ButtonComponet from '../OTPDetail/ButtonComponet';
import { PRIMARY_COLOR } from '../../theme/AppColor';
import HeaderCompo from '../OTPDetail/HeaderCompo';
import { moderateScale } from 'react-native-size-matters';
import NavString from '../../utils/navString/NavString';


// create a component
const OTP = ({ navigation }) => {

    const [otpCode, setOTPCode] = useState("");
    const [isPinReady, setIsPinReady] = useState(false);
    const maximumCodeLength = 4;
    useEffect(() => {
        if (otpCode.length == maximumCodeLength) {
            Keyboard.dismiss()
        }
    });



    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View >
                <HeaderCompo label={'OTP Details'} headerStyl={{}} />
                <Text style={{ fontSize: 16, fontWeight: '500', alignSelf: 'center', marginTop: -20, marginBottom: moderateScale(28) }}>Please enter verification Code</Text>


                <OTPInput
                    code={otpCode}
                    setCode={setOTPCode}
                    maximumLength={maximumCodeLength}
                    setIsPinReady={setIsPinReady}
                />

                <ButtonComponet
                    // onPress={!isPinReady}
                    enableDisable={!isPinReady}
                    // disabled={!isPinReady}
                    onPress={() => navigation.navigate(NavString.DETAIL)}
                    btnText={"Send Verification Code"}
                    ContbtnStyl={{
                        backgroundColor: !isPinReady ? "#E49273" : PRIMARY_COLOR,
                        marginTop: moderateScale(47),
                    }}

                />


                {/* <ButtonContainer
                disabled={!isPinReady}
                style={{
                    backgroundColor: !isPinReady ? "grey" : "#000000",
                }}
            >
                <ButtonComponet
                    btnText={"Send Verification Code"}
                    
                />
                {/* <ButtonText
                    style={{
                        color: !isPinReady ? "black" : "#EEEEEE",
                    }}
                >
                    Login
                </ButtonText> */}
                {/* </ButtonContainer> */}

            </View>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor: '#FAFCFD'
    },
});

//make this component available to the app
export default OTP;
