import React, { useRef, useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView as SafeAreaViewIos,
  View, Text, TouchableOpacity, ActivityIndicator, TextInput
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getProvinces, provincesSelector, getDistricts, districtsSelector, resetDistricts, getWards, wardsSelector, resetWards } from '../redux/reducers/dataSlice';
import ComboBox from '../components/ComboBox';
import globalStyles, { bgStyles } from "../globalStyles";
import { Modalize } from 'react-native-modalize';
import { SIZES } from "../constants/theme";




function CustomerDetail({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  const dispatch = useDispatch()
  const modalizeRef = useRef(null)
  const [province, setProvince] = React.useState({ 'title': 'Chọn tỉnh/thành phố*' })
  const [district, setDistrict] = React.useState({})
  const [ward, setWard] = React.useState({})
  const [modal, setModal] = React.useState('')
  const [address, setAddress] = React.useState('')
  const modalRef = useRef('provinces')
  const provinces = useSelector(provincesSelector);
  const districts = useSelector(districtsSelector);
  const wards = useSelector(wardsSelector);
  const [code, setCode] = useState(0);
  const [codeWards, setCodeWards] = useState(0);
  const onOpen = (action) => {
    modalizeRef.current?.open();
    setModal(action)

  };
  const onClose = () => {
    console.log('onClose');
    modalizeRef.current?.close();

  };

  const handlerPress = (value, info, action) => {
    switch (action) {
      case 'provinces':
        if (value < 10) value = '0' + value.toString();
        setDistrict({})
        setWard({})
        setCodeWards(0)
        setProvince({
          'code': value,
          'title': info
        })
        setCode(value)
        onClose();
        break;
      case 'districts':
        if (value < 10) value = '00' + value.toString();
        if (value >= 10 && value < 100) value = '0' + value.toString();
        setWard({})
        setDistrict({
          'code': value,
          'title': info
        })
        setCodeWards(value)
        onClose();
        break;
      case 'wards':
        setWard({
          'code': value,
          'title': info
        })
        onClose();
        break;
      case 'address':
        setAddress(info)
        onClose();
        break;
      default:
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

  useEffect(() => {
    modal !== '' && modalizeRef.current?.open();
  }, [modal])



  const CustomModalize = (props) => {
    action = props.action ?? 'provinces'
    console.log('CustomModalize action:', action);
    title = 'Chọn tỉnh/thành phố*'
    var data = [];
    switch (action) {
      case 'provinces':
        data = provinces
        title = 'Chọn tỉnh/thành phố*'
        break;
      case 'districts':
        data = districts
        title = 'Quận/huyện*'
        break;
      case 'wards':
        data = wards
        title = 'Phường/Xã*'
        break;

      default:
        break;
    }



    return (
      data.length > 0 && (<Modalize
        snapPoint={600}
        modalHeight={900}
        modalStyle={[globalStyles.bgModal, { marginTop: 25 }]}
        ref={modalizeRef}>
        <View style={globalStyles.center}>
          <View style={{ marginHorizontal: 20, padding: 20 }}>
            <ComboBox countries={data} onPressAddress={handlerPress} action={action} title={title} />
          </View>
        </View>
      </Modalize>)
    )
  }

  return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5 }}>
      <View style={globalStyles.center}>
        <View style={[globalStyles.w90, globalStyles.shadowContainer]}>

          {provinces.length > 0 &&
            (
            <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:15,paddingVertical:10 }}> 
            <TouchableOpacity onPress={() => onOpen('provinces')}>
              <Text placeholder={province.title} style={[globalStyles.button,{color: provinces.length >0?'black':'#ccc'}]}>{province.title}</Text>              
            </TouchableOpacity>
            <Ionicons name="cart-outline" color="black" size={24} />
            </View>
            )}
          <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:15,paddingVertical:10 }}> 
          <TouchableOpacity onPress={() => onOpen('districts')}>
            <Text style={[globalStyles.button,{color: districts.length >0?'black':'#ccc'}]}>{district?.title || 'Quận/huyện*'}</Text>
          </TouchableOpacity>
          <Ionicons name="cart-outline" color="black" size={24} />
          </View>
          <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:15,paddingVertical:10 }}> 
          <TouchableOpacity onPress={() => onOpen('wards')}>
            <Text style={[globalStyles.button,{color: wards.length >0?'black':'#ccc'}]}>{ward?.title || 'Phường/Xã*'}</Text>
          </TouchableOpacity>
          <Ionicons name="cart-outline" color="black" size={24} />
          </View>
          <View style={{ marginTop: 10 }}>
          <TextInput value={address} style={{ height: 50, padding: 15, fontSize: 18 }} placeholder={'Địa chỉ'} onChangeText={(text) => handlerPress(0, text, 'address')} />
          </View>
        </View>
        {modal !== '' && <CustomModalize action={modal} />}
      </View>
    </SafeArea>
  );
}

export default CustomerDetail;
