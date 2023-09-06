import React, { useRef, useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView as SafeAreaViewIos,
  View, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView,
  Image
} from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getProvinces, provincesSelector, getDistricts, districtsSelector, resetDistricts, getWards, wardsSelector, resetWards } from '../redux/reducers/dataSlice';
import ComboBox from '../components/ComboBox';
import globalStyles, { bgStyles } from "../globalStyles";
import { Modalize } from 'react-native-modalize';
import { SIZES } from "../constants/theme";
import Radio from '../components/Radio';
import CheckBox from '../components/Checkbox';
import MyTextInput from './MyTextInput';




function CustomerDetail({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  const dispatch = useDispatch()
  const modalizeRef = useRef(null)
  const inputRef = useRef(null);
  const [textInputRef, setTextInputRef] = useState(0);
  const [customer, setCustomer] = React.useState({})
  const [province, setProvince] = React.useState({ 'title': 'Chọn tỉnh/thành phố*' })
  const [district, setDistrict] = React.useState({})
  const [ward, setWard] = React.useState({})
  const [modal, setModal] = React.useState('')
  const [show, setShow] = React.useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const provinces = useSelector(provincesSelector);
  const districts = useSelector(districtsSelector);
  const wards = useSelector(wardsSelector);
  const [code, setCode] = useState(0);
  const [codeWards, setCodeWards] = useState(0);
  const optionsRadio = ['Chưa có thông tin xuất hóa đơn', 'Có thông tin xuất hóa đơn'];
  const optionsCheck = ['Tương tự thông tin trên'];
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
        setCustomer({...customer,'province':info}) 
        setCode(value)
        onClose();
        break;
      case 'districts':
        if (value < 10) value = '00' + value.toString();
        if (value >= 10 && value < 100) value = '0' + value.toString();
        setWard({})
        setCustomer({...customer,'district':info}) 
        setDistrict({
          'code': value,
          'title': info
        })
        setCodeWards(value)
        onClose();
        break;
      case 'wards':
        setCustomer({...customer,'ward':info}) 
        setWard({
          'code': value,
          'title': info
        })
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
        snapPoint={800}
        modalHeight={900}
        modalStyle={[globalStyles.bgModal, { marginTop: 25 }]}
        ref={modalizeRef}>
        <View style={globalStyles.center}>
          <View style={{ padding: 20 }}>
            <ComboBox countries={data} onPressAddress={handlerPress} action={action} title={title} />
          </View>
        </View>
      </Modalize>)
    )
  }


  const hanldeRadio = (value) => {
    
    if(value === 'Có thông tin xuất hóa đơn') {
       setShow(true)
    }else{
      setShow(false)
    }
  }

  const hanldeCheckbox = (value) => {
    console.log('hanldeCheckbox:',value);    
    if(value[0] === 'Tương tự thông tin trên') {
      console.log('address:',customer.address);  
      setCustomer({...customer,'customerCompnay':customer.customerName,'addressCompnay':customer.address})
   }
  }

  const hanlderMyTextInput = (value, action) => {
    console.log(action + '-' + value)    
    switch (action) {
      case 'customerName':              
        setCustomer({...customer,'customerName':value})      
        break;
      case 'fullname':              
        setCustomer({...customer,'fullname':value})      
        break;
      case 'address':
        setCustomer({...customer,'address':value})
        break;
      case 'phone':
        setCustomer({...customer,'phone':value})
        break;
      case 'email':
        setCustomer({...customer,'email':value})
        break;
      case 'customerCompnay':
        setCustomer({...customer,'customerCompnay':value})
        break;
      case 'codetax':
        setCustomer({...customer,'codetax':value})
        break;
      case 'addressCompnay':
        setCustomer({...customer,'addressCompnay':value})
        break;
    
      default:
        break;
    }
    console.log('customer:',customer);
  }

  const hanlderSubmit = async () => {
    console.log('Customer:', customer)
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.mimeType,
        name: selectedFile.name,
      });
      try {
        //console.log(formData._parts);
        const response = await axios.post('https://laravel.tungocvan.com/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

         console.log(response.data);
      } catch (error) {
        console.error('Lỗi khi tải tệp lên:', error);
      }
    }
  }

  
  const handleFileUpload = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: 'image/*', // Chọn tất cả các loại tệp
        });       
         
        if (result.assets) {
          setSelectedFile(result.assets[0]);
          // console.log('result-1:',result.assets[0]);
          
        }
      } catch (error) {
         console.error('Lỗi khi chọn tệp:', error);
      }
  };

  return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5, marginTop: 100 + textInputRef }}>
      <ScrollView style={{ flex: 1, paddingTop: 50 }}>
        <View style={[globalStyles.center, { flex: 1 }]}>
          <View style={{ position: 'absolute', width: 100, height: 100, backgroundColor: "#ccc", zIndex: 9999, top: -50, borderRadius: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleFileUpload}>
              {
                selectedFile && (<Image source={{ uri:selectedFile.uri }} style={{borderRadius:1000, width:100,height:100}} />) || (<Ionicons name="camera" color="black" size={40} />)
              } 
              </TouchableOpacity> 
          </View> 
          <View style={[globalStyles.w90, globalStyles.shadowContainer]}>
            <View style={{ marginTop: 50 }}>
              <MyTextInput
                action='customerName'
                styleContainer={{ width: '100%', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                styleInput={{ height: 50, padding: 15, fontSize: 18, width: '100%', color: 'black' }}
                placeholder='Tên khách hàng' onMyTextInput={hanlderMyTextInput} />
            </View>
            {provinces.length > 0 &&
              (
                <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
                  <TouchableOpacity onPress={() => onOpen('provinces')}>
                    <Text placeholder={province.title} style={[globalStyles.button, { color: provinces.length > 0 ? 'black' : '#ccc' }]}>{province.title}</Text>
                  </TouchableOpacity>
                  <Ionicons name="cart-outline" color="black" size={24} />
                </View>
              )}
            <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
              <TouchableOpacity onPress={() => onOpen('districts')}>
                <Text style={[globalStyles.button, { color: districts.length > 0 ? 'black' : '#ccc' }]}>{district?.title || 'Quận/huyện*'}</Text>
              </TouchableOpacity>
              <Ionicons name="cart-outline" color="black" size={24} />
            </View>
            <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
              <TouchableOpacity onPress={() => onOpen('wards')}>
                <Text style={[globalStyles.button, { color: wards.length > 0 ? 'black' : '#ccc' }]}>{ward?.title || 'Phường/Xã*'}</Text>
              </TouchableOpacity>
              <Ionicons name="cart-outline" color="black" size={24} />
            </View>
            <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput value={customer?.address} style={{ height: 50, padding: 15, fontSize: 18 }} placeholder={'Địa chỉ'} onChangeText={(text) => hanlderMyTextInput(text, 'address')} />
              <Ionicons name="cart-outline" color="black" size={24} style={{ paddingHorizontal: 15, paddingVertical: 10 }} />
            </View>
            <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput value={customer?.fullname} style={{ height: 50, padding: 15, fontSize: 18 }} placeholder={'Họ tên người đại diện'} onChangeText={(text) => hanlderMyTextInput(text, 'fullname')} />
              <Ionicons name="cart-outline" color="black" size={24} style={{ paddingHorizontal: 15, paddingVertical: 10 }} />
            </View>
            <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput onBlur={() => setTextInputRef(0)} onFocus={() => setTextInputRef(-270)} value={customer?.phone} style={{ height: 50, padding: 15, fontSize: 18 }} placeholder={'Số điện thoại người đại diện'} onChangeText={(text) => hanlderMyTextInput(text, 'phone')} />
              <Ionicons name="cart-outline" color="black" size={24} style={{ paddingHorizontal: 15, paddingVertical: 10 }} />
            </View>
            <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput onBlur={() => setTextInputRef(0)} onFocus={() => setTextInputRef(-270)} value={customer?.email} style={{ height: 50, padding: 15, fontSize: 18 }} placeholder={'Email người đại diện'} onChangeText={(text) => hanlderMyTextInput(text, 'email')} />
              <Ionicons name="cart-outline" color="black" size={24} style={{ paddingHorizontal: 15, paddingVertical: 10 }} />
            </View>

            <View style={{ flex: 1 }}> 
              <Text style={[globalStyles.button, { paddingVertical: 20, paddingHorizontal: 15, color: 'black', fontSize: 20 }]}>THÔNG TIN XUẤT HÓA ĐƠN</Text>
              <View
                style={{ flex: 1, marginHorizontal: 15, marginBottom:50 }}>
                {
                  optionsRadio && <Radio options={optionsRadio} onRadio={hanldeRadio} />
                }
                {
                  show && (
                    <View style={{ flex: 1, paddingBottom: 50 }}>
                  <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput onBlur={() => setTextInputRef(0)} onFocus={() => setTextInputRef(-400)} value={customer?.customerCompnay} style={{ height: 50, padding: 15, fontSize: 18 }} placeholder={'Tên khách hàng'} onChangeText={(text) => hanlderMyTextInput(text, 'customerCompnay')} />
                    <Ionicons name="cart-outline" color="black" size={24} style={{ paddingHorizontal: 15, paddingVertical: 10 }} />
                  </View>
                  <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput onBlur={() => setTextInputRef(0)} onFocus={() => setTextInputRef(-460)} value={customer?.codetax} style={{ height: 50, padding: 15, fontSize: 18 }} placeholder={'Mã số thuế'} onChangeText={(text) => hanlderMyTextInput(text, 'codetax')} />
                    <Ionicons name="cart-outline" color="black" size={24} style={{ paddingHorizontal: 15, paddingVertical: 10 }} />
                  </View>
                  <View style={{ marginTop: 10, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput onBlur={() => setTextInputRef(0)} onFocus={() => setTextInputRef(-500)} value={customer?.addressCompnay} style={{ height: 50, padding: 15, fontSize: 18 }} placeholder={'Địa chỉ kinh doanh'} onChangeText={(text) => hanlderMyTextInput(text, 'addressCompnay')} />
                    <Ionicons name="cart-outline" color="black" size={24} style={{ paddingHorizontal: 15, paddingVertical: 10 }} />
                  </View>
                  <View
                    style={{ flex: 1, marginHorizontal: 5, marginVertical: 15 }}>
                    {
                      optionsCheck && <CheckBox options={optionsCheck} onCheckBox={hanldeCheckbox} />
                    }
                  </View>
                </View>
                  )
                }
              </View>
            </View>
          </View>
          {modal !== '' && <CustomModalize action={modal} />}
        </View>
      </ScrollView>
      <View style={{height:50,width:'100%',padding:10,justifyContent:'center',alignItems:'center', backgroundColor:"green"}}>
         <TouchableOpacity onPress={hanlderSubmit}>
          <Text style={{ fontSize:20,fontWeight:600, color:'white'}}>Submit</Text>
          </TouchableOpacity>           
      </View>
    </SafeArea>
  );
}

export default CustomerDetail;
