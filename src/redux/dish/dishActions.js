import { SET_ALL_DISHES, SET_TOTAL_AMOUNT, SET_TOTAL_ITEMS } from "./dishTypes";

export const setAllDishes = (dishes) => {
  return {
    type: SET_ALL_DISHES,
    payload: { dishes },
  };
};

export const setTotalItems = (totalItems) => {
  return {
    type: SET_TOTAL_ITEMS,
    payload: { totalItems },
  };
};

export const setTotalAmount = (totalAmount) => {
  return {
    type: SET_TOTAL_AMOUNT,
    payload: { totalAmount },
  };
};
