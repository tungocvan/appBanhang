import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { ProductItem } from '../components/ProductItem';
function ProductHot({ navigation }) {
  const data = [1, 2, 3, 4];
  return (
    <>
      <View
        style={{
          height: 40,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}>
            Sản phẩm hot
          </Text>
        </View>
        <TouchableOpacity  onPress={() => navigation.navigate('SlugScreen')}>
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {
          data.map((item) => {
            return (
              <View
                key={item}
                style={{
                  height: 300,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  width: '48%',
                  paddingHorizontal: 5,
                  marginVertical: 5
                }}>
                <ProductItem />
              </View>
            )
          })
        }
      </View>
    </>
  );
}

export default ProductHot;
