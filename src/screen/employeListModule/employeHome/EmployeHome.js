import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppString from '../../../utils/appString/AppString';
import { VisitorEmployee, EmployeListAll, EmployeRejectList } from '../../index';
import CustomText from '../../../component/CustomText';
import { WHITE } from '../../../theme/AppColor';
import { styles } from './Style';
import Header from '../../../component/Header';
import TextInputWithLabel from '../../../component/TextInputWithLabel';
import Search from '../../../../assets/image/svg/search.svg';
import { handleStackNavigation } from '../../../utils/constant/Constant';
import NavString from '../../../utils/navString/NavString';
import EmployeeFilter from '../../../utils/bottomSheet/EmployeFilter';

const EmployeHomList = ({ navigation }) => {
  const tabs = [
    { id: 'EMPLOYEE', label: AppString.EMPLOYEE },
    { id: 'VISITORS', label: AppString.VISITORS },
  ];
  const [activeTab, setActiveTab] = useState('EMPLOYEE');
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const [search, setSearch] = useState('');

  // TAB CLICK
  const handleTabChange = tabId => {
    setFilterData(null);
    setSearch('');
    setActiveTab(tabId);
  };

  const handleSearchClick = () => { };
  // FILTER CLICK
  const handleFilterClick = () => {
    setSearch('');
    setFilterData(null);
    setShowFilter(true);
  };
  // search bar
  const onChangeText = e => {
    setSearch(e);
  };
  // IF USER CHOOSE FILTER
  const SelectedValue = data => {
    setShowFilter(false);
    setFilterData(data);
  };
  const handleFilterClose = e => {
    setFilterData(null);
    setShowFilter(false);
  };

  const hidePicker = () => {

  }

  return (
    <View style={styles.container}>
      <Header
        onPress={handleFilterClick}
        title={activeTab === 'EMPLOYEE' ? 'Employee List' : 'Visitors List'}
        onPressBack={() => handleStackNavigation(NavString.LOGIN, navigation)}
      />
      {/* search bar */}
      <View style={styles.searchView}>
        <TextInputWithLabel
          inputStyle={styles.textinput}
          style={styles.textinput}
          placeholder={'Search'}
          onChangeText={onChangeText}
          value={search}
        />
        <TouchableOpacity
          onPress={handleSearchClick}
          activeOpacity={0.7}
          style={styles.searchIcon}>
          <Search width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBarContainer}>
        {tabs?.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              tab?.id === activeTab ? styles.activeTextColor : null,
            ]}
            onPress={() => handleTabChange(tab.id)}>
            <CustomText
              style={[
                styles.tabText,
                tab?.id === activeTab ? { color: WHITE } : { color: '#9E9E9E' },
              ]}
              children={tab.label}
            />
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === 'EMPLOYEE' && (
        <EmployeListAll
          filterData={activeTab == 'EMPLOYEE' ? filterData : null}
          searchText={search}
        />
      )}
      {activeTab === 'VISITORS' && (
        <VisitorEmployee
          filterData={activeTab == 'VISITORS' ? filterData : null}
          searchText={search}
        />
      )}
      {showFilter && (
        <EmployeeFilter
          visible={showFilter} z
          hide={hidePicker}
          handleFilterClose={handleFilterClose}
          selectedValue={SelectedValue}
        />
      )}
    </View>
  );
};

export default EmployeHomList;
