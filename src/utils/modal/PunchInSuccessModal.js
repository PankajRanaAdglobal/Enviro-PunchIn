import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import CustomText from '../../component/CustomText';
import CustomButton from '../../component/CustomButton';
import AppString from '../appString/AppString';
import {BLACK, GREY, LINE_COLOR, ORANGE, WHITE} from '../../theme/AppColor';
import {FontName, FontSize} from '../../theme/FontName';
import {CLOSE, PLACEHOLDER} from '../assetsImages/AssetImage';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import NavString from '../navString/NavString';
import useApiEffect from '../../hooks/useApiEffect';
import {GUARD_PUNCH_In_OUT} from '../../sevices/ApiEndPoint';
import LocationComponent from '../../component/LocationComponent';
import {ShowToast} from '../constant/Constant';

const PunchInSuccessModal = ({isVisible, onCancel}) => {
  const {makeApiRequest, loading} = useApiEffect();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(isVisible);
  const [locationData, setLocationData] = useState(null);
  // get data from local
  const loginUserData = useSelector(state => state?.auth?.empLoyeLogin);

  console.log(loginUserData);

  const handleDoneClick = () => {
    closeModal();
  };

  const closeModal = () => {
    onCancel('close');
  };

  const apiCall = async () => {
    const apiData = await makeApiRequest({
      url: GUARD_PUNCH_In_OUT,
      method: 'POST',
      isToken: true,
      data: {
        user_id: loginUserData?.data?.data?.user_id,
        punching_type: 1,
        status: 1,
        lat: locationData?.latitude + '',
        long: locationData?.longitude + '',
      },
    });

    console.log("API RES: ",apiData);
    if (apiData != undefined) {
      if (apiData?.status == true) {
        setIsModalVisible(false);
        navigation.navigate(NavString.EMPLOYE_LIST_HOME);
        onCancel('');
        ShowToast(apiData?.message);
      } else {
        console.log('LOGIN ERROR: ', apiData);
        apiData != undefined ? ShowToast(apiData?.error?.message) : null;
      }
    } else ShowToast('Something went wrong! Please try after some time');
  };

  const handleLocationChange = newLocation => {
    console.log('newLocation--------- ', newLocation);
    setLocationData(newLocation);
    const region = {
      latitude: newLocation?.latitude,
      longitude: newLocation?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  };

  return (
    <View style={styles.container}>
      {/* For getting Current Lat & Lng */}
      <LocationComponent
        onLocationChange={handleLocationChange}
        navigation={navigation}
      />
      <Modal
        transparent={isModalVisible}
        visible={isVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <CustomText children={'Details'} />
              {/* Close Image */}
              <TouchableOpacity style={styles.closeImage} onPress={closeModal}>
                <Image tintColor={BLACK} source={CLOSE} />
              </TouchableOpacity>
            </View>
            {/* Start Here */}
            <Image
              style={styles.profileImage}
              source={{uri: loginUserData?.data?.data?.profile_image}}
            />
            {/* user name */}
            <CustomText
              style={styles.userName}
              children={loginUserData?.data?.data?.full_name}
            />
            <CustomText style={styles.otherText} children={'AdGlobal360'} />
            <CustomText
              style={styles.otherText}
              children={
                loginUserData?.data?.data?.Designation?.designation_name
              }
            />
            {/* Mobile */}
            <CustomText
              style={styles.otherText}
              children={loginUserData?.data?.data?.phone_number}
            />
            {/* Line */}
            <View style={styles.Line}></View>
            <View style={styles.buttonView}>
              {/* Done Button */}
              <CustomButton
                style={styles.modalConfirmButton}
                onPress={apiCall}
                title={AppString.Approve}
                textStyle={styles.doneText}
              />

              {/* Cancel Button */}
              <CustomButton
                style={styles.modalCancelButton}
                onPress={closeModal}
                title={AppString.CANCEL}
                textStyle={styles.cancelText}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: WHITE,
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
    alignItems: 'center',
    width: '95%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(1),
  },
  closeImage: {
    position: 'absolute',
    right: heightPercentageToDP(1),
  },
  profileImage: {
    marginTop: heightPercentageToDP(4),
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  userName: {
    marginTop: heightPercentageToDP(3),
    fontFamily: FontName.Gordita_Medium,
  },
  otherText: {
    color: '#8F8F8F',
    marginTop: heightPercentageToDP(1),
    fontSize: FontSize(13),
  },
  desugnation: {},
  mobileNo: {},
  modalCancelButton: {
    backgroundColor: WHITE,
    width: '100%',
    fontSize: FontSize(12),
    height: heightPercentageToDP(5),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BLACK,
    marginTop: 0,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 4,
  },
  modalConfirmButton: {
    backgroundColor: BLACK,
    width: '100%',
    fontSize: FontSize(12),
    height: heightPercentageToDP(5),
    justifyContent: 'center',
    marginTop: 0,
    borderWidth: 0,
    borderRadius: 4,
  },
  buttonView: {
    width: '100%',
    marginTop: heightPercentageToDP(1),
    padding: heightPercentageToDP(0),
  },
  doneText: {
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(13),
  },
  cancelText: {
    color: BLACK,
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(13),
  },
  Line: {
    width: '100%',
    height: 1,
    backgroundColor: LINE_COLOR,
    marginVertical: heightPercentageToDP(2),
  },
});

export default PunchInSuccessModal;
