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
import {CLOSE, PLACEHOLDER} from '../assetsImages/AssetImage';

const PunchInFailedModal = ({
  isVisible,
  text = 'Are you sure want to "Accept"?',
  onPress,
  onCancel,
}) => {
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={isVisible} onRequestClose={onPress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <CustomText children={'Details'} />
              {/* Close Image */}
              <TouchableOpacity
                onPress={onCancel}
                style={styles.closeImageButton}>
                <Image
                  style={styles.closeImage}
                  tintColor={BLACK}
                  source={CLOSE}
                />
              </TouchableOpacity>
            </View>
            {/* Start Here */}
            <Image style={styles.profileImage} source={PLACEHOLDER} />
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
                onPress={onPress}
                title={AppString.try_again}
                textStyle={styles.doneText}
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

export default PunchInFailedModal;
