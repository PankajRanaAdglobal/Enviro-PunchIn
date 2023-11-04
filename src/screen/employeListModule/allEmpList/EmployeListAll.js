import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
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
} from '../../../utils/constant/Constant';

const EmployeList = React.memo(({filterData}) => {
  console.log('filterData------- ', filterData);
  const {makeApiRequest, loading} = useApiEffect();
  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(1);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [maxResource, setMaxResource] = useState(0);

  // Api Call
  const apiCall = async () => {
    try {
      const apiRes = await makeApiRequest({
        url: ALL_EMP_LIST,
        method: 'POST',
        isToken: true,
        data: {
          pageno: page,
          startDate: filterData?.startDateForSend,
          endDate: filterData?.endDateForSend,
          beforetime: convertTimeToHoursMinutesSeconds(
            filterData?.beforeTimeForSend,
          ),
          aftertime:
            filterData?.afterTimeForSend == ''
              ? ''
              : convertTimeToHoursMinutesSeconds(filterData?.afterTimeForSend),
          status: filterData?.status,
        },
      });
      console.log(apiRes);
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
  }, [page, filterData]);

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
        id={item?.id}>
        {/* Profile Image */}
        <Image
          style={styles.profileImage}
          source={{uri: item?.User?.profile_image}}
        />
        {/* Name View */}
        <View style={styles.nameView}>
          <CustomText
            style={styles.nameText}
            children={item?.User?.full_name}
          />
          {/* Company Name */}
          <CustomText style={styles.otherText} children={'AdGlobal360'} />
          {/* Designation */}
          <CustomText
            style={styles.otherText}
            children={item?.User?.Designation?.designation_name}
          />
        </View>
        {/* Time */}
        <View style={styles.timeView}>
          <Image source={CLOCK} />
          <CustomText style={styles.timeText} children={item?.in_time} />
        </View>
      </TouchableOpacity>
    );
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
    </View>
  );
});

export default EmployeList;
