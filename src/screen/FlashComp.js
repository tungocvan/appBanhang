import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
function FlashComp({ navigation }) {
  return (
    <>
      <View
        style={{
          height: 40,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: 10,
        }}>
        <View style={{ flexDirection: 'row', flex:1 }}>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}>
            Flash Sale
          </Text>
          <Ionicons name="flash-outline" color="red" size={24} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('FlashSale')}>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}>
            XEM THÊM
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{
          height: 250,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: 10,          
          marginBottom:10
        }}>
            <View style={{ width: '40%', height: '100%',  alignItems:'center' }}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:16,width:'65%',backgroundColor:'red', paddingHorizontal:5,paddingVertical:2, marginTop:15,marginBottom:15}}>
                    <Ionicons name="flash-outline" color="yellow" size={24} />
                    <Text style={{color:'white', fontSize:18, marginLeft:3}}>-45%</Text>
                </View>
                <Image resizeMode='contain' source={require('../assets/images/carhu.jpg')} style={{width:150,height:100}} />
                
            </View>
            <View style={{ width: '55%', height: '100%' , padding:5 }}>
                <Text style={{fontWeight:600}}>CARHUROL 20 Điều trị tăng Lipid huyết</Text>
                <Text style={{color:'green',fontSize:12,borderRadius:6,borderWidth:1,width:70,textAlign:'center',marginVertical:5}}>Còn hàng</Text>
                <Text style={{marginBottom:5}}>Đơn vị: Hộp</Text>
                <Text>CÔNG TY TNHH TMDP NAM KHANG</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                  <Text>Giá Niêm Yết:</Text>
                  <Text>N/A đ</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                  <Text>Giá KHM:</Text>
                  <Text>51.540 đ</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                  <Text>Giá Đại lý:</Text>
                  <Text>26.985 đ</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>              
                  <Text>48.963 đ</Text>
                </View>
            </View>
        </View>
        <View style={{flexDirection:'row', width:'40%',position:'absolute',left:5,bottom:15}}>
                <View style={{backgroundColor:'red',justifyContent:'center',alignItems:'center',borderBottomLeftRadius:6,borderTopLeftRadius:6,width:'30%', padding:5}}>
                  <Text style={{color:'white'}}>05</Text>
                  <Text style={{color:'white', fontSize:12}}>NGÀY</Text>
                </View>
                <View style={{backgroundColor:'red',justifyContent:'center',alignItems:'center',width:'30%', padding:5,marginLeft:2}}>
                  <Text style={{color:'white'}}>03</Text>
                  <Text style={{color:'white', fontSize:12}}>GIỜ</Text>
                </View>
                <View style={{backgroundColor:'red',justifyContent:'center',alignItems:'center',width:'30%', padding:5,marginLeft:2}}>
                  <Text style={{color:'white'}}>44</Text>
                  <Text style={{color:'white', fontSize:12}}>PHÚT</Text>
                </View>
                <View style={{backgroundColor:'red',justifyContent:'center',alignItems:'center',borderBottomRightRadius:6,borderTopRightRadius:6,width:'30%', padding:5,marginLeft:2}}>
                  <Text style={{color:'white'}}>05</Text>
                  <Text style={{color:'white', fontSize:12}}>GIÂY</Text>
                </View>
              
      </View>
      </View>
      
    </>
  );
}

export default FlashComp;
