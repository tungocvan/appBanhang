//import liraries
import React from 'react';
import { View,  StyleSheet, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
// create a component
const MyTextInput = (props) => {
    iconName= props.iconName ?? "person"
    iconColor= props.iconColor ?? "#ccc"
    iconSize= props.iconSize ?? 24
    placeholder = props.placeholder ?? ''
    value = props.value ?? '';
    const [text,setText] = React.useState('');
    const handleInput = (value) => {
        setText(value)
        props.onMyTextInput && props.onMyTextInput(value)
    }
    return (
        <View style={styles.container}>
            <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 10 }}>
                <TextInput value={text} style={{ width: '90%', borderWidth: 0.2, padding: 15, borderRadius: 6, }} placeholder={placeholder} onChangeText={handleInput}/>
                <Ionicons name={iconName} color={iconColor} size={24} style={{ position: 'absolute', right: 10, bottom: 10 }} />
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
