import React from 'react';
import {    
  Platform,
  SafeAreaView as SafeAreaViewIos,
  View, Text

} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';


function Customer() {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5, justifyContent: 'space-between' }}>      
      <View><Text>Khách hàng</Text></View>
    </SafeArea>
  );
}

export default Customer;
