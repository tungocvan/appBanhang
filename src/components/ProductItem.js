import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export function ProductItem(props) {

    return (
        <>
            <Ionicons onPress={() => console.log('heart')} style={{ position: 'absolute', zIndex: 1, right: 5 }} name="heart-outline" color="red" size={24} />
            <View>
                <TouchableOpacity onPress={() => console.log('picture')}>
                    <Image resizeMode='contain' source={require('../assets/images/carhu.jpg')} style={{ width: 150, height: 100, marginTop: 5, zIndex: 1 }} />

                    <Text style={{ fontWeight: 600 }}>TPBVSK VIÊN HOÀN MẬT ONG NGHỆ ĐEN A.T AN...</Text>
                    <Text style={{ marginVertical: 5, borderWidth: 1, textAlign: 'center', width: '50%', borderRadius: 6 }}>Còn hàng</Text>
                    <Text style={{ marginBottom: 5 }}>Đơn vị: Hộp</Text>
                    <Text style={{ marginBottom: 5 }}>CÔNG TY TNHH TMDP NAM KHANG</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text>Giá Niêm Yết:</Text>
                        <Text>N/A đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text>Giá KHM:</Text>
                        <Text>46.200 đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text>Giá Đại Lý:</Text>
                        <Text>46.200 đ</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </>
    );
}

