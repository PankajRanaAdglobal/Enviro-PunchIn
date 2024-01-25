//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderCompo from "../../component/HeaderCompo";
import TextInputWithLabel from "../../component/TextInputWithLabel";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import UserIcon from "../../../assets/image/userPNG.png";
import ClockPNG from "../../../assets/image/phonePNG.png";

import NavString from "../../utils/navString/NavString";
import { FontName } from "../../theme/FontName";
import CustomButton from "../../component/CustomButton";
import { BLACK, PRIMARY_COLOR } from "../../theme/AppColor";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as yup from "yup";
import { Formik } from "formik";
import { ShowToast } from "../../utils/constant/Constant";
import ErrorMessage from "../../component/ErrorMessage";
import { PUNCH_IN, VISITOR_TYPE } from "../../sevices/ApiEndPoint";
import useApiEffect from "../../hooks/useApiEffect";
import AppLoader from "../../utils/appLoader/AppLoader";
import { useDispatch, useSelector } from "react-redux";
import { verificationAction } from "../../redux/slices/verificationSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// create a component
const VerificatioinCode = ({ navigation }) => {
  const dispatch = useDispatch();
  const { makeApiRequest, loading } = useApiEffect();
  const [userName, setUserName] = useState("");
  const [contact, setcontact] = useState("");

  const locationId = useSelector(
    (state) => state?.auth?.loginUser?.data?.guard?.location_id
  );

  const verificationHandel = () => {
    if (userName === "") {
      ShowToast("Please enter name");
    } else if (contact === "") {
      ShowToast("Please enter contact number");
    } else if (contact.length != 10) {
      ShowToast("Contact number should be 10 digit ");
    } else {
      verificationAPI();
    }
  };

  const verificationAPI = async () => {
    const body = {
      name: userName,
      contact_number: contact,
      location_id: locationId + "",
    };
    const apiData = await makeApiRequest({
      url: PUNCH_IN,
      method: "POST",
      isToken: true,
      data: body,
      showProgress: true,
    });

    if (apiData != undefined) {
      if (apiData?.status == true) {
        dispatch(verificationAction(apiData));
        ShowToast(apiData?.message);
        navigation.navigate(NavString.Otp);
      } else {
        ShowToast(apiData?.message);
      }
    } else ShowToast("Something went wrong! Please try after some time");
  };

  const onChangeNameText = (text) => {
    setUserName(text);
  };
  const onChangeContactText = (text) => {
    setcontact(text);
  };

  return (
    <View style={styles.container}>
      <HeaderCompo label={"Visitor Details"} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid
      >
        <View>
          <TextInputWithLabel
            placeholder="Enter Name"
            inputStyle={{ marginBottom: moderateVerticalScale(20) }}
            textInputStyle={{ marginRight: 10 }}
            leftIcon={UserIcon}
            onChangeText={(name) => onChangeNameText(name)}
            value={userName}
          />

          <TextInputWithLabel
            placeholder="Enter Contact Number"
            inputStyle={{ marginBottom: moderateVerticalScale(20) }}
            textInputStyle={{ marginRight: 10 }}
            leftIcon={ClockPNG}
            onChangeText={(contact) => onChangeContactText(contact)}
            maxLength={10}
            maxlength="10"
            keyboardType="number-pad"
            value={contact}
          />

          <CustomButton
            title={"Send Verification Code"}
            textStyle={{
              fontSize: 16,
              fontWeight: "500",
              fontFamily: FontName.Gordita_Regular,
            }}
            style={{
              backgroundColor: BLACK,
              borderRadius: 8,
              width: widthPercentageToDP(95),
              height: heightPercentageToDP(5),
              maringHorizontal: 20,
            }}
            onPress={() => verificationHandel()}
          />
        </View>
      </KeyboardAwareScrollView>
      <AppLoader isLoading={loading} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VerificatioinCode;
