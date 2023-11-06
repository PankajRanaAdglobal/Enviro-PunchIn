import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ShowToast, formatDate, formatTime} from '../constant/Constant';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  BLACK,
  BORDER_COLOR,
  GREY,
  LIGHTGREY,
  LINE_COLOR,
  PRIMARY_COLOR,
  RED,
  WHITE,
} from '../../theme/AppColor';
import {FontName, FontSize} from '../../theme/FontName';
import CalenderIcon from '../../../assets/image/svg/calanderIcon.svg';
import Cross from '../../../assets/image/svg/cross.svg';
import CustomText from '../../component/CustomText';
import CustomButton from '../../component/CustomButton';
import AppString from '../appString/AppString';
import Arrow from '../../../assets/image/svg/arrow.svg';
import {Modal} from 'react-native-paper';

let startDateForSend = null;
let endDateForSend = null;
let beforeTimeForSend = '';
let afterTimeForSend = '';


const DatePickerModal = ({closeModal, visible, mode}) => {
  const refRBSheet = useRef();
  const [clickType, setClickType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [beforeTime, setBeforeTime] = useState('');
  const [afterTime, setAfterTime] = useState('');
  const [myIndex, setMyIndex] = useState(0);

  //   Close Date Picker
  const hideDatePicker = () => {};

  useEffect(() => {
    startDateForSend = null;
    endDateForSend = null;
    beforeTimeForSend = '';
    afterTimeForSend = '';
  }, []);

  //   Date Picker OnChange
  const handleConfirm = (event, date) => {
    console.log(date);
    hideDatePicker();
  };

  const handleItemClick = index => {
    setMyIndex(index);
  };

  return (
    <Modal
      style={{backgroundColor: BLACK}}
      animationType="slide"
      visible={true}
      onRequestClose={closeModal}>
      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.viewMainBottomStyle}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.close} onPress={closeModal}>
              <Cross color={WHITE} />
            </TouchableOpacity>
          </View>
          {/* Date Picker */}
          {visible && (
            <RNDateTimePicker
              isVisible={visible}
              mode={mode}
              onChange={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date()}
              value={new Date()}
              display="spinner"
              is24Hour
              themeVariant="light"
              textColor="white"
            />
          )}

          <CustomButton
            title={'Save'}
            style={styles.saveButton}
            textStyle={styles.text}
          />
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default DatePickerModal;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: widthPercentageToDP(100),
    backgroundColor: RED,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  bottomNavigationView: {
    backgroundColor: WHITE,
    width: widthPercentageToDP(100),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  viewMainBottomStyle: {
    flexDirection: 'column',
    marginHorizontal: heightPercentageToDP(2),
    justifyContent: 'center',
  },

  title: {
    fontSize: FontSize(14),
    fontWeight: '400',
    color: WHITE,
    fontFamily: FontName.Gordita_Regular,
  },
  separatorBottom: {
    marginTop: 33,
    height: 0.5,
    backgroundColor: '#808080',
  },
  viewDateBottomStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    margin: 5,
    height: heightPercentageToDP(10),
  },
  viewColomStyle: {
    width: '100%',
    flexDirection: 'row',
    marginTop: heightPercentageToDP(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewStartDateStyle: {
    paddingTop: Platform.OS == 'ios' ? 10 : 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 3,
    width: '40%',
    height: 40,
  },

  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(5),
    marginBottom: heightPercentageToDP(3),
    alignItems: 'center',
  },

  modalSaveButton: {
    backgroundColor: PRIMARY_COLOR,
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(6),
    justifyContent: 'center',
    marginTop: heightPercentageToDP(5),
  },
  textSaveColor: {
    color: WHITE,
    alignItems: 'center',
    fontFamily: FontName.Gordita_Medium,
    fontSize: FontSize(14),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: LINE_COLOR,
    height: widthPercentageToDP(15),
    justifyContent: 'center',
    alignContent: 'center',
  },
  DetailsTitle: {
    fontSize: FontSize(16),
    fontWeight: '500',
    color: WHITE,
    fontFamily: FontName.Gordita_Medium,
    textAlign: 'center',
  },
  close: {
    tintColor: BLACK,
    position: 'absolute',
    right: 10,
    width: heightPercentageToDP(2.8),
    height: heightPercentageToDP(2.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  beforeTimeView: {width: '40%'},

  beforeTimeMainView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(2),
  },
  beforeText: {
    color: BLACK,
  },
  saveButton: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: WHITE,
    borderRadius: 3,
    height: 40,
    marginTop: 5,
  },
  text: {
    color: BLACK,
  },
});
