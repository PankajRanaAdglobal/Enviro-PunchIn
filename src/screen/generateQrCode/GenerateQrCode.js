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
import { GET_QR_CODE } from "../../sevices/ApiEndPoint";
import useApiEffect from "../../hooks/useApiEffect";

// punching_type description:=
// 1=>office,2=>on-site, 3=>wfh

const GenerateQrCode = ({ navigation }) => {
  const { sendPushNotification } = usePushNotifications();
  const { makeApiRequest, loading } = useApiEffect();
  const [clickCount, setClickCount] = useState(0);
  const [QrCodeImage, setQrCodeImage] = useState(null);
  const AppLogo = useSelector((state) => state?.auth?.loginUser);
  const locationId = useSelector(
    (state) => state?.auth?.loginUser?.data?.guard?.location_id
  );
  // const deviceToken = useSelector((state) => state?.fcmToken?.token);
  const deviceToken =
    "fQVpj9HKR0mvqIDtYf1Gar:APA91bGd1ekUBE6w1w9NrOC65UZU9KZfBsakORvDkLn4khxT93eJxm7qCYtRrCGar-L0w59ZUITfhIKjBCZyMcZ7c7KkLsUK0pRjdJhO4-48SKbZhWUI0tIAsXOKJG-wb6Boj_X2i-v3";

  const handleManualClick = () => {
    navigation.navigate(NavString.VERIFICATION_CODE);
  };

  const handleMenuClick = () => {
    navigation.navigate(NavString.EMPLOYE_LIST_HOME);
  };

  const handleButtonClick = async () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount === 5) {
      sendPushNotification(deviceToken, "Test", `${locationId}`);
    } else if (clickCount > 6) {
      setClickCount(0);
    }
  };

  // GET QR CODE API CALL
  useEffect(() => {
    const generateQrCodeApi = async () => {
      const apiResponce = await makeApiRequest({
        url: GET_QR_CODE,
        isToken: true,
        method: "POST",
        data: { emp_code: 3133 + "" },
      });
      if (apiResponce?.status == true) {
        setQrCodeImage(apiResponce?.data?.qrcode)
      } else console.log("GET QR CODE API ERR: ", apiResponce);
    };
    generateQrCodeApi();
  }, []);

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

        <CustomText
          children={AppString.SCAN_QR_CODE}
          style={styles.scanQrTextStyle}
        />
        <CustomText
          children={AppString.SCAN_QR_MSG}
          style={styles.scanQrMsgStyle}
        />
         <Image resizeMode='contain' style={styles.qrImage} source={{ uri: QrCodeImage }} />
      </View>

      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuClick}>
        <Image source={MENU} />
      </TouchableOpacity>
      {/* Manual Button */}
      <CustomButton
        title={AppString.Manual_Entry}
        textStyle={styles.manualTextStyle}
        style={styles.manualButtonStyle}
        onPress={handleManualClick}
      />
    </View>
  );
};

export default GenerateQrCode;
