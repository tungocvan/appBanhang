import React, { useState } from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView as SafeAreaViewIos,
} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, getUser } from '../redux/reducers/userSlice';
function Customer() {
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  const dispatch = useDispatch();
  // const [user,setUser] = useState(null);
  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <SafeArea
      style={{ flex: 1, marginHorizontal: 5, justifyContent: 'space-between' }}>
      <View>
        <Text>Khách hàng</Text>
      </View>
    </SafeArea>
  );
}

export default Customer;
