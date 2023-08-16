import React , {useState} from 'react';
import { View , Text, TouchableOpacity,Image,FlatList, TextInput, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { usersSelector } from '../redux/reducers/accountSlice'
function HeaderSearch({ navigation }) {
  const [data, setData] = useState(null);
  const users = useSelector(usersSelector);
  React.useEffect(() => {
      if(users.length > 0) {
        setData(users)        
      }
  },[users])
  //console.log('data:',data);
  return (
    <View style={{flex:1}}>
    <View
    style={{
      height: 60,
      width:'100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor:'white',                    
    }}> 
    
        <TouchableOpacity  style={{width:'10%'}}
            onPress={() => navigation.goBack()}>    
            <Ionicons name="arrow-back" color="black" size={24} />
        </TouchableOpacity >
        <View style={{width:'80%'}}>
            <TextInput style={{borderWidth:1,height:'60%', fontSize:16, padding:10, borderRadius:10,borderColor:'#ccc'}}/>
        </View>
        <TouchableOpacity 
        onPress={() => navigation.replace('Welcome')}>
        <Ionicons name="exit-outline" color="black" size={24} />
        </TouchableOpacity>
    </View> 
    {/* <ScrollView style={{flex:1,marginHorizontal:2}}>
        <ItemData />               
    </ScrollView> */}
    <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
    />
    </View>
);
}

const renderItem = ({ item }) => {    
    return (
        <View style={{height:90,backgroundColor:'green',marginBottom:2}}>
            <Text>{item.email}</Text>
        </View> 
    )
}
export default HeaderSearch;