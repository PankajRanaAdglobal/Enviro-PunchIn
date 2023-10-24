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

const PunchInSuccessModal = ({
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
              <TouchableOpacity style={styles.closeImage}>
                <Image tintColor={BLACK} source={CLOSE} />
              </TouchableOpacity>
            </View>
            {/* Start Here */}
            <Image style={styles.profileImage} source={PLACEHOLDER} />
            {/* user name */}
            <CustomText style={styles.userName} children={'Lovekush Kumar'} />
            <CustomText style={styles.otherText} children={'AGL3160'} />
            <CustomText style={styles.otherText} children={'UI/UX Designer'} />
            <CustomText style={styles.otherText} children={'9315599423'} />
            {/* Line */}
            <View style={styles.Line}></View>
            <View style={styles.buttonView}>
              {/* Done Button */}
              <CustomButton
                style={styles.modalConfirmButton}
                onPress={onPress}
                title={AppString.Done}
                textStyle={styles.doneText}
              />

              {/* Cancel Button */}
              <CustomButton
                style={styles.modalCancelButton}
                onPress={onCancel}
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

export default PunchInSuccessModal;
