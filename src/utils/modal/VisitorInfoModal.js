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
import {
  GUARD_PUNCHOUT,
  GUARD_PUNCH_In_OUT,
  LOGIN,
} from '../../sevices/ApiEndPoint';
import {
  ShowToast,
  capitalizeFirstLetter,
  convertTimeToUTC,
} from '../constant/Constant';

const VisitorInfoModal = ({isVisible, onCancel, visitorPopupData}) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(isVisible);

  const handleDoneClick = () => {
    closeModal();
  };

  const closeModal = () => {
    onCancel('close');
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={isModalVisible}
        visible={isVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeModal}
          style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              {/* ProfileImage View */}
              <View style={styles.profileView}>
                <Image
                  style={styles.profileImage}
                  source={{uri: visitorPopupData?.photo}}
                />
                {/* Name View */}
                <View>
                  <CustomText
                    style={styles.userName}
                    children={visitorPopupData?.name}
                  />
                  <CustomText
                    style={styles.userName}
                    children={'AdGlobal360'}
                  />
                  <CustomText
                    style={styles.otherText}
                    children={capitalizeFirstLetter(
                      visitorPopupData?.Visitortype?.name,
                    )}
                  />
                </View>
              </View>
              {/* Close Image */}
              <TouchableOpacity style={styles.closeImage} onPress={closeModal}>
                <Image tintColor={BLACK} source={CLOSE} />
              </TouchableOpacity>
            </View>
            {/* Time */}
            <View
              style={[styles.timeView, {marginTop: heightPercentageToDP(2)}]}>
              {/* Entry */}
              <CustomText style={styles.userName} children={`Check In`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={`${visitorPopupData?.entrytime}`}
              />
            </View>
            {/* Check Out */}
            <View style={styles.timeView}>
              <CustomText style={styles.userName} children={`Check Out`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={`${
                  visitorPopupData?.timeout == null
                    ? '00:00'
                    : visitorPopupData?.timeout
                }`}
              />
            </View>
            {/* Mobile Number */}
            <View style={styles.timeView}>
              <CustomText style={styles.userName} children={`Mobile No`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={visitorPopupData?.contact_number}
              />
            </View>
            {/* Location */}
            <View style={[styles.timeView]}>
              <CustomText style={styles.userName} children={`Location`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={visitorPopupData?.location}
              />
            </View>
            {/* Location */}
            <View style={[styles.timeView]}>
              <CustomText style={styles.userName} children={`Purpose`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={capitalizeFirstLetter(
                  visitorPopupData?.Visitorpurpose?.name,
                )}
              />
            </View>
            {/* Location */}
            <View style={[styles.timeView]}>
              <CustomText style={styles.userName} children={`Aadhar No`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={visitorPopupData?.adharnumber}
              />
            </View>
            {/* Location */}
            <View style={[styles.timeView]}>
              <CustomText style={styles.userName} children={`Batch No`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={visitorPopupData?.batchnumber}
              />
            </View>
            {/* Location */}
            <View
              style={[
                styles.timeView,
                {paddingBottom: heightPercentageToDP(2)},
              ]}>
              <CustomText style={styles.userName} children={`To Meet`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={capitalizeFirstLetter(
                  visitorPopupData?.User?.full_name,
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
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
    justifyContent: 'flex-start',
    marginTop: heightPercentageToDP(1),
  },
  closeImage: {
    position: 'absolute',
    right: heightPercentageToDP(1),
    top: heightPercentageToDP(1),
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignSelf: 'center',
  },
  userName: {
    fontFamily: FontName.Gordita_Medium,
    marginLeft: heightPercentageToDP(2),
    fontSize: FontSize(13),
    marginTop: 5,
    width: 90,
    textAlign: 'left',
  },
  otherText: {
    color: '#8F8F8F',
    fontSize: FontSize(13),
    marginLeft: heightPercentageToDP(2),
    marginTop: 5,
  },
  profileView: {
    flexDirection: 'row',
  },
  timeView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: heightPercentageToDP(0),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  valueText: {
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(13),
    textAlign: 'left',
    marginLeft: heightPercentageToDP(2),
    width:'60%'
  },
  colon: {
    width: 10,
  },
});

export default VisitorInfoModal;
