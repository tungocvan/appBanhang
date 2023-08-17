import React from 'react';
import {
  Text,
  View,  
  Platform,
  SafeAreaView as SafeAreaViewIos,
  Image,
  TouchableOpacity,  
  ScrollView,
} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
//import Banner from './Banner';
import SlugScreen from './SlugScreen';
import FlashComp from './FlashComp';
import CategoryComp from './CategoryComp';
import ProductHot from './ProductHot';
import ProductNew from './ProductNew';
import SearchProduct from './SearchProduct';
import { images, COLORS } from '../constants'
import CategoryScreen from './CategoryScreen';
import Silders from '../components/Silders';

const Stack = createStackNavigator();

export const Home = ({ navigation }) => {
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
            source={images.logo}
            resizeMode="center"
            style={{ flex: 1, width: '50%' }}
          />
          <TouchableOpacity>
            <Ionicons name="cart-outline" color="black" size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: '#068F47',
            flexDirection: 'column',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchProduct')
            }}
            style={{
              height: 50,
              width: '100%',
              backgroundColor: 'white',
              marginTop: 15,
              borderRadius: 10,
              alignItems: 'center',
              paddingLeft: 15,
              flexDirection: 'row',
              marginBottom:5
            }}>
            <Ionicons name="search-outline" color="black" size={24} />
            <Text style={{ color: '#ccc', paddingLeft: 10 }}>
              Tìm kiếm sản phẩm 
            </Text>
          </TouchableOpacity>
          {/* <Banner />         */}          
          <Silders />
          <FlashComp navigation ={navigation} />
          <CategoryComp navigation ={navigation} />
  
          {/* sản phẩm hot */}
          <ProductHot navigation ={navigation} />
          {/* sản phẩm mới */}
          <ProductNew navigation ={navigation} /> 
        </ScrollView>
    </SafeArea>               
  );
};

function StackHome() { 
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      /> 
      <Stack.Screen
        name="SlugScreen"
        component={SlugScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SearchProduct"
        component={SearchProduct}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackHome;
