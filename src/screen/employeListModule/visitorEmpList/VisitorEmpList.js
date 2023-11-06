import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './Style';
import { LIST_JSON } from '../../../../assets/json/ListJson';
import CustomText from '../../../component/CustomText';
import EmptyComponent from '../../../component/EmptyComponent';
import Logout from '../../../../assets/image/svg/logout.svg';
import Right from '../../../../assets/image/svg/right.svg';
import useApiEffect from '../../../hooks/useApiEffect';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import AppLoader from '../../../utils/appLoader/AppLoader';
import { ALL_VISITORS_LIST } from '../../../sevices/ApiEndPoint';
import CheckOutModal from '../../../utils/modal/CheckOutModal';
import { convertTimeToHoursMinutesSeconds } from '../../../utils/constant/Constant';

export default function VisitorEmployee({ filterData, searchText = '' }) {
  // console.log("filterData Visitor List------ ",filterData);
  const { makeApiRequest, loading } = useApiEffect();
  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(0);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [maxResource, setMaxResource] = useState(0);
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [visitorId, setVisitorId] = useState(null);
  const [visitorData, setVisitorData] = useState(null);

  const apiCall = async () => {
    try {
      const apiRes = await makeApiRequest({
        url: ALL_VISITORS_LIST,
        method: 'GET',
        isToken: false,
        data: {
          pageno: page,
          startDate:
            filterData?.startDateForSend == null
              ? ''
              : filterData?.startDateForSend,
          endDate:
            filterData?.endDateForSend == null
              ? ''
              : filterData?.endDateForSend,
          beforetime:
            filterData?.beforeTimeForSend == null
              ? ''
              : convertTimeToHoursMinutesSeconds(filterData?.beforeTimeForSend),
          aftertime:
            filterData?.afterTimeForSend == null
              ? ''
              : convertTimeToHoursMinutesSeconds(filterData?.afterTimeForSend),
          status: filterData?.status,
          search: searchText,
        },
      });
      console.log(JSON.stringify(apiRes));
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
        apiCall();
      }
    }
    if (page > -1) {
      if (empList.length > 0) {
        apiCall();
      }
    }
  }, [page, searchText, filterData]);

  const handleCheckOutModal = () => {
    setCheckOutModal(false);
  };

  const RenderList = ({ item, index }) => {
    // console.log('item--- ', item);
    return (
      <TouchableOpacity style={styles.view} activeOpacity={1} id={item?.id}>
        <View style={styles.flatlistView}>
          <Image style={styles.profileImage} source={{ uri: item?.photo }} />

          {/* Name View */}
          <View style={styles.nameView}>
            <CustomText style={styles.nameText} children={item?.name} />
            <CustomText
              style={styles.otherText}
              children={item?.Visitortype?.name}
            />
            <CustomText
              style={styles.otherText}
              children={item?.User?.Designation?.designation_name}
            />
          </View>
          {/* Time */}
          {item?.status == 'reject' ? (
            <View style={styles.rightImage}>
              <Right />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setVisitorId(item?.id);
                setCheckOutModal(true);
                setVisitorData({
                  name: item?.Visitortype?.name,
                  image: item?.photo,
                  checkInTime: item?.entrytime,
                });
              }}
              style={styles.timeView}>
              <Logout />
            </TouchableOpacity>
          )}
        </View>
        {/* Line */}
        <View style={styles.line}></View>
        {/* Check In View */}
        <View style={styles.checkInView}>
          {/* Check In */}
          <View>
            <CustomText style={styles.checkinText} children={'Check In'} />
            <CustomText style={styles.checkinTime} children={item?.entrytime} />
          </View>
          {/* Line */}
          <View style={styles.lineVertical}></View>
          {/* Check Out */}
          <View style={styles.checkin}>
            <CustomText style={styles.checkinText} children={'Check Out'} />
            <CustomText
              style={styles.checkinTime}
              children={item?.out_time == null ? '00:00' : item?.out_time}
            />
          </View>
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
          <View style={{ height: widthPercentageToDP(5) }}>
            {bottomLoading && <AppLoader />}
          </View>
        }
      />
      <AppLoader isLoading={loading} />
      {checkOutModal && (
        <CheckOutModal
          isShowcheckOutModal={checkOutModal}
          handleCheckOutModal={handleCheckOutModal}
          userid={visitorId}
          visitorData={visitorData}
        />
      )}
    </View>
  );
}
