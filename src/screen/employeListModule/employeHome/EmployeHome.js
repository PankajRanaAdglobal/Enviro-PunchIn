import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import AppString from '../../../utils/appString/AppString';
import {VisitorEmployee, EmployeListAll, EmployeRejectList} from '../../index';
import CustomText from '../../../component/CustomText';
import {WHITE} from '../../../theme/AppColor';
import {styles} from './Style';
import Header from '../../../component/Header';
import TextInputWithLabel from '../../../component/TextInputWithLabel';
import Search from '../../../../assets/image/svg/search.svg';

const EmployeHomList = ({navigation}) => {
  const tabs = [
    {id: 'EMPLOYEE', label: AppString.EMPLOYEE},
    {id: 'VISITORS', label: AppString.VISITORS},
  ];
  const [activeTab, setActiveTab] = useState('EMPLOYEE');

  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };

  const handleSearchClick = () => {};
  const handleFilterClick = () => {};
  const onChangeText = e => {};

  return (
    <View style={styles.container}>
      <Header
        onPress={handleFilterClick}
        title={activeTab === 'EMPLOYEE' ? 'Employee List' : 'Visitors List'}
        onPressBack={() => navigation.goBack()}
      />
      {/* search bar */}
      <View style={styles.searchView}>
        <TextInputWithLabel
          inputStyle={styles.textinput}
          style={styles.textinput}
          placeholder={'Search'}
          onChangeText={onChangeText}
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
                tab?.id === activeTab ? {color: WHITE} : {color: '#9E9E9E'},
              ]}
              children={tab.label}
            />
          </TouchableOpacity>
        ))}

      </View>
      {activeTab === 'EMPLOYEE' && <EmployeListAll />}
      {activeTab === 'VISITORS' && <VisitorEmployee />}
    </View>
  );
};

export default EmployeHomList;
