import React , {useState} from 'react';
import { View , Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
function CategoryComp ( {navigation} ) {
    return (
      <>
        <View style={{flexDirection:'row', marginVertical:10}}>
                        <Text style={{ paddingLeft:10,fontSize:20,color:'white', fontWeight:'bold'}}>Ngành hàng</Text>                           
        </View>
        <View
          style={{
            height: 300,
            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection:'row',
            padding:10,
            flexWrap:'wrap',
            justifyContent:'flex-start '
          }}>
            <TouchableOpacity style={{marginVertical:15}} onPress={() => navigation.navigate('CategoryScreen')}>
            <View style={{justifyContent: "center",alignItems: "center",width:120,height:120}}>
                <Image resizeMode='stretch' source={require('../assets/images/banner-1.jpg')} style={{width:90,height:90,borderRadius:1000,borderWidth:1,borderColor:'#ccc'}} />
                <Text style={{fontSize:16,fontWeight:600}}>Tân dược</Text>
            </View>
            </TouchableOpacity>            
            <TouchableOpacity style={{marginVertical:15}} onPress={() => navigation.navigate('CategoryScreen')}>
            <View style={{justifyContent: "center",alignItems: "center",width:120,height:120}}>
                <Image resizeMode='stretch' source={require('../assets/images/banner-2.jpg')} style={{width:90,height:90,borderRadius:1000,borderWidth:1,borderColor:'#ccc'}} />
                <Text style={{fontSize:16,fontWeight:600}}>Đông dược</Text>
            </View>
            </TouchableOpacity>            
            <TouchableOpacity style={{marginVertical:15}} onPress={() => navigation.navigate('CategoryScreen')}>
            <View style={{justifyContent: "center",alignItems: "center",width:120,height:120}}>
                <Image resizeMode='stretch' source={require('../assets/images/banner-3.jpg')} style={{width:90,height:90,borderRadius:1000,borderWidth:1,borderColor:'#ccc'}} />
                <Text style={{fontSize:16,fontWeight:600}}>TP chức năng</Text>
            </View>
            </TouchableOpacity>            
            <TouchableOpacity style={{marginVertical:15}} onPress={() => navigation.navigate('CategoryScreen')}>
            <View style={{justifyContent: "center",alignItems: "center",width:120,height:120}}>
                <Image resizeMode='stretch' source={require('../assets/images/banner-1.jpg')} style={{width:90,height:90,borderRadius:1000,borderWidth:1,borderColor:'#ccc'}} />
                <Text style={{fontSize:16,fontWeight:600}}>Vật tư - TBYT</Text>
            </View>
            </TouchableOpacity>            
            <TouchableOpacity style={{marginVertical:15}} onPress={() => navigation.navigate('CategoryScreen')}>
            <View style={{justifyContent: "center",alignItems: "center",width:120,height:120}}>
                <Image resizeMode='stretch' source={require('../assets/images/banner-2.jpg')} style={{width:90,height:90,borderRadius:1000,borderWidth:1,borderColor:'#ccc'}} />
                <Text style={{fontSize:16,fontWeight:600}}>Tân dược ETC</Text>
            </View>
            </TouchableOpacity>            
                      
          </View>
      </>
    );
}

export default CategoryComp;