import {combineReducers} from 'redux';
import {saveUser} from './reducers/SaveUser';
import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';
import ordersReducer from './reducers/orders';
import Address from './reducers/address';
const rootReducer = combineReducers({
  saveUser: saveUser,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  Address: Address,
});

export default rootReducer;
