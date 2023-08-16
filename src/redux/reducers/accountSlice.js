import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAccountAll = createAsyncThunk('accounts/accountsFetched', async () => {
  try {            
    const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Thay đổi URL API của bạn tại đây
    return response.data
      //setData(response.data); // Lưu dữ liệu trả về vào state
      ////console.log('data:',response.data);
    } catch (error) {
      console.error('Đã có lỗi gọi api xảy ra:');    
      return Promise.reject(error);
    }     
})

export const registerUser = createAsyncThunk('accounts/registerUser', async (data) => {
  try {            
    const response = await axios.post('https://laravel.tungocvan.com/api/users/dangky',data); // Thay đổi URL API của bạn tại đây
    return response.data
      //setData(response.data); // Lưu dữ liệu trả về vào state
      ////console.log('data:',response.data);
    } catch (error) {
      console.error('Đã có lỗi gọi api xảy ra:');    
      return Promise.reject(error);
    }     
})

export const loginUser = createAsyncThunk('accounts/loginUser', async (data) => {
  try {            
    const response = await axios.post('https://laravel.tungocvan.com/api/users/dangnhap',data); // Thay đổi URL API của bạn tại đây
    return response.data      
    } catch (error) {
      console.error('Đã có lỗi gọi api xảy ra:');    
      return Promise.reject(error);
    }        
})
export const changePass = createAsyncThunk('accounts/changePass', async (data) => {
  try {            
    const response = await axios.post('https://laravel.tungocvan.com/api/users/changepass',data); // Thay đổi URL API của bạn tại đây
    return response.data      
    } catch (error) {
      console.error('Đã có lỗi gọi api xảy ra:');    
      return Promise.reject(error);
    }        
})
export const recoverPass = createAsyncThunk('accounts/recoverPass', async (data) => {
  try {            
    const response = await axios.post('https://laravel.tungocvan.com/api/users/phuchoi',data); // Thay đổi URL API của bạn tại đây
    return response.data      
    } catch (error) {
      console.error('Đã có lỗi gọi api xảy ra:');    
      return Promise.reject(error);
    }        
})

const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    email:'',
    isLoading: false,
    isRegister:false,
    isLogin:false,   
    isRecovery:false,
    recovery:{
      isOtp:false,    
      otp:'',
      id:''
    },
    users:[]
  },
  reducers: {    
    register(state){
        state.isRegister = !state.isRegister
        return state
    },   
    reset(state){
        state.email = ''
        return state
    },  
    login(state){
        state.isLogin = false
        return state
    },  
    resetRecovery(state){
        state.recovery.isOtp = false
        return state
    },  
    resetAccount(state){
        state.users = []
        return state
    },  
    loading(state){
        state.isLoading = !state.isLoading 
        return state
    }  
  },
  extraReducers: (builder) => {

    builder.addCase(getAccountAll.fulfilled,(state, action) => {
      //console.log('Done')
      state.users = action.payload      
      //console.log(action.payload)        
    })
    
    builder.addCase(registerUser.fulfilled,(state, action) => {
      //console.log('registerUser Done')
      state.users = action.payload      
      //console.log('payload:',action.payload)      
                  
      if(action.payload.status === false){
          state.isRegister = false
          state.email = 1      
          state.isLoading = true                 
      }else{      
        state.isRegister = true
        state.email = action.payload.email        
      }        
    })
  
    builder.addCase(loginUser.fulfilled,(state, action) => {
      //console.log('loginUser Done')
      state.users = action.payload      
      //console.log('payload:',action.payload)    
      if(action.payload.length === 0) {
        state.isLogin = true
      }                 
    })    

    builder.addCase(changePass.fulfilled,(state, action) => {
      //console.log('changepass Done')
      state.users = action.payload      
      //console.log('payload:',action.payload)                    
    })    

    builder.addCase(recoverPass.fulfilled,(state, action) => {
      //console.log('recoverPass Done:',action.payload)
      if(action.payload.status === true){
        if(action.payload.recovey === true){        
          state.recovery.isOtp = true   
          state.isRecovery = false                 
        }else{
           state.isRecovery = true
           state.recovery.otp = action.payload.otp
           state.recovery.id = action.payload.id  
        }  
      }
    })    

  }
});  

//const { actions, reducer } = todoSlice;
// Reducer    
const accountsReducer = accountSlice.reducer;
// Selector
export const accountsSelector = (state) => {
  return state.accounts;
};
export const isLoginSelector = (state) => {
  return state.accounts.isLogin;  
};
export const isLogoutSelector = (state) => {
  return state.accounts.isLogout; 
};
//export const { markComplete } = productSlice.actions;
export default accountsReducer;
export const { register, loading, reset, resetAccount, login, resetRecovery } = accountSlice.actions;  

export const usersSelector = state => {  
  return state.accounts.users;   
}
export const registerSelector = state => {  
  return state.accounts.isRegister;
} 
export const emailSelector = state => {  
  return state.accounts.email;
}
export const isLoadingSelector = state => {  
  return state.accounts.isLoading;   
} 
export const isRecoverySelector = state => {  
  return state.accounts.isRecovery;   
} 
export const isOtpSelector = state => {  
  return state.accounts.recovery
} 