//import liraries
import React,{useRef} from 'react';
import { View,  StyleSheet, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// create a component
const MyTextInput = (props) => {
    iconName= props.iconName ?? "person"
    iconColor= props.iconColor ?? "black"
    iconSize= props.iconSize ?? 24
    placeholder = props.placeholder ?? ''
    action = props.action ?? '';      
    styleContainer = props.styleContainer ?? ''; 
    styleIcon = props.styleIcon ?? { position: 'absolute', right: 15, bottom: 10 }; 
    styleInput = props.styleInput ?? { width: '100%', borderWidth: 0.2, padding: 15, borderRadius: 6}; 
    
    const [text,setText] = React.useState('');
    
    const handleInput = (value) => {             
        setText(value)
        props.onMyTextInput && props.onMyTextInput(value,action)
    }
   
   

    return (
        <View style={[styles.container,styleContainer]}>
            <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
                <TextInput value={text} style={styleInput} placeholder={placeholder} onChangeText={handleInput} />
                <Ionicons name={iconName} color={iconColor} size={iconSize} style={styleIcon} />
          </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default MyTextInput;
