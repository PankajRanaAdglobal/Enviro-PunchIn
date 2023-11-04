//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AppLogo from '../../../assets/image/svg/AppLogo.svg';
import AssetImage from '../../utils/assetsImages/AssetImage';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import CustomText from '../../component/CustomText';
import TextInputWithLabel from '../../component/TextInputWithLabel';
import UserIcon from '../../../assets/image/userPNG.png'
import ClockPNG from '../../../assets/image/phonePNG.png'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import CustomButton from '../../component/CustomButton';
import { FontName } from '../../theme/FontName';
import { BLACK } from '../../theme/AppColor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useApiEffect from '../../hooks/useApiEffect';
import AppLoader from '../../utils/appLoader/AppLoader';
import { useDispatch, useSelector } from 'react-redux';
import NavString from '../../utils/navString/NavString';
import { ShowToast } from '../../utils/constant/Constant';
import { GAURD_PUNCH_IN, PUNCH_IN } from '../../sevices/ApiEndPoint';
// import { useDispatch } from 'react-redux';
import { isLoggedIn } from '../../redux/slices/AuthSlice'

// create a component

const GaurdsLogin = ({ navigation }) => {

    const dispatch = useDispatch()
    const { makeApiRequest, loading } = useApiEffect()
    const [empID, setEmpID] = useState('')
    const [password, setPassword] = useState('')



    const verificationHandel = () => {
        if (empID === '') {
            ShowToast('Please enter name')
        } else if (password === '') {
            ShowToast('Please enter contact number')
        } else {
            gaurdLoginAPI()
        }
    }


    const gaurdLoginAPI = async () => {
        const body = {
            employee_id: empID,
            password: password,

        }
        const apiData = await makeApiRequest({ url: GAURD_PUNCH_IN, method: 'POST', isToken: false, data: body });

        if (apiData?.status == true) {
            dispatch(isLoggedIn(true))
            ShowToast(apiData?.message)
            navigation.navigate(NavString.LOGIN)

        } else {

            ShowToast('Please check credentials')
        }
    }


    return (
        // <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
        //     <View style={{ marginVertical: moderateScale(20) }}>
        <View style={styles.container}>

            <View style={{ alignItems: 'center' }}>
                <AppLogo width={150} height={80} marginTop={moderateScale(100)} />
                <CustomText children={'Welcome'} fontSize={20} fontWeight={'700'} style={{ marginTop: moderateScale(20) }} />
                <CustomText children={'Login your account to continue'}
                    fontSize={14} fontWeight={'400'}
                    style={{
                        marginTop: moderateScale(5),
                        color: '#000000A6', marginBottom: moderateScale(20)

                    }}
                />
            </View>

            <TextInputWithLabel
                placeholder='Empployee Id'
                inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                textInputStyle={{ marginRight: 10 }}
                leftIcon={UserIcon}
                onChangeText={(text) => setEmpID(text)}
                value={empID}
            />
            <TextInputWithLabel
                placeholder='Password'
                inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                textInputStyle={{ marginRight: 10 }}
                leftIcon={ClockPNG}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <CustomButton
                title={'Login'}
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
            <AppLoader isLoading={loading} />
        </View>

        //     </View>

        // </KeyboardAwareScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    topRightImageStyle: { alignSelf: 'flex-end', position: 'absolute', right: -15 },
});

//make this component available to the app
export default GaurdsLogin;
