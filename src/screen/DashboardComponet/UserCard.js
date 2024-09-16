// components/Dashboard/UserCard.js
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import ExitSvg from '../../../assets/image/svg/exit.svg';
import {FontName} from '../../theme/FontName';
import {BLACK, DIVIDER_COLOR} from '../../theme/AppColor';

const UserCard = ({user, onExit}) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image source={user.image} style={styles.userImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
          <Text style={styles.company}>{user.company}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onExit}
        accessibilityRole="button"
        accessibilityLabel="Exit button">
        <ExitSvg />
      </TouchableOpacity>
    </View>
    <View style={styles.divider} />
    <View style={styles.infoRow}>
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Check-in Time</Text>
        <Text style={styles.value}>{user.checkInTime}</Text>
      </View>
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Approved by</Text>
        <Text style={styles.value}>{user.approvedBy}</Text>
      </View>
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Host Phone</Text>
        <Text style={styles.value}>{user.hostPhone}</Text>
      </View>
    </View>
    <View style={styles.divider} />
    <View style={styles.additionalInfo}>
      <Text style={styles.label}>Check-in Time</Text>
      <Text style={styles.value}>{user.checkInTime}</Text>
    </View>
  </View>
);

export default React.memo(UserCard);

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
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBlock: {
    // flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#00000099',
    fontFamily: FontName.Gordita_Regular,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  value: {
    fontSize: 14,
    color: BLACK,
    fontFamily: FontName.Gordita_Medium,
    alignSelf: 'flex-start',
  },
  additionalInfo: {
    marginTop: 10,
  },
});
