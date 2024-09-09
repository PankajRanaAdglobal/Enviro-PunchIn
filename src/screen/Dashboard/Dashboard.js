//import liraries
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import DashboardNav from '../../component/DashboardNav';
import {FontName} from '../../theme/FontName';
import ExitSvg from '../../../assets/image/svg/exit.svg';
import VerificatioinCode from '../OTPDetail/VerificatioinCode';
// import {UserImage} from '../../../assets/image/userImgPNG.png';

const {width} = Dimensions.get('window');

// create a component
const Dashboard = () => {
  const tabWidth = width / 3; // Assuming you have 3 tabs
  const translateX = useRef(new Animated.Value(0)).current;
  const [tap, setTap] = useState(0);
  //   let tap = 0;

  const onTabPress = index => {
    setTap(index);
    Animated.spring(translateX, {
      toValue: index * tabWidth,
      useNativeDriver: true,
    }).start();
    // }
  };
  {
    /* DeshboardUI */
  }
  const DeshboardUI = () => {
    return (
      <View
        style={{
          flex: 1,
          margin: 10,
        }}>
        <View
          style={{
            height: 250,
            backgroundColor: 'white',
            borderRadius: 3,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            marginBottom: 10,
            elevation: 0.5,
          }}>
          <View
            style={{
              padding: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 65,
                  width: 65,
                  backgroundColor: 'white',
                  borderRadius: 32.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/image/userImgPNG.png')} // Path to the local image
                  style={{height: 65, width: 65, borderRadius: 32.5}}
                />
              </View>
              {/* View for userDetails */}
              <View style={{paddingLeft: 12}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: FontName.Gordita_Medium,
                    paddingVertical: 2,
                  }}>
                  Lovekush Kumar
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#00000099',
                    fontFamily: FontName.Gordita_Regular,
                    paddingVertical: 2,
                  }}>
                  8364729927
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#000000',
                    fontFamily: FontName.Gordita_Regular,
                    paddingVertical: 2,
                  }}>
                  Hakuhodo
                </Text>
              </View>
            </View>
            {/* image */}
            <View
              style={{
                height: 65,
                width: 65,
                backgroundColor: 'white',
                borderRadius: 32.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ExitSvg />
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#00000014',
              marginHorizontal: 10,
            }}></View>

          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 12,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {/* checkIn TimeView */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  color: '#00000099',
                  fontFamily: FontName.Gordita_Regular,
                  paddingVertical: 2,
                }}>
                Check-in Time
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: FontName.Gordita_Medium,
                  paddingVertical: 2,
                }}>
                10:00 AM
              </Text>
            </View>
            {/* Approved details */}
            <View style={{}}>
              <Text
                style={{
                  fontSize: 13,
                  color: '#00000099',
                  fontFamily: FontName.Gordita_Regular,
                  paddingVertical: 2,
                }}>
                Approved by
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: FontName.Gordita_Medium,
                  paddingVertical: 2,
                }}>
                Sunil kumawat
              </Text>
            </View>
            {/* Host details */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  color: '#00000099',
                  fontFamily: FontName.Gordita_Regular,
                  paddingVertical: 2,
                }}>
                Host Phone
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: FontName.Gordita_Medium,
                  paddingVertical: 2,
                }}>
                8561887785
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#00000014',
              marginHorizontal: 15,
            }}></View>
          <View style={{marginLeft: 15, marginTop: 12}}>
            <Text
              style={{
                fontSize: 13,
                color: '#00000099',
                fontFamily: FontName.Gordita_Regular,
                paddingVertical: 2,
              }}>
              Check-in Time
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#000000',
                fontFamily: FontName.Gordita_Medium,
                paddingVertical: 2,
              }}>
              10:00 AM
            </Text>
          </View>
        </View>
      </View>
    );
  };

  /* DeshboardUI */
  const CheckOutUI = () => {
    return (
      <View
        style={{
          flex: 1,
          margin: 10,
        }}>
        <View
          style={{
            height: 180,
            backgroundColor: 'white',
            borderRadius: 3,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            marginBottom: 10,
            elevation: 0.5,
          }}>
          <View
            style={{
              padding: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 65,
                  width: 65,
                  backgroundColor: 'white',
                  borderRadius: 32.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/image/userImgPNG.png')} // Path to the local image
                  style={{height: 65, width: 65, borderRadius: 32.5}}
                />
              </View>
              {/* View for userDetails */}
              <View style={{paddingLeft: 12}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: FontName.Gordita_Medium,
                    paddingVertical: 2,
                  }}>
                  Lovekush Kumar
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#00000099',
                    fontFamily: FontName.Gordita_Regular,
                    paddingVertical: 2,
                  }}>
                  8364729927
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#000000',
                    fontFamily: FontName.Gordita_Regular,
                    paddingVertical: 2,
                  }}>
                  Hakuhodo
                </Text>
              </View>
            </View>
            {/* image */}
            <View
              style={{
                height: 65,
                width: 65,
                backgroundColor: 'white',
                borderRadius: 32.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#00000014',
              marginHorizontal: 10,
            }}></View>

          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 12,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {/* checkIn TimeView */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  color: '#00000099',
                  fontFamily: FontName.Gordita_Regular,
                  paddingVertical: 2,
                }}>
                Check-in Time
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: FontName.Gordita_Medium,
                  paddingVertical: 2,
                }}>
                10:00 AM
              </Text>
            </View>
            {/* Approved details */}
            <View
              style={{
                height: '100%',
                width: 1,
                backgroundColor: '#00000014',
              }}></View>
            {/* Host details */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  color: '#00000099',
                  fontFamily: FontName.Gordita_Regular,
                  paddingVertical: 2,
                }}>
                Check Out
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: FontName.Gordita_Medium,
                  paddingVertical: 2,
                }}>
                12:00 PM
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {}, [tap]);
  return (
    <View style={{backgroundColor: '#F9FAFB', flex: 1}}>
      <View style={{flexDirection: ''}}>
        <DashboardNav />
      </View>
      <View>
        <View style={styles.container}>
          {/* Animated sliding indicator */}
          <Animated.View
            style={[
              styles.indicator,
              {
                marginLeft: tap === 0 ? 5 : 0,
                transform: [{translateX}],
                width: tap === 2 ? tabWidth - 30 : tabWidth - 20,
              },
            ]}
          />

          {/* Tab buttons */}
          <TouchableOpacity style={styles.tab} onPress={() => onTabPress(0)}>
            <Text
              style={[styles.tabText, {color: tap == 0 ? 'white' : 'black'}]}>
              Dashboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => onTabPress(1)}>
            <Text
              style={[styles.tabText, {color: tap == 1 ? 'white' : 'black'}]}>
              Check-in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => onTabPress(2)}>
            <Text
              style={[styles.tabText, {color: tap == 2 ? 'white' : 'black'}]}>
              Check-out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {tap == 0 ? (
        <DeshboardUI />
      ) : tap == 1 ? (
        <VerificatioinCode />
      ) : (
        <CheckOutUI />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    // backgroundColor: '#f0f0f0',
    position: 'relative',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    marginBottom: 10,
    elevation: 0.5,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: FontName.Gorditas_Bold,
  },
  indicator: {
    alignItems: 'center',
    position: 'absolute',
    height: '80%',
    backgroundColor: 'black',
    borderRadius: 5,

    // marginHorizontal: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

//make this component available to the app
export default Dashboard;
