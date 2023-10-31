//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderCompo from '../../component/HeaderCompo';
import TextInputWithLabel from '../../component/TextInputWithLabel';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import UserIcon from '../../../assets/images/PNG/userPNG.png'
import ClockPNG from '../../../assets/images/PNG/clockPNG.png'

import NavString from '../../utils/navString/NavString';
import { FontName } from '../../theme/FontName';
import CustomButton from '../../component/CustomButton';
import { BLACK, PRIMARY_COLOR } from '../../theme/AppColor';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import * as yup from 'yup';
import { Formik } from "formik"
import { ShowToast } from '../../utils/constant/Constant';
import ErrorMessage from '../../component/ErrorMessage';
import { PUNCH_IN, VISITOR_TYPE } from '../../sevices/ApiEndPoint';
import useApiEffect from '../../hooks/useApiEffect';
import AppLoader from '../../utils/appLoader/AppLoader';
import { useDispatch } from 'react-redux';
import { verificationAction } from '../../redux/slices/verificationSlice'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// create a component
const VerificatioinCode = ({ navigation }) => {
    const dispatch = useDispatch()
    const { makeApiRequest, loading } = useApiEffect()
    const [userName, setUserName] = useState('')
    const [contact, setcontact] = useState('')
    const initialValue = {
        name: '',
        contact: '',
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        contact: yup.string().required('Contact number is requried')
    });

    const verificationHandel = () => {

        if (userName === '') {
            ShowToast('Please enter name')
        } else if (contact === '') {
            ShowToast('Please enter contact number')
        } else {
            verificationAPI()
        }
    }

    const verificationAPI = async () => {
        const body = {
            name: userName,
            contact_number: contact,

        }
        const apiData = await makeApiRequest({ url: PUNCH_IN, method: 'POST', isToken: false, data: body, showProgress: true });
        if (apiData?.status == true) {
            dispatch(verificationAction(apiData))
            navigation.navigate(NavString.Otp)

        }
    }

    const onChangeNameText = (text) => {
        setUserName(text)
    }
    const onChangeContactText = (text) => {
        setcontact(text)
    }

    return (
        <View style={styles.container}>
            <HeaderCompo label={'OTP Details'} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>

                <View>

                    <TextInputWithLabel
                        placeholder='Enter Name'
                        inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                        textInputStyle={{ marginRight: 10 }}
                        leftIcon={UserIcon}
                        onChangeText={(name) => onChangeNameText(name)}
                        value={userName}
                    />

                    <TextInputWithLabel
                        placeholder='Enter Contact Number'
                        inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                        textInputStyle={{ marginRight: 10 }}

                        leftIcon={ClockPNG}
                        onChangeText={(contact) => onChangeContactText(contact)}
                        maxLength={10}
                        maxlength="10"
                        keyboardType="number-pad"
                        value={contact}
                    />

                    <CustomButton
                        title={'Send Verification Code'}
                        textStyle={{ fontSize: 16, fontWeight: '500', fontFamily: FontName.Gordita_Regular }}
                        style={{
                            backgroundColor: BLACK,
                            borderRadius: 8,
                            width: widthPercentageToDP(95),
                            height: heightPercentageToDP(5),
                            maringHorizontal: 20

                        }}
                        onPress={() => verificationHandel()}
                    />
                </View>


            </KeyboardAwareScrollView>
            <AppLoader isLoading={loading} />
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
