import { REMOVE_ITEM, SET_USER, STORE_RESULT, DECREMENT, INCREMENT, SORT_INCREMENT, SORT_DECREMENT } from './types';
import { useDispatch } from "react-redux";

export function useUserActions() {
  const dispatch = useDispatch();

  return {
    setUser(user) {
      dispatch({
        type: SET_USER,
        payload: user
      })
    }
  }
}

export const saveResult = (result) => {
  return {
      type: STORE_RESULT,
      payload: result
  }
} 

export const hotelList = value =>{
  return (dispatch, getState) => {
    setTimeout(() => {
        dispatch(saveResult(value))
    }, 2000)
}
}

export const removeItem = (id) => {
  return {
      type: REMOVE_ITEM,
      id: id
  }
}

export const increment = (value) => {
  return {
      type: INCREMENT,
      payload: value
  }
}

export const decrement = (value) => {
  return {
      type: DECREMENT,
      payload: value
  }
}

export const sortIncrement = () => {
  return {
      type: SORT_INCREMENT
  }
}

export const sortDecrement = () => {
  return {
      type: SORT_DECREMENT
  }
}