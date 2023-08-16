import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getProducts = createAsyncThunk('products/productsFetched', async (data) => {
  try {                 
    //console.log('data api:',data)
    const response = await axios.post('https://laravel.tungocvan.com/api/users/getProducts',data); // Thay đổi URL API của bạn tại đây
    return response.data
    } catch (error) { 
      console.error('Đã có lỗi gọi api xảy ra:');    
      return Promise.reject(error);
    }      
}) 

    
const productSlice = createSlice({ 
  name: "products", 
  initialState: {    
    isStatus:false,   
    error:0,
    products:{      
      data:[], 
      total:0,
      per_page:0,
      current_page:0 
    },
    total_page:0  
  },
  reducers: {    
      statusReducer(state,action){
          //console.log('statusReducer isStatus:',action.payload)
          state.isStatus = action.payload
          return state
      },                   
  },  
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled,(state, action) => { 
      if(action.payload){ 
        state.products.current_page = action.payload.current_page   
        if(state.products.data.length === 0){     
            state.products.total = action.payload.total
            state.products.per_page = action.payload.per_page 
            state.total_page = Math.ceil(state.products.total / state.products.per_page)
            state.isStatus = true
        }   
    
        if(state.products.total > 0 ){    
                        if(action.payload.data.length > 0 ){         
              state.products.data= action.payload.data.concat(state.products.data);              
            } 
            state.isStatus = true 
        }    
        state.error = 0
      } 
        
    })
    builder.addCase(getProducts.rejected,(state, action) => {
        //console.log('đã có lỗi khi gọi api addCase:')       
        state.error = 1
    }) 
  }    
});   

// Reducer    
const productsReducer = productSlice.reducer;
export default productsReducer;

// export các hàm đã khai báo trong reducers 

export const { statusReducer  } = productSlice.actions;  


// Selector export các thuộc tính trong initialState

export const productsSelector = state => {  
  return state.products.products;   
}
export const errorSelector = state => {  
  return state.products.error;    
}
export const isStatusSelector = state => {  
  return state.products.isStatus;
} 
export const totalPageSelector = state => {  
  return state.products.total_page; 
} 
