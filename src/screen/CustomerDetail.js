import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView as SafeAreaViewIos,
  ScrollView,
  TouchableOpacity,
  TextInput,

} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import RadioButton from '../components/RadioButton';
import Checkbox from '../components/Checkbox';
import Address from '../components/Address';
import MyTextInput from './MyTextInput';


function CustomerDetail({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;

    
  const [selectedOptions, setSelectedOptions] = useState([]);  
  const optionsCheck = ['Tương tự thông tin trên', 'Tương tự thông tin trên 1'];

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

 


  return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5 }}>
      {
          optionsCheck.map((option,index) =>{
              return <Checkbox        
              key={index}
              label={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              />
          })
      }
        
    </SafeArea>
  );
}

export default CustomerDetail;
