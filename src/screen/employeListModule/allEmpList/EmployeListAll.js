import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import moment from 'moment-timezone';
import {styles} from './Style';
import CustomText from '../../../component/CustomText';
import {CLOCK} from '../../../utils/assetsImages/AssetImage';
import {
  BUTTON_BACKGROUND,
  ORANGE,
  RED,
  TRANSPARENT,
  WHITE,
} from '../../../theme/AppColor';
import useApiEffect from '../../../hooks/useApiEffect';
import AppLoader from '../../../utils/appLoader/AppLoader';
import {ALL_EMP_LIST} from '../../../sevices/ApiEndPoint';
import EmptyComponent from '../../../component/EmptyComponent';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  convertTimeToFullTime,
  convertTimeToHoursMinutesSeconds,
  convertUtcToLocal,
} from '../../../utils/constant/Constant';
import EmployeInfoModal from '../../../utils/modal/EmployeInfoModal';

const EmployeList = React.memo(({filterData, searchText = ''}) => {
  const {makeApiRequest, loading} = useApiEffect();
  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(0);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [maxResource, setMaxResource] = useState(0);
  const [isShowEmployePopup, setIsShowEmployeeModal] = useState(false);
  const [visitorPopupData, setVisitorPopup] = useState(null);

  // const localTime = moment();
  // Api Call
  const apiCall = async () => {
    try {
      const apiRes = await makeApiRequest({
        url: ALL_EMP_LIST,
        method: 'POST',
        isToken: true,
        data: {
          pageno: page,
          startDate: filterData == null ? '' : filterData?.startDateForSend,
          endDate: filterData == null ? '' : filterData?.endDateForSend,
          beforetime:
            filterData == null
              ? ''
              : convertTimeToHoursMinutesSeconds(filterData?.beforeTimeForSend),
          aftertime:
            filterData == null
              ? ''
              : convertTimeToHoursMinutesSeconds(filterData?.afterTimeForSend),
          status: filterData == null ? '' : filterData?.status,
          search: searchText,
        },
      });
      if (apiRes?.status == true) {
        setBottomLoading(false);
        setMaxResource(apiRes?.data?.count);
        setEmpList(apiRes?.data?.rows);
      }
    } catch (err) {
      console.log('API ERR EMP LIST: ', err);
      setBottomLoading(false);
    }
  };

  useEffect(() => {
    setMaxResource(0);
    if (page == 0) {
      if (empList.length == 0) {
        apiCall(0);
      }
    }
    if (page > -1) {
      if (empList.length > 0) {
        apiCall(page);
      }
    }
  }, [page, filterData, searchText]);

  const handleCardClick = item => {
    setVisitorPopup(item);
    setIsShowEmployeeModal(true);
  };

  const getString = time => {
    return (gmtTimestamp = moment.tz(time, 'GMT'));
  };
  const RenderList = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.flatlistView,
          {
            borderWidth: item?.status == 'reject' ? 1 : 0,
            borderColor: item?.status == 'reject' ? ORANGE : TRANSPARENT,
            backgroundColor: item?.status == 'reject' ? '#FFF9F9' : WHITE,
          },
        ]}
        id={item?.id}
        onPress={() => handleCardClick(item)}>
        {/* Profile Image */}
        <Image
          style={styles.profileImage}
          source={{uri: item?.User?.profile_image}}
        />
        {/* Name View */}
        <View style={[styles.nameView]}>
          <CustomText
            style={styles.nameText}
            children={item?.User?.full_name}
          />
          {/* Company Name */}
          <CustomText style={styles.otherText} children={'AdGlobal360'} />
          {/* Designation */}
          <View style={{width: '85%'}}>
            <CustomText
              style={[styles.otherText]}
              children={item?.User?.Designation?.designation_name}
            />
          </View>

          <View
            style={{
              marginBottom: 10,
              height: 30,
              width: 200,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignContent: 'flex-end',
            }}>
            {item?.out_time != null ? (
              <View
                style={[
                  styles.timeOut,
                  {paddingRight: Platform.OS === 'ios' ? 0 : 40},
                ]}>
                <Image source={CLOCK} />
                <CustomText
                  style={styles.timeText}
                  children={moment
                    .utc(item?.out_time, 'HH:mm:ss')
                    .local()
                    .format('HH:mm:ss A')}
                />
              </View>
            ) : null}
          </View>
        </View>
        {/* Time */}
        <View style={styles.timeView}>
          <Image source={CLOCK} />
          <CustomText
            style={styles.timeText}
            children={moment
              .utc(item?.in_time, 'HH:mm:ss')
              .local()
              .format('HH:mm:ss A')}
          />
        </View>
        {/* Out ime */}
      </TouchableOpacity>
    );
  };

  // Info Modal
  const handleInfoModal = () => {
    setIsShowEmployeeModal(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={empList}
        renderItem={RenderList}
        onEndReached={() => {
          if (!bottomLoading) {
            if (empList.length < maxResource) {
              console.log(page);
              setBottomLoading(true);
              setPage(page + 1);
            }
          }
        }}
        ListEmptyComponent={<EmptyComponent text={'No Record Found.'} />}
        ListFooterComponent={
          <View style={{height: widthPercentageToDP(5)}}>
            {bottomLoading && <AppLoader />}
          </View>
        }
      />
      <AppLoader isLoading={loading} />

      {isShowEmployePopup && (
        <EmployeInfoModal
          isVisible={isShowEmployePopup}
          onCancel={handleInfoModal}
          visitorPopupData={visitorPopupData}
        />
      )}
    </View>
  );
});

export default EmployeList;
