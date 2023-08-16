import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { resetAccount } from '../redux/reducers/accountSlice';
import BoxShadow from '../components/BoxShadow';
import { COLORS, FONTS, SIZES, images } from '../constants';
function Account({ navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('Account useFocusEffect');
      return () => {
        // Do seomething when the screen is unfocused
        // Useful for cleanup functions
        console.log('exit useFocusEffect');
      };
    }, [])
  );

  React.useEffect(() => {
    console.log('Account useEffect');
  }, []);

  const dispatch = useDispatch();

  return (
    <View>
      <BoxShadow>
        <View
          style={{
            height: 60,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: 'white',
            width: SIZES.width,
            marginTop: 40,
          }}>
          <Image
            source={images.logo}
            resizeMode="center"
            style={{ width: SIZES.width }}
          />

          <TouchableOpacity
            style={{ position: 'absolute', right: 20 }}
            onPress={() => {
              dispatch(resetAccount());
              navigation.replace('Welcome');
            }}>
            <Ionicons name="exit-outline" color={COLORS.black} size={24} />
          </TouchableOpacity>
        </View>
      </BoxShadow>
      <BoxShadow style={{ margin: 10 }}>
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'red' }}>Account</Text>
          <Text style={{ ...FONTS.h3 }}>Mike Swoosh</Text>
          <Text style={{ ...FONTS.body3 }}>Women's medium support</Text>
        </View>
      </BoxShadow>
    </View>
  );
}

export default Account;
