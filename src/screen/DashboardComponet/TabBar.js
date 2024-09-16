// components/Dashboard/TabBar.js
import React, {useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BLACK} from '../../theme/AppColor';
import {FontName} from '../../theme/FontName';

const {width} = Dimensions.get('window');

const TabBar = ({tabs, activeTab, onTabPress}) => {
  const tabWidth = width / tabs.length;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeTab * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabWidth, translateX]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.indicator,
          {
            marginLeft: activeTab === 0 ? 5 : 0,
            transform: [{translateX}],
            width: activeTab === 2 ? tabWidth - 30 : tabWidth - 20,
            // width: tabWidth - 20,
            // transform: [{translateX}],
          },
        ]}
      />
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => onTabPress(index)}
          accessibilityRole="button"
          accessibilityState={{selected: activeTab === index}}
          accessibilityLabel={`Tab ${tab}`}>
          <Text
            style={[
              styles.tabText,
              {color: activeTab === index ? 'white' : 'black'},
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default React.memo(TabBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    zIndex: 1, // Ensure tabs are above the indicator
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FontName.Gordita_Medium,
  },
  indicator: {
    position: 'absolute',
    height: '80%',
    backgroundColor: BLACK,
    borderRadius: 5,
    top: '10%',
    // left: 10,
    marginHorizontal: 10,
  },
});
