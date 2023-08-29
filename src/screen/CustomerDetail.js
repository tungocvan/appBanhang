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

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  
  const hanlderAddress = (value,action) => {
      console.log('value:',action+'-'+value);
  }

  //const [paddingAdress,setPaddingAdress] = React.useState(0);

    return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5 }}>
      <View style={globalStyles.center}>
        <View style={[globalStyles.w0,globalStyles.shadowContainer]}>
          <TouchableOpacity onPress={onOpen}>
            <Text style={[globalStyles.button]}>Open the modal-1</Text>
          </TouchableOpacity>
        </View>

        <Modalize
          snapPoint={300}
          modalHeight={600}
          modalStyle={[globalStyles.bgModal]}
          ref={modalizeRef}>
          <View style={globalStyles.center}>
            <View style={{margin:20,padding:20}}>
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
