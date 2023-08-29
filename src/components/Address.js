//import liraries
import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator,  Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getProvinces, provincesSelector, getDistricts, districtsSelector, resetDistricts, getWards, wardsSelector, resetWards } from '../redux/reducers/dataSlice';
import ComboBox from '../components/ComboBox';
import { SIZES } from "../constants/theme";
import KeyboardAvoidingContainer from './KeyboardAvoidingContainer';
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
    //const [marginAddress, setMarginAddress] = useState(0);

    const [codeWards, setCodeWards] = useState(0);
    const infoAddress = useRef('');
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
    const handlerPress = (value, info, action) => {

        switch (action) {
            case 'provinces':
                setPaddingText(value)
                // props.onPadding(value+60)
                dispatch(resetDistricts())
                dispatch(resetWards())
                props.onAddress(info, action)
                break;
            case 'districts':
                setPaddingPaddingDis(value)
                //   props.onPadding(value+120)
                props.onAddress(info, action)
                break;
            case 'wards':
                setPaddingWaddingWards(value)
                //  props.onPadding(value+120)
                props.onAddress(info, action)
                break;

            default:
                props.onAddress(infoAddress.current, 'infoAddress')
                break;
        }


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
        
        <View 
            style={{ flex: 1}}                  
        >    
            <TextInput onChangeText={(text) => infoAddress.current=text} placeholder='Số nhà và tên đường' style={{ width: '90%', borderWidth: 0.2, marginHorizontal: 20, height: 40, fontSize: 16, marginVertical: 10, paddingHorizontal:10 }} />
            {provinces.length > 0 && (<View style={{ paddingBottom: 10 + paddingText }}>
                <ComboBox countries={provinces} onSearch={handlerSearch} onPress={handlerPress} action={'provinces'} title={'Chọn tỉnh/thành phố*'} />
            </View>)}
            {districts.length > 0 && (<View style={{ paddingBottom: 10 + paddingDis }}>
                <ComboBox countries={districts} onSearch={handlerSearch} onPress={handlerPress} action={'districts'} title={'Quận/huyện*'} />
            </View>)}
            {wards.length > 0 && (<View style={{ paddingBottom: 10 + paddingWards }}>
                <ComboBox countries={wards} onSearch={handlerSearch} onPress={handlerPress} action={'wards'} title={'Phường/Xã*'} />
            </View>)}            
        </View> 
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },
});

//make this component available to the app
export default Address;
