// components/Dashboard/CheckOutUI.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {BLACK, DIVIDER_COLOR} from '../../theme/AppColor';
import {FontName} from '../../theme/FontName';
import ExitSvg from '../../../assets/image/svg/exit.svg';
import moment from 'moment-timezone';
import AppLoader from '../../utils/appLoader/AppLoader';
import useApiEffect from '../../hooks/useApiEffect';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ActivityIndicator} from 'react-native-paper';
// const {makeApiRequest, loading} = useApiEffect();
const convertToAMPM = time => {
  //   const date = new Date(`1970-01-01T${time}Z`);
  //   // Get hours and minutes in UTC
  //   let hours = date.getUTCHours();
  //   let minutes = date.getUTCMinutes();

  //   // Determine AM or PM
  //   let period = 'AM';
  //   if (hours >= 12) {
  //     period = 'PM';
  //     if (hours > 12) {
  //       hours = hours - 12;
  //     }
  //   } else if (hours === 0) {
  //     hours = 12; // Midnight case
  //   }

  //   // Add leading zero to minutes if needed
  //   minutes = minutes < 10 ? '0' + minutes : minutes;

  //   // Return the formatted time in AM/PM
  //   return `${hours}:${minutes} ${period}`;

  if (!time) {
    return null; // Handle empty input gracefully
  }

  // Parse the UTC time string
  const utcTime = moment.utc(time, 'HH:mm:ss');

  // Get the local timezone offset in minutes
  const localOffsetMinutes = moment().utcOffset();

  // Adjust the UTC time by the local timezone offset
  const localTime = utcTime.utcOffset(localOffsetMinutes);

  // Format the time in 'hh:mm A' for 12-hour format with AM/PM
  const localTimeString = localTime.format('hh:mm A');

  return localTimeString;
};

const VipList = ({item, onExit}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{uri: item.image}} style={styles.userImage} />
          <View style={styles.details}>
            <Text style={styles.name}>{item.guest_name}</Text>
            <Text style={styles.phone}>{item.phone_number}</Text>
            <Text style={styles.company}>{item.designation_or_company}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onExit(item.guest_id)}
          accessibilityRole="button"
          accessibilityLabel="Exit button">
          <ExitSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Check-in Time</Text>
          <Text style={styles.value}>
            {item.check_in != '' ? convertToAMPM(item.check_in) : 'N/A'}
          </Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.infoBlock}>
          <Text style={[styles.label, {textAlign: 'right'}]}>Check Out</Text>
          <Text style={[styles.value, {textAlign: 'right'}]}>
            {item.check_out != '' ? convertToAMPM(item.check_out) : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const VIPGuests = ({
  guests,
  onExit,
  bottomLoading,
  maxResource,
  onBottomLoading,
}) => {
  return (
    <>
      <FlatList
        // style={{flex: 1}}
        data={guests}
        //   keyExtractor={item => item.id.toString()}

        renderItem={({item, index}) => <VipList item={item} onExit={onExit} />}
        ListEmptyComponent={() => (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text>No data found</Text>
          </View>
        )}
        onEndReached={() => {
          //   console.warn('ANya', guests, maxResource);
          if (!bottomLoading) {
            if (guests?.length < maxResource) {
              onBottomLoading();

              // setBottomLoading(true);
              // setPage(page + 1);
            }
          }
        }}
        //   ListEmptyComponent={<EmptyComponent text={'No Record Found.'} />}
        ListFooterComponent={
          <View style={{height: widthPercentageToDP(5)}}>
            {bottomLoading && <ActivityIndicator size={'large'} />}
          </View>
        }
      />
      {/* <AppLoader isLoading={loading} /> */}
    </>
  );
};

export default React.memo(VIPGuests);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    height: 65,
    width: 65,
    borderRadius: 32.5,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  details: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 14,
    color: BLACK,
    fontFamily: FontName.Gordita_Medium,
    marginBottom: 2,
  },
  phone: {
    fontSize: 13,
    color: '#00000099',
    fontFamily: FontName.Gordita_Regular,
    marginBottom: 2,
  },
  company: {
    fontSize: 13,
    color: BLACK,
    fontFamily: FontName.Gordita_Regular,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER_COLOR,
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBlock: {
    flex: 1,
    // alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#00000099',
    fontFamily: FontName.Gordita_Regular,
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: BLACK,
    fontFamily: FontName.Gordita_Medium,
  },
  verticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: DIVIDER_COLOR,
    marginHorizontal: 10,
  },
});
