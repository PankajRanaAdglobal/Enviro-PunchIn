import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from './Style';
import {LIST_JSON} from '../../../../assets/json/ListJson';
import CustomText from '../../../component/CustomText';
import {CLOCK} from '../../../utils/assetsImages/AssetImage';
import {ORANGE, RED, TRANSPARENT, WHITE} from '../../../theme/AppColor';
import EmptyComponent from '../../../component/EmptyComponent';
import Logout from '../../../../assets/image/svg/logout.svg';
import Right from '../../../../assets/image/svg/right.svg';
import {s} from 'react-native-size-matters';

export default function VisitorEmployee() {
  const RenderList = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.view} activeOpacity={1} id={item?.id}>
        <View style={styles.flatlistView}>
          <Image style={styles.profileImage} source={item?.image} />

          {/* Name View */}
          <View style={styles.nameView}>
            <CustomText style={styles.nameText} children={item?.name} />
            <CustomText style={styles.otherText} children={item?.company} />
            <CustomText style={styles.otherText} children={item?.designation} />
          </View>
          {/* Time */}
          {item?.status == 'reject' ? (
            <View style={styles.rightImage}>
              <Right />
            </View>
          ) : (
            <TouchableOpacity style={styles.timeView}>
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
            <CustomText style={styles.checkinTime} children={'10:00 AM'} />
          </View>
          {/* Line */}
          <View style={styles.lineVertical}></View>
          {/* Check Out */}
          <View style={styles.checkin}>
            <CustomText style={styles.checkinText} children={'Check Out'} />
            <CustomText style={styles.checkinTime} children={'00:00'} />
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
        data={LIST_JSON}
        renderItem={RenderList}
        ListEmptyComponent={<EmptyComponent text={'No Record Found'} />}
      />
    </View>
  );
}
