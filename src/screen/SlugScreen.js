import React from 'react';
import { View , Text, TouchableOpacity, SafeAreaView as SafeAreaViewIos } from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
function SlugScreen( {navigation} ) {
    let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
    return (
        <SafeArea
      style={{ flex: 1, marginHorizontal: 5, justifyContent: 'space-between' }}>
        <View style={{ height:40, backgroundColor:'green', justifyContent:'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection:'row', padding:5}}>
              <Ionicons name="arrow-back" color="white" size={16} />
              <Text style={{ fontSize:16, color:'white', marginLeft:5}}>Flash Sale</Text>
          </TouchableOpacity>
        </View> 
        </SafeArea>
    );
}
 
export default SlugScreen;
