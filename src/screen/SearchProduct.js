import React , {useState} from 'react';
import {
  Text,
  View,      
  Image,
  TouchableOpacity,  
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useSelector , useDispatch} from 'react-redux';
import { formatMoney } from '../libs/function'
import HeaderSearch from '../components/HeaderSearch';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getProducts, productsSelector , isStatusSelector , statusReducer , totalPageSelector , errorSelector} from '../redux/reducers/productSlice'
function SearchProduct({ navigation }) {
  const _PER_PAGE = 20;      

  const [isLoading, setIsLoading] = useState(false);  
  const [error, setError] = useState(false);  
  const [page, setPage] = useState(1);  
  const [count, setCount] = useState(1);  
  const products = useSelector(productsSelector);
  const isStatus = useSelector(isStatusSelector);
  const isError = useSelector(errorSelector);
  const total_page = useSelector(totalPageSelector);  
  const [data, setData] = useState(products.data);
  const dispatch = useDispatch(); 

 React.useEffect(() => {
               
      if(total_page === 0){
        console.log('khoi dong goi du lieu với page 1') 
        dispatch(getProducts({'per_page':_PER_PAGE})); 
      }      
      //dispatch(statusReducer(true)); 
 },[])

 React.useEffect(() => {
    if(isStatus === true){
      console.log('cập nhật data:',products.data.length)   
      console.log('tong so page:',total_page)
      setData(products.data)  
      dispatch(statusReducer(false)); 
      setIsLoading(false)
    }
 },[isStatus,products.data.length]) 

  React.useEffect(() => {
      if(isError === 1){
        setError(true)
        setTimeout(() => {
            if(isLoading === true && products.data.length < products.total && count < 3){
              //alert('Không tải được dữ liệu')
              loadMoreData();
              setCount(count+1)
              console.log('timeWaite:',count) 
            }else{
              alert('Không lấy được dữ liệu từ server')
              navigation.navigate('Home')
            }
          },5000) 
      }
  },[isError])
 
  console.log('total_record:',products.data.length)

  const renderItem = ({ item  }) => {     
    return (                  
        <View key={item.ID} style={{height:100,marginVertical:5,padding:5, borderBottomWidth:1,borderBottomColor:'green', flexDirection:'row'}}>            
            <View style={{marginHorizontal:5, width:100}}>
               <Image  
                source={{uri: item._thumbnail_id}}
                style={{width: '100%', height: 90}}
                resizeMode='stretch'
               />
            </View>
            <View style={{justifyContent:'center'}}>
                <Text numberOfLines={2} style={{fontFamily:'Avenir',fontSize:24, width:200}}>{item.post_title}</Text>
                <Text style={{fontFamily:'Avenir',fontSize:16}}>{formatMoney(item._price)}</Text>
            </View>
        </View>                
    )
  }
  // <HeaderSearch navigation = {navigation}/>
  const loadMoreData = () => {             
    // products.data.length ,  products.total     
    setError(false)
      console.log('loadMoreData products.data:',products.data.length)
      console.log('loadMoreData total record:',products.total)    
      console.log('current_page:',products.current_page)  
    if(products.data.length < products.total){      
       
      setIsLoading(true);            
      dispatch(getProducts({'per_page':_PER_PAGE,'page':products.current_page+1})); 
      setPage(page+1)
    }else{
      console.log('đã hết data, hiện đang là page cuối:',products.current_page)
    }  
  }



  return (
    <View style={{ height:'100%', marginHorizontal: 5, justifyContent: 'space-between',marginVertical:50 }}>
       <View
          style={{
            height: 60,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginBottom:5
          }}>
            <HeaderSearch navigation = {navigation}/>
        </View>  
        <View style={{backgroundColor:'white', flex:1}}>
          {
            isLoading && <ActivityIndicator />
          }
          <FlatList 
                      data={data.length > 0 && data}
                      renderItem={renderItem}        
                      initialNumToRender={_PER_PAGE}    
                      onEndReached={loadMoreData}             
                      onEndReachedThreshold={0.5}
                      scrollEventThrottle={100}
                />  
        </View>   
         {error===true &&(<TouchableOpacity onPress={loadMoreData} style={{height:60, justifyContent:'center',alignItems:'center'}}>
                          <Text  style={{fontSize:24,fontWeight:600,color:'green'}}>Tải lại dữ liệu</Text>
                        </TouchableOpacity>)
          }  
             
    </View>  
  );
}

export default SearchProduct;