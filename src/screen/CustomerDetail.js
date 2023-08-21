import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView as SafeAreaViewIos,
  ScrollView,
  TouchableOpacity,
  TextInput,
  
} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import RadioButton from '../components/RadioButton';
import Checkbox from '../components/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { getProvinces, provincesSelector } from '../redux/reducers/dataSlice';
import ComboBox from '../components/ComboBox';


function CustomerDetail({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  const dispatch = useDispatch()
  const provinces = useSelector(provincesSelector);
  useEffect(() => {
    dispatch(getProvinces());
  },[])
  

  const [marginText,setMarginText] = useState(0);
  const [code,setCode] = useState(0);
  //const marginText = useRef(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ['Chưa có thông tin xuất hóa đơn', 'Có thông tin xuất hóa đơn'];
  const optionsCheck = ['Tương tự thông tin trên'];

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    if(option === 'Có thông tin xuất hóa đơn'){
      handleFocus(-400)
    }else{
      handleFocus(0)
    }
    
    console.log(option);
  }

  const handleFocus = (value) => {
    //console.log('handleFocus');
    setMarginText(value)
    marginText.current= value 
  } 
  const handleBlur = () => {
    // console.log('handleBlur');
    setMarginText(0)
  }

  const handlerSearch = (value) => {
    console.log('value:',value)
    setCode(value)
  }

  return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5, justifyContent: 'space-between' }}>
      <View
        style={{
          height: 60,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity style={{ width: '10%' }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="black" size={24} />
        </TouchableOpacity >
        <Text>Thêm Khách hàng mua</Text>
      </View>
      <View style={{ flex:1, backgroundColor: 'white', borderWidth: 0.1, margin: 10, borderRadius: 10, zIndex: 999, marginTop: -10+marginText }}>
        <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: '100%', padding: 20 }}>
            <Ionicons name="camera" color="#ccc" size={36} />
            <Text>TẢI ẢNH</Text>
          </View>
        </View>
        <View  style={{ flex: 1 }}>
          <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <TextInput style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Tên khách hàng mua*' />
            <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
          </View>
          <View style={{  marginBottom: 60 }}>
          {provinces.length > 0 && (
            <ComboBox countries={provinces} onSearch={handlerSearch}/> 
                        
          )}
          </View>
          {/* <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <TextInput style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Quận/huyện phố*' />
            <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
          </View>
          <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <TextInput style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Phường/xã*' />
            <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
          </View>
          <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <TextInput style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Địa chỉ*' />
            <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
          </View>
          <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <TextInput onBlur={handleBlur} onFocus={() => handleFocus(-300)}  style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Họ tên Người đại diện*' />
            <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
          </View>
          <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <TextInput onBlur={handleBlur} onFocus={() => handleFocus(-300)}  style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Số điện thoại Người đại diện*' />
            <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
          </View>
          <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <TextInput onBlur={handleBlur} onFocus={() => handleFocus(-300)}   style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Email Người đại diện*' />
            <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
          </View> */}
        </View>
        <View>
          <Text style={{ marginTop: 20, marginBottom: 10, fontSize: 18, fontWeight: 600, marginLeft: 10 }}>THÔNG TIN XUẤT HÓA ĐƠN</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <RadioButton onBlur={handleBlur}  options={options} selectedOption={selectedOption} onSelect={handleSelect} />
          </View>
          {
            selectedOption === 'Có thông tin xuất hóa đơn' && (
              <View style={{ marginTop: 10, marginLeft: 20 }}>
                <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
                  <TextInput  onBlur={handleBlur} onFocus={() => handleFocus(-450)}  style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Tên khách hàng mua' />
                  <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
                </View>
                <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
                  <TextInput  onBlur={handleBlur} onFocus={() => handleFocus(-450)}  style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Mã số thuế' />
                  <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
                </View>
                <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
                  <TextInput onBlur={handleBlur} onFocus={() => handleFocus(-450)} style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder='Địa chỉ kinh doanh' />
                  <Ionicons name="person" color="#ccc" size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  {optionsCheck.map((option, index) => (
                    <Checkbox
                      key={index}
                      label={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                  ))}
                </View>
              </View>
            )
          }
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: '45%', backgroundColor: 'red', margin: 10, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '45%', backgroundColor: 'blue', margin: 10, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>Thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
}

export default CustomerDetail;
