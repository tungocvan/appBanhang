import React from 'react';
import { Text, View, ImageBackground, Platform, SafeAreaView as SafeAreaViewIos, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import { images, COLORS, FONTS } from '../constants'

function Welcome({ navigation }) {
    let SafeArea = Platform.OS === "ios" ? SafeAreaViewIos : SafeAreaViewAndroid;    
    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={{flex:1}}>
        <SafeArea style={{flex:1,marginHorizontal:5}}>
            <View style={{height:'15%', justifyContent:'center',alignItems:'center'}}>
                <Image source={images.logo} resizeMode="contain" style={{flex:1, width:"100%"}} />
            </View>
            <View style={{height:'65%', justifyContent:'center',alignItems:'center'}}>
              <Text style={{...FONTS.h1}}>Giao dịch, an toàn, tiện lợi</Text>
              <Text style={{...FONTS.body3, marginTop:15 }}>Mọi thông tin giao dịch đều được bảo mật</Text>
              <Text style={{...FONTS.body3 }}>bởi chính sách bảo mật của HMD Pharma</Text>
            </View>
            <View style={{flex:1, justifyContent:'space-around',alignItems:'center'}}>
               <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('Login')
                }}
                style={{width:'100%', backgroundColor:COLORS.green,justifyContent:'center',alignItems:'center',height:'40%', borderRadius:10 }}>
                    <Text style={{...FONTS.h2, color:'white'}}>Đăng Nhập</Text>
               </TouchableOpacity>
               <TouchableOpacity 
               onPress={() => {
                   navigation.navigate('Register')
                }}
               style={{width:'100%', backgroundColor:COLORS.purple,justifyContent:'center',alignItems:'center',height:'40%' , borderRadius:10}}>
                    <Text style={{...FONTS.h2, color:'white'}}>Đăng Ký Tài Khoản</Text>
               </TouchableOpacity>
            </View>
        </SafeArea>
        </ImageBackground>
    );
}

export default Welcome;