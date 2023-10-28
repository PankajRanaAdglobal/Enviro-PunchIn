//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInputComponent, Image, TextInput, FlatList } from 'react-native';
import HeaderCompo from '../../component/HeaderCompo';
import TextInputWithLabel from '../../component/TextInputWithLabel';

import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import ClockIcon from '../../../assets/images/PNG/clockPNG.png'
import DropDwonPNG from '../../../assets/images/PNG/dropDwonPNG.png'
import DeletePNG from '../../../assets/images/PNG/deletePNG.png'
import UserPNG from '../../../assets/images/PNG/userPNG.png'
import BriefcasePNG from '../../../assets/images/PNG/briefcasePNG.png'
import AppointmentPNG from '../../../assets/images/PNG/appointmentPNG.png'
import UserImgPNG from '../../../assets/images/PNG/userImgPNG.png'
import CameraPNG from '../../../assets/images/PNG/cameraPNG.png'
import SearchPNG from '../../../assets/images/PNG/searchPNG.png'
import ClosePNG from '../../../assets/image/close.png'
import LocationPNG from '../../../assets/image/locationPNG.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TouchableTextField from '../../component/TouchableTextField';

import { FontName } from '../../theme/FontName';

import { visitorAction } from '../../redux/slices/VisitorSlice'

import { BottomSheet } from "react-native-btr";
import { BLACK, EXTRA_LIGHT_GREY, LIGHTGREY, ORANGE, PRIMARY_COLOR, WHITE } from '../../theme/AppColor';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import FilterItem from './FilterItem';
import CustomButton from '../../component/CustomButton';
import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AlertDialog from '../../component/AlertDialog';
import { ShowToast } from '../../utils/constant/Constant';
import { APPOINTMENT, VISITOR_PURPOSE, VISITOR_TYPE } from '../../sevices/ApiEndPoint';
import AppLoader from '../../utils/appLoader/AppLoader';
import { useSelector, useDispatch } from 'react-redux';
import useApiEffect from '../../hooks/useApiEffect';
import { appointmentAction } from '../../redux/slices/AppointmentSlice';
import * as yup from 'yup';
import { Formik } from "formik"
// create a component
const Detail = () => {
    const dispatch = useDispatch()
    const locationArr = ['Location ', 'Company ']
    const [userImg, setUserImg] = useState('')
    const [visiterType, setVisiterType] = useState('')
    const [visiterPurposeType, setVisiterPurposeType] = useState('')
    const [locationValue, setLocationValue] = useState('')

    const [appointment, setAppointment] = useState('')
    const [visible, setVisible] = useState(false);
    const [appointvisible, setAppointvisible] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState(null)
    const [modalType, setModalType] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);
    const [purposeSelectedItems, setPurposeSelectedItems] = useState([]);
    const [location, setLocation] = useState([]);
    const { makeApiRequest, loading } = useApiEffect()
    const visitorArr = useSelector((state) => state.visitor)
    const appointmentArr = useSelector((state) => state.appointment.appointmentData)
    const visitorPurposeArr = useSelector((state) => state.visitor.data.data.visitorpurpose)// visitorArr.data.data.visitortype

    const [currentPage, setCurrentPage] = useState(0); // Initial page
    const [loadingMore, setLoadingMore] = useState(false); // Loading indicator
    const [hasMore, setHasMore] = useState(true);



    const onUpdateImagePress = () =>
        AlertDialog('Select Image', 'Please Select Type', [
            {
                onPress: () => {
                    launchImageLibrary(
                        {
                            mediaType: 'photo'
                        },
                        response => {
                            if (response?.didCancel) {
                                return;
                            }
                            setUserImg(response)

                            // if (response.assets && response.assets[0]?.fileSize) {
                            //   if (response.assets[0]?.fileSize.size > 1024 * 1024) {
                            //     console.log("File with maximum size of 1MB is allowed");
                            //     return false;
                            //   }

                        },
                    );
                },
                label: 'Pick From Gallery',
            },
            {
                onPress: () => {
                    launchCamera(
                        {
                            selectionLimit: 0,
                            mediaType: 'photo',
                        },
                        response => {
                            if (response?.errorCode == 'others') {
                                ShowToast("Camera permission denied. Please enable from device setting.")
                            }
                            if (response?.didCancel) {
                                return;
                            }
                            setUserImg(response)
                        },

                    );
                },
                label: "Capture From Camera",
            }
        ]);



    const tapOnField = () => {

    }
    onPressImg = () => {
        setUserImg('d')

    };
    onPressDeleteImg = () => {
        setUserImg('')

    };

    onCancelModal = () => {
        setVisible(false)

    };


    function onPressModel(type) {

        if (type === 0) {
            setVisible(true);
            setModalType("Visitor Type")
        } else if (type === 1) {
            setVisible(true);
            setModalType("Select Visit purpose")
        } else if (type === 2) {
            setAppointvisible(true)
        } else if (type === 3) {

            setVisible(true);
            setModalType("Location")
        }

    }


    const toggleSelection = (index) => {
        // if (selectedItems.includes(index)) {
        //     setSelectedItems((filterData) =>
        //         filterData.filter((item) => item !== index)
        //     );
        // } else {
        //     setSelectedItems((filterData) => [...filterData, index]);
        // }

        if (modalType === "Visitor Type") {

            if (selectedItems === index) {
                setSelectedItems(null); // Deselect if already selected
            } else {
                setSelectedItems(index); // Select a new item
            }
        } else if (modalType === "Select Visit purpose") {

            if (purposeSelectedItems === index) {
                setPurposeSelectedItems(null); // Deselect if already selected
            } else {
                setPurposeSelectedItems(index); // Select a new item
            }
        } else if (modalType === "Location") {

            if (location === index) {
                setLocation(null); // Deselect if already selected
            } else {
                setLocation(index); // Select a new item
            }
        }

    };

    const applyFilterValue = () => {
        setVisible(false);
        // setAppointvisible((appointvisible) => !appointvisible);
        if (modalType === "Visitor Type") {

            setVisiterType(visitorArr.data.data.visitortype[selectedItems].name)
        } else if (modalType === "Select Visit purpose") {

            setVisiterPurposeType(visitorPurposeArr[purposeSelectedItems].name)
        } else if (modalType === "Location") {
            setLocationValue(locationArr[location])
        }
    };
    useEffect(() => {


        const callAPI = async () => {


            const apiData = await makeApiRequest({ url: VISITOR_TYPE, method: 'GET', isToken: false })
            // console.log(JSON.stringify(apiData))

            if (apiData?.status == true) {
                appointmentAPI()
                dispatch(visitorAction(apiData))


            }
        }
        callAPI()



        // apiData.map((item) => (
        //     console.log('item', item)
        // ));



    }, []);


    const onSearchUser = (text) => {
        appointmentAPI(text);
    }

    async function appointmentAPI(searchText) {

        const body = {
            pageno: currentPage,
            name: searchText,

        }

        const apiData = await makeApiRequest({ url: APPOINTMENT, method: 'POST', isToken: false, data: body, showProgress: true });
        if (apiData?.status == true) {

            dispatch(appointmentAction(apiData))
        } else {
            console.log("PROFILE API ERROR: ", apiData)
            ShowToast(apiData?.message)
        }
        // if (loading || !hasMore) return; // Don't load more data while already loading or no more data available

        // setLoadingMore(true);

        // try {
        //     const apiData = await makeApiRequest({ url: APPOINTMENT, method: 'POST', isToken: false, data: body, showProgress: true });
        //     if (apiData?.status == true) {

        //         if (apiData.length === 0) {
        //             setHasMore(false);

        //         } else {
        //             // setData([...data, ...newData]);


        //             setCurrentPage(currentPage + 1);

        //             dispatch(appointmentAction([...apiData, ...apiData]))
        //         }

        //     } else {
        //         console.log("PROFILE API ERROR: ", apiData)
        //     }


        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // } finally {
        //     setLoadingMore(false);
        // }
    };




    const selectedFilters = (text) => {
        setAppointment(text)
        appointmentAPI(null)
    }

    const initialValue = {
        visitor: '',
        purpose: '',
        appointment: '',
        card: '',
        batchnumber: '',
        time: '',
        location: '',
    };

    const validationSchema = yup.object().shape({
        visitor: yup.string().required('Select Visitor Type'),
        purpose: yup.string().required('Select Visitor purpose'),
        appointment: yup.string().required('Select Visitor appointment'),
        card: yup.string().required('Enter Adhar Card number'),
        batchnumber: yup.string().required('Enter Batch number'),
        time: yup.string().required('Enter Entry time'),
        location: yup.string().required('Select Location Type'),
    });
    return (
        <View style={{ flex: 1 }}>
            <HeaderCompo label={'Details'} />
            {console.log('dineshUser', useSelector((state) => state.visitor.data.data))}
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>

                <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {

                        // Handle form submission when it's valid

                        navigation.navigate(NavString.Otp)
                    }}
                >
                    {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (

                        <View>
                            <TouchableTextField
                                onPressTextFiled={() => onPressModel(0)}

                                //  onChangeText={() => tapOnField()}
                                inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                                textInputStyle={{ marginRight: 10 }}
                                rightIcon={DropDwonPNG}
                                leftIcon={ClockIcon}

                                value={visiterType}
                                placeholder={'Select Visitor Type'}

                            />


                            <TouchableTextField
                                onPressTextFiled={() => onPressModel(1)}
                                inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                                textInputStyle={{ marginRight: 10 }}
                                rightIcon={DropDwonPNG}
                                leftIcon={UserPNG}
                                value={visiterPurposeType}
                                placeholder={'Select Visit purpose'}

                            />

                            <TouchableTextField
                                onPressTextFiled={() => onPressModel(2)}
                                inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                                textInputStyle={{ marginRight: 10 }}
                                rightIcon={DropDwonPNG}
                                leftIcon={AppointmentPNG}
                                value={appointment}
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
                                <TouchableOpacity onPress={() => onUpdateImagePress()}>
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
                                            <Image source={{ uri: userImg.assets?.[0]?.uri }} style={{
                                                height: moderateScale(48),
                                                width: moderateScale(48), marginRight: 10, marginLeft: 10, alignSelf: 'center',
                                                resizeMode: 'stretch'
                                            }} />
                                            <Text style={{
                                                color: '#1890FF', fontWeight: '400', fontSize: 14,
                                                fontFamily: FontName.Gordita_Regular, overflow: true
                                            }}>
                                                {userImg.assets?.[0]?.fileName.slice(2, 20) + '.png'}
                                            </Text>
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

                            <TouchableTextField
                                onPressTextFiled={() => onPressModel(3)}

                                //  onChangeText={() => tapOnField()}
                                inputStyle={{ marginBottom: moderateVerticalScale(20) }}
                                textInputStyle={{ marginRight: 10 }}
                                rightIcon={DropDwonPNG}
                                leftIcon={LocationPNG}
                                value={locationValue}
                                placeholder={'Location'}

                            />
                            {/* <TextInputWithLabel
                    inputStyle={{ marginBottom: moderateVerticalScale(20), flex: 1 }}
                    textInputStyle={{ marginRight: 10 }}
                    leftIcon={LocationPNG}
                    placeholder={'Gurugram'}
                /> */}

                            <CustomButton
                                title={'Submit'}
                                textStyle={{ fontSize: 16, fontWeight: '500', fontFamily: FontName.Gordita_Regular }}
                                style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    borderRadius: 8,
                                    width: widthPercentageToDP(95),
                                    height: heightPercentageToDP(5),
                                    maringHorizontal: 20

                                }}
                            // onPress={() => navigation.navigate(NavString.Otp)}
                            />

                        </View>
                    )}
                </Formik>




            </KeyboardAwareScrollView>


            <View style={styles.container}>

                <BottomSheet
                    visible={visible}
                    onBackButtonPress={onPressModel}
                    onBackdropPress={onPressModel}
                >
                    <View style={{
                        maxHeight: '90%', height: 'auto', backgroundColor: WHITE, borderTopLeftRadius: 38, borderTopRightRadius: 38
                    }}>
                        <View style={styles.bottomSheetHeader}>
                            <Text style={styles.header}>{modalType}</Text>
                            <TouchableOpacity style={styles.close} onPress={onCancelModal}>
                                <Image source={ClosePNG} style={{
                                    height: moderateScale(28),
                                    width: moderateScale(28),
                                    marginRight: 10,
                                    tintColor: 'black',

                                }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                modalType === 'Visitor Type' ?

                                    visitorArr.data.data.visitortype?.map((item, index) => (
                                        <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                                            toggleSelection(index,);

                                        }}>
                                            <FilterItem
                                                text={item.name}
                                                key={index}
                                                containerStyle={{
                                                    backgroundColor: selectedItems === index ? ORANGE : WHITE,
                                                    borderColor: selectedItems === index ? ORANGE : LIGHTGREY
                                                }}
                                                textStyle={{ color: selectedItems === index ? WHITE : BLACK }}
                                            />
                                        </TouchableOpacity>
                                    ))

                                    : modalType === 'Select Visit purpose' ?
                                        visitorPurposeArr?.map((item, index) => (
                                            <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                                                toggleSelection(index,);

                                            }}>
                                                <FilterItem
                                                    text={item.name}
                                                    key={index}
                                                    containerStyle={{
                                                        backgroundColor: purposeSelectedItems === index ? ORANGE : WHITE,
                                                        borderColor: purposeSelectedItems === index ? ORANGE : LIGHTGREY
                                                    }}
                                                    textStyle={{ color: purposeSelectedItems === index ? WHITE : BLACK }}
                                                />
                                            </TouchableOpacity>
                                        )) :
                                        locationArr?.map((item, index) => (
                                            <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                                                toggleSelection(index,);

                                            }}>
                                                <FilterItem
                                                    text={item}
                                                    key={index}
                                                    containerStyle={{
                                                        backgroundColor: location === index ? ORANGE : WHITE,
                                                        borderColor: location === index ? ORANGE : LIGHTGREY
                                                    }}
                                                    textStyle={{ color: location === index ? WHITE : BLACK }}
                                                />
                                            </TouchableOpacity>
                                        ))

                            }

                        </View>
                        <CustomButton title={'Apply'} style={styles.applyButton} onPress={applyFilterValue} />

                    </View>
                </BottomSheet>
                <AppointmentModal appointmentArr={appointmentArr} show={appointvisible}
                    onCancel={() => setAppointvisible(false)} onDone={selectedFilters}
                    onSearch={onSearchUser}
                    loading={loading}
                />
            </View>
            <AppLoader isLoading={loading} />
        </View>
    );
};



const AppointmentModal = ({ appointmentArr, show, onCancel, onDone, onSearch, loading }) => {
    const [appointmentSelectedItems, setAppointmentSelectedItems] = useState([]);
    const [visiterType, setVisiterType] = useState('')
    const [visible, setVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    // const [filteredData, setFilteredData] = useState([]);
    // const [searchText, onChangeSearch] = useState('');
    // const visitorPurposeArr = ['Interview1', 'New ', 'Offic', 'Clit']

    const applyFilterValue = () => {
        setSelectedItems(null);
        onCancel();
        onDone(appointmentArr.data.rows[selectedItems].first_name + ` ${appointmentArr.data.rows[selectedItems].last_name}` + ` (${appointmentArr.data.rows[selectedItems].employee_code})`)
    }

    const toggleSelection = (index) => {

        if (selectedItems === index) {
            setSelectedItems(null); // Deselect if already selected
        } else {
            setSelectedItems(index); // Select a new item
        }

    }

    return (
        <View style={styles.container}>
            {/* {console.warn(appointmentArr.data.rows)} */}
            <BottomSheet
                visible={show}
                onBackButtonPress={onCancel}
                onBackdropPress={onCancel}
            >
                <View style={{
                    flex: 1, backgroundColor: WHITE, borderTopLeftRadius: 38, borderTopRightRadius: 38, marginTop: moderateScale(70)
                }}>
                    <View style={styles.bottomSheetHeader}>
                        <Text style={styles.header}>Appointment</Text>
                        <TouchableOpacity style={styles.close} onPress={onCancel}>
                            <Image source={ClosePNG} style={{
                                height: moderateScale(28),
                                width: moderateScale(28),
                                marginRight: 10,
                                tintColor: 'black'
                            }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Searchcontainer}>
                        <View style={[styles.searchBar, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <TextInput
                                style={{
                                    marginRight: moderateScale(8), flex: 1, fontFamily: FontName.Gordita_Regular,
                                    fontSize: 15,
                                    fontWeight: '500'
                                }}
                                placeholder="Search..."
                                onChangeText={(text) => onSearch(text)}
                            />
                            <View style={{
                                height: moderateScale(25),
                                width: moderateScale(25), borderRadius: 12.5,
                                backgroundColor: '#D9D9D9',
                                justifyContent: 'center',
                                alignItems: 'center'

                            }}>
                                <Image source={SearchPNG} style={{
                                    height: moderateScale(17),
                                    width: moderateScale(17),
                                }}
                                />
                            </View>
                        </View>
                        <FlatList
                            data={appointmentArr.data.rows}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity activeOpacity={0.7} style={{ margin: 8 }} key={index} onPress={() => {
                                    toggleSelection(index,);

                                }}>
                                    {console.warn(item.first_name + ` ${item.last_name}` + ` (${item.employee_code})`)}
                                    <FilterItem

                                        text={item.first_name + ` ${item.last_name}` + ` (${item.employee_code})`}
                                        // key={index}

                                        containerStyle={{
                                            backgroundColor: WHITE,
                                            // borderColor: selectedItems === index ? ORANGE : LIGHTGREY,
                                            borderWidth: 0,
                                            alignItems: 'flex-start',
                                            height: moderateScale(15)

                                        }}
                                        textStyle={{ color: selectedItems === index ? ORANGE : BLACK }}
                                    />
                                </TouchableOpacity>
                            )}
                        // onEndReached={onSearch} // Load more data when scrolling to the end
                        // onEndReachedThreshold={0.1} // Adjust this threshold as needed
                        // ListFooterComponent={loading && <AppLoader isLoading={loading} />} // Show a loading indicator
                        />
                    </View>

                    <CustomButton title={'Apply'} style={styles.applyButton} onPress={applyFilterValue} />

                </View>
            </BottomSheet>

        </View>
    )

}

// define your styles
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // height: 250,
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        borderWidth: 0,
        marginHorizontal: moderateScale(30),

        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    header: {
        fontSize: 16,
        fontFamily: FontName.Gordita_Regular,
        fontWeight: '500'
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: EXTRA_LIGHT_GREY,
        height: moderateScale(50),
        justifyContent: 'center',
        marginBottom: moderateScale(10)
        // margin: 15
    },
    close: {
        tintColor: BLACK,
        position: 'absolute',
        right: 30,
        width: heightPercentageToDP(2.8),
        height: heightPercentageToDP(2.8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    applyButton: {
        backgroundColor: ORANGE,
        alignSelf: 'center',
        marginTop: 30,
        fontSize: 16,
        marginBottom: moderateScale(20),
        height: heightPercentageToDP(5),
    },
    Searchcontainer: {
        flex: 1,
        padding: 10,


    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
});

//make this component available to the app
export default Detail;
