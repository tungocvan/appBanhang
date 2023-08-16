import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { usersSelector, changePass } from '../redux/reducers/accountSlice'
const BoxChangePass = ({navigation}) => {       
   const [pass,setPass] = useState('');
   const [passConfirm,setPassConfirm] = useState('');
   const users = useSelector(usersSelector);
   const dispatch = useDispatch();
   const handlerUpdate = () => {     
     if(pass ==='' || passConfirm ===''){
        alert('Mật khẩu không được bỏ trống!')
     }else if(pass !==passConfirm ){
        alert('Mật khẩu không khớp nhau!')
     }else{
        alert('Mật khẩu oki')
        if(users){
            //console.log('users:',users);
            dispatch(changePass({
                id:users.id,
                password:pass
            }))
        }
        // gọi api cập nhật lại mật khẩu và staus
     }
   }

   useEffect(() => {
        if(users.status === 1){
            // nếu cập nhật thành công 
            navigation.replace('Tabs')
        }
   },[users,navigation])

   return (
        <View style={styles.background}>
                    <View style={styles.wrap}>                        
                        <Text style={[styles.text,styles.moreText]}>Vui lòng thay đổi lại mật khẩu mới.</Text>
                        <View style={{height:100,zIndex:999}}> 
                            <TextInput                                 
                                value={pass}
                                onChangeText={(value) => setPass(value)}                                
                                style={{height:40,fontSize:16,color:'white',padding:5,fontFamily:'Avenir',borderBottomWidth:1,borderBottomColor:'white',marginBottom:10}}
                                placeholder='nhập mật khẩu mới'
                                />
                                
                            <TextInput 
                                value={passConfirm}
                                onChangeText={(value) => setPassConfirm(value)}
                                placeholder='nhập lại mật khẩu mới'
                                style={{height:40,fontSize:16,color:'white',padding:5,fontFamily:'Avenir',borderBottomWidth:1,borderBottomColor:'white'}}/>
                        </View>
                        <View style={{flexDirection:'row'}}>                        
                            <TouchableOpacity style={[styles.modalButton,styles.center]} onPress={handlerUpdate}>
                                <Text style={styles.text}>Cập nhật</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
        </View>  
    );
};

const styles = StyleSheet.create({
    background:{
        position:'absolute',
        left:0,
        right:0,
        top:150,
        bottom:0,
        // alignItems:'center',
        // justifyContent:'center',        
    },
    modalButton:{
        backgroundColor:'transparent',
        borderRadius:100,
        borderColor:'#ffffff',
        marginTop:64,
        borderWidth:1,
        paddingTop:16,
        paddingBottom:16,
        paddingLeft:25,
        paddingRight:25,
        marginHorizontal:5,
        flex:1
    },
    moreText:{
        textAlign:'center',
        marginTop:64        
    },    
    wrap:{
        padding:20,
        margin:20,
        borderRadius:8,
        backgroundColor:'#2D3953',
        shadowColor:'#4048BF',
        shadowOffset:{
            width:8.4,
            height:8.4
        },
        shadowOpacity:0.74,
        shadowRadius:30,
        elevation:10
    },
    text:{
        fontSize:28.8,
        color:'#ECF0F9',
        fontWeight:600,
        fontFamily:'Avenir'
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },  
});
export default BoxChangePass;