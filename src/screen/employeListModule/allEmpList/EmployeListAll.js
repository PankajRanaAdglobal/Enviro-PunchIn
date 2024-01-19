import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import moment from "moment-timezone";
import { styles } from "./Style";
import CustomText from "../../../component/CustomText";
import { ORANGE, TRANSPARENT, WHITE } from "../../../theme/AppColor";
import useApiEffect from "../../../hooks/useApiEffect";
import AppLoader from "../../../utils/appLoader/AppLoader";
import { ALL_EMP_LIST } from "../../../sevices/ApiEndPoint";
import EmptyComponent from "../../../component/EmptyComponent";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  convertTextToUpperCase,
  convertTimeToHoursMinutesSeconds,
} from "../../../utils/constant/Constant";
import EmployeInfoModal from "../../../utils/modal/EmployeInfoModal";
import Clock from "../../../../assets/image/svg/clock.svg";
import { useSelector } from "react-redux";
import { PLACEHOLDER } from "../../../utils/assetsImages/AssetImage";
import { useId } from "react-id-generator";

const EmployeList = React.memo(
  ({ filterData, searchText = "", getTotalCount }) => {
    const [htmlId] = useId();
    const { makeApiRequest, loading } = useApiEffect();
    const [empList, setEmpList] = useState([]);
    const [page, setPage] = useState(0);
    const [bottomLoading, setBottomLoading] = useState(false);
    const [maxResource, setMaxResource] = useState(0);
    const [isShowEmployePopup, setIsShowEmployeeModal] = useState(false);
    const [visitorPopupData, setVisitorPopup] = useState(null);
    const [flatListKey, setFlatListKey] = useState(htmlId);
    const locationId = useSelector(
      (state) => state?.auth?.loginUser?.data?.guard?.location_id
    );
    const companyid = useSelector(
      (state) => state?.auth?.loginUser?.data?.guard?.company_id
    );
    // Api Call
    const apiCall = async () => {
      try {
        const apiRes = await makeApiRequest({
          url: ALL_EMP_LIST,
          method: "POST",
          isToken: true,
          data: {
            pageno: searchText == "" ? page : 0,
            startDate: filterData == null ? "" : filterData?.startDateForSend,
            endDate: filterData == null ? "" : filterData?.endDateForSend,
            beforetime:
              filterData == null
                ? ""
                : convertTimeToHoursMinutesSeconds(
                    filterData?.beforeTimeForSend
                  ),
            aftertime:
              filterData == null
                ? ""
                : convertTimeToHoursMinutesSeconds(
                    filterData?.afterTimeForSend
                  ),
            status: filterData == null ? "" : filterData?.status,
            search: searchText,
            location_id: locationId + "",
          },
        });
        console.log("apidata------------ ", apiRes);
        if (apiRes != undefined) {
          if (apiRes?.status == true) {
            setBottomLoading(false);
            setMaxResource(apiRes?.data?.count);
            if (searchText == "") {
              setEmpList((previousData) => {
                const newAppointments = [
                  ...previousData,
                  ...apiRes?.data?.rows,
                ];
                const uniqueAppointments = Array.from(
                  new Set(newAppointments.map(JSON.stringify))
                ).map(JSON.parse);
                return uniqueAppointments;
              });
            } else {
              setEmpList([]);
              setEmpList(apiRes?.data?.rows);
            }

            console.log("emp length in FN= ", apiRes?.data?.rows?.length);
            //

            getTotalCount(apiRes?.data?.count);
          }
        } else ShowToast("Something went wrong! Please try after some time");
      } catch (err) {
        console.log("API ERR EMP LIST: ", err);
        setBottomLoading(false);
      }
    };

    useEffect(() => {
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
    }, [page, filterData, searchText]);

    const handleCardClick = (item) => {
      setVisitorPopup(item);
      setIsShowEmployeeModal(true);
    };

    const getString = (time) => {
      return (gmtTimestamp = moment.tz(time, "GMT"));
    };
    const RenderList = ({ item, index }) => {
      // console.log("item======== ", typeof item?.out_time);
      return (
        <TouchableOpacity
          style={[
            styles.flatlistView,
            {
              borderWidth: item?.status == "reject" ? 1 : 0,
              borderColor: item?.status == "reject" ? ORANGE : TRANSPARENT,
              backgroundColor: item?.status == "reject" ? "#FFF9F9" : WHITE,
            },
          ]}
          key={htmlId}
          onPress={() => handleCardClick(item)}
        >
          {/* Profile Image */}
          <Image
            style={styles.profileImage}
            source={
              item?.User?.profile_image == ""
                ? PLACEHOLDER
                : { uri: item?.User?.profile_image }
            }
          />
          {/* Name View */}
          <View style={[styles.nameView]}>
            <CustomText
              style={styles.nameText}
              children={item?.User?.full_name}
            />
            {/* Company Name */}
            <CustomText
              style={styles.otherText}
              children={
                companyid === "agl"
                  ? "AdGlobal360"
                  : convertTextToUpperCase(companyid)
              }
            />
            {/* Designation */}
            <View style={{ width: "90%" }}>
              <CustomText
                style={[styles.otherText]}
                children={item?.User?.Designation?.designation_name}
              />
            </View>
          </View>

          {/* Time */}
          <View style={styles.timeView}>
            <Clock />
            <CustomText
              style={styles.timeText}
              children={moment
                .utc(item?.in_time, "HH:mm:ss")
                .local()
                .format("HH:mm:ss A")}
            />
          </View>
          {console.log(item?.out_time)}
          {/* Out ime */}
          {item?.out_time != null ? (
            <View style={[styles.timeOut, {}]}>
              <Clock />
              <CustomText
                style={styles.timeText}
                children={moment
                  .utc(item?.out_time, "HH:mm:ss")
                  .local()
                  .format("HH:mm:ss A")}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      );
    };

    // Info Modal
    const handleInfoModal = () => {
      setIsShowEmployeeModal(false);
    };

    {
      console.log("====================================", searchText);
    }

    return (
      <View style={styles.container}>
        <FlatList
          key={flatListKey}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={empList}
          renderItem={RenderList}
          onEndReached={() => {
            if (!bottomLoading) {
              if (empList.length < maxResource) {
                setBottomLoading(true);
                setPage(page + 1);
              }
            }
          }}
          ListEmptyComponent={<EmptyComponent text={"No Record Found."} />}
          ListFooterComponent={
            <View style={{ height: widthPercentageToDP(5) }}>
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
  }
);

export default EmployeList;
