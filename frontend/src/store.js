import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'  // in order to use with chrome redux tool
import { productListReducer } from './reducers/productReducer'

const reducer = combineReducers({
  productList: productListReducer
})
const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store