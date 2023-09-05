//import liraries
import React from 'react';
import { View, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BoxShadow from '../components/BoxShadow';
import { COLORS,  SIZES, images } from '../constants';
// create a component
const Header = () => {    
    return (
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
    );
};


//make this component available to the app
export default Header;
