import React, { useRef } from 'react';
import {
  Platform,
  SafeAreaView as SafeAreaViewIos,
  View, Text, TouchableOpacity
} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import globalStyles , {bgStyles} from "../globalStyles";
import { Modalize } from 'react-native-modalize';
import { SIZES } from "../constants/theme";

import Address from '../components/Address';

function CustomerDetail({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  const modalizeRef = useRef(null)
  const [addressInfo,setAddressInfo] = React.useState([])
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
    //let addressTemp= addressInfo.split("-").reverse().join(", ");
    //let addressTemp= addressInfo.reverse();
    console.log('addressTemp:',addressInfo.join(", "))
    setAddressInfo(addressInfo.join(", "))
    //setAddressInfo(addressInfo.join(', '))
  };
  
  const hanlderAddress = (value,action) => {       
    if(action === 'provinces') addressInfo[3] = value
    if(action === 'districts') addressInfo[2] = value
    if(action === 'wards') addressInfo[1] = value
    if(action === 'infoAddress') addressInfo[0] = value
    setAddressInfo(addressInfo)
  }
  
  //const [paddingAdress,setPaddingAdress] = React.useState(0);

    return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5 }}>
      <View style={globalStyles.center}>
        <View style={[globalStyles.w90,globalStyles.shadowContainer]}>
          <TouchableOpacity onPress={onOpen}>
            <Text style={[globalStyles.button]}>{typeof addressInfo !== 'string'?'Địa chỉ':addressInfo}</Text>
          </TouchableOpacity>
        </View>

        <Modalize
          snapPoint={600}
          modalHeight={900}
          modalStyle={[globalStyles.bgModal,{marginTop: 25}]}
          ref={modalizeRef}>
          <View style={globalStyles.center}>
            <View style={{marginHorizontal:20,padding:20}}>
                 <Address onAddress={hanlderAddress}/>
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
