//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProvinces, provincesSelector, getDistricts, districtsSelector, resetDistricts, getWards, wardsSelector, resetWards } from '../redux/reducers/dataSlice';
import ComboBox from '../components/ComboBox';
// create a component
const Address = (props) => {

    const dispatch = useDispatch()
    const provinces = useSelector(provincesSelector);
    const districts = useSelector(districtsSelector);
    const wards = useSelector(wardsSelector);

    const [paddingText, setPaddingText] = useState(0);
    const [paddingDis, setPaddingPaddingDis] = useState(0);
    const [paddingWards, setPaddingWaddingWards] = useState(0);
    const [code, setCode] = useState(0);
    const [codeWards, setCodeWards] = useState(0);

    const handlerSearch = (value, action) => {

        if (action === 'provinces') {
            if (value < 10) value = '0' + value.toString();
            setCode(value)
            
        }
        if (action === 'districts') {
            if (value < 10) value = '00' + value.toString();
            if (value >= 10 && value < 100) value = '0' + value.toString();
            setCodeWards(value)
        }

    }
    const handlerPress = (value, action) => {
        switch (action) {
            case 'provinces':
                setPaddingText(value)
                props.onPadding(value+60)
                dispatch(resetDistricts())
                dispatch(resetWards())
                break;
            case 'districts':
                setPaddingPaddingDis(value)
                props.onPadding(value+120)
                break;
            case 'wards':
                setPaddingWaddingWards(value)
                props.onPadding(value+120)
                break;

            default:
                break;
        }

        console.log(wards);
    }
    useEffect(() => {
        dispatch(getProvinces());
    }, [])

    useEffect(() => {
        dispatch(getDistricts(code))
    }, [code])

    useEffect(() => {
        dispatch(getWards(codeWards))
    }, [codeWards])
    return (
        <View style={styles.container}>
            {provinces.length > 0 && (<View style={{ paddingBottom: 60 + paddingText }}>
                <ComboBox countries={provinces} onSearch={handlerSearch} onPress={handlerPress} action={'provinces'} title={'Chọn tỉnh/thành phố*'} />
            </View>) || <ActivityIndicator />}
            {districts.length > 0 && (<View style={{ paddingBottom: 60 + paddingDis }}>
                <ComboBox countries={districts} onSearch={handlerSearch} onPress={handlerPress} action={'districts'} title={'Quận/huyện*'}/>
            </View>) || <ActivityIndicator />}
            {wards.length > 0 && (<View style={{ paddingBottom: 60 + paddingWards }}>
                <ComboBox countries={wards} onSearch={handlerSearch} onPress={handlerPress} action={'wards'} title={'Phường/Xã*'}/>
            </View>) || <ActivityIndicator />}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

//make this component available to the app
export default Address;
