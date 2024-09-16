// components/Dashboard/SearchBar.js
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import TextInputWithLabel from '../../component/TextInputWithLabel';
import SearchIcon from '../../../assets/image/svg/search.svg';
import {SEARCHICON_BACKGROUND, BORDER_COLOR, BLACK} from '../../theme/AppColor';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {FontName} from '../../theme/FontName';

const SearchBar = ({searchValue, onSearchChange, onSearchSubmit}) => (
  <View style={styles.searchView}>
    <TextInputWithLabel
      inputStyle={{borderWidth: 0}}
      style={styles.textinput}
      placeholder={'Search'}
      onChangeText={onSearchChange}
      value={searchValue}
    />
    <TouchableOpacity
      onPress={onSearchSubmit}
      activeOpacity={0.7}
      style={styles.searchIcon}>
      <SearchIcon width={20} height={20} />
    </TouchableOpacity>
  </View>
);

export default React.memo(SearchBar);

const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    width: '95%',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 100,
    height: 50,
    alignItems: 'center',
    borderColor: BORDER_COLOR,
    marginTop: heightPercentageToDP(2),
    justifyContent: 'space-between',
  },
  textinput: {
    textAlign: 'left',
    fontFamily: FontName.Gordita_Regular,
    borderWidth: 0,
    width: '85%',
    // backgroundColor: 'red',
    borderRadius: 0,
    paddingHorizontal: 10,
    //paddingVertical: 0,
    // marginLeft: 0,
    color: BLACK,
  },
  searchIcon: {
    backgroundColor: SEARCHICON_BACKGROUND,
    padding: 10,
    borderRadius: 100,
    marginRight: 10,
    // backgroundColor: 'red',
  },
});
