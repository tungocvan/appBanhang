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

function CustomerDetail({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  const modalizeRef = useRef(null)

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
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
          snapPoint={SIZES.height / 2}
          modalHeight={SIZES.height / 2}
          modalStyle={[globalStyles.bgModal]}
          ref={modalizeRef}>
          <View style={globalStyles.center}>
            <View style={{marginVertical:10}}>
            <Text style={[globalStyles.textBold]}>...your content</Text>
            <Text style={[globalStyles.textBold]}>WIDTH:{SIZES.width}</Text>
            <Text style={[globalStyles.textBold]}>HEIGHT:{SIZES.height}</Text>
            </View>
            <View style={[globalStyles.shadowContainer,globalStyles.w0,{marginTop:10}]}>
              <TouchableOpacity onPress={onClose}>
                <Text style={[globalStyles.button]}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </View>
    </SafeArea>
  );
}

export default CustomerDetail;
