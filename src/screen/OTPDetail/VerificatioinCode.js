// //import liraries
// import React, {Component, useState} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import HeaderCompo from '../../component/HeaderCompo';
// import TextInputWithLabel from '../../component/TextInputWithLabel';
// import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
// import UserIcon from '../../../assets/image/userPNG.png';
// import ClockPNG from '../../../assets/image/phonePNG.png';

// import NavString from '../../utils/navString/NavString';
// import {FontName} from '../../theme/FontName';
// import CustomButton from '../../component/CustomButton';
// import {BLACK, PRIMARY_COLOR, WHITE} from '../../theme/AppColor';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import * as yup from 'yup';
// import {Formik} from 'formik';
// import {ShowToast} from '../../utils/constant/Constant';
// import ErrorMessage from '../../component/ErrorMessage';
// import {PUNCH_IN, VISITOR_TYPE} from '../../sevices/ApiEndPoint';
// import useApiEffect from '../../hooks/useApiEffect';
// import AppLoader from '../../utils/appLoader/AppLoader';
// import {useDispatch, useSelector} from 'react-redux';
// import {verificationAction} from '../../redux/slices/verificationSlice';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {BottomSheet} from 'react-native-btr';
// import {Image} from 'react-native-svg';
// import ClosePNG from '../../../assets/image/close.png';
// import FilterItem from './FilterItem';

// // create a component
// const VerificatioinCode = ({navigation}) => {
//   const [visitorPurposeArr, setVisitorPurposeArr] = useState([]);
//   const dispatch = useDispatch();
//   const {makeApiRequest, loading} = useApiEffect();
//   const [userName, setUserName] = useState('');
//   const [contact, setcontact] = useState('');
//   const [visible, setVisible] = useState(false);
//   const locationId = useSelector(
//     state => state?.auth?.loginUser?.data?.guard?.location_id,
//   );

//   const verificationHandel = () => {
//     if (userName === '') {
//       ShowToast('Please enter name');
//     } else if (contact === '') {
//       ShowToast('Please enter contact number');
//     } else if (contact.length != 10) {
//       ShowToast('Contact number should be 10 digit ');
//     } else {
//       verificationAPI();
//     }
//   };

//   const verificationAPI = async () => {
//     const body = {
//       name: userName,
//       contact_number: contact,
//       location_id: locationId + '',
//     };
//     const apiData = await makeApiRequest({
//       url: PUNCH_IN,
//       method: 'POST',
//       isToken: true,
//       data: body,
//       showProgress: true,
//     });

//     if (apiData != undefined) {
//       if (apiData?.status == true) {
//         dispatch(verificationAction(apiData));
//         ShowToast(apiData?.message);
//         navigation.navigate(NavString.Otp);
//       } else {
//         ShowToast(apiData?.message);
//       }
//     } else ShowToast('Something went wrong! Please try after some time');
//   };

//   const onChangeNameText = text => {
//     setUserName(text);
//   };
//   const onChangeContactText = text => {
//     setcontact(text);
//   };

//   function onPressModel(type) {
//     // if (type === 0) {
//     //   setVisible(true);
//     //   setModalType('Visitor Type');
//     // } else if (type === 1) {
//     //   setVisible(true);
//     //   setModalType('Select Visit purpose');
//     // } else if (type === 2) {
//     //   setAppointvisible(true);
//     // } else if (type === 3) {
//     //   setVisible(false);
//     //   setPlaceVisible(true);
//     //   setModalType('Location');
//     // }
//   }

//   return (
//     <View style={styles.container}>
//       <HeaderCompo label={'Visitor Details'} />
//       <KeyboardAwareScrollView
//         showsVerticalScrollIndicator={false}
//         enableOnAndroid>
//         <View>
//           <TextInputWithLabel
//             placeholder="Enter Name"
//             inputStyle={{marginBottom: moderateVerticalScale(20)}}
//             textInputStyle={{marginRight: 10}}
//             leftIcon={UserIcon}
//             onChangeText={name => onChangeNameText(name)}
//             value={userName}
//           />

//           <TextInputWithLabel
//             placeholder="Enter Contact Number"
//             inputStyle={{marginBottom: moderateVerticalScale(20)}}
//             textInputStyle={{marginRight: 10}}
//             leftIcon={ClockPNG}
//             onChangeText={contact => onChangeContactText(contact)}
//             maxLength={10}
//             maxlength="10"
//             keyboardType="number-pad"
//             value={contact}
//           />

//           <CustomButton
//             title={'Send Verification Code'}
//             textStyle={{
//               fontSize: 16,
//               fontWeight: '500',
//               fontFamily: FontName.Gordita_Regular,
//             }}
//             style={{
//               backgroundColor: BLACK,
//               borderRadius: 8,
//               width: widthPercentageToDP(95),
//               height: heightPercentageToDP(5),
//               maringHorizontal: 20,
//             }}
//             onPress={() => verificationHandel()}
//           />
//         </View>
//         <View style={styles.container}>
//           <BottomSheet
//             visible={visible}
//             onBackButtonPress={onPressModel}
//             onBackdropPress={onPressModel}>
//             <View
//               style={{
//                 maxHeight: '90%',
//                 height: 'auto',
//                 backgroundColor: WHITE,
//                 borderTopLeftRadius: 38,
//                 borderTopRightRadius: 38,
//               }}>
//               <View style={styles.bottomSheetHeader}>
//                 <Text style={styles.header}>Visitor Type</Text>
//                 <TouchableOpacity style={styles.close} onPress={onCancelModal}>
//                   <Image
//                     source={ClosePNG}
//                     style={{
//                       height: moderateScale(28),
//                       width: moderateScale(28),
//                       marginRight: 10,
//                       tintColor: 'black',
//                     }}
//                   />
//                 </TouchableOpacity>
//               </View>

//               <View style={{flexDirection: 'row', flexWrap: 'wrap'}}></View>
//               {/* <CustomButton
//               title={'Apply'}
//               style={[styles.applyButton, {marginTop: 30}]}
//               onPress={applyFilterValue}
//             /> */}
//             </View>
//           </BottomSheet>
//         </View>
//       </KeyboardAwareScrollView>
//       <AppLoader isLoading={loading} />
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default VerificatioinCode;

//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
} from 'react-native';
import HeaderCompo from '../../component/HeaderCompo';
import TextInputWithLabel from '../../component/TextInputWithLabel';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import UserIcon from '../../../assets/image/userPNG.png';
import ClockPNG from '../../../assets/image/phonePNG.png';

import NavString from '../../utils/navString/NavString';
import {FontName} from '../../theme/FontName';
import CustomButton from '../../component/CustomButton';
import {BLACK, PRIMARY_COLOR} from '../../theme/AppColor';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ShowToast} from '../../utils/constant/Constant';
import ErrorMessage from '../../component/ErrorMessage';
import {PUNCH_IN, VISITOR_TYPE} from '../../sevices/ApiEndPoint';
import useApiEffect from '../../hooks/useApiEffect';
import AppLoader from '../../utils/appLoader/AppLoader';
import {useDispatch, useSelector} from 'react-redux';
import {verificationAction} from '../../redux/slices/verificationSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TouchableTextField from '../../component/TouchableTextField';
import DropDwonPNG from '../../../assets/image/dropDwonPNG.png';
import AlertDialog from '../../component/AlertDialog';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import unchecked from '../../../assets/image/unchecked.png';
import checkbox from '../../../assets/image/checkbox.png';
import DeletePNG from '../../../assets/image/deletePNG.png';
import OTP from '../OTP/OTP';
// import Icon from 'react-native-vector-icons/Ionicons'; // Using Ionicons for the checkmark icon

// create a component
const VerificatioinCode = ({navigation}) => {
  const dispatch = useDispatch();
  const {makeApiRequest, loading} = useApiEffect();
  const [userName, setUserName] = useState('');
  const [contact, setcontact] = useState('');
  const [modalType, setModalType] = useState('');
  const locationId = useSelector(
    state => state?.auth?.loginUser?.data?.guard?.location_id,
  );
  const [userImg, setUserImg] = useState('');
  const [userIdImg, setuserIdImg] = useState('');
  const [checked, setChecked] = useState(false); // Initial state
  const [submit, setSubmit] = useState(false); // Initial state
  // const imgType = 0;
  const verificationHandel = () => {
    if (userName === '') {
      ShowToast('Please enter name');
    } else if (contact === '') {
      ShowToast('Please enter contact number');
    } else if (contact.length != 10) {
      ShowToast('Contact number should be 10 digit ');
    } else {
      verificationAPI();
    }
    setSubmit(true);
  };

  const verificationAPI = async () => {
    const body = {
      name: userName,
      contact_number: contact,
      location_id: locationId + '',
    };
    const apiData = await makeApiRequest({
      url: PUNCH_IN,
      method: 'POST',
      isToken: true,
      data: body,
      showProgress: true,
    });

    if (apiData != undefined) {
      if (apiData?.status == true) {
        dispatch(verificationAction(apiData));
        ShowToast(apiData?.message);
        navigation.navigate(NavString.Otp);
      } else {
        ShowToast(apiData?.message);
      }
    } else ShowToast('Something went wrong! Please try after some time');
  };

  const onChangeNameText = text => {
    setUserName(text);
  };
  const onChangeContactText = text => {
    setcontact(text);
  };
  onPressDeleteImg = type => {
    if (type == 0) {
      setuserIdImg('');
    } else {
      setUserImg('');
    }
  };
  const requestCameraPermission = async imgType => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Enviro App Camera Permission',
          message:
            'Enviro App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted) {
        onUpdateImagePress(imgType);
      } else if (granted == 'never_ask_again') {
        Alert.alert(
          'Permission Denied',
          'Camera permission is denied. Please enable from device setting',
          [
            {
              text: 'Enbale',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
    } catch (err) {
      console.log('-- ', err);
    }
  };

  const onUpdateImagePress = imgType =>
    AlertDialog('Select Image', 'Please Select Type', [
      {
        onPress: () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
            },
            response => {
              if (response?.didCancel) {
                return;
              }
              console.log('responseDinesh', response);
              if (imgType == 0) {
                setuserIdImg(response);
              } else {
                setUserImg(response);
              }
            },
          );
        },
        label: 'Pick From Gallery',
      },
      {
        onPress: () => {
          launchCamera(
            {
              selectionLimit: 0,
              mediaType: 'photo',
            },
            response => {
              if (response?.errorCode == 'others') {
                ShowToast(
                  'Camera permission denied. Please enable from device setting.',
                );
              }
              if (response?.didCancel) {
                return;
              }
              // setUserImg(response);
              if (imgType == 0) {
                setuserIdImg(response);
              } else {
                setUserImg(response);
              }
            },
          );
        },
        label: 'Capture From Camera',
      },
    ]);

  const CustomCheckbox = () => {
    const [checked, setChecked] = useState(false);
    // }// Checkbox state

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 8,
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => setChecked(!checked)} // Toggle checkbox
        >
          {checked == false ? (
            <Image source={unchecked} style={{height: 25, width: 25}} />
          ) : (
            <Image source={checkbox} style={{height: 25, width: 25}} />
          )}
          {/* Checkmark icon */}
          <Text style={styles.label}>{'Terms and Conditions'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {submit ? (
        <OTP />
      ) : (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid>
          <View>
            <TextInputWithLabel
              label="Mobile Number"
              placeholder="Enter Name"
              inputStyle={{marginBottom: moderateVerticalScale(20)}}
              textInputStyle={{marginRight: 10}}
              // leftIcon={UserIcon}
              onChangeText={name => onChangeNameText(name)}
              value={userName}
            />

            <TextInputWithLabel
              label="Enter Your Name"
              placeholder="Enter Name"
              inputStyle={{marginBottom: moderateVerticalScale(20)}}
              textInputStyle={{marginRight: 10}}
              // leftIcon={ClockPNG}
              onChangeText={contact => onChangeContactText(contact)}
              // maxLength={10}
              // maxlength="10"
              keyboardType="number-pad"
              value={contact}
            />
            <TextInputWithLabel
              label="From Company"
              placeholder="Enter Company"
              inputStyle={{marginBottom: moderateVerticalScale(20)}}
              textInputStyle={{marginRight: 10}}
              // leftIcon={ClockPNG}
              onChangeText={contact => onChangeContactText(contact)}
              // maxLength={10}
              // maxlength="10"
              // keyboardType="number-pad"
              value={contact}
            />
            <TextInputWithLabel
              label="Whom to Meet"
              placeholder="Enter"
              inputStyle={{marginBottom: moderateVerticalScale(20)}}
              textInputStyle={{marginRight: 10}}
              // leftIcon={ClockPNG}
              onChangeText={contact => onChangeContactText(contact)}
              // maxLength={10}
              // maxlength="10"
              // keyboardType="number-pad"
              value={contact}
            />

            <View>
              <View style={{paddingLeft: 10, paddingBottom: 5}}>
                <Text>
                  <Text>Purpose of visit</Text>
                  <Text style={{color: 'red'}}>*</Text>
                </Text>
              </View>
              <TouchableTextField
                // onPressTextFiled={() => onPressModel(0)}
                inputStyle={{
                  marginBottom: moderateVerticalScale(20),
                  marginTop: 5,
                }}
                textInputStyle={{marginRight: 10}}
                rightIcon={DropDwonPNG}
                value={''}
                placeholder={'Select Visitor Type'}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                // flex: 1,
              }}>
              {userIdImg != '' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: moderateVerticalScale(20),
                    borderWidth: 1,
                    borderColor: '#D9D9D9',
                    height: 66,
                    marginRight: 3,
                    marginLeft: 10,
                    // backgroundColor: 'red',
                    flex: 1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,

                      // width: '50%',
                    }}>
                    <Image
                      source={{uri: userIdImg.assets?.[0]?.uri}}
                      style={{
                        height: moderateScale(40),
                        width: moderateScale(40),
                        marginRight: 10,
                        marginLeft: 10,
                        alignSelf: 'center',
                        resizeMode: 'stretch',
                      }}
                    />
                    <Text
                      numberOfLines={2}
                      style={{
                        color: '#1890FF',
                        fontWeight: '400',
                        fontSize: 14,
                        flex: 1,
                        fontFamily: FontName.Gordita_Regular,
                      }}>
                      {userIdImg.assets?.[0]?.fileName.slice(2, 20) + '.png'}
                    </Text>
                    <TouchableOpacity
                      style={{justifyContent: 'center'}}
                      onPress={() => onPressDeleteImg(0)}>
                      <Image
                        source={DeletePNG}
                        style={{
                          height: moderateScale(20),
                          width: moderateScale(20),
                          marginRight: 10,
                          marginLeft: 10,
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginBottom: 20,
                    paddingLeft: 8,
                    flex: 1,
                  }}
                  onPress={() => requestCameraPermission(0)}>
                  <Text style={{color: '#000000D9'}}>Click Here</Text>
                </TouchableOpacity>
              )}

              {userImg != '' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: '#D9D9D9',
                    height: 66,
                    flex: 1,
                    marginLeft: 3,
                    marginRight: 10,
                    // backgroundColor: 'green',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                      // width: '50%',
                    }}>
                    <Image
                      source={{uri: userImg.assets?.[0]?.uri}}
                      style={{
                        height: moderateScale(40),
                        width: moderateScale(40),
                        marginRight: 10,
                        marginLeft: 10,
                        alignSelf: 'center',
                        resizeMode: 'stretch',
                      }}
                    />
                    <Text
                      style={{
                        color: '#1890FF',
                        fontWeight: '400',
                        fontSize: 14,
                        fontFamily: FontName.Gordita_Regular,
                        flex: 1,
                      }}>
                      {userImg.assets?.[0]?.fileName.slice(2, 20) + '.png'}
                    </Text>
                    <TouchableOpacity
                      style={{justifyContent: 'center'}}
                      onPress={() => onPressDeleteImg(1)}>
                      <Image
                        source={DeletePNG}
                        style={{
                          height: moderateScale(20),
                          width: moderateScale(20),
                          marginRight: 10,
                          marginLeft: 10,
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginBottom: 20,
                    paddingLeft: 8,
                    alignItems: 'center',
                    flex: 1,
                    marginTop: 0,
                  }}
                  onPress={() => requestCameraPermission(1)}>
                  <Text style={{color: '#000000D9'}}>Click Here</Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              <View style={{paddingLeft: 10, paddingBottom: 5}}>
                <Text>
                  <Text>No of Additional Guests</Text>
                </Text>
              </View>

              <TouchableTextField
                // onPressTextFiled={() => onPressModel(0)}
                inputStyle={{
                  marginBottom: moderateVerticalScale(20),
                  marginTop: 5,
                }}
                textInputStyle={{marginRight: 10}}
                rightIcon={DropDwonPNG}
                value={''}
                placeholder={'Select'}
              />
            </View>
            {/*  */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 8,
                marginBottom: 20,
              }}>
              <View style={{flex: 1, marginRight: 10.5}}>
                <Text style={{bottom: 5}}>Name</Text>
                <TextInput
                  placeholder="Enter "
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 4,
                    borderColor: '#D9D9D9',
                    // marginHorizontal: moderateScale(8),
                  }}></TextInput>
              </View>
              <View style={{flex: 1, marginLeft: 10.5}}>
                <Text style={{bottom: 5}}>Mobile Number</Text>
                <TextInput
                  placeholder="Enter "
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 4,
                    borderColor: '#D9D9D9',
                    // marginHorizontal: moderateScale(8),
                  }}></TextInput>
              </View>
            </View>
            <CustomCheckbox />
            <CustomButton
              title={'Submit '}
              textStyle={{
                fontSize: 16,
                fontWeight: '500',
                fontFamily: FontName.Gordita_Regular,
              }}
              style={{
                backgroundColor: BLACK,
                borderRadius: 8,
                width: widthPercentageToDP(95),
                height: heightPercentageToDP(5),
                maringHorizontal: 20,
                marginBottom: 20,
              }}
              onPress={() => verificationHandel()}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
      {/* <HeaderCompo label={'Visitor Details'} /> */}

      <AppLoader isLoading={loading} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    fontSize: 16,
  },
});

export default VerificatioinCode;
