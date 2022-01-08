import { SET_USER } from './types';
import { HOTELS_LIST, REMOVE_ITEM, INCREMENT, DECREMENT, SORT_INCREMENT, SORT_DECREMENT } from './types';

const initialState = {
  user: {},
  hotelList: []
};

export default function listReducer(state = initialState, action) {
  switch (action.type) {

    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case HOTELS_LIST: 
      return {
        ...state,
        hotelList: action.payload
      };
      case REMOVE_ITEM:
        const newArray = state.hotelList.filter(result => result.id !== action.payload)
        return {
          ...state,
          hotelList: newArray
      };
      case INCREMENT:
        const result = state.hotelList.filter(result => result.id === action.payload.id)
        result.map(x => {
          x.point = parseFloat(x.point) + 1.0
        })
        const hotels = state.hotelList.filter(result => result.id !== action.payload.id)
        hotels.push(result[0])
        return {
          ...state,
          hotelList: hotels
        };
      case DECREMENT:
        const list = state.hotelList.filter(result => result.id === action.payload.id)
        list.map(x => {
          x.point = parseFloat(x.point).toFixed(2) - 1.0
        })
        const newList = state.hotelList.filter(result => result.id !== action.payload.id)
        newList.push(list[0])
        return {
            ...state,
            hotelList: newList
        }; 
      case SORT_INCREMENT: 
        const points = [];
        const arrayHotel = [];
        state.hotelList.map(x => {
          points.push(x.point)
        })

        points.sort(function(a, b){return a - b});

        points.map(point => {
          state.hotelList.map(hotel => {
                if (hotel.point === point) {
                    arrayHotel.push(hotel);
                }
            })
        })
        return {
          ...state,
          hotelList: arrayHotel
        };

        case SORT_DECREMENT: 
        const point = [];
        const arrayHotels = [];
        state.hotelList.map(x => {
          point.push(x.point)
        })

        point.sort(function(a, b){return b - a});

        point.map(p => {
          state.hotelList.map(hotel => {
                if (hotel.point === p) {
                    arrayHotels.push(hotel);
                }
            })
        })
        return {
          ...state,
          hotelList: arrayHotels
        };

      default:
        return state;
  }
}
