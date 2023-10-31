import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppString from '../../../utils/appString/AppString';
import {
  EmployeAprovetList,
  EmployeListAll,
  EmployeRejectList,
} from '../../index';
import { useRoute } from "@react-navigation/native"
import CustomText from '../../../component/CustomText';
import { WHITE } from '../../../theme/AppColor';
import { styles } from './Style';
import Header from '../../../component/Header';
import HeaderCompo from '../../../component/HeaderCompo';
import { handleStackNavigation } from '../../../utils/constant/Constant';
import NavString from '../../../utils/navString/NavString';

const EmployeHomList = ({ navigation, route }) => {
  const [id, SetId] = useState('')
  const tabs = [
    { id: 'All', label: AppString.ALL },
    { id: 'Approved', label: AppString.APROVED },
    { id: 'Reject', label: AppString.REJECT },
  ];
  const [activeTab, setActiveTab] = useState('All');

  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };

  useEffect(() => {

    SetId(route?.params?.data)
  }, []);

  const handelOnBack = () => {
    if (id === '1') {
      handleStackNavigation(NavString.LOGIN, navigation)
    } else {
      navigation.goBack()
    }

  }

  return (
    <View style={styles.container}>
      <HeaderCompo label={'Employee List'} onPressBack={handelOnBack}
      />
      {/* <Header title={'Employee List'} /> */}
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
                tab?.id === activeTab ? { color: WHITE } : null,
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
