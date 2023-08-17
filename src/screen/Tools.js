import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet, SafeAreaView as SafeAreaViewIos } from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
function Tools({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5, justifyContent: 'space-between' }}>
      <View
        style={{
          height: 60,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity>
          <Ionicons name="heart-outline" color="black" size={24} />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/logo.png')}
          resizeMode="center"
          style={{ flex: 1, width: '50%' }}
        />
        <TouchableOpacity>
          <Ionicons name="cart-outline" color="black" size={24} />
        </TouchableOpacity>
      </View>
      <View style={{width:'100%', flex:1}}>
        <View style={{height:'100%',width:'70%',top:0,left:0}}>
          <View style={styles.wrap}></View>
        </View>
      </View>
       <Swiper> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Slide 1</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Slide 2</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Slide 3</Text>
      </View>
    </Swiper>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 20,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#2D3953',
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
    height:'100%'
  },
})

export default Tools;
