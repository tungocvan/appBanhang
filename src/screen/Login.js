import React from 'react';
import { Text, View, ImageBackground, Platform, SafeAreaView as SafeAreaViewIos, Image, TouchableOpacity , TextInput, ActivityIndicator} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import {  useSelector, useDispatch } from 'react-redux';
import { emailSelector , loginUser, usersSelector, isLoginSelector , login} from '../redux/reducers/accountSlice'
import { images, COLORS } from '../constants'

function Login({ navigation }) {
    
    let SafeArea = Platform.OS === "ios" ? SafeAreaViewIos : SafeAreaViewAndroid;    
    const email = useSelector(emailSelector)
    const account = useSelector(usersSelector)
    const isLogin = useSelector(isLoginSelector)
    const [user,setUser] = React.useState(email)
    const [show,setShow] = React.useState(true)
    const [wait,setWait] = React.useState(true)
    const [password,setPassword] = React.useState('')
    const [isValidEmail,setIsValidEmail] =React.useState(null);
    const dispatch = useDispatch();
   
    React.useEffect(() => {
        ////console.log(('account.id:',account.id));
        if(account.id) {
            ////console.log(('account.id:',account.status));
            if(account.status === 0){
                navigation.replace('ChangePass')     
            }else{
                navigation.replace('Tabs')
            }
             
        }       
    },[account,navigation])

    React.useEffect(() => {
        if(isLogin === true) {
            setWait(true)
            //dispatch(login())
        }
    },[isLogin])

    const handleLogin = () => {    
        // login thanh cong, call api   
        setWait(false)
        data = {
          email:user.toLowerCase().trim(),
          password
        }   
        dispatch(loginUser(data))
        //navigation.replace('Tabs')
    }
    const handleUser = (value) => {
        setUser(value)
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/i;
        if (regex.test(user)) {
            setIsValidEmail(true)
        } else {
            setIsValidEmail(false);
        }
    }
   
    const loginFocus = () => {
        handleUser(user);
        dispatch(login())
    }

    const passFocus = () => {
        if(email.length > 0)handleUser(email);
        dispatch(login())
    }
   
    

    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={{flex:1}}>
        <SafeArea style={{flex:1,marginHorizontal:5}}>
            <View style={{height:80, justifyContent:'center',alignItems:'center',marginBottom:80}}>
              <Image source={images.logo} resizeMode="contain" style={{flex:1, width:"100%"}} />
            </View>
            <View style={{height:'70%', justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:24,fontWeight:'bold'}}>Đăng Nhập</Text>
                <View style={{width:"100%",flex:1, paddingHorizontal:20}}>
                    <View style={{ height:100,width:'100%'}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Email*</Text>
                        <TextInput 
                            value={user}
                            onChangeText= {handleUser}                            
                            onFocus={loginFocus}                                                                                
                            placeholder={'Nhập email'}
                            style={{width:'100%', borderWidth:1, fontSize:16,paddingHorizontal:10,paddingVertical:10, borderRadius:5,borderColor:'#ccc'}}
                        />
                    </View>
                    {!isValidEmail && isValidEmail!==null  && <Text style={{fontSize:16, color:'red', marginBottom:5}}>Email không đúng định dạng</Text>}
                    <View style={{ height:100,width:'100%', position:'relative'}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Mật khẩu*</Text>
                        <TextInput 
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                            onFocus={passFocus}
                            secureTextEntry={show}
                            placeholder={'Nhập mật khẩu'}
                            style={{width:'100%', borderWidth:1, fontSize:16,paddingHorizontal:10,paddingVertical:10, borderRadius:5,borderColor:'#ccc'}}
                        />
                        <TouchableOpacity onPress={() => setShow(!show)} style={{position:'absolute', right:5,bottom:26}}>
                          { show?(<Ionicons name="eye-off-outline" color="black" size={24} />):(<Ionicons name="eye-outline" color="black" size={24} />)}
                        </TouchableOpacity>
                    </View>
                    <View style={{ width:'100%'}}>
                        <TouchableOpacity 
                            onPress={() => {
                                navigation.navigate('Forget')
                             }}
                            style={{alignItems:'flex-end'}}>
                            <Text style={{fontSize:16,paddingVertical:10}}>Quên mật khẩu*</Text>                    
                        </TouchableOpacity>
                    </View>
                    <View style={{ width:'100%'}}>
                       {isLogin?(<Text style={{fontSize:16,paddingVertical:10, color:'red'}}>Bạn đã nhập sai thông tin đăng nhập.</Text> ):null}  
                    </View>
                  
                </View>
            </View>            
             {
                wait?(
                    <TouchableOpacity 
                        disabled={!isValidEmail?true:false}
                        onPress={() => handleLogin(navigation)}
                        style={{height:50, justifyContent:'space-around',alignItems:'center', backgroundColor:isValidEmail?COLORS.green:'gray', borderRadius:10,marginHorizontal:15}}>                 
                        <Text style={{paddingVertical:10, fontSize:20,color:'white'}}>Đăng Nhập</Text>                               
                    </TouchableOpacity>
                ):(
                    <ActivityIndicator size="large" color="green" />   
                )
             }    
        </SafeArea>
        </ImageBackground>
    );
}

export default Login;