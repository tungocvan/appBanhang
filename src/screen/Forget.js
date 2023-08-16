import React , {useState} from 'react';
import { Text, View, ImageBackground, Platform, SafeAreaView as SafeAreaViewIos, Image, TouchableOpacity , TextInput} from 'react-native';
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import { useSelector, useDispatch } from 'react-redux';
import { recoverPass, isRecoverySelector, isOtpSelector, resetRecovery } from '../redux/reducers/accountSlice'

function Forget({ navigation }) {
    let SafeArea = Platform.OS === "ios" ? SafeAreaViewIos : SafeAreaViewAndroid;    
    const [emailRecovery,setEmailRecovery] =useState('');
    const [isValidEmail,setIsValidEmail] =useState(false);
    const [account,setAccount] =useState(false);
    const [otp,setOtp] =useState('');
    const recovery = useSelector(isRecoverySelector);
    const otpUser = useSelector(isOtpSelector);
    const dispatch = useDispatch();
    const hanlderValidate = (value) => {         
        setEmailRecovery(value)    
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/i;
        if (regex.test(emailRecovery)) {
            setIsValidEmail(true)
        } else {
            setIsValidEmail(false);
        }
       
    }
    const hanlderMatkhau = () => {
        //console.log('phuc hoi');
        dispatch(recoverPass({'email':emailRecovery}))   
    }

    const hanlderXacnhan = () => {
        //console.log('xac nhan otp:',otp);
        if(otp.toString() === otpUser.otp.toString()){
            dispatch(recoverPass({
                'email':emailRecovery,
                'otp': otpUser.otp,
                'id' : otpUser.id
            })) 
        }else{
            alert('OTP không hợp lệ')
        }
          
    }

    React.useEffect(() => {
        if(otpUser.isOtp === true){
            alert('Vui lòng check email để lấy mật khẩu đăng nhập.')
            dispatch(resetRecovery())
            navigation.replace('Login')    
        }
    },[otpUser.isOtp,dispatch,navigation])

    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={{flex:1}}>
        <SafeArea style={{flex:1,marginHorizontal:5, justifyContent:'space-between'}}>
            <View style={{height:'15%', justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../assets/images/logo.png') } resizeMode="contain" style={{flex:1, width:"100%"}} />
            </View>
            <View style={{flex:1, alignItems:'center'}}>
                <Text style={{fontSize:24,fontWeight:'bold',height:40}}>Phục hồi mật khẩu</Text>
                <View style={{width:"100%",justifyContent:'center', paddingHorizontal:20}}>
                    <View style={{ height:100,width:'100%'}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Email*</Text>
                        <TextInput 
                            value={emailRecovery}
                            onChangeText = {hanlderValidate}
                            placeholder='Nhập email'
                            style={{width:'100%', borderWidth:1, fontSize:16,paddingHorizontal:10,paddingVertical:10, borderRadius:5,borderColor:'#ccc'}}
                        />
                    </View>
                    {!isValidEmail && emailRecovery.length >0 && <Text style={{fontSize:16, color:'red', marginBottom:5}}>Email không đúng định dạng</Text>}
                    {account?(
                        <View style={{ height:100,width:'100%'}}>
                            <Text style={{fontSize:16,paddingVertical:10, color:'red'}}>Tài khoản email đã tồn tại trong hệ thống. Vui lòng nhấn quên mật khẩu để phục hồi mật khẩu.</Text>                    
                        </View>
                    ):null}
                    
                    <View style={{ height:100,width:'100%'}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Vui lòng kiểm tra lại email chính xác, mật khẩu phục hồi sẻ được gửi đến email của bạn.</Text>                    
                    </View>                  
                 
                </View>                
                    {
                        recovery && (<View>
                            <View style={{alignItems:'center', marginBottom:10}}>
                                <Text style={{fontSize:16, color:'red'}}>Chúng tôi đã gửi OTP đến email của bạn.</Text>
                                <Text style={{fontSize:16,color:'red'}}>Vui lòng nhập OTP để nhận được mật khẩu mới</Text>
                            </View>
                            <View style={{flexDirection:'row', height:40,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{padding:10,fontSize:24,fontWeight:600}}>OTP</Text>
                            <TextInput 
                                value={otp}
                                onChangeText={(value) => setOtp(value)}
                                style={{padding:10,fontSize:24,width:200,borderBottomWidth:1}} />
                            </View>
                        </View>)
                    }               
            </View>  
            {
                recovery?( <TouchableOpacity 
                    onPress={hanlderXacnhan}
                    style={{height:50, justifyContent:'space-around',alignItems:'center', backgroundColor:"blue", borderRadius:10,marginHorizontal:15}}>                 
                    <Text style={{paddingVertical:10, fontSize:20,color:'white'}}>Xác nhận</Text>                               
                </TouchableOpacity> ):(<TouchableOpacity 
                    onPress={hanlderMatkhau}
                    style={{height:50, justifyContent:'space-around',alignItems:'center', backgroundColor:"blue", borderRadius:10,marginHorizontal:15}}>                 
                    <Text style={{paddingVertical:10, fontSize:20,color:'white'}}>Phục hồi</Text>                               
                </TouchableOpacity>)
            }         
                   
                   
              
        </SafeArea>
        </ImageBackground>
    );
}

export default Forget;