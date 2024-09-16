import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';
import Logo from '../../../assets/image/svg/logo';
import ScanQR from '../../../assets/image/ScanQr.png';
import TextInputWithLabel from '../../component/TextInputWithLabel';
import CustomText from '../../component/CustomText';
import {FontName} from '../../theme/FontName';
import {BLACK, BLACK60, WHITE} from '../../theme/AppColor';
import CustomButton from '../../component/CustomButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import NavString from '../../utils/navString/NavString';
// import {Image} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

const Actions = {
  QR_CODE: 'Qr_Code',
  MANUAL_ENTERY: 'Manual_Entry',
  VISITOR_SCANNER: 'Vistior_Scanner',
};

export default function ChekIn({navigation}) {
  const handelAction = action => {
    switch (action) {
      case Actions.QR_CODE:
        return navigation.navigate(NavString.GENERATE_QR_CODE);
      case Actions.MANUAL_ENTERY:
        return navigation.navigate(NavString.Dashboard);
      case Actions.VISITOR_SCANNER:
        return navigation.navigate(NavString.SCAN_QR_CODE);
      default:
        break;
    }
  };

  return (
    // <View style={{backgroundColor: 'red'}}>
    <ImageBackground
      source={require('../../../assets/image/background_dashboard.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{top: 77}}>
          <Logo />
        </View>
        <View style={{marginTop: 130, resizeMode: 'cover'}}>
          <Image
            source={require('../../../assets/image/ScanQr.png')}
            style={{
              width: 206,
              height: 217,
              resizeMode: 'contain',
            }}></Image>
          {/* <ScanQR style={{resizeMode: 'cover'}} /> */}
        </View>

        <CustomText
          children={'Scan QR Code'}
          style={{fontFamily: FontName.Gorditas_Bold, top: 16}}
          fontSize={20}
          fontWeight={'700'}
        />
        <CustomText
          children={'Scan the code on site or on your device to check in'}
          style={{
            top: 16,
            fontFamily: FontName.Gordita_Regular,
            paddingHorizontal: 50,
            lineHeight: 20,
            textAlign: 'center',
          }}
          fontSize={14}
          fontWeight={'400'}
        />
        <CustomButton
          title={'QR Code'}
          style={{
            marginTop: 49,
            width: widthPercentageToDP(60),
            borderRadius: heightPercentageToDP(10),
          }}
          onPress={() => handelAction(Actions.QR_CODE)}
          textStyle={{
            fontFamily: FontName.Gorditas_Bold,
            fontWeight: '700',
            fontSize: 16,
          }}
        />
        <CustomButton
          title={'Manual Entry'}
          style={{
            backgroundColor: WHITE,
            borderWidth: 1,
            marginVertical: 20,
            width: widthPercentageToDP(60),
            borderRadius: heightPercentageToDP(10),
            borderWidth: 2,
            fontSize: 16,
          }}
          onPress={() => handelAction(Actions.MANUAL_ENTERY)}
          textStyle={{color: BLACK, fontWeight: '700', fontSize: 16}}
        />

        <CustomButton
          title={'Visitor Scanner'}
          style={{
            backgroundColor: WHITE,
            borderWidth: 1,
            width: widthPercentageToDP(60),
            borderRadius: heightPercentageToDP(10),
            borderWidth: 2,
          }}
          onPress={() => handelAction(Actions.VISITOR_SCANNER)}
          textStyle={{color: BLACK, fontWeight: '700', fontSize: 16}}
        />
      </View>
    </ImageBackground>
  );
}
