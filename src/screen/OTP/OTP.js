//import liraries
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Keyboard } from 'react-native';
import useApiEffect from '../../hooks/useApiEffect';
import AppLoader from '../../utils/appLoader/AppLoader';
import PropTypes from 'prop-types';
import OTPInput from './OTPInput';
import { ButtonContainer, ButtonText } from "./styles";

import { BLACK, PRIMARY_COLOR } from '../../theme/AppColor';
import HeaderCompo from '../../component/HeaderCompo';
import { moderateScale } from 'react-native-size-matters';
import NavString from '../../utils/navString/NavString';
import CustomButton from '../../component/CustomButton';
import { FontName } from '../../theme/FontName';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { ShowToast } from '../../utils/constant/Constant';
import { OTP_VERIFY, PUNCH_IN } from '../../sevices/ApiEndPoint';
import { useSelector, useDispatch } from 'react-redux';

// create a component
const OTP = ({ navigation }) => {
    const loginId = useSelector((state) => state.verification.verificationData.data.id)
    const { makeApiRequest, loading } = useApiEffect()
    const [otpCode, setOTPCode] = useState("");
    const [isPinReady, setIsPinReady] = useState(false);
    const maximumCodeLength = 4;
    useEffect(() => {
        if (otpCode.length == maximumCodeLength) {
            Keyboard.dismiss()
        }
    });

    const verifyOtp = () => {

        if (otpCode.length != maximumCodeLength) {
            ShowToast('Please enter OTP.')
        } else {
            otpAPI()
            // navigation.navigate(NavString.DETAIL)
        }

    }

    const otpAPI = async () => {
        const body = {
            otp: otpCode,
            id: loginId,

        }
        const apiData = await makeApiRequest({ url: OTP_VERIFY, method: 'POST', isToken: false, data: body, showProgress: true });


        if (apiData?.status == true) {


            navigation.navigate(NavString.DETAIL)
            ShowToast(apiData?.message)
        } else {
            if (apiData?.eventerror === true) {
                // ShowToast('Token expire SignIn again')
                // isFirstTime = false
                // signOut()

                console.warn("apiData1", apiData);
            } else {
                // setIsHomeRedirect(false)
                // setRoomBookMsg(apiData?.message)
                // setIsToast(true)
                ShowToast(apiData?.message)

            }

        }
    }
    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View >
                {console.log(loginId)}
                <HeaderCompo label={'OTP Details'} headerStyl={{}} />
                <Text style={{ fontSize: 16, fontWeight: '500', alignSelf: 'center', marginTop: 0, marginBottom: moderateScale(28) }}>Please enter verification Code</Text>

                <OTPInput
                    code={otpCode}
                    setCode={setOTPCode}
                    maximumLength={maximumCodeLength}
                    setIsPinReady={setIsPinReady}

                />
                <CustomButton
                    disabled={false}
                    title={'Send Verification Code'}
                    textStyle={{ fontSize: 16, fontWeight: '500', fontFamily: FontName.Gordita_Regular }}
                    style={{
                        backgroundColor: !isPinReady ? "#414a4c" : BLACK,
                        borderRadius: 8,
                        width: widthPercentageToDP(95),
                        height: heightPercentageToDP(5),
                        marginTop: 50


                    }}
                    onPress={() => verifyOtp()}
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
