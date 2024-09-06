import {
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  PanResponder,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AssetImage, {MENU} from '../../utils/assetsImages/AssetImage';
import {APPLOADER_COLOR, WHITE} from '../../theme/AppColor';
import {styles} from './Style';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomText from '../../component/CustomText';
import AppString from '../../utils/appString/AppString';
import CustomButton from '../../component/CustomButton';
import AppLogo from '../../../assets/image/svg/app_logo.svg';
import NavString from '../../utils/navString/NavString';
import FourSquaer from '../../../assets/image/svg/FourSquare.svg';
import {useDispatch, useSelector} from 'react-redux';
import {SvgFromUri} from 'react-native-svg';
import usePushNotifications from '../../hooks/usePushNotifications';
import {GET_QR_CODE} from '../../sevices/ApiEndPoint';
import useApiEffect from '../../hooks/useApiEffect';
import {ShowToast, capitalizeFirstLetter} from '../../utils/constant/Constant';
import {setDbToken, setLocationId} from '../../redux/slices/AuthSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppLoader from '../../utils/appLoader/AppLoader';

// punching_type description:=
// 1=>office,2=>on-site, 3=>wfh
var tabs = [];
const GenerateQrCode = ({navigation}) => {
  const disPatch = useDispatch();
  const {makeApiRequest} = useApiEffect();
  const [QrCodeImage, setQrCodeImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const AppLogo = useSelector(state => state?.auth?.loginUser);
  const locationId = useSelector(
    state => state?.auth?.loginUser?.data?.guard?.location_id,
  );
  const guardDetails = useSelector(
    state => state?.auth?.loginUser?.data?.guard,
  );

  const dafaultSelectedTab = useSelector(state => state?.auth?.dbToken);

  const companyid = useSelector(
    state => state?.auth?.loginUser?.data?.guard?.company_id,
  );
  const companyIdsArray = companyid?.split(',');
  const [activeTab, setActiveTab] = useState(
    dafaultSelectedTab == null ? companyIdsArray[0] : dafaultSelectedTab,
  );

  useEffect(() => {
    // Here we are store selected tab in local storage so
    // we can pass in every api where need db token
    disPatch(setDbToken('agl'));
    tabs = [];
    for (let i = 0; i < companyIdsArray?.length; i++) {
      let data = {
        id: companyIdsArray[i],
        label: companyIdsArray[i],
      };
      tabs.push(data);
    }
  }, []);

  const handleManualClick = () => {
    navigation.navigate(NavString.Dashboard);
  };

  const handleMenuClick = () => {
    navigation.navigate(NavString.EMPLOYE_LIST_HOME);
  };

  const handleTabChange = tabId => {
    setActiveTab(tabId);
    generateQrCodeApi(tabId);
    // Here we are store selected tab in local storage so
    // we can pass in every api where need db token
    disPatch(setDbToken(tabId));
  };

  // GET QR CODE API CALL
  useEffect(() => {
    generateQrCodeApi(activeTab);
  }, []);

  const generateQrCodeApi = async activeTab => {
    const apiResponce = await makeApiRequest({
      url: GET_QR_CODE,
      isToken: true,
      method: 'POST',
      data: {
        id: guardDetails?.id + '',
        employee_id: guardDetails?.employee_id,
      },
      dbToken: activeTab,
    });
    if (apiResponce != undefined)
      if (apiResponce?.status == true) {
        setRefreshing(false);
        setQrCodeImage(apiResponce?.data?.qrcode);
      } else {
        setRefreshing(false);
        console.log('GET QR CODE API ERR: ', apiResponce);
        ShowToast(apiResponce?.error?.message);
      }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      generateQrCodeApi(activeTab);
    }, 2000); // Simulated delay
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 50) {
          // Check if user has pulled down at least 50 pixels
          handleRefresh(); // Trigger refresh action
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.view}>
        <Image
          style={styles.topRightImageStyle}
          source={AssetImage.LOGIN_PAGE_TOP_IMAGE}
        />
        {companyIdsArray.length > 1 ? (
          <View style={styles.tabBarContainer}>
            {tabs?.map(tab => {
              return (
                <TouchableOpacity
                  activeOpacity={tab.id !== activeTab ? 0.5 : 1}
                  key={tab.id}
                  style={[
                    styles.tabButton,
                    tab?.id === activeTab ? styles.activeTextColor : null,
                  ]}
                  onPress={() => {
                    if (tab.id !== activeTab) handleTabChange(tab.id);
                  }}>
                  <CustomText
                    style={[
                      styles.tabText,
                      tab?.id === activeTab
                        ? {color: WHITE}
                        : {color: '#9E9E9E'},
                    ]}
                    children={capitalizeFirstLetter(tab.label)}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
        {/* <AppLogo width={150} height={80} marginTop={hp(12)} /> */}
        {/* <Image style={styles.logoImage} source={{uri: AppLogo?.data?.logo}} /> */}
        <TouchableOpacity activeOpacity={1}>
          {/* <SvgFromUri
            width={150}
            height={150}
            uri={AppLogo?.data?.logo}
            marginTop={companyIdsArray.length > 1 ? 0 : 0}
          /> */}
          <Image
            resizeMode="contain"
            style={{
              width: 150,
              height: 150,
              marginTop: companyIdsArray.length > 1 ? 0 : 80,
            }}
            source={{uri: AppLogo?.data?.logo}}
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
        <Image
          resizeMode="contain"
          style={styles.qrImage}
          source={{uri: QrCodeImage}}
        />
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

      <AppLoader isLoading={refreshing} bgColor={APPLOADER_COLOR} />
    </View>
  );
};

export default GenerateQrCode;
