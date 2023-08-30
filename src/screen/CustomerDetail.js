import React, { useRef , useEffect , useState} from 'react';
import {
  Platform,
  SafeAreaView as SafeAreaViewIos,
  View, Text, TouchableOpacity
} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getProvinces, provincesSelector, getDistricts, districtsSelector, resetDistricts, getWards, wardsSelector, resetWards } from '../redux/reducers/dataSlice';
import ComboBox from '../components/ComboBox';
import globalStyles , {bgStyles} from "../globalStyles";
import { Modalize } from 'react-native-modalize';
import { SIZES } from "../constants/theme";



function CustomerDetail({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  const dispatch = useDispatch()
  const modalizeRef = useRef(null)
  const [province,setProvince] = React.useState({})
  const [district,setDistrict] = React.useState({})
  const [ward,setWard] = React.useState({})
  const [modal,setModal] = React.useState('')
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

const handlerPress = (value,info, action) => {  
  switch (action) {
    case 'provinces':      
      setProvince({
        'code':value,
        'title':info
      })
      setCode(value)
      break;
    case 'districts':      
      setDistrict({
        'code':value,
        'title':info
      })
      setCode(value)
      break;
    case 'wards':      
      setWard({
        'code':value,
        'title':info
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
    province?.code && dispatch(getDistricts(code))
  }, [code])

  useEffect(() => {
    district?.code && dispatch(getWards(code))
  }, [code])
    
 
    return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5 }}>
      <View style={globalStyles.center}>
        <View style={[globalStyles.w90,globalStyles.shadowContainer]}>
          <TouchableOpacity onPress={() => onOpen('provinces')} style={{marginTop:10,borderBottomWidth:1}}>
            <Text style={[globalStyles.button]}>{province?.title || 'Chọn tỉnh/thành phố*'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onOpen('districts')} style={{marginTop:10,borderBottomWidth:1}}>
            <Text style={[globalStyles.button]}>{district?.title || 'Quận/huyện*'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onOpen('wards')} style={{marginTop:10}}>
            <Text style={[globalStyles.button]}>{ward?.title || 'Phường/Xã*'}</Text>
          </TouchableOpacity>
        </View>

        <Modalize
          snapPoint={600}
          modalHeight={900}
          modalStyle={[globalStyles.bgModal,{marginTop: 25}]}
          ref={modalizeRef}>
          <View style={globalStyles.center}>
            <View style={{marginHorizontal:20,padding:20}}>
                  {provinces.length > 0 && modal==='provinces' && (<ComboBox countries={provinces} onPress={handlerPress} action={'provinces'} title={'Chọn tỉnh/thành phố*'} />)}
                  {districts.length > 0 && modal==='districts' && (<ComboBox countries={districts} onPress={handlerPress} action={'districts'} title={'Quận/huyện*'} />)}
                 <View style={[globalStyles.shadowContainer,globalStyles.w0]}>
              <TouchableOpacity onPress={onClose}>
                  <Text style={[globalStyles.button]}>Submit</Text>
              </TouchableOpacity>
            </View>
            </View>   
          </View>
        </Modalize>
      </View>
    </SafeArea>
  );
}

export default CustomerDetail;
