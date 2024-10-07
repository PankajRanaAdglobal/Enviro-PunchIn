// //import liraries
// import React, {Component, useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   Dimensions,
//   Image,
// } from 'react-native';
// import DashboardNav from '../../component/DashboardNav';
// import {FontName} from '../../theme/FontName';
// import ExitSvg from '../../../assets/image/svg/exit.svg';
// import VerificatioinCode from '../OTPDetail/VerificatioinCode';
// import Search from '../../../assets/image/svg/search.svg';
// import TextInputWithLabel from '../../component/TextInputWithLabel';
// import {BLACK, BORDER_COLOR, SEARCHICON_BACKGROUND} from '../../theme/AppColor';
// import {heightPercentageToDP} from 'react-native-responsive-screen';
// // import {UserImage} from '../../../assets/image/userImgPNG.png';

// const {width} = Dimensions.get('window');

// // create a component
// const Dashboard = () => {
//   const tabWidth = width / 3; // Assuming you have 3 tabs
//   const translateX = useRef(new Animated.Value(0)).current;
//   const [tap, setTap] = useState(0);
//   const [search, setSearch] = useState('');

//   //   let tap = 0;

//   const onTabPress = index => {
//     setTap(index);
//     Animated.spring(translateX, {
//       toValue: index * tabWidth,
//       useNativeDriver: true,
//     }).start();
//     // }
//   };
//   // search bar
//   const onChangeText = e => {
//     setSearch(e);
//   };
//   const handleSearchClick = () => {};
//   // FILTER CLICK
//   const handleFilterClick = () => {
//     setSearch('');
//     setFilterData(null);
//     setShowFilter(true);
//   };
//   {
//     /* DeshboardUI */
//   }
//   const DeshboardUI = () => {
//     return (
//       <View
//         style={{
//           flex: 1,
//           margin: 10,
//         }}>
//         {/* search bar */}
//         <View style={styles.searchView}>
//           <TextInputWithLabel
//             inputStyle={styles.textinput}
//             style={styles.textinput}
//             placeholder={'Search'}
//             onChangeText={onChangeText}
//             value={search}
//           />
//           <TouchableOpacity
//             onPress={handleSearchClick}
//             activeOpacity={0.7}
//             style={styles.searchIcon}>
//             <Search width={20} height={20} />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             height: 250,
//             backgroundColor: 'white',
//             borderRadius: 3,
//             shadowColor: '#000',
//             shadowOffset: {width: 0, height: 2},
//             shadowOpacity: 0.2,
//             marginBottom: 10,
//             elevation: 0.5,
//             marginTop: 20,
//           }}>
//           <View
//             style={{
//               padding: 15,
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//             }}>
//             <View style={{flexDirection: 'row'}}>
//               <View
//                 style={{
//                   height: 65,
//                   width: 65,
//                   backgroundColor: 'white',
//                   borderRadius: 32.5,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Image
//                   source={require('../../../assets/image/userImgPNG.png')} // Path to the local image
//                   style={{height: 65, width: 65, borderRadius: 32.5}}
//                 />
//               </View>
//               {/* View for userDetails */}
//               <View style={{paddingLeft: 12}}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: '#000000',
//                     fontFamily: FontName.Gordita_Medium,
//                     paddingVertical: 2,
//                   }}>
//                   Lovekush Kumar
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     color: '#00000099',
//                     fontFamily: FontName.Gordita_Regular,
//                     paddingVertical: 2,
//                   }}>
//                   8364729927
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     color: '#000000',
//                     fontFamily: FontName.Gordita_Regular,
//                     paddingVertical: 2,
//                   }}>
//                   Hakuhodo
//                 </Text>
//               </View>
//             </View>
//             {/* image */}
//             <View
//               style={{
//                 height: 65,
//                 width: 65,
//                 backgroundColor: 'white',
//                 borderRadius: 32.5,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <ExitSvg />
//             </View>
//           </View>
//           <View
//             style={{
//               height: 1,
//               backgroundColor: '#00000014',
//               marginHorizontal: 10,
//             }}></View>

//           <View
//             style={{
//               paddingHorizontal: 10,
//               paddingVertical: 12,
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//             }}>
//             {/* checkIn TimeView */}
//             <View>
//               <Text
//                 style={{
//                   fontSize: 13,
//                   color: '#00000099',
//                   fontFamily: FontName.Gordita_Regular,
//                   paddingVertical: 2,
//                 }}>
//                 Check-in Time
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#000000',
//                   fontFamily: FontName.Gordita_Medium,
//                   paddingVertical: 2,
//                 }}>
//                 10:00 AM
//               </Text>
//             </View>
//             {/* Approved details */}
//             <View style={{}}>
//               <Text
//                 style={{
//                   fontSize: 13,
//                   color: '#00000099',
//                   fontFamily: FontName.Gordita_Regular,
//                   paddingVertical: 2,
//                 }}>
//                 Approved by
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#000000',
//                   fontFamily: FontName.Gordita_Medium,
//                   paddingVertical: 2,
//                 }}>
//                 Sunil kumawat
//               </Text>
//             </View>
//             {/* Host details */}
//             <View>
//               <Text
//                 style={{
//                   fontSize: 13,
//                   color: '#00000099',
//                   fontFamily: FontName.Gordita_Regular,
//                   paddingVertical: 2,
//                 }}>
//                 Host Phone
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#000000',
//                   fontFamily: FontName.Gordita_Medium,
//                   paddingVertical: 2,
//                 }}>
//                 8561887785
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               height: 1,
//               backgroundColor: '#00000014',
//               marginHorizontal: 15,
//             }}></View>
//           <View style={{marginLeft: 15, marginTop: 12}}>
//             <Text
//               style={{
//                 fontSize: 13,
//                 color: '#00000099',
//                 fontFamily: FontName.Gordita_Regular,
//                 paddingVertical: 2,
//               }}>
//               Check-in Time
//             </Text>
//             <Text
//               style={{
//                 fontSize: 14,
//                 color: '#000000',
//                 fontFamily: FontName.Gordita_Medium,
//                 paddingVertical: 2,
//               }}>
//               10:00 AM
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   /* DeshboardUI */
//   const CheckOutUI = () => {
//     return (
//       <View
//         style={{
//           flex: 1,
//           margin: 10,
//         }}>
//         <View
//           style={{
//             height: 180,
//             backgroundColor: 'white',
//             borderRadius: 3,
//             shadowColor: '#000',
//             shadowOffset: {width: 0, height: 2},
//             shadowOpacity: 0.2,
//             marginBottom: 10,
//             elevation: 0.5,
//           }}>
//           <View
//             style={{
//               padding: 15,
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//             }}>
//             <View style={{flexDirection: 'row'}}>
//               <View
//                 style={{
//                   height: 65,
//                   width: 65,
//                   backgroundColor: 'white',
//                   borderRadius: 32.5,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Image
//                   source={require('../../../assets/image/userImgPNG.png')} // Path to the local image
//                   style={{height: 65, width: 65, borderRadius: 32.5}}
//                 />
//               </View>
//               {/* View for userDetails */}
//               <View style={{paddingLeft: 12}}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: '#000000',
//                     fontFamily: FontName.Gordita_Medium,
//                     paddingVertical: 2,
//                   }}>
//                   Lovekush Kumar
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     color: '#00000099',
//                     fontFamily: FontName.Gordita_Regular,
//                     paddingVertical: 2,
//                   }}>
//                   8364729927
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     color: '#000000',
//                     fontFamily: FontName.Gordita_Regular,
//                     paddingVertical: 2,
//                   }}>
//                   Hakuhodo
//                 </Text>
//               </View>
//             </View>
//             {/* image */}
//             <View
//               style={{
//                 height: 65,
//                 width: 65,
//                 backgroundColor: 'white',
//                 borderRadius: 32.5,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}></View>
//           </View>
//           <View
//             style={{
//               height: 1,
//               backgroundColor: '#00000014',
//               marginHorizontal: 10,
//             }}></View>

//           <View
//             style={{
//               paddingHorizontal: 10,
//               paddingVertical: 12,
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//             }}>
//             {/* checkIn TimeView */}
//             <View>
//               <Text
//                 style={{
//                   fontSize: 13,
//                   color: '#00000099',
//                   fontFamily: FontName.Gordita_Regular,
//                   paddingVertical: 2,
//                 }}>
//                 Check-in Time
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#000000',
//                   fontFamily: FontName.Gordita_Medium,
//                   paddingVertical: 2,
//                 }}>
//                 10:00 AM
//               </Text>
//             </View>
//             {/* Approved details */}
//             <View
//               style={{
//                 height: '100%',
//                 width: 1,
//                 backgroundColor: '#00000014',
//               }}></View>
//             {/* Host details */}
//             <View>
//               <Text
//                 style={{
//                   fontSize: 13,
//                   color: '#00000099',
//                   fontFamily: FontName.Gordita_Regular,
//                   paddingVertical: 2,
//                 }}>
//                 Check Out
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#000000',
//                   fontFamily: FontName.Gordita_Medium,
//                   paddingVertical: 2,
//                 }}>
//                 12:00 PM
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   useEffect(() => {}, [tap]);
//   return (
//     <View style={{backgroundColor: '#F9FAFB', flex: 1}}>
//       <View style={{flexDirection: ''}}>
//         <DashboardNav />
//       </View>
//       <View>
//         <View style={styles.container}>
//           {/* Animated sliding indicator */}
//           <Animated.View
//             style={[
//               styles.indicator,
//               {
//                 marginLeft: tap === 0 ? 5 : 0,
//                 transform: [{translateX}],
//                 width: tap === 2 ? tabWidth - 30 : tabWidth - 20,
//               },
//             ]}
//           />

//           {/* Tab buttons */}
//           <TouchableOpacity style={styles.tab} onPress={() => onTabPress(0)}>
//             <Text
//               style={[styles.tabText, {color: tap == 0 ? 'white' : 'black'}]}>
//               Dashboard
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tab} onPress={() => onTabPress(1)}>
//             <Text
//               style={[styles.tabText, {color: tap == 1 ? 'white' : 'black'}]}>
//               Check-in
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tab} onPress={() => onTabPress(2)}>
//             <Text
//               style={[styles.tabText, {color: tap == 2 ? 'white' : 'black'}]}>
//               Check-out
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       {tap == 0 ? (
//         <DeshboardUI />
//       ) : tap == 1 ? (
//         <VerificatioinCode />
//       ) : (
//         <CheckOutUI />
//       )}
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: '#FFFFFF',
//     // backgroundColor: '#f0f0f0',
//     position: 'relative',
//     margin: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     marginBottom: 10,
//     elevation: 0.5,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 15,
//     alignItems: 'center',
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//     fontFamily: FontName.Gorditas_Bold,
//   },
//   indicator: {
//     alignItems: 'center',
//     position: 'absolute',
//     height: '80%',
//     backgroundColor: 'black',
//     borderRadius: 5,

//     // marginHorizontal: 10,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   searchView: {
//     flexDirection: 'row',
//     width: '95%',
//     borderWidth: 1,
//     alignSelf: 'center',
//     borderRadius: 100,
//     height: 50,
//     alignItems: 'center',
//     borderColor: BORDER_COLOR,
//     marginTop: heightPercentageToDP(2),
//     justifyContent: 'space-between',
//   },
//   textinput: {
//     textAlign: 'left',
//     fontFamily: FontName.Gordita_Regular,
//     borderWidth: 0,
//     width: '80%',
//     // backgroundColor: 'red',
//     borderRadius: 0,
//     paddingHorizontal: 0,
//     paddingVertical: 0,
//     marginLeft: 0,
//     color: BLACK,
//   },
//   searchIcon: {
//     backgroundColor: SEARCHICON_BACKGROUND,
//     padding: 10,
//     borderRadius: 100,
//     marginRight: 5,
//   },
// });

// //make this component available to the app
// export default Dashboard;

// components/Dashboard/Dashboard.js
// components/Dashboard/Dashboard.js
import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import DashboardNav from '../../component/DashboardNav';
import TabBar from '../DashboardComponet/TabBar';
import SearchBar from '../DashboardComponet/SearchBar';
import UserCard from '../DashboardComponet/UserCard';
import VerificatioinCode from '../OTPDetail/VerificatioinCode';
import CheckOutUI from '../DashboardComponet/CheckOutUI';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import VIPGuests from '../DashboardComponet/VIPGuests';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');

  const tabs = ['Dashboard', 'Check-in', 'Check-out', 'VIP Guests'];

  const handleTabPress = index => {
    setActiveTab(index);
  };

  const handleSearchChange = text => {
    setSearch(text);
  };

  const handleSearchSubmit = () => {
    // Implement search functionality
    console.log('Search submitted:', search);
  };

  const handleExit = () => {
    // Implement exit functionality
    console.log('Exit clicked');
  };

  const user = {
    image: require('../../../assets/image/userImgPNG.png'),
    name: 'Lovekush Kumar',
    phone: '8364729927',
    company: 'Hakuhodo',
    checkInTime: '10:00 AM',
    approvedBy: 'Sunil Kumawat',
    hostPhone: '8561887785',
  };

  return (
    <View style={styles.container}>
      <DashboardNav />
      {/* <ScrollView> */}
      <TabBar tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />
      {/* </ScrollView> */}
      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 0 && (
          <>
            <SearchBar
              searchValue={search}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />
            <UserCard user={user} onExit={handleExit} />
            {/* Additional Dashboard components can be added here */}
          </>
        )}
        {activeTab === 1 && <VerificatioinCode />}
        {activeTab === 2 && <CheckOutUI user={user} />}

        {activeTab === 3 && (
          <>
            <SearchBar
              searchValue={search}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />
            <VIPGuests user={user} onExit={handleExit} />
            {/* Additional Dashboard components can be added here */}
          </>
        )}

        {/* {activeTab === 3 && <VIPGuests user={user} />} */}
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 10,
    paddingBottom: heightPercentageToDP(5),
  },
});
