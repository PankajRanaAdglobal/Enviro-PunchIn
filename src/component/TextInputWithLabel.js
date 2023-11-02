import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { FontName } from '../theme/FontName';
import { BLACK } from '../theme/AppColor';

const TextInputWithLabel = ({
  label,
  placeholder,
  onChangeText,
  inputStyle = {},
  rightIcon,
  leftIcon,
  textInputStyle,
  onPressRight = {},
  ...props
}) => {
  return (
    <View style={{ ...styles.inputStyle, ...inputStyle }}>
      {label != null ? <Text>{label}</Text> : null}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          justifyContent: 'center',
          height: moderateScale(40),
        }}>
        {!!leftIcon ? (
          <Image
            source={leftIcon}
            style={{
              height: moderateScale(16),
              width: moderateScale(16),
              marginRight: 10,
              marginLeft: 10,
              alignSelf: 'center',
            }}
          />
        ) : null}
        <TextInput
          placeholderTextColor={'#00000059'}
          selectionColor={BLACK}
          placeholder={placeholder}
          onChangeText={onChangeText}
          style={{
            paddingVertical: moderateVerticalScale(8),
            flex: 1,
            ...textInputStyle,
            fontSize: 14,
            fontWeight: '400',
            fontFamily: FontName.Gordita_Regular,
            color: BLACK,
          }}
          {...props}
        />
        {!!rightIcon ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRight}>
            <Image
              source={rightIcon}
              style={{
                height: moderateScale(20),
                width: moderateScale(20),
                marginRight: 10,
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#D9D9D9',
    marginHorizontal: moderateScale(8),

    // backgroundColor: 'green'
  },
});

//make this component available to the app
export default TextInputWithLabel;
