import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from '../constants/orderConstants'
import axios from 'axios';
import { useSelector } from 'react-redux'

export const createOrder = (order) => async (dispatch, getState) => { // getState in order to get token
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })
     
    const { userLogin: { userInfo } } = getState()  // destructure from userLogin which is a piece of redux state
    // const userLogin = useSelector(state => state.userLogin)
    // console.log(userLogin);

    const config = {
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${userInfo.token}` // attach token
      }
    }
    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    }) 

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL, 
      payload: 
        error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    })
  }
}