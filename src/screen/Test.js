//import liraries
import React from 'react';
import { View, Image, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BoxShadow from '../components/BoxShadow';
import { COLORS,  SIZES, images } from '../constants';
import Header from '../components/Header';
// create a component
const Test = () => {    
    return (
        <View style={styles.container}>
            <Header />
            <View style={{flex:1,backgroundColor:'#ccc',alignItems:'center'}}>
                <TextInput style={styles.inputStyle} />                
                <TextInput style={styles.inputStyle} />                
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputStyle:{        
        width:'94%',
        height:50,
        backgroundColor:'white',
        marginVertical:5,
        borderRadius:8,
        paddingHorizontal:10,
        borderWidth:0.2
    }
});

//make this component available to the app
export default Test;
