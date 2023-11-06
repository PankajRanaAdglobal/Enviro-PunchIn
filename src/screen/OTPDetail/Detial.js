//import liraries
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputComponent,
  Image,
  TextInput,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import HeaderCompo from '../../component/HeaderCompo';
import TextInputWithLabel from '../../component/TextInputWithLabel';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import DropDwonPNG from '../../../assets/image/dropDwonPNG.png';
import DeletePNG from '../../../assets/image/deletePNG.png';

import VisitorPNG from '../../../assets/image/visitorPNG.png';
import ConpnayPNG from '../../../assets/image/conpnayPNG.png';
import PurposePNG from '../../../assets/image/purposePNG.png';
import AppointmentPNG from '../../../assets/image/appointmentPNG.png';
import AddharPNG from '../../../assets/image/addharPNG.png';
import BatchPNG from '../../../assets/image/batchPNG.png';
import UserImgPNG from '../../../assets/image/userImgPNG.png';
import CameraPNG from '../../../assets/image/cameraPNG.png';
import SearchPNG from '../../../assets/image/searchPNG.png';
import ClosePNG from '../../../assets/image/close.png';
import LocationPNG from '../../../assets/image/locationPNG.png';
import ClockPNG from '../../../assets/image/clockPNG.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import TouchableTextField from '../../component/TouchableTextField';

import {FontName} from '../../theme/FontName';

import {visitorAction} from '../../redux/slices/VisitorSlice';

import {BottomSheet} from 'react-native-btr';
import {
  BLACK,
  BUTTON_BACKGROUND,
  EXTRA_LIGHT_GREY,
  LIGHTGREY,
  ORANGE,
  PRIMARY_COLOR,
  WHITE,
} from '../../theme/AppColor';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import FilterItem from './FilterItem';
import CustomButton from '../../component/CustomButton';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AlertDialog from '../../component/AlertDialog';
import {
  ShowToast,
  createFormData,
  getCurrentTime,
} from '../../utils/constant/Constant';
import {
  APPOINTMENT,
  VISITOR_PURPOSE,
  VISITOR_TYPE,
  DETAILS,
} from '../../sevices/ApiEndPoint';
import AppLoader from '../../utils/appLoader/AppLoader';
import {useSelector, useDispatch} from 'react-redux';
import useApiEffect from '../../hooks/useApiEffect';
import {appointmentAction} from '../../redux/slices/AppointmentSlice';
import * as yup from 'yup';
import {ErrorMessage, Formik} from 'formik';
import {ActivityIndicator} from 'react-native-paper';
import NavString from '../../utils/navString/NavString';
// create a component
const Detail = ({navigation}) => {
  const dispatch = useDispatch();
  const locationArr = ['Location ', 'Company '];
  const [userImg, setUserImg] = useState('');
  const [visiterType, setVisiterType] = useState('');
  const [addharNumber, setAddharNumber] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [visiterPurposeType, setVisiterPurposeType] = useState('');
  const [locationValue, setLocationValue] = useState('');

  const [appointment, setAppointment] = useState('');
  const [appointmenId, setAppointmentID] = useState('');
  const [visible, setVisible] = useState(false);
  const [placeVisible, setPlaceVisible] = useState(false);
  const [appointvisible, setAppointvisible] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [modalType, setModalType] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [purposeSelectedItems, setPurposeSelectedItems] = useState([]);
  const [location, setLocation] = useState([]);
  const {makeApiRequest, loading} = useApiEffect();
  // const visitorArr = useSelector((state) => state.visitor)
  // const appointmentArr = useSelector((state) => state.appointment.appointmentData)
  // const visitorPurposeArr = useSelector((state) => state.visitor.data.data.visitorpurpose)// visitorArr.data.data.visitortype
  const [visitorPurposeArr, setVisitorPurposeArr] = useState([]);
  const [visitorArr, setVisitorArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Initial page
  const [loadingMore, setLoadingMore] = useState(false); // Loading indicator
  const [hasMore, setHasMore] = useState(true);
  const loginId = useSelector(
    state => state.verification.verificationData.data.id,
  );
  const [validateVisitorType, setValidateVisitorType] = useState(false);
  const [visitorError, setVisitorError] = useState('');
  const [purposeError, setPurposeError] = useState('');
  const [appointmentError, setAppointmentError] = useState('');
  const [adharError, setAdharError] = useState('');
  const [batchError, setBatchError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const aadharRegex = /^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
  const [isValidAadhar, setIsValidAadhar] = useState(false);

  const handleGetTime = () => {
    const now = new Date();
    setCurrentTime(getCurrentTime());
  };
  const requestCameraPermission = async () => {
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
        onUpdateImagePress();
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
  const onUpdateImagePress = () =>
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
              setUserImg(response);
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
              setUserImg(response);
            },
          );
        },
        label: 'Capture From Camera',
      },
    ]);

  const tapOnField = () => {};
  onPressImg = () => {
    setUserImg('d');
  };
  onPressDeleteImg = () => {
    setUserImg('');
  };

  onCancelModal = () => {
    setVisible(false);
  };

  function onPressModel(type) {
    if (type === 0) {
      setVisible(true);
      setModalType('Visitor Type');
    } else if (type === 1) {
      setVisible(true);
      setModalType('Select Visit purpose');
    } else if (type === 2) {
      setAppointvisible(true);
    } else if (type === 3) {
      setVisible(false);
      setPlaceVisible(true);
      setModalType('Location');
    }
  }

  const onCancelGooglePlace = () => {
    setVisible(false);
  };
  const toggleSelection = index => {
    if (modalType === 'Visitor Type') {
      // if (visiterType === 'Vender' || visiterType === 'Client') {
      setLocation('');
      // }
      if (selectedItems === index) {
        setSelectedItems(null); // Deselect if already selected
      } else {
        setSelectedItems(index); // Select a new item
      }
    } else if (modalType === 'Select Visit purpose') {
      if (purposeSelectedItems === index) {
        setPurposeSelectedItems(null); // Deselect if already selected
      } else {
        setPurposeSelectedItems(index); // Select a new item
      }
    }
  };

  const googelPlaceValue = place => {
    setLocation(place);
  };

  const applyFilterValue = () => {
    setVisible(false);
    // setAppointvisible((appointvisible) => !appointvisible);
    if (modalType === 'Visitor Type') {
      setVisiterType(visitorArr[selectedItems].name);
    } else if (modalType === 'Select Visit purpose') {
      setVisiterPurposeType(visitorPurposeArr[purposeSelectedItems].name);
    } else if (modalType === 'Location') {
      setLocationValue(locationArr[location]);
    }
  };
  useEffect(() => {
    const callAPI = async () => {
      const apiData = await makeApiRequest({
        url: VISITOR_TYPE,
        method: 'GET',
        isToken: false,
      });
      // console.log(JSON.stringify(apiData))

      if (apiData?.status == true) {
        setVisitorPurposeArr(apiData?.data?.visitorpurpose);
        setVisitorArr(apiData?.data?.visitortype);
        dispatch(visitorAction(apiData));
      }
    };
    callAPI();
  }, []);

  const handleAadharValidation = text => {
    const formattedAadharNumber = text.replace(/\D/g, '');
    const spacedAadharNumber = formattedAadharNumber.replace(
      /(\d{4})(?=\d)/g,
      '$1 ',
    );
    setAddharNumber(spacedAadharNumber);
    if (aadharRegex.test(text)) {
      setIsValidAadhar(true);
    } else {
      setIsValidAadhar(false);
    }
  };

  async function submitDetailAPI() {
    // navigation.navigate(NavString.Otp)
    // visitor: yup.string().required('Select Visitor Type'),
    // purpose: yup.string().required('Select Visitor purpose'),
    // appointment: yup.string().required('Select Visitor appointment'),
    // card: yup.string().required('Enter Adhar Card number'),
    // batchnumber: yup.string().required('Enter Batch number'),
    // time: yup.string().required('Enter Entry time'),
    // location: yup.string().required('Select Location Type'),

    if (visiterType === '') {
      ShowToast('Select Visitor Type');
    } else if (visiterPurposeType === '') {
      ShowToast('Select Visitor purpose');
    } else if (appointment === '') {
      ShowToast('Select Visitor appointment');
    } else if (addharNumber === '') {
      ShowToast('Enter Adhar Card number');
    } else if (isValidAadhar === false) {
      ShowToast('Enter Valid Aadhar number');
    } else if (batchNumber === '') {
      ShowToast('Enter Batch number');
    } else if (currentTime === '') {
      ShowToast('Enter Entry time');
    } else if (location.length === 0) {
      ShowToast('Select Location Type');
    } else if (userImg === '') {
      ShowToast('Please select photo');
    } else {
      const payload = {
        visiterTypeid: visitorArr[selectedItems].id,
        visitPerposeid: visitorPurposeArr[purposeSelectedItems].id,
        appointmentid: appointmenId,
        adharnumber: addharNumber,
        batchnumber: batchNumber,
        entrytime: currentTime,
        location: location,
        id: loginId,
      };

      //console.log('----.payload', payload);
      const formData = createFormData(
        'photo',
        userImg !== null
          ? JSON.stringify(userImg).includes('https:')
            ? null
            : userImg
          : null,
        payload,
      );

      const apiData = await makeApiRequest({
        url: DETAILS,
        method: 'POST',
        data: formData,
        isImageUpload: true,
      });
      console.log('----.apiData', apiData);
      if (apiData?.status == true) {
        const data = '1';
        ShowToast(apiData?.message);
        navigation.navigate(NavString.EMPLOYE_LIST_HOME, {data});
        // setIsHomeRedirect(true)
        // setRoomBookMsg(apiData?.message)
        // setIsToast(true)
      } else {
        if (apiData?.eventerror === true) {
          // ShowToast('Token expire SignIn again')
          // isFirstTime = false
          // signOut()
        } else {
          ShowToast(apiData?.message);
          // setIsHomeRedirect(false)
          // setRoomBookMsg(apiData?.message)
          // setIsToast(true)
        }
      }
    }
  }

  const selectedFilters = (id, text) => {
    setAppointvisible(false);
    setAppointmentID(id);
    setAppointment(text);
  };

  const initialValue = {
    visitor: '',
    purpose: '',
    appointment: '',
    card: '',
    batchnumber: '',
    time: '',
    location: '',
  };

  const validationSchema = yup.object().shape({
    visitor: yup.string().required('Select Visitor Type'),
    purpose: yup.string().required('Select Visitor purpose'),
    appointment: yup.string().required('Select Visitor appointment'),
    card: yup.string().required('Enter Adhar Card number'),
    batchnumber: yup.string().required('Enter Batch number'),
    time: yup.string().required('Enter Entry time'),
    location: yup.string().required('Select Location Type'),
  });
  return (
    <View style={{flex: 1, backgroundColor: '##FAFCFD'}}>
      <HeaderCompo label={'New Visitor'} />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <View>
          <TouchableTextField
            onPressTextFiled={() => onPressModel(0)}
            inputStyle={{marginBottom: moderateVerticalScale(20)}}
            textInputStyle={{marginRight: 10}}
            rightIcon={DropDwonPNG}
            leftIcon={VisitorPNG}
            value={visiterType}
            placeholder={'Select Visitor Type'}
          />
          {/* {visiterType == '' ? <Text style={{ color: 'red', marginLeft: 10 }}>{visitorError}</Text> : null} */}
          <TouchableTextField
            onPressTextFiled={() => onPressModel(1)}
            inputStyle={{marginBottom: moderateVerticalScale(20)}}
            textInputStyle={{marginRight: 10}}
            rightIcon={DropDwonPNG}
            leftIcon={PurposePNG}
            value={visiterPurposeType}
            placeholder={'Select Visit purpose'}
          />
          {/* {purposeError ? <Text style={{ color: 'red', marginBottom: 10, marginLeft: 10 }}>{purposeError}</Text> : null} */}

          <TouchableTextField
            onPressTextFiled={() => onPressModel(2)}
            inputStyle={{marginBottom: moderateVerticalScale(20)}}
            textInputStyle={{marginRight: 10}}
            rightIcon={DropDwonPNG}
            leftIcon={AppointmentPNG}
            value={appointment}
            placeholder={'Appointment'}
          />

          {visiterType === 'Vender' ||
          visiterType === 'Client' ||
          visiterType === '' ? (
            <TextInputWithLabel
              inputStyle={{marginBottom: moderateVerticalScale(20), flex: 1}}
              textInputStyle={{marginRight: 10}}
              leftIcon={ConpnayPNG}
              maxLength={14}
              placeholder={'Company Name'}
              onChangeText={text => setLocation(text)}
              value={location}
            />
          ) : (
            <TouchableTextField
              onPressTextFiled={() => onPressModel(3)}
              //  onChangeText={() => tapOnField()}
              inputStyle={{marginBottom: moderateVerticalScale(20)}}
              textInputStyle={{marginRight: 10}}
              rightIcon={DropDwonPNG}
              leftIcon={LocationPNG}
              value={location}
              placeholder={'Enter location or company '}
            />
          )}

          {/* {appointmentError ? <Text style={{ color: 'red', marginBottom: 10, marginLeft: 10 }}>{appointmentError}</Text> : null} */}
          <TextInputWithLabel
            inputStyle={{marginBottom: moderateVerticalScale(20), flex: 1}}
            textInputStyle={{marginRight: 10}}
            leftIcon={AddharPNG}
            maxLength={14}
            placeholder={'Enter Addhar card number'}
            onChangeText={text => handleAadharValidation(text)}
            value={addharNumber}
            keyboardType="number-pad"
          />
          {/* {adharError ? <Text style={{ color: 'red', marginBottom: 10, marginLeft: 10 }}>{adharError}</Text> : null} */}

          {/* Batch number start*/}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                borderWidth: 0.5,
                borderRadius: 4,
                borderColor: '#D9D9D9',
                marginHorizontal: moderateScale(8),
                marginBottom: moderateVerticalScale(20),
                flex: 1,
                height: moderateScale(40),
              }}>
              <Image
                source={BatchPNG}
                style={{
                  height: moderateScale(16),
                  width: moderateScale(16),
                  marginRight: 10,
                  marginLeft: 10,
                  alignSelf: 'center',
                }}
              />
              <TextInput
                placeholder="Batch number"
                placeholderTextColor={'#00000059'}
                selectionColor={'black'}
                style={{
                  flex: 1,
                  marginRight: 10,
                }}
                onChangeText={text => setBatchNumber(text)}
                value={batchNumber}
                // keyboardType="number-pad"
              ></TextInput>
            </View>
            <TouchableOpacity
              style={{}}
              onPress={() => requestCameraPermission()}>
              <Image
                source={CameraPNG}
                style={{
                  height: moderateScale(40),
                  width: moderateScale(42),
                  paddingRight: 10,
                  marginRight: moderateScale(10),
                }}
              />
            </TouchableOpacity>
          </View>
          {/* {batchError ? <Text style={{ color: 'red', marginBottom: 10, marginLeft: 10 }}>{batchError}</Text> : null} */}
          {/* Batch number start*/}

          {/* userImage start*/}

          {userImg != '' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: moderateVerticalScale(20),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: userImg.assets?.[0]?.uri}}
                  style={{
                    height: moderateScale(48),
                    width: moderateScale(48),
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
                  }}>
                  {userImg.assets?.[0]?.fileName.slice(2, 20) + '.png'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => onPressDeleteImg()}>
                <Image
                  source={DeletePNG}
                  style={{
                    height: moderateScale(40),
                    width: moderateScale(42),
                    marginRight: 10,
                    marginLeft: 10,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {/* userImage end */}

          <TouchableTextField
            onPressTextFiled={() => handleGetTime()}
            //  onChangeText={() => tapOnField()}
            inputStyle={{marginBottom: moderateVerticalScale(20)}}
            textInputStyle={{marginRight: 10}}
            leftIcon={ClockPNG}
            value={currentTime}
            placeholder={'Enter entry time'}
          />

          {/* {locationError ? <Text style={{ color: 'red', marginBottom: 10, marginLeft: 10 }}>{locationError}</Text> : null} */}
          <CustomButton
            title={'Submit'}
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
            }}
            onPress={() => submitDetailAPI()}
          />
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.container}>
        <BottomSheet
          visible={visible}
          onBackButtonPress={onPressModel}
          onBackdropPress={onPressModel}>
          <View
            style={{
              maxHeight: '90%',
              height: 'auto',
              backgroundColor: WHITE,
              borderTopLeftRadius: 38,
              borderTopRightRadius: 38,
            }}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.header}>{modalType}</Text>
              <TouchableOpacity style={styles.close} onPress={onCancelModal}>
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

            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {modalType === 'Visitor Type'
                ? visitorArr?.map((item, index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{margin: 8}}
                      key={index}
                      onPress={() => toggleSelection(index)}>
                      <FilterItem
                        text={item.name}
                        key={index}
                        containerStyle={{
                          backgroundColor:
                            selectedItems === index ? BLACK : WHITE,
                          borderColor:
                            selectedItems === index ? BLACK : LIGHTGREY,
                        }}
                        textStyle={{
                          color: selectedItems === index ? WHITE : BLACK,
                        }}
                      />
                    </TouchableOpacity>
                  ))
                : modalType === 'Select Visit purpose'
                ? visitorPurposeArr?.map((item, index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{margin: 8}}
                      key={index}
                      onPress={() => {
                        toggleSelection(index);
                      }}>
                      <FilterItem
                        text={item.name}
                        key={index}
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
                  ))
                : null}
            </View>
            <CustomButton
              title={'Apply'}
              style={[styles.applyButton, {marginTop: 30}]}
              onPress={applyFilterValue}
            />
          </View>
        </BottomSheet>

        <GooglePlacesInput
          visible={placeVisible}
          onCancel={() => setPlaceVisible(false)}
          onDonePlace={googelPlaceValue}
        />
        <AppointmentModal
          visible={appointvisible}
          onCancel={() => setAppointvisible(false)}
          onDone={selectedFilters}
        />
      </View>
      <AppLoader isLoading={loading} />
    </View>
  );
};

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
  const [selectAppointmentValue, setSelectAppointmentValue] = useState(null);
  const {makeApiRequest, loading} = useApiEffect();
  const dispatch = useDispatch();
  const applyFilterValue = () => {
    // setSelectedItems(null);
    // onCancel();

    if (selectedItems.length === 0) {
      ShowToast('Please select appointment');
    } else {
      onDone(
        appointmentArr[selectedItems].user_id,
        appointmentArr[selectedItems].first_name +
          ` ${appointmentArr[selectedItems].last_name}` +
          ` (${appointmentArr[selectedItems].employee_code})` +
          ` (${appointmentArr[selectedItems].employee_code})`,
      );
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
    appointmentAPI(page);
  }, [page, visible]);

  async function appointmentAPI(searchText, page) {
    const body = {
      pageno: page,
      name: searchText,
    };

    const apiData = await makeApiRequest({
      url: APPOINTMENT,
      method: 'POST',
      isToken: false,
      data: body,
      showProgress: true,
    });
    if (apiData?.status == true) {
      setAppointmentArr(previousData => {
        return [...previousData, ...apiData?.data?.rows];
      });

      setMaxResource(apiData.data?.count);
      setBottomLoading(false);

      dispatch(appointmentAction(apiData));
    } else {
      console.log('PROFILE API ERROR: ', apiData);
      ShowToast(apiData?.message);
    }
  }

  const onSearch = text => {
    setAppointmentArr([]);
    setAppointmentArr(prev => []);
    setMaxResource(0);
    setPage(0);
    appointmentAPI(text, 0);
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.header}>Appointment</Text>
            <TouchableOpacity style={styles.close} onPress={onCancel}>
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
          <View style={styles.Searchcontainer}>
            <View
              style={[
                styles.searchBar,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <TextInput
                style={{
                  marginRight: moderateScale(8),
                  flex: 1,
                  fontFamily: FontName.Gordita_Regular,
                  fontSize: 15,
                  fontWeight: '500',
                }}
                placeholder="Search..."
                onChangeText={text => onSearch(text)}
              />
              <View
                style={{
                  height: moderateScale(25),
                  width: moderateScale(25),
                  borderRadius: 12.5,
                  backgroundColor: '#D9D9D9',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={SearchPNG}
                  style={{
                    height: moderateScale(17),
                    width: moderateScale(17),
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
                  if (appointmentArr.length < maxResource) {
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
            style={styles.applyButton}
            onPress={applyFilterValue}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const GooglePlacesInput = ({visible, onCancel, onDonePlace}) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheet
        visible={visible}
        onBackButtonPress={onCancel}
        onBackdropPress={onCancel}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#F0E6E4',
            borderTopLeftRadius: 38,
            borderTopRightRadius: 38,
            marginTop: moderateScale(70),
          }}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.header}>Location</Text>
            <TouchableOpacity style={styles.close} onPress={onCancel}>
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
          <GooglePlacesAutocomplete
            styles={{
              container: {marginHorizontal: moderateScale(20)},
              textInputContainer: {
                // backgroundColor: 'grey',
              },
              textInput: {
                // height: 50,
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            ref={ref}
            placeholder="Search"
            onPress={(data, details = null) => {
              palce = details?.description;
              onCancel();
              onDonePlace(palce);
            }}
            query={{
              key: 'AIzaSyCFc3Tb7cmZhqbkBHxuW_5-YHVLCbFVYFk',
              language: 'en',
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 250,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 0,
    marginHorizontal: moderateScale(30),

    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  header: {
    fontSize: 16,
    fontFamily: FontName.Gordita_Medium,
    fontWeight: '500',
    color: BLACK,
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
  close: {
    tintColor: BLACK,
    position: 'absolute',
    right: 30,
    width: heightPercentageToDP(2.8),
    height: heightPercentageToDP(2.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButton: {
    backgroundColor: BLACK,
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: moderateScale(20),
    height: heightPercentageToDP(5),
  },
  Searchcontainer: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

//make this component available to the app
export default Detail;
