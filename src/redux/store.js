import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './reducers/accountSlice';
import productSlice from './reducers/productSlice';
import provinceSlice from './reducers/dataSlice';


const store = configureStore({
reducer: {
    accounts: accountSlice,    
    products: productSlice,
    data: provinceSlice    
},
})
export default store;