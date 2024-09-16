// components/Dashboard/CheckOutUI.js
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FontName} from '../../theme/FontName';
import {BLACK, DIVIDER_COLOR} from '../../theme/AppColor';

const CheckOutUI = ({user}) => (
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
      {/* If there's an action button, add here */}
    </View>
    <View style={styles.divider} />
    <View style={styles.infoRow}>
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Check-in Time</Text>
        <Text style={styles.value}>{user.checkInTime}</Text>
      </View>
      <View style={styles.verticalDivider} />
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Check Out</Text>
        <Text style={styles.value}>12:00 PM</Text>
      </View>
    </View>
  </View>
);

export default React.memo(CheckOutUI);

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBlock: {
    flex: 1,
    alignItems: 'center',
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
