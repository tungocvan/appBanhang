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

export const getDistricts = createAsyncThunk('districts/districtsFetched', async (id) => {
  try {            
    const response = await axios.get(`https://laravel.tungocvan.com/api/getDistricts/${id}`); // Thay đổi URL API của bạn tại đây
    return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }     
})
export const getWards = createAsyncThunk('wards/wardsFetched', async (id) => {
  try {            
    const response = await axios.get(`https://laravel.tungocvan.com/api/getWards/${id}`); // Thay đổi URL API của bạn tại đây
    return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }     
})



const provinceSlice = createSlice({
  name: "data",
  initialState: {    
    isRegister:false,   
    provinces:[],
    districts:[],
    wards:[],
  },
  reducers: {    
    resetDistricts(state,action){
      //console.log('statusReducer isStatus:',action.payload)
      state.districts = []
      return state
    },  
    resetWards(state,action){
      //console.log('statusReducer isStatus:',action.payload)
      state.wards = []
      return state
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(getProvinces.fulfilled,(state, action) => {
        state.provinces = action.payload
        //console.log(action.payload);        
    })
    builder.addCase(getDistricts.fulfilled,(state, action) => {
        state.districts = action.payload
        //console.log(action.payload);        
    })
    builder.addCase(getWards.fulfilled,(state, action) => {
        state.wards = action.payload
        //console.log(action.payload);        
    })
  }
});  

// Reducer    
const provinceReducer = provinceSlice.reducer;
export default provinceReducer;

// export các hàm đã khai báo trong reducers

export const { resetDistricts, resetWards } = provinceSlice.actions;  


// Selector export các thuộc tính trong initialState

export const provincesSelector = state => {  
  return state.data.provinces;   
}
export const districtsSelector = state => {  
  return state.data.districts;   
}
export const wardsSelector = state => {  
  return state.data.wards;   
}

