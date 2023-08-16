import React , {useState} from 'react';
import { Text, View, ImageBackground, Platform, SafeAreaView as SafeAreaViewIos, Image, TouchableOpacity , TextInput, ActivityIndicator} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, registerSelector ,register, emailSelector, loading, isLoadingSelector, reset} from '../redux/reducers/accountSlice'



function Register({ navigation }) {
    let SafeArea = Platform.OS === "ios" ? SafeAreaViewIos : SafeAreaViewAndroid;    
    
    const [isValidEmail,setIsValidEmail] =useState(false);
    const [email,setEmail] = useState('');    
    const [wait,setWait] = useState(true)
    const isRegister = useSelector(registerSelector);
    const isEmail = useSelector(emailSelector);
    
    
    const dispatch = useDispatch();
    const hanlderValidate = (value) => {         
        setEmail(value)    
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/i;
        if (regex.test(email)) {
            setIsValidEmail(true)
        } else {
            setIsValidEmail(false);
        }
       
    }

    React.useEffect(() => {
        if(isEmail=== 1) {
            setWait(true)
            //dispatch(reset())
        }
    },[isEmail])

    React.useEffect(() => {
     
      if(isRegister === true){
          dispatch(register(true))                     
          alert('Vui lòng check email để lấy mật khẩu đăng nhập.')
          navigation.replace('Login')   
      }
    },[dispatch,isRegister,navigation])
    
   
    const hanldeRegister = async () => {
        setWait(false)
        dispatch(registerUser({email}));     
        dispatch(loading())    
        //setLoading(true);
    }
    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={{flex:1}}>
        <SafeArea style={{flex:1,marginHorizontal:5, justifyContent:'space-between'}}>
            <View style={{height:'15%', justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../assets/images/logo.png') } resizeMode="contain" style={{flex:1, width:"100%"}} />
            </View>
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:24,fontWeight:'bold',height:40}}>Đăng ký tài khoản</Text>
                <View style={{width:"100%",justifyContent:'center', paddingHorizontal:20}}>
                    <View style={{ height:100,width:'100%'}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Email*</Text>
                        <TextInput 
                            value={email}
                            onChangeText = {hanlderValidate}
                            onFocus = {() => {
                              dispatch(reset());
                            }}
                            placeholder={'Nhập email'}
                            style={{width:'100%', borderWidth:1, fontSize:16,paddingHorizontal:10,paddingVertical:10, borderRadius:5,borderColor:'#ccc'}}
                        />                        
                    </View>
                    {!isValidEmail && email!=='' && <Text style={{fontSize:16, color:'red', marginBottom:5}}>Email không đúng định dạng</Text>}
                    {isValidEmail && isEmail=== 1?(
                        <View style={{ height:100,width:'100%'}}>
                            <Text style={{fontSize:16,paddingVertical:10, color:'red'}}>Tài khoản email đã tồn tại trong hệ thống. Vui lòng nhấn quên mật khẩu để phục hồi mật khẩu.</Text>                    
                        </View>
                    ):null}
                    
                    <View style={{ height:100,width:'100%'}}>
                        <Text style={{fontSize:16}}>Vui lòng nhập email chính xác, mật khẩu đăng ký sẻ được gửi đến email của bạn.</Text>                    
                    </View>
                    <View style={{ height:100,width:'100%'}}>
                        <TouchableOpacity 
                            onPress={() => {
                                navigation.navigate('Forget')
                             }}
                            style={{alignItems:'flex-end'}}>
                            <Text style={{fontSize:16,paddingVertical:10}}>Quên mật khẩu*</Text>                    
                        </TouchableOpacity>
                    </View>
                 
                </View>
            </View>   
            {wait ?        
            (<TouchableOpacity 
                onPress={hanldeRegister}
                disabled={!isValidEmail?true:false} style={{height:50, justifyContent:'space-around',alignItems:'center', backgroundColor:isValidEmail?'blue':'gray', borderRadius:10,marginHorizontal:15}}
            >                 
                <Text style={{paddingVertical:10, fontSize:20,color:'white'}}>Đăng ký</Text>                               
            </TouchableOpacity>):(<ActivityIndicator size="large" color="green" />)    
            }
        </SafeArea>
        </ImageBackground>
    );
}

export default Register;