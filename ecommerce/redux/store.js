import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import cartReducer from './cartReducer';
export default configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
  },
});
