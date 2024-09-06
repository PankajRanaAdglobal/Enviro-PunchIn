//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import useApiEffect from '../../hooks/useApiEffect';
import AppLoader from '../../utils/appLoader/AppLoader';
import PropTypes from 'prop-types';
import OTPInput from './OTPInput';
import {ButtonContainer, ButtonText} from './styles';

import {BLACK, PRIMARY_COLOR} from '../../theme/AppColor';

import HeaderCompo from '../../component/HeaderCompo';
import {moderateScale} from 'react-native-size-matters';
import NavString from '../../utils/navString/NavString';
import CustomButton from '../../component/CustomButton';
import {FontName} from '../../theme/FontName';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ShowToast} from '../../utils/constant/Constant';
import {OTP_VERIFY, PUNCH_IN} from '../../sevices/ApiEndPoint';
import {useSelector, useDispatch} from 'react-redux';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// create a component
const OTP = ({navigation}) => {
  const loginId = useSelector(
    state => state.verification.verificationData.data.id,
  );
  const {makeApiRequest, loading} = useApiEffect();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 6;
  useEffect(() => {
    if (otpCode.length == maximumCodeLength) {
      Keyboard.dismiss();
    }
  });

  const verifyOtp = () => {
    if (otpCode.length != maximumCodeLength) {
      ShowToast('Please enter OTP.');
    } else {
      otpAPI();
      // navigation.navigate(NavString.DETAIL)
    }
  };

  const otpAPI = async () => {
    const body = {
      otp: otpCode,
      id: loginId,
    };
    const apiData = await makeApiRequest({
      url: OTP_VERIFY,
      method: 'POST',
      isToken: true,
      data: body,
      showProgress: true,
    });

    if (apiData?.status == true) {
      navigation.navigate(NavString.DETAIL);
      ShowToast(apiData?.message);
    } else {
      if (apiData?.eventerror === true) {
        // ShowToast('Token expire SignIn again')
        // isFirstTime = false
        // signOut()
      } else {
        // setIsHomeRedirect(false)
        // setRoomBookMsg(apiData?.message)
        // setIsToast(true)
        ShowToast(apiData?.message);
      }
    }
  };

  const DeshboardUI = () => {
    return (
      <View
        style={{
          //   flex: 1,
          margin: 10,
        }}>
        <View
          style={{
            height: 180,
            backgroundColor: 'white',
            borderRadius: 3,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            marginBottom: 10,
            elevation: 0.5,
          }}>
          <View
            style={{
              padding: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 65,
                  width: 65,
                  backgroundColor: 'white',
                  borderRadius: 32.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  //   backgroundColor: 'red',
                }}>
                <Image
                  source={require('../../../assets/image/userImgPNG.png')} // Path to the local image
                  style={{
                    height: 65,
                    width: 65,
                    borderRadius: 32.5,
                    backgroundColor: 'red',
                  }}
                />
              </View>
              {/* View for userDetails */}
              <View style={{paddingLeft: 12}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: FontName.Gordita_Medium,
                    paddingVertical: 2,
                  }}>
                  Lovekush Kumar
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#00000099',
                    fontFamily: FontName.Gordita_Regular,
                    paddingVertical: 2,
                  }}>
                  8364729927
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#000000',
                    fontFamily: FontName.Gordita_Regular,
                    paddingVertical: 2,
                  }}>
                  Hakuhodo
                </Text>
              </View>
            </View>
            {/* image */}
            <View
              style={{
                height: 65,
                width: 65,
                backgroundColor: 'white',
                borderRadius: 32.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'black',
                  width: 50,
                  alignItems: 'center',
                  borderRadius: 3,
                }}>
                <Text style={{color: 'white'}}>03:00</Text>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 20, marginRight: 20}}>
                <Text style={{color: 'black', fontSize: 10, paddingRight: 3}}>
                  Status:
                </Text>
                <Text style={{color: '#E3B231', fontSize: 10}}>Pending</Text>
              </View>
              {/* <ExitSvg /> */}
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#00000014',
              marginHorizontal: 10,
            }}></View>
          <TouchableOpacity
            style={{
              height: 31,
              borderWidth: 1,
              borderRadius: 3,
              borderColor: 'black',
              justifyContent: 'center',
              marginHorizontal: 10,
              marginTop: 20,
              paddingLeft: 8,
              alignItems: 'center',
            }}
            // onPress={() => requestCameraPermission(0)}
          >
            <Text style={{color: '#000000D9'}}>Re-Send Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <View>
          {console.log(loginId)}
          {/* <HeaderCompo label={'OTP Details'} headerStyl={{}} /> */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              alignSelf: 'center',
              marginTop: 0,
              marginBottom: moderateScale(28),
              color: BLACK,
            }}>
            Please enter verification Code
          </Text>

          <OTPInput
            code={otpCode}
            setCode={setOTPCode}
            maximumLength={maximumCodeLength}
            setIsPinReady={setIsPinReady}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              // backgroundColor: 'red',
              height: 50,
              alignItems: 'center',
              marginTop: 15,
              marginBottom: 20,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity>
              <Text>Re-Send OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => verifyOtp()}>
              <Text style={{color: '#E49273'}}>Verify OTP</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{alignSelf: 'center', fontSize: 16, color: '#0B0A0A'}}>
              Entry Approval
            </Text>
            <DeshboardUI />
          </View>
        </View>
      </View>
      <View
        style={{
          // backgroundColor: 'red',
          height: 120,
        }}>
        <CustomButton title={'Approve Entry'} style={{marginVertical: 5}} />
        <CustomButton
          title={'Reject Entry'}
          textStyle={{color: 'black'}}
          style={{backgroundColor: 'white', borderWidth: 1}}
        />
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
    backgroundColor: '#FAFCFD',
    marginTop: 48,
  },
});

//make this component available to the app
export default OTP;
