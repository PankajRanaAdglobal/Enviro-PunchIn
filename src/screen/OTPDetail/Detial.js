//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInputComponent, Image, TextInput } from 'react-native';
import HeaderCompo from './HeaderCompo';
import TextInputWithLabel from './TextInputWithLabel';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import ClockIcon from '../../../assets/images/PNG/clockPNG.png'
import DropDwonPNG from '../../../assets/images/PNG/dropDwonPNG.png'
import DeletePNG from '../../../assets/images/PNG/deletePNG.png'
import UserPNG from '../../../assets/images/PNG/userPNG.png'
import BriefcasePNG from '../../../assets/images/PNG/briefcasePNG.png'
import AppointmentPNG from '../../../assets/images/PNG/appointmentPNG.png'
import UserImgPNG from '../../../assets/images/PNG/userImgPNG.png'
import CameraPNG from '../../../assets/images/PNG/cameraPNG.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonComponet from './ButtonComponet';
import TouchableTextField from './TouchableTextField';
import { FontName } from '../../theme/FontName';


// create a component
const Detail = () => {
    const [userImg, setUserImg] = useState('')
    const tapOnField = () => {

    }
    onPressImg = () => {
        setUserImg('d')

    };
    onPressDeleteImg = () => {
        setUserImg('')

    };
    return (
        <View style={styles.container}>
            <HeaderCompo label={'Details'} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>

                <TouchableTextField
                    // onChangeText={() => tapOnField()}
                    inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                    textInputStyle={{ marginRight: 10 }}
                    rightIcon={DropDwonPNG}
                    leftIcon={ClockIcon}
                    value={'asdfasdf'}
                    placeholder={'Select Visitor Type'}

                />


                <TouchableTextField
                    inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                    textInputStyle={{ marginRight: 10 }}
                    rightIcon={DropDwonPNG}
                    leftIcon={UserPNG}
                    value={''}
                    placeholder={'Select Visit purpose'}

                />

                <TouchableTextField
                    inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                    textInputStyle={{ marginRight: 10 }}
                    rightIcon={DropDwonPNG}
                    leftIcon={AppointmentPNG}
                    value={''}
                    placeholder={'Appointment'}
                />

                <TextInputWithLabel
                    inputStyle={{ marginBottom: moderateVerticalScale(20), flex: 1 }}
                    textInputStyle={{ marginRight: 10 }}
                    leftIcon={BriefcasePNG}
                    placeholder={'Enter Addhar card number'}
                />


                {/* Batch number start*/}
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-evenly',

                }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-evenly',
                        borderWidth: .5,
                        borderRadius: 4,
                        borderColor: '#D9D9D9',
                        marginHorizontal: moderateScale(8),
                        marginBottom: moderateVerticalScale(20),
                        flex: 1,
                        height: moderateScale(40)
                    }}>

                        <Image source={BriefcasePNG} style={{
                            height: moderateScale(16),
                            width: moderateScale(16), marginRight: 10, marginLeft: 10, alignSelf: 'center'
                        }} />
                        <TextInput
                            placeholder='Batch number'
                            placeholderTextColor={'#00000059'}
                            selectionColor={'black'}
                            style={{
                                flex: 1, marginRight: 10,

                            }}
                        ></TextInput>
                    </View>
                    <TouchableOpacity onPress={() => onPressImg()}>
                        <Image source={CameraPNG} style={{
                            height: moderateScale(40),
                            width: moderateScale(40),
                            marginRight: 10
                        }}
                        />
                    </TouchableOpacity>
                </View>
                {/* Batch number start*/}

                {/* userImage start*/}

                {
                    userImg != '' ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: moderateVerticalScale(20), }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={UserImgPNG} style={{
                                    height: moderateScale(48),
                                    width: moderateScale(48), marginRight: 10, marginLeft: 10, alignSelf: 'center'
                                }} />
                                <Text style={{ color: '#1890FF', fontWeight: '400', fontSize: 14, fontFamily: FontName.Gordita_Regular }}>xyz.png</Text>
                            </View>
                            <TouchableOpacity onPress={() => onPressDeleteImg()}>
                                <Image source={DeletePNG} style={{
                                    height: moderateScale(40),
                                    width: moderateScale(40), marginRight: 10, marginLeft: 10, alignSelf: 'center'
                                }} />
                            </TouchableOpacity>
                        </View>

                        : null

                }
                {/* userImage end */}

                <TextInputWithLabel
                    inputStyle={{ marginBottom: moderateVerticalScale(20), flex: 1 }}
                    textInputStyle={{ marginRight: 10 }}
                    leftIcon={BriefcasePNG}
                    placeholder={'Enter entry time'}
                />

                <ButtonComponet
                    btnText={'Submit'}
                    ContbtnStyl={{ maringLeft: 100, fontSize: 100, borderRadius: moderateScale(8) }}
                    txtStyle={{ fontSize: 16, fontWeight: '500', fontFamily: FontName.Gordita_Regular }}
                />
            </KeyboardAwareScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Detail;
