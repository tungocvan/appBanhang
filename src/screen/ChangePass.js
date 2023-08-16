import React , {useState} from 'react';
import {
    Text,
    View,  
    Platform,
    SafeAreaView as SafeAreaViewIos,
    Image,
    TouchableOpacity,  
    ScrollView,
  } from 'react-native';
  import Ionicons from '@expo/vector-icons/Ionicons';
import BoxChangePass from '../components/BoxChangePass';

//import { useSelector, useDispatch } from 'react-redux';
//import { userSelector , getUser } from '../redux/reducers/userSlice'
function ChangePass() {
    return (
        <BoxChangePass />
    ); 
}

export default ChangePass;