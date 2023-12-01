import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ShowToast, formatDate, formatTime } from '../constant/Constant';
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
  TEXT_COLOR_GREY,
  WHITE,
} from '../../theme/AppColor';
import { FontName, FontSize } from '../../theme/FontName';
import CalenderIcon from '../../../assets/image/svg/calanderIcon.svg';
import Cross from '../../../assets/image/svg/cross.svg';
import CustomText from '../../component/CustomText';
import CustomButton from '../../component/CustomButton';
import AppString from '../appString/AppString';
import Arrow from '../../../assets/image/svg/arrow.svg';
import DatePickerModal from '../modal/DatePickerModal';

let startDateForSend = null;
let endDateForSend = null;
let beforeTimeForSend = '';
let afterTimeForSend = '';

const EmployeeFilter = ({ handleFilterClose, visible, selectedValue }) => {
  const refRBSheet = useRef();
  const [clickType, setClickType] = useState('');
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [beforeTime, setBeforeTime] = useState('');
  const [afterTime, setAfterTime] = useState('');
  const [myIndex, setMyIndex] = useState(0);
  const [mode, setMode] = useState('date');

  const DATA = [
    {
      id: 1,
      name: 'All',
      value: 'All',
    },
    {
      id: 2,
      name: 'Approved',
      value: 'Approved',
    },
    {
      id: 3,
      name: 'Disapproved',
      value: 'Disapproved',
    },
  ];

  useEffect(() => {
    if (visible) {
      refRBSheet.current.open();
    }
  }, [visible]);

  //   Close Date Picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    startDateForSend = null;
    endDateForSend = null;
    beforeTimeForSend = '';
    afterTimeForSend = '';
  }, []);

  //   Date Picker
  const handleConfirm = date => {
    setDatePickerVisibility(false);
    // if (event.type === 'dismissed') return;
    if (clickType == 'startDate') {
      startDateForSend = date;
      setStartDate(formatDate(date));
    } else if (clickType == 'endDate') {
      setEndDate(formatDate(date));
      endDateForSend = date;
    } else if (clickType == 'beforeTime') {
      beforeTimeForSend = formatTime(date);
      setBeforeTime(formatTime(date));
    } else if (clickType == 'afterTime') {
      setAfterTime(formatTime(date));
      afterTimeForSend = formatTime(date);
    }
  };

  // Apply Click
  const handleSubmit = () => {
    const status = myIndex == 0 ? 1 : myIndex == 1 ? 2 : 3;
    if (startDate == '') ShowToast('Please select Start Date');
    else if (endDate == '') ShowToast('Please select End Date');
    else if (beforeTime == '' && afterTime == '')
      ShowToast('Please select Atleast One From Before and After Time');
    else {
      selectedValue({
        startDateForSend,
        endDateForSend,
        beforeTimeForSend,
        afterTimeForSend,
        status,
      });
    }
  };

  const handleItemClick = index => {
    setMyIndex(index);
  };

  const RenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => handleItemClick(index)}
        style={[
          styles.flatlistItem,
          { backgroundColor: myIndex == index ? BLACK : WHITE },
        ]}>
        <CustomText
          style={[
            styles.flatlistText,
            { color: myIndex == index ? WHITE : BLACK },
          ]}
          children={item.name}
        />
      </TouchableOpacity>
    );
  };

  const handleConfirm1 = date => {
    hideDatePicker();
  };

  return (
    // <View style={styles.container}>
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      closeOnPressMask={false}
      height={450}
      onClose={handleFilterClose}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 38,
          borderTopRightRadius: 38,
        },
        wrapper: {
          backgroundColor: '#00000099',
        },
        draggableIcon: {
          backgroundColor: BLACK,
        },
      }}>
      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.viewMainBottomStyle}>
          <View style={styles.header}>
            <Text style={styles.DetailsTitle}> {'Details'}</Text>
            <TouchableOpacity style={styles.close} onPress={handleFilterClose}>
              <Cross />
            </TouchableOpacity>
          </View>
          {/* START DATE AND END DATE OF COMPAINE */}
          <View style={[{ marginTop: 10 }]}>
            <CustomText children={'Select Date:'} style={styles.title} />
            <View style={styles.viewColomStyle}>
              {/* start date */}
              <TouchableOpacity
                style={styles.viewStartDateStyle}
                onPress={() => {
                  setMode('date');
                  setClickType('startDate');
                  setDatePickerVisibility(true);
                }}>
                <TextInput
                  value={formatDate(startDate)}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={txtStartDate => {
                    setStartDate(txtStartDate);
                  }}
                  underlineColorAndroid="transparent"
                  placeholder={'dd/mm/yy'}
                  multiline={true}
                  maxFontSizeMultiplier={1}
                  style={styles.textInput}
                  editable={false}
                  placeholderTextColor={TEXT_COLOR_GREY}
                />
                {/* <CalenderIcon
                  height={20}
                  width={20}
                  alignSelf={'center'}
                  marginEnd={10}
                /> */}
              </TouchableOpacity>
              <Arrow alignSelf={'center'} />
              {/* END DATE */}
              <TouchableOpacity
                style={[styles.viewStartDateStyle, {}]}
                onPress={() => {
                  setMode('date');
                  setClickType('endDate');
                  setDatePickerVisibility(true);
                }}>
                <TextInput
                  value={formatDate(endDate)}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={txtEndDate => {
                    setEndDate(txtEndDate);
                  }}
                  underlineColorAndroid="transparent"
                  placeholder={'dd/mm/yy'}
                  multiline={true}
                  maxFontSizeMultiplier={1}
                  style={styles.textInput}
                  editable={false}
                  placeholderTextColor={TEXT_COLOR_GREY}
                />
                {/* <CalenderIcon height={20} width={20} alignSelf={'center'} /> */}
              </TouchableOpacity>
            </View>
          </View>

          {/* Before and After */}
          <View style={styles.beforeTimeMainView}>
            <View style={styles.beforeTimeView}>
              {/* Before Time */}
              <Text style={styles.beforeText}> {'Before :'}</Text>
              <TouchableOpacity
                style={styles.beforetimeButotn}
                onPress={() => {
                  if (afterTime !== '') {
                    ShowToast('After Time already Selected');
                    return;
                  }
                  setMode('time');
                  setClickType('beforeTime');
                  setDatePickerVisibility(true);
                }}>
                <TextInput
                  value={beforeTime}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={txtStartDate => {
                    setBeforeTime(txtStartDate);
                  }}
                  underlineColorAndroid="transparent"
                  placeholder={'Start Time'}
                  multiline={true}
                  maxFontSizeMultiplier={1}
                  style={styles.textInput}
                  editable={false}
                  placeholderTextColor={TEXT_COLOR_GREY}
                />
              </TouchableOpacity>
            </View>
            {/* After Time */}
            <View style={[styles.beforeTimeView]}>
              <Text style={styles.beforeText}> {'After:'}</Text>
              <TouchableOpacity
                style={styles.beforetimeButotn}
                onPress={() => {
                  if (beforeTime !== '') {
                    ShowToast('Before Time already Selected');
                    return;
                  }
                  setMode('time');
                  setClickType('afterTime');
                  setDatePickerVisibility(true);
                }}>
                <TextInput
                  value={afterTime}
                  keyboardType="default"
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={txtEndDate => {
                    setAfterTime(txtEndDate);
                  }}
                  underlineColorAndroid="transparent"
                  placeholder={'After Time'}
                  multiline={true}
                  maxFontSizeMultiplier={1}
                  style={styles.textInput}
                  editable={false}
                  placeholderTextColor={TEXT_COLOR_GREY}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Flatlist */}
          <FlatList
            style={styles.flatlist}
            data={DATA}
            horizontal
            renderItem={RenderItem}
          />

          <CustomButton
            onPress={handleSubmit}
            title={'Apply'}
            style={styles.modalSaveButton}
            textStyle={styles.textSaveColor}
          />
          {/* Date And Time Picker */}
          {isDatePickerVisible && (
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode={mode}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date()}
              is24Hour
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </RBSheet>
  );
};

export default EmployeeFilter;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: widthPercentageToDP(100),
    backgroundColor: LIGHTGREY,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  bottomNavigationView: {
    backgroundColor: LIGHTGREY,
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
    color: PRIMARY_COLOR,
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
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 3,
    width: '40%',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    color: PRIMARY_COLOR,
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
  beforeTimeView: { width: '40%' },

  beforeTimeMainView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(2),
  },
  beforeText: {
    color: BLACK,
  },
  beforetimeButotn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 3,
    height: 40,
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flatlistItem: {
    borderRadius: 5,
    paddingHorizontal: heightPercentageToDP(2),
    marginHorizontal: heightPercentageToDP(1),
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingVertical: heightPercentageToDP(0.5),
    height: 38,
    justifyContent: 'center',
  },
  flatlist: {
    marginTop: heightPercentageToDP(4),
  },
  flatlistText: {
    color: WHITE,
    fontSize: FontSize(14),
  },
  textInput: {
    fontFamily: FontName.Gordita_Regular,
    paddingHorizontal: heightPercentageToDP(1),
    fontSize: FontSize(12),
    color: BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    flex: 1
  },
});
