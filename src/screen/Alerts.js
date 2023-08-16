import React, { useState } from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView as SafeAreaViewIos,
} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import HeaderSearch from '../components/HeaderSearch';
import { usersSelector } from '../redux/reducers/accountSlice';
function Alerts({ navigation }) {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  const [data, setData] = useState([]);
  const users = useSelector(usersSelector);
  React.useEffect(() => {
    if (users.length > 0) {
      setData(users);
    }
  }, [users]);
  console.log('data:', data);
  return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5, justifyContent: 'space-between' }}>
      <HeaderSearch navigation={navigation} />
    </SafeArea>
  );
}

export default Alerts;
