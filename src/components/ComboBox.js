import React, { useState , useRef} from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView as SafeAreaViewIos,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
//import { countries } from '../constants/data';

function ComboBox(props) {  
  let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;
  const countries = useRef([]);
  const action = props.action ?? '';
  if(props.countries.length > 0) {    
    countries.current = props.countries;    
  } 
  
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(countries.current);
  const [selectedCountry, setSelectedCountry] = useState('');
  const searchRef = useRef();
  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.full_name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      
      setData(tempData);
      //props.onSearch(tempData[0].code)
    } else {
      setData(countries.current);
    }
    //console.log('data:',selectedCountry);
  };

  return (
    <SafeArea
      style={{ flex: 1 }}>
    <View>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: 'center',          
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setClicked(!clicked);
          !clicked===true?props.onPress(400,action):props.onPress(0,action)            
        }}>
        <Text style={{fontWeight:'600'}}>
          {selectedCountry == '' ? props.title : selectedCountry}
        </Text>
        {clicked ? (
          <Image
            source={require('../assets/images/upload.png')}
            style={{width: 20, height: 20}}
          />
        ) : (
          <Image
            source={require('../assets/images/dropdown.png')}
            style={{width: 20, height: 20}}
          />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{            
            marginTop: 20,
            height: '100%',
            alignSelf: 'center',
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,            
            
          }}>
          <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}              
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);              
            }}
            style={{
              width: '90%',
              height: 50,
              alignSelf: 'center',
              borderWidth: 0.2,
              borderColor: '#8e8e8e',
              borderRadius: 7,              
              paddingLeft: 20,
            }}
          />

          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',               
                  }}
                  onPress={() => {
                    setSelectedCountry(item.full_name);
                    setClicked(!clicked);
                    onSearch('');
                    setSearch('');
                    props.onSearch(item.code,action)      
                    !clicked===true?props.onPress(400,item.full_name,action):props.onPress(0,item.full_name,action)                
                  }}>
                  <Text style={{fontWeight: '600'}}>{item.full_name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
    </SafeArea>
  );
}

export default ComboBox;
