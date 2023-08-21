import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getProvinces = createAsyncThunk('provinces/provincesFetched', async () => {
  try {            
    const response = await axios.get('https://laravel.tungocvan.com/api/getProvinces'); // Thay đổi URL API của bạn tại đây
    return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }     
})



const provinceSlice = createSlice({
  name: "data",
  initialState: {    
    isRegister:false,   
    provinces:[]
  },
  reducers: {    
  },
  extraReducers: (builder) => {
    builder.addCase(getProvinces.fulfilled,(state, action) => {
        state.provinces = action.payload
        //console.log(action.payload);        
    })
  }
});  

// Reducer    
const provinceReducer = provinceSlice.reducer;
export default provinceReducer;

// export các hàm đã khai báo trong reducers

//export const { register } = userSlice.actions;  


// Selector export các thuộc tính trong initialState

export const provincesSelector = state => {  
  return state.data.provinces;   
}

