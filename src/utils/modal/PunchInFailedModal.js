import React, {useState} from 'react';
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
import {CLOSE, PLACEHOLDER, QR_FAIL} from '../assetsImages/AssetImage';
import Qrfail from '../../../assets/image/svg/qrfail.svg';
import {useNavigation} from '@react-navigation/native';
import NavString from '../navString/NavString';

const PunchInFailedModal = ({isVisible, onCancel}) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(isVisible);
  const closeModal = () => {
    onCancel('close');
  };

  const handleManualClick = () => {
    navigation.navigate(NavString.VERIFICATION_CODE);
    closeModal();

  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={isModalVisible}
        visible={isVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <CustomText children={'Details'} />
              {/* Close Image */}
              <TouchableOpacity
                onPress={closeModal}
                style={styles.closeImageButton}>
                <Image
                  style={styles.closeImage}
                  tintColor={BLACK}
                  source={CLOSE}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {/* Start Here */}
            <Qrfail width={140} height={140} marginTop={20} />
            <CustomText
              style={styles.userName}
              children={'Unable to verify the QR Code'}
            />
            <CustomText
              style={styles.otherText}
              children={'Oops! Invalid QR code. Please scan another QR'}
            />
            {/* Line */}
            <View style={styles.Line}></View>
            <View style={styles.buttonView}>
              {/* Try Again Button */}
              <CustomButton
                style={styles.modalConfirmButton}
                onPress={closeModal}
                title={AppString.try_again}
                textStyle={styles.doneText}
              />
              {/* Cancel Button */}
              <CustomButton
                style={styles.modalCancelButton}
                onPress={handleManualClick}
                title={AppString.Manual_Entry}
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
  closeImageButton: {
    position: 'absolute',
    right: heightPercentageToDP(1),
  },
  closeImage: {
    width: 20,
    height: 20,
  },
  profileImage: {
    marginTop: heightPercentageToDP(4),
  },
  userName: {
    marginTop: heightPercentageToDP(3),
    fontFamily: FontName.Gordita_Medium,
    width: '50%',
    textAlign: 'center',
    lineHeight: 25,
  },
  otherText: {
    color: '#8F8F8F',
    marginTop: heightPercentageToDP(2),
    fontSize: FontSize(13),
    width: '70%',
    textAlign: 'center',
    lineHeight: 19,
  },
  desugnation: {},
  mobileNo: {},
  modalCancelButton: {
    backgroundColor: WHITE,
    borderRadius: 5,
    width: '100%',
    fontSize: FontSize(12),
    height: heightPercentageToDP(5),
    justifyContent: 'center',
    marginTop: heightPercentageToDP(2),
    borderWidth: 1,
    borderColor: BLACK,
  },
  modalConfirmButton: {
    backgroundColor: BLACK,
    borderRadius: 5,
    width: '100%',
    fontSize: FontSize(12),
    height: heightPercentageToDP(5),
    justifyContent: 'center',
    marginTop: 0,
  },
  buttonView: {
    width: '100%',
    marginTop: heightPercentageToDP(3),
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
    marginTop: heightPercentageToDP(5),
  },
});

export default PunchInFailedModal;
