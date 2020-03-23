import cartReducer from './reducer-cart'
import productsReducer from './reducer-products'
import customersReducer from './reducer-customers'
import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  customers: customersReducer
})

const store = createStore(
  rootReducer,
  window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()
)

export default store
