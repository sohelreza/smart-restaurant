import { SET_ALL_DISHES, SET_TOTAL_ITEMS, SET_TOTAL_AMOUNT } from "./dishTypes";

const initialState = {
  dishes: null,
  totalItems: 0,
  totalAmount: 0,
};

const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_DISHES:
      return {
        ...state,
        dishes: action.payload.dishes,
      };

    case SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload.totalItems,
      };

    case SET_TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: action.payload.totalAmount,
      };

    default:
      return state;
  }
};

export default dishReducer;
