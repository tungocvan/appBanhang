import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getUser = createAsyncThunk('user/userFetched', async () => {
  try {            
    const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Thay đổi URL API của bạn tại đây
    return response.data
      //setData(response.data); // Lưu dữ liệu trả về vào state
      //console.log('data:',response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }     
})



const userSlice = createSlice({
  name: "user",
  initialState: {    
    isRegister:false,   
    user:[]
  },
  reducers: {    
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled,(state, action) => {
        state.user = action.payload
        console.log(action.payload);        
    })
  }
});  

// Reducer    
const userReducer = userSlice.reducer;
export default userReducer;

// export các hàm đã khai báo trong reducers

//export const { register } = userSlice.actions;  


// Selector export các thuộc tính trong initialState

export const userSelector = state => {  
  return state.user.user;   
}
export const registerSelector = state => {  
  return state.user.isRegister;
} 
