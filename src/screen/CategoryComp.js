import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '../constants';
function CategoryComp({ navigation }) {
  const imagesCategory = [{'name':'Tân dược', 'img':images.tanduoc},{'name':'Đông dược', 'img':images.dongduoc},{'name':'TP chức năng', 'img':images.tpcn},
                          {'name':'Thiết bị Y tế', 'img':images.tbyt},{'name':'Tân dược ETC', 'img':images.tanduocetc},
                         ];
  return (
    <>
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <Text style={{ paddingLeft: 10, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Ngành hàng</Text>
      </View>
      <View
        style={{
          height: 300,
          backgroundColor: 'white',
          borderRadius: 10,
          flexDirection: 'row',
          padding: 10,
          flexWrap: 'wrap',
          justifyContent: 'flex-start '
        }}>
        {
          imagesCategory.map((item,index) => {
            return (
              <TouchableOpacity key={index} style={{ marginVertical: 15 }} onPress={() => navigation.navigate('CategoryScreen')}>
                <View style={{ justifyContent: "center", alignItems: "center", width: 120, height: 120 }}>
                  <Image resizeMode='stretch' source={item.img} style={{ width: 90, height: 90, borderRadius: 1000, borderWidth: 1, borderColor: '#ccc' }} />
                  <Text style={{ fontSize: 16, fontWeight: 600 }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }


      </View>
    </>
  );
}

export default CategoryComp;