import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from './Style';
import {LIST_JSON} from '../../../../assets/json/ListJson';
import CustomText from '../../../component/CustomText';
import {CLOCK} from '../../../utils/assetsImages/AssetImage';
import {ORANGE, RED, TRANSPARENT, WHITE} from '../../../theme/AppColor';
import EmptyComponent from '../../../component/EmptyComponent';

export default function RejectEmpList() {
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
        <Image style={styles.profileImage} source={item?.image} />
        {/* Name View */}
        <View style={styles.nameView}>
          <CustomText style={styles.nameText} children={item?.name} />
          <CustomText style={styles.otherText} children={item?.company} />
          <CustomText style={styles.otherText} children={item?.designation} />
        </View>
        {/* Time */}
        <View style={styles.timeView}>
          <Image source={CLOCK} />
          <CustomText style={styles.timeText} children={item?.time} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={[]}
        renderItem={RenderList}
        ListEmptyComponent={
          <>
            <EmptyComponent text={'No Record Found'} />
          </>
        }
      />
    </View>
  );
}
