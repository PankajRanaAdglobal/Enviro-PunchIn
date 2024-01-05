import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import CustomText from "../../component/CustomText";
import { BLACK, GREY, LINE_COLOR, ORANGE, WHITE } from "../../theme/AppColor";
import { FontName, FontSize } from "../../theme/FontName";
import { CLOSE, PLACEHOLDER } from "../assetsImages/AssetImage";
import { useNavigation } from "@react-navigation/native";
import { capitalizeFirstLetter, convertTextToUpperCase, convertUtcToLocal } from "../constant/Constant";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
const VisitorInfoModal = ({ isVisible, onCancel, visitorPopupData }) => {
  console.log(visitorPopupData);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(isVisible);
  const companyid = useSelector(
    state => state?.auth?.loginUser?.data?.guard?.company_id,
  );
  const closeModal = () => {
    onCancel("close");
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={isModalVisible}
        visible={isVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeModal}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              {/* ProfileImage View */}
              <View style={styles.profileView}>
                <Image
                  style={styles.profileImage}
                  source={
                    visitorPopupData?.User?.profile_image == ""
                      ? PLACEHOLDER
                      : { uri: visitorPopupData?.User?.profile_image }
                  }
                />
                {/* Name View */}
                <View>
                  <CustomText
                    style={[styles.userName, {}]}
                    children={capitalizeFirstLetter(
                      visitorPopupData?.User?.full_name
                    )}
                  />
                  <CustomText
                    style={styles.userName}
                    children={companyid === 'agl' ? 'AdGlobal360' : convertTextToUpperCase(companyid)}
                  />
                  <CustomText
                    style={styles.otherText}
                    children={capitalizeFirstLetter(
                      visitorPopupData?.User?.Designation?.designation_name
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
              style={[styles.timeView, { marginTop: heightPercentageToDP(2) }]}
            >
              {/* Entry */}
              <CustomText style={styles.userName} children={`Check In`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={
                  visitorPopupData?.in_time != null
                    ? moment
                      .utc(visitorPopupData?.in_time, "HH:mm:ss")
                      .local()
                      .format("HH:mm:ss A")
                    : "--:--"
                }
              />
            </View>
            {/* Check Out */}
            <View style={styles.timeView}>
              <CustomText style={styles.userName} children={`Check Out`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={
                  visitorPopupData?.out_time != null
                    ? moment
                      .utc(visitorPopupData?.out_time, "HH:mm:ss")
                      .local()
                      .format("HH:mm:ss A")
                    : "--:--"
                }
              />
            </View>
            {/* Mobile Number */}
            <View style={styles.timeView}>
              <CustomText style={styles.userName} children={`Mobile No`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={visitorPopupData?.User?.phone_number}
              />
            </View>
            {/* Location */}
            <View
              style={[
                styles.timeView,
                { paddingBottom: heightPercentageToDP(2) },
              ]}
            >
              <CustomText style={styles.userName} children={`Location`} />
              <CustomText style={styles.colon} children={`:`} />
              <CustomText
                style={styles.valueText}
                children={visitorPopupData?.User?.Location?.location_name}
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: WHITE,
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
    alignItems: "center",
    width: "95%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: heightPercentageToDP(1),
  },
  closeImage: {
    position: "absolute",
    right: heightPercentageToDP(1),
    top: heightPercentageToDP(1),
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignSelf: "center",
  },
  userName: {
    fontFamily: FontName.Gordita_Medium,
    marginLeft: heightPercentageToDP(2),
    fontSize: FontSize(13),
    marginTop: 5,
    width: 100,
    textAlign: "left",
  },
  otherText: {
    color: "#8F8F8F",
    fontSize: FontSize(13),
    marginLeft: heightPercentageToDP(2),
    marginTop: 5,
    marginRight: 80,
  },
  profileView: {
    flexDirection: "row",
  },
  timeView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: heightPercentageToDP(0),
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontFamily: FontName.Gordita_Regular,
    fontSize: FontSize(13),
    textAlign: "center",
    marginLeft: heightPercentageToDP(2),
  },
  colon: {
    width: 10,
  },
});

export default VisitorInfoModal;
