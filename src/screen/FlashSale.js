import React , {useState} from 'react';
import { View , Text, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
function FlashSale( {navigation} ) {
    return (
        <View style={{ height:40, backgroundColor:'green', justifyContent:'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection:'row', padding:5}}>
              <Ionicons name="arrow-back" color="white" size={16} />
              <Text style={{ fontSize:16, color:'white', marginLeft:5}}>Flash Sale</Text>
          </TouchableOpacity>
        </View> 
    );
}

export default FlashSale;