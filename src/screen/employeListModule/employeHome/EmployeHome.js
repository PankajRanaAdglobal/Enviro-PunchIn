import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import AppString from '../../../utils/appString/AppString';
import {
  EmployeAprovetList,
  EmployeListAll,
  EmployeRejectList,
} from '../../index';
import CustomText from '../../../component/CustomText';
import {WHITE} from '../../../theme/AppColor';
import {styles} from './Style';
import Header from '../../../component/Header';

const EmployeHomList = ({}) => {
  const tabs = [
    {id: 'All', label: AppString.ALL},
    {id: 'Approved', label: AppString.APROVED},
    {id: 'Reject', label: AppString.REJECT},
  ];
  const [activeTab, setActiveTab] = useState('All');

  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };

  return (
    <View style={styles.container}>
      <Header title={'Employee List'} />
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
                tab?.id === activeTab ? {color: WHITE} : null,
              ]}
              children={tab.label}
            />
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === 'All' && <EmployeListAll />}
      {activeTab === 'Approved' && <EmployeAprovetList />}
      {activeTab === 'Reject' && <EmployeRejectList />}
    </View>
  );
};

export default EmployeHomList;
