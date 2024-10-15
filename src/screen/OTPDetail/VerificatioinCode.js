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
import React, {Component, useEffect, useState} from 'react';
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
  FlatList,
} from 'react-native';
import HeaderCompo from '../../component/HeaderCompo';
import TextInputWithLabel from '../../component/TextInputWithLabel';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import UserIcon from '../../../assets/image/userPNG.png';
import ClockPNG from '../../../assets/image/phonePNG.png';

import NavString from '../../utils/navString/NavString';
import {FontName} from '../../theme/FontName';
import CustomButton from '../../component/CustomButton';
import {
  BLACK,
  BUTTON_BACKGROUND,
  EXTRA_LIGHT_GREY,
  LIGHTGREY,
  PRIMARY_COLOR,
  WHITE,
} from '../../theme/AppColor';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ShowToast, capitalizeFirstLetter} from '../../utils/constant/Constant';
import ErrorMessage from '../../component/ErrorMessage';
import {
  APPOINTMENT,
  GENERATE_PRESIGNED_URL,
  PUNCH_IN,
  VISITOR_TYPE,
} from '../../sevices/ApiEndPoint';
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
import Scan from '../../../assets/image/svg/scan.svg';
import Camera from '../../../assets/image/svg/camera.svg';
import Trash from '../../../assets/image/svg/trash.svg';
import {appointmentAction} from '../../redux/slices/AppointmentSlice';
import {BottomSheet} from 'react-native-btr';
import FilterItem from './FilterItem';
import {ActivityIndicator} from 'react-native-paper';
import ClosePNG from '../../../assets/image/close.png';
import SearchPNG from '../../../assets/image/searchPNG.png';
import ReactNativeBlobUtil from 'react-native-blob-util';
import axios from 'axios';
import {loginSuccess} from '../../redux/slices/AuthSlice';
import RNPickerSelect from 'react-native-picker-select';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/Ionicons'; // Using Ionicons for the checkmark icon

// create a component

const VisitorPurpose = ({
  visible,
  visitorPurposeArr,
  toggleSelection,
  purposeSelectedItems,
  toggleBottomSheet,
}) => {
  return (
    <View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomSheet}
        onBackdropPress={toggleBottomSheet}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 16}}>
            Select Purpose
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 16,
              // backgroundColor: 'red',
            }}>
            {visitorPurposeArr?.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.1}
                style={{margin: 8}}
                key={index}
                onPress={() => toggleSelection(index)}>
                <FilterItem
                  text={item.name}
                  containerStyle={{
                    backgroundColor:
                      purposeSelectedItems === index ? BLACK : WHITE,
                    borderColor:
                      purposeSelectedItems === index ? BLACK : LIGHTGREY,
                  }}
                  textStyle={{
                    color: purposeSelectedItems === index ? WHITE : BLACK,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};
const GuestDropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View>
      <View style={{paddingLeft: 10, paddingBottom: 5}}>
        <Text>
          <Text>No of Additional Guests</Text>
        </Text>
      </View>
      <View
        style={{
          // position: 'relative',
          borderWidth: 0.5,
          borderRadius: 4,
          borderColor: '#D9D9D9',
          marginHorizontal: moderateScale(8),
          // margin: 50,
        }}>
        <RNPickerSelect
          onValueChange={value => setSelectedValue(value)}
          items={[
            {label: '0', value: '0'},
            {label: '1', value: '1'},
            {label: '2', value: '2'},
            {label: '3', value: '3'},
            {label: '4', value: '4'},
          ]}
          style={{
            inputAndroid: {
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 4,
              backgroundColor: '#fafafa',
            },
            inputIOS: {
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 4,
              backgroundColor: '#fafafa',
            },
          }}
          // Icon={() => {
          //   return (
          //     <Icon
          //       name="md-chevron-down"
          //       size={24}
          //       color="gray"
          //       style={styles.iconStyle}
          //     />
          //   );
          // }}
          placeholder={{
            label: 'Select guests...',
            value: null,
          }}
          value={selectedValue}
        />
      </View>

      {/* <TouchableTextField
        // onPressTextFiled={() => onPressModel(0)}
        inputStyle={{
          marginBottom: moderateVerticalScale(20),
          marginTop: 5,
        }}
        textInputStyle={{marginRight: 10}}
        rightIcon={DropDwonPNG}
        value={''}
        placeholder={'Select'}
      /> */}
    </View>

    // <View style={{margin: 10}}>
    //   <Text style={{fontSize: 16, marginBottom: 8}}>
    //     No Of Additional Guests
    //   </Text>
    //   <RNPickerSelect
    //     onValueChange={value => setSelectedValue(value)}
    //     items={[
    //       {label: '0', value: '0'},
    //       {label: '1', value: '1'},
    //       {label: '2', value: '2'},
    //       {label: '3', value: '3'},
    //       {label: '4', value: '4'},
    //     ]}
    //     style={{
    //       inputAndroid: {
    //         fontSize: 16,
    //         paddingVertical: 12,
    //         paddingHorizontal: 10,
    //         borderWidth: 1,
    //         borderColor: '#ccc',
    //         borderRadius: 4,
    //         backgroundColor: '#fafafa',
    //       },
    //       inputIOS: {
    //         fontSize: 16,
    //         paddingVertical: 12,
    //         paddingHorizontal: 10,
    //         borderWidth: 1,
    //         borderColor: '#ccc',
    //         borderRadius: 4,
    //         backgroundColor: '#fafafa',
    //       },
    //     }}
    //     placeholder={{
    //       label: 'Select guests...',
    //       value: null,
    //     }}
    //     value={selectedValue}
    //   />
    // </View>
  );
};
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
  const [appointvisible, setAppointvisible] = useState(false);
  const [appointmenId, setAppointmentID] = useState('');
  const [appointment, setAppointment] = useState('');
  const [visitorPurposeArr, setVisitorPurposeArr] = useState([]);
  const [purposeSelectedItems, setPurposeSelectedItems] = useState([]);
  const [visitorArr, setVisitorArr] = useState([]);
  const [visitorVisible, setVisitorVisible] = useState(false);
  const [visiterPurposeType, setVisiterPurposeType] = useState('');

  const [scnaIDImg, setScnaIDImg] = useState('');
  const [visitorImg, setVisitorImg] = useState('');

  // const bottomSheetRef = useRef(null);
  // const snapPoints = useMemo(() => ['25%', '50%'], []);
  // const imgType = 0;

  const verificationHandel = () => {
    // if (userName === '') {
    //   ShowToast('Please enter name');
    // } else if (contact === '') {
    //   ShowToast('Please enter contact number');
    // } else if (contact.length != 10) {
    //   ShowToast('Contact number should be 10 digit ');
    // } else {
    //   verificationAPI();
    // }
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

              console.warn('responseDinesh', response.assets[0].fileName);
              if (imgType == 0) {
                setuserIdImg(response);
              } else {
                setUserImg(response);
              }
              setTimeout(() => {
                console.warn('image.fileName', response.assets[0].fileName);
                console.warn('image.type, image.uri', response.assets[0].type);
                console.warn('image.uri', response.assets[0].uri);

                // setCertificateImg(response.assets[0].fileName);
                let size = response.assets[0].fileSize / 1024;
                if (size <= 10) {
                  generatePresignedUrl(
                    response.assets[0].fileName,
                    response.assets[0].type,
                    response.assets[0].uri,
                  );
                } else {
                  ShowToast("File size can't me greater than 5 MB");
                }
              }, 500);
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
              console.warn('fileName');
              setUserImg(response);
              if (imgType == 0) {
                setuserIdImg(response);
              } else {
                setUserImg(response.assets);
              }
              setTimeout(() => {
                console.warn('image.fileName', response.assets[0].fileName);
                console.warn('image.type, image.uri', response.assets[0].type);
                console.warn('image.uri', response.assets[0].uri);

                // setCertificateImg(response.assets[0].fileName);
                let size = response.assets[0].fileSize / 1024;
                if (size <= 10) {
                  generatePresignedUrl(
                    response.assets[0].fileName,
                    response.assets[0].type,
                    response.assets[0].uri,
                  );
                } else {
                  ShowToast("File size can't me greater than 5 MB");
                }
              }, 500);
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
  const selectedFilters = (id, text) => {
    console.log('text-- ', text);
    setAppointvisible(false);
    setAppointmentID(id);
    setAppointment(capitalizeFirstLetter(text));
  };
  const toggleSelection = index => {
    if (purposeSelectedItems === index) {
      setPurposeSelectedItems(null); // Deselect if already selected
    } else {
      setPurposeSelectedItems(index); // Select a new item
      // console.warn(visitorPurposeArr[index]);
    }
    setVisiterPurposeType(visitorPurposeArr[index].name);
  };

  const callAPI = async () => {
    const apiData = await makeApiRequest({
      url: VISITOR_TYPE,
      method: 'GET',
      isToken: true,
    });
    if (apiData != undefined)
      if (apiData?.status == true) {
        // console.warn('dinesh', apiData);
        setVisitorPurposeArr(apiData?.data?.visitorpurpose);
        setVisitorArr(apiData?.data?.visitortype);
        // dispatch(visitorAction(apiData));
      }
  };

  const onCancel = () => {
    setVisitorVisible(false);
  };

  async function generatePresignedUrl(name, type, uri) {
    const nameParts = name.split('.');
    const extension = nameParts.pop();
    const baseName = nameParts.join('.');
    const separator = '_';
    const time = new Date().getTime();
    const uniqueFileName = `${baseName}${separator}${time}.${extension}`;

    const payload = {
      fileName: `MeetingAttachment/${data?._id}/${uniqueFileName}`,
      fileType: type,
    };
    const apiData = await makeApiRequest({
      url: GENERATE_PRESIGNED_URL,
      method: 'POST',
      isToken: true,
      data: payload,
    });
    if (apiData?.url) {
      uploadBinaryFile(uri, apiData.url);
    }
  }

  const uploadBinaryFile = async (uri, preSignedUrl) => {
    setIsLoading(true);
    try {
      let filePath = uri;
      if (Platform.OS == 'ios') {
        filePath = uri.replace('file://', ''); // Remove the 'file://' prefix
      }
      const stat = await ReactNativeBlobUtil.fs.stat(filePath);
      // Read the file as binary (base64 in this case)
      const fileBlob = await ReactNativeBlobUtil.fs.readFile(
        stat.path,
        'base64',
      );
      // Create a Blob from the binary data
      const blob = ReactNativeBlobUtil.base64.encode(fileBlob);
      // Upload the binary file using PUT
      const response = await axios.put(preSignedUrl, blob, {
        headers: {
          'Content-Type': 'application/octet-stream', // Specify binary data
        },
      });
      // setIsLoading(false);
      if (response.status == 200) {
        ShowToast('File uploaded successfully');

        if (imgType == 0) {
          setScnaIDImg(preSignedUrl.split('?')[0]);
        } else {
          setVisitorImg(preSignedUrl.split('?')[0]);
        }

        // loginSuccess('File url => ', preSignedUrl.split('?')[0]);
        // const updatedFileResponse = [...fileResponse, { ...user_detail, file_path: preSignedUrl.split("?")[0] }]
        //LogResponse('updatedFileResponse', updatedFileResponse)
        // setFileResponse(updatedFileResponse)
        // addAttachmentUrl(updatedFileResponse)
      }
    } catch (error) {
      // setIsLoading(false)
      ShowToast(`Error uploading binary file: ${error}`);
      console.error('Error uploading binary file:', error);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

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
            <TouchableOpacity onPress={() => setAppointvisible(true)}>
              <TextInputWithLabel
                editable={false}
                label="Whom to Meet"
                placeholder="Enter"
                inputStyle={{marginBottom: moderateVerticalScale(20)}}
                textInputStyle={{marginRight: 10}}
                // leftIcon={ClockPNG}
                // onChangeText={contact => onChangeContactText(contact)}
                // maxLength={10}
                // maxlength="10"
                // keyboardType="number-pad"
                value={appointment}
              />
            </TouchableOpacity>
            <View>
              <View style={{paddingLeft: 10, paddingBottom: 5}}>
                <Text>
                  <Text>Purpose of visit</Text>
                  <Text style={{color: 'red'}}>*</Text>
                </Text>
              </View>
              <TouchableTextField
                onPressTextFiled={() => setVisitorVisible(true)}
                inputStyle={{
                  marginBottom: moderateVerticalScale(20),
                  marginTop: 5,
                }}
                textInputStyle={{marginRight: 10}}
                rightIcon={DropDwonPNG}
                value={visiterPurposeType}
                placeholder={'Select Visitor Type'}
              />

              {visitorVisible == true ? (
                <VisitorPurpose
                  visible={visitorVisible}
                  visitorPurposeArr={visitorPurposeArr}
                  toggleSelection={toggleSelection}
                  purposeSelectedItems={purposeSelectedItems}
                  toggleBottomSheet={onCancel}
                />
              ) : null}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',

                // flex: 1,
              }}>
              {userIdImg != '' ? (
                <View style={{flex: 1}}>
                  <Text style={{color: '#000000D9', left: 10, bottom: 4}}>
                    Scan ID
                  </Text>
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
                      borderRadius: 3,
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
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
                        style={{justifyContent: 'center', right: 5}}
                        onPress={() => onPressDeleteImg(0)}>
                        <Trash />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{flex: 1}}>
                  <Text style={{color: '#000000D9', left: 10, bottom: 4}}>
                    Scan ID
                  </Text>
                  <TouchableOpacity
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 3,
                      borderColor: 'black',
                      // justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                      marginBottom: 20,
                      paddingLeft: 8,
                      // flex: 1,
                      flexDirection: 'row',
                    }}
                    onPress={() => requestCameraPermission(0)}>
                    <Scan />
                    <Text style={{color: '#000000D9', left: 10}}>
                      Click Here
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* // <View></View> */}
              {userImg != '' ? (
                <View style={{flex: 1}}>
                  <Text style={{color: '#000000D9', left: 10, bottom: 4}}>
                    Visitor's photo
                  </Text>
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
                      marginBottom: moderateVerticalScale(20),
                      borderRadius: 3,
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
                        style={{justifyContent: 'center', right: 5}}
                        onPress={() => onPressDeleteImg(1)}>
                        <Trash />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{flex: 1}}>
                  <Text style={{color: '#000000D9', left: 10}}>
                    visitor's photo
                  </Text>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderRadius: 3,
                      alignItems: 'center',
                      marginHorizontal: 10,
                      marginBottom: 20,
                      paddingLeft: 8,
                      height: 40,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                    onPress={() => requestCameraPermission(1)}>
                    <Camera />
                    <Text style={{color: '#000000D9', left: 10}}>
                      Click Here
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <GuestDropdown />
            {/* <View>
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
            </View> */}
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
          <AppointmentModal
            visible={appointvisible}
            onCancel={() => setAppointvisible(false)}
            onDone={selectedFilters}
          />
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
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: EXTRA_LIGHT_GREY,
    height: moderateScale(50),
    justifyContent: 'center',
    marginBottom: moderateScale(10),
    // margin: 15
  },
});

export default VerificatioinCode;

// Appointment Modal
const AppointmentModal = ({onDone, visible, onCancel}) => {
  const [appointmentSelectedItems, setAppointmentSelectedItems] = useState([]);
  const [visiterType, setVisiterType] = useState('');
  const [searchedName, setSearchedName] = useState('');
  // const [visible, setVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [maxResource, setMaxResource] = useState(0);
  const [bottomLoading, setBottomLoading] = useState(false);
  // const appointmentArr = useSelector((state) => state.appointment.appointmentData)
  const [appointmentArr, setAppointmentArr] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [selectAppointmentValue, setSelectAppointmentValue] = useState(null);
  const {makeApiRequest, loading} = useApiEffect();
  const dispatch = useDispatch();
  // THIS IS THE DATA WE ARE SENDING IN PRECIOUS SCREEN
  const applyFilterValue = () => {
    // setSelectedItems(null);
    // onCancel();
    if (selectedItems !== null) {
      if (selectedItems?.length === 0) {
        ShowToast('Please select appointment');
      } else {
        setSelectAppointmentValue(null);
        setSelectAppointmentValue(null);
        setPage(0);
        setSearchText(null);
        setSelectedItems(null);
        onDone(
          appointmentArr[selectedItems]?.user_id,
          appointmentArr[selectedItems]?.first_name +
            ` ${appointmentArr[selectedItems]?.last_name}` +
            ` (${appointmentArr[selectedItems]?.employee_code})`,
          //  +
          // ` (${appointmentArr[selectedItems].employee_code})`,
        );
      }
    } else {
      ShowToast('Please select an Appointment');
    }
  };

  const toggleSelection = index => {
    if (selectedItems === index) {
      setSelectedItems(null); // Deselect if already selected
      setSelectAppointmentValue(null);
    } else {
      setSelectedItems(index); // Select a new item
      setSelectAppointmentValue(appointmentArr[index].user_id);
    }
  };

  useEffect(() => {
    appointmentAPI(searchText, page, 'useEffect');
  }, [page, searchText, visible]);

  async function appointmentAPI(searchText, page, from) {
    // console.log('FROM======================== ', from, searchText, page);
    const body = {
      pageno: page,
      name: searchText,
    };

    const apiData = await makeApiRequest({
      url: APPOINTMENT,
      method: 'POST',
      isToken: true,
      data: body,
      showProgress: true,
      dbToken: 'agl',
    });

    if (apiData != undefined) {
      if (apiData?.status == true) {
        setAppointmentArr(previousData => {
          const newAppointments = [...previousData, ...apiData?.data?.rows];
          const uniqueAppointments = Array.from(
            new Set(newAppointments.map(JSON.stringify)),
          ).map(JSON.parse);
          return uniqueAppointments;
        });

        // console.log("Item============= ", apiData?.data?.rows),
        // setAppointmentArr(apiData?.data?.rows);

        setMaxResource(apiData.data?.count);
        setBottomLoading(false);
        dispatch(appointmentAction(apiData));
      } else {
        ShowToast(apiData?.message);
      }
    }
  }

  const handleClose = () => {
    setSelectAppointmentValue(null);
    setSelectAppointmentValue(null);
    setPage(0);
    setSearchText(null);
    setSelectedItems(null);
    onCancel();
  };

  const onSearch = text => {
    setAppointmentArr([]);
    setAppointmentArr(prev => []);
    setMaxResource(0);
    setPage(0);
    setSearchText(text);
    // appointmentAPI(text, 0, 'OnSearch');
  };

  // Appointment Popup
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BottomSheet
        visible={visible}
        onBackButtonPress={onCancel}
        onBackdropPress={onCancel}>
        <View
          style={{
            flex: 1,
            backgroundColor: WHITE,
            borderTopLeftRadius: 38,
            borderTopRightRadius: 38,
            marginTop: moderateScale(70),
          }}>
          <View style={styles.bottomSheetHeader}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: FontName.Gordita_Medium,
                fontWeight: '500',
                color: BLACK,
              }}>
              Appointment
            </Text>
            <TouchableOpacity
              style={{
                tintColor: BLACK,
                position: 'absolute',
                right: 30,
                width: heightPercentageToDP(2.8),
                height: heightPercentageToDP(2.8),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleClose}>
              <Image
                source={ClosePNG}
                style={{
                  height: moderateScale(28),
                  width: moderateScale(28),
                  marginRight: 10,
                  tintColor: 'black',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, padding: 10}}>
            <View
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 20,
                paddingHorizontal: 10,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                height: 45,
              }}>
              <TextInput
                style={{
                  marginRight: moderateScale(8),
                  fontFamily: FontName.Gordita_Regular,
                  alignSelf: 'center',
                  fontSize: 15,
                  color: BLACK,
                  height: 40,
                  alignSelf: 'center',
                  width: '90%',
                }}
                placeholder="Search..."
                placeholderTextColor={BLACK}
                onChangeText={text => onSearch(text)}
              />
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  backgroundColor: '#D9D9D9',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 5,
                }}>
                <Image
                  source={SearchPNG}
                  style={{
                    height: moderateScale(17),
                    width: moderateScale(17),
                    borderRadius: 100,
                  }}
                />
              </View>
            </View>
            <FlatList
              contentContainerStyle={{flexGrow: 1}}
              data={appointmentArr}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{margin: 8}}
                  key={index}
                  onPress={() => {
                    toggleSelection(index);
                  }}>
                  <FilterItem
                    text={
                      item.first_name +
                      ` ${item.last_name}` +
                      ` (${item.employee_code})`
                    }
                    // key={index}

                    containerStyle={{
                      backgroundColor: WHITE,
                      // borderColor: selectedItems === index ? ORANGE : LIGHTGREY,
                      borderWidth: 0,
                      alignItems: 'flex-start',
                      height: moderateScale(15),
                    }}
                    textStyle={{
                      color:
                        item.user_id === selectAppointmentValue
                          ? BLACK
                          : '#A09F9E',
                    }}
                  />
                </TouchableOpacity>
              )}
              onEndReached={() => {
                if (!bottomLoading) {
                  if (appointmentArr?.length < maxResource) {
                    setBottomLoading(true);
                    setPage(page + 1);
                  }
                }
              }}
              // onEndReached={onSearch} // Load more data when scrolling to the end
              onEndReachedThreshold={0.1} // Adjust this threshold as needed
              ListFooterComponent={
                <View style={{height: widthPercentageToDP(5)}}>
                  {bottomLoading && (
                    <ActivityIndicator
                      style={{color: BUTTON_BACKGROUND, marginBottom: 10}}
                    />
                  )}
                </View>
              }
            />
          </View>

          <CustomButton
            title={'Apply'}
            style={{
              backgroundColor: BLACK,
              alignSelf: 'center',
              fontSize: 16,
              marginBottom: moderateScale(20),
              height: heightPercentageToDP(5),
            }}
            onPress={applyFilterValue}
          />
        </View>
      </BottomSheet>
    </View>
  );
};
