import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './reducers/accountSlice';
import productSlice from './reducers/productSlice';


const store = configureStore({
reducer: {
    accounts: accountSlice,    
    products: productSlice    
},
})
export default store;