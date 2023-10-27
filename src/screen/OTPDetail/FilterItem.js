import { StyleSheet, TouchableOpacity, View } from "react-native";

import { FontName, FontSize } from "../../theme/FontName"
import { Text } from "react-native-paper";
import CustomText from "../../component/CustomText";
import { BUTTON_BACKGROUND, LIGHTGREY, ORANGE, WHITE } from "../../theme/AppColor";
import { capitalizeFirstLetter } from "../../utils/constant/Constant";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const FilterItem = ({
    containerStyle, textStyle, text, fromTime = "", toTime = "" }) => {
    return (
        <View style={[styles.container, containerStyle]} >
            <CustomText style={[styles.text, textStyle]} children={capitalizeFirstLetter(text)} />
            {fromTime == "" && toTime == "" ? null : <CustomText children={fromTime + ' To ' + toTime} style={styles.timeStyle} />}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        minWidth: wp(20),
        minHeight: wp(8),
        backgroundColor: BUTTON_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(1),
        borderWidth: wp(0.2)
    },
    text: {
        fontFamily: FontName.Geo_Auto_Regular,
        fontSize: FontSize(14),
        color: WHITE,
        paddingHorizontal: wp(1),
        fontWeight: '400'
    },
    timeStyle: {
        fontFamily: FontName.Geo_Auto_Regular,
        fontSize: FontSize(10),
        color: LIGHTGREY,
        paddingHorizontal: wp(1),
        marginTop: wp(0.4)
    }
})

export default FilterItem