import React, {useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {BLACK} from '../../theme/AppColor';
import {FontName} from '../../theme/FontName';

const {width} = Dimensions.get('window');

const TabBar = ({tabs, activeTab, onTabPress}) => {
  const tabWidth = width / tabs.length;
  const translateX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeTab * tabWidth,
      useNativeDriver: true,
    }).start();

    // Scroll to active tab
    if (scrollViewRef.current) {
      const scrollToPosition = tabWidth * activeTab - width / 2 + tabWidth / 2;
      scrollViewRef.current.scrollTo({
        x: Math.max(0, scrollToPosition), // Prevent negative scroll value
        animated: true,
      });
    }
  }, [activeTab, tabWidth, translateX]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        style={{marginHorizontal: 5}}
        ref={scrollViewRef}>
        <View style={styles.tabContainer}>
          <Animated.View
            style={[
              styles.indicator,
              {
                paddingLeft: 5,
                // marginRight: 5,

                marginLeft:
                  activeTab === 1
                    ? 20
                    : activeTab === 2
                    ? 30
                    : activeTab === 1
                    ? 15
                    : activeTab === 3
                    ? 50
                    : 5,
                transform: [{translateX}],
                // width: tabWidth,

                width: activeTab === 2 ? tabWidth + 10 : tabWidth,
              },
            ]}
          />
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, {width: tabWidth}]} // Make each tab's width dynamic
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
      </ScrollView>
    </View>
  );
};

export default React.memo(TabBar);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    position: 'relative',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tab: {
    paddingVertical: 15,
    alignItems: 'center',
    zIndex: 1, // Ensure tabs are above the indicator
    marginRight: 10,
    marginLeft: 5,
  },
  tabText: {
    // marginHorizontal: 10,
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
  },
});
