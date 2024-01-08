import { View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AssetImage, { LOGO, MENU } from "../../utils/assetsImages/AssetImage";
import { BLACK, BUTTON_BACKGROUND, ORANGE, WHITE } from "../../theme/AppColor";
import { styles } from "./Style";
import LinearGradient from "react-native-linear-gradient";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomText from "../../component/CustomText";
import AppString from "../../utils/appString/AppString";
import CustomButton from "../../component/CustomButton";
import AppLogo from "../../../assets/image/svg/app_logo.svg";
import NavString from "../../utils/navString/NavString";
import FourSquaer from "../../../assets/image/svg/FourSquare.svg";
import { useSelector } from "react-redux";
import { SvgFromUri } from "react-native-svg";
import usePushNotifications from "../../hooks/usePushNotifications";

// punching_type description:=
// 1=>office,2=>on-site, 3=>wfh

const Login = ({ navigation }) => {
  const { sendPushNotification } = usePushNotifications();
  const [clickCount, setClickCount] = useState(0);
  const AppLogo = useSelector((state) => state?.auth?.loginUser);
  const locationId = useSelector(
    (state) => state?.auth?.loginUser?.data?.guard?.location_id
  );
  // const deviceToken = useSelector((state) => state?.fcmToken?.token);
  const deviceToken =
    "ca9RTa-_Ss2ApTnfMZ-O8B:APA91bEm0J1Ig3GoqN0u3zIz-1rU4cWqrbLEJmYxdYcBV2jfuhnp-NUHcXzU2RoHqt7FIMAtJj-8-Z4yHsNxfC7JT44MW0oNILOSDb_GM-h1zQvVA25BV3ikE_03jxw7cn5qv8hVl1sd";

  const handleScanClick = () => {
    navigation.navigate(NavString.SCAN_QR_CODE);
  };

  const handleManualClick = () => {
    navigation.navigate(NavString.VERIFICATION_CODE);
  };

  const handleMenuClick = () => {
    navigation.navigate(NavString.EMPLOYE_LIST_HOME);
  };

  const handleButtonClick = async () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount === 5) {
      sendPushNotification(deviceToken, "Test Notification", `${locationId}`);
    } else if (clickCount > 6) {
      setClickCount(0);
    }
  };

  // useEffect(() => {
  //   const fetchDataFromDatabase = async () => {
  //     try {
  //       const snapshot = await database()
  //         .ref("https://enviro-one-app-default-rtdb.firebaseio.com/")
  //         .once("value");
  //       console.log("====================================");
  //       console.log(snapshot);
  //       console.log("====================================");
  //       const data = snapshot.val();
  //       console.log("Data from Realtime Database:", data);
  //     } catch (error) {
  //       console.error("Error fetching data from Realtime Database:", error);
  //     }
  //   };
  //   fetchDataFromDatabase();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image
          style={styles.topRightImageStyle}
          source={AssetImage.LOGIN_PAGE_TOP_IMAGE}
        />
        {/* <AppLogo width={150} height={80} marginTop={hp(12)} /> */}
        {/* <Image style={styles.logoImage} source={{uri: AppLogo?.data?.logo}} /> */}
        <TouchableOpacity activeOpacity={1} onPress={handleButtonClick}>
          <SvgFromUri
            width={150}
            height={150}
            uri={AppLogo?.data?.logo}
            marginTop={50}
          />
        </TouchableOpacity>

        <View style={styles.qrViewStyle}>
          <Image style={styles.qrImage} source={AssetImage.QRCODE} />
          <View style={styles.roundedView}>
            <Image source={AssetImage.PHONE} />
          </View>
          <View
            style={{
              position: "absolute",
              top: 12,
              left: 140,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: 100,
              backgroundColor: BUTTON_BACKGROUND,
            }}
          >
            <FourSquaer width={15} height={15} />
          </View>
        </View>
        <CustomText
          children={AppString.SCAN_QR_CODE}
          style={styles.scanQrTextStyle}
        />
        <CustomText
          children={AppString.SCAN_QR_MSG}
          style={styles.scanQrMsgStyle}
        />
        <CustomButton
          title={AppString.SCAN_CODE}
          textStyle={styles.buttonTextStyle}
          style={styles.scanButtonStyle}
          onPress={handleScanClick}
        />
        <CustomButton
          title={AppString.Manual_Entry}
          textStyle={styles.manualTextStyle}
          style={styles.manualButtonStyle}
          onPress={handleManualClick}
        />
      </View>

      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuClick}>
        <Image source={MENU} />
      </TouchableOpacity>
    </View>
  );
};

export default Login;
