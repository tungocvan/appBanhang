import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet, SafeAreaView as SafeAreaViewIos, ScrollView } from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomerDetail from './CustomerDetail';
function Customer({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  return (
    <SafeArea
      style={{ flex: 1, justifyContent: 'space-between' }}>
      {/* Header   */}
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
      {/* Body */}
      <ScrollView>
        
      </ScrollView>
      {/* button add   */}
      <View style={styles.wrap}>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerDetail')}>
          <Text style={{color:'white',fontSize:30,fontWeight:600}}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}

const Stack = createStackNavigator();


function StackCustomer() { 
  return (
    <Stack.Navigator initialRouteName="Customer">
      <Stack.Screen
        name="Customer"
        component={Customer}
        options={{
          header: () => null,
        }}
      />         
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{
          header: () => null,
        }}
      />     
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  wrap: {    
    borderRadius: '100%',
    backgroundColor: '#2D3953',
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
    height:50,
    width:50,    
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    right:30,
    bottom:40
  },
})

export default StackCustomer;



