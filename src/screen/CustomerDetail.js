import React, { useRef, useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView as SafeAreaViewIos,
  View, Text, TouchableOpacity, ActivityIndicator
} from 'react-native';
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
  const [province, setProvince] = React.useState({'title':'Chọn tỉnh/thành phố*'})
  const [district, setDistrict] = React.useState({})
  const [ward, setWard] = React.useState({})
  const [modal, setModal] = React.useState('')
  const provinces = useSelector(provincesSelector);
  const districts = useSelector(districtsSelector);
  const wards = useSelector(wardsSelector);
  const [code, setCode] = useState(0);
  const onOpen = (action) => {
    setModal(action)
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();

  };

  const handlerPress = (value, info, action) => {
    switch (action) {
      case 'provinces':
        if (value < 10) value = '0' + value.toString();
        setDistrict({})
        setWard({})
        setProvince({
          'code': value,
          'title': info
        })
        setCode(value)
        break;
      case 'districts':
        if (value < 10) value = '00' + value.toString();
        if (value >= 10 && value < 100) value = '0' + value.toString();
        setDistrict({
          'code': value,
          'title': info
        })
        setCode(value)
        break;
      case 'wards':
        setWard({
          'code': value,
          'title': info
        })
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
      console.log('code:',code);
  }, [code])

  useEffect(() => {
    district?.code && dispatch(getWards(code))
  }, [code])

  
  console.log('districts:',districts.length);

  const CustomModalize = (props) => {
    // data,action='provinces',title='Chọn tỉnh/thành phố*')
      data = props.data ?? [];
      action = props.action ?? 'provinces'
      title = props.title ?? 'Chọn tỉnh/thành phố*'
      return (
        <Modalize
          snapPoint={600}
          modalHeight={900}
          modalStyle={[globalStyles.bgModal, { marginTop: 25 }]}
          ref={modalizeRef}>
          <View style={globalStyles.center}>
            <View style={{ marginHorizontal: 20, padding: 20 }}>
             <ComboBox countries={data} onPressAddress={handlerPress} action={action} title={title} />        
            </View>
          </View>
        </Modalize>
      )
  }

  return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5 }}>
      <View style={globalStyles.center}>
        <View style={[globalStyles.w90, globalStyles.shadowContainer]}>
        {provinces.length > 0 && 
          (<TouchableOpacity onPress={() => onOpen('provinces')} style={{ marginTop: 10, borderBottomWidth: 1 }}>
            <Text style={[globalStyles.button]}>{province.title}</Text>
          </TouchableOpacity>)}
          {districts.length > 0 &&
          (<TouchableOpacity onPress={() => onOpen('districts')} style={{ marginTop: 10, borderBottomWidth: 1 }}>
            <Text style={[globalStyles.button]}>{district?.title || 'Quận/huyện*'}</Text>
          </TouchableOpacity>)}
          <TouchableOpacity onPress={() => onOpen('wards')} style={{ marginTop: 10, borderBottomWidth: 1 }}>
            <Text style={[globalStyles.button]}>{ward?.title || 'Phường/Xã*'}</Text>
          </TouchableOpacity>
        </View>
        {provinces.length > 0 && modal==='provinces' && <CustomModalize data={provinces}  /> }
        {modal==='districts' && <CustomModalize data={districts} action='districts' title='Quận/huyện*'  /> }
        {wards.length > 0 && modal==='wards' && <CustomModalize data={wards} action='wards' title='Phường/Xã*'  /> }
      </View>
    </SafeArea>
  );
}

export default CustomerDetail;
