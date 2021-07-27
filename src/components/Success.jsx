import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setAllDishes,
  setTotalAmount,
  setTotalItems,
} from "../redux/dish/dishActions";

class Success extends Component {
  showDishes(data) {
    const { history } = this.props;

    let totalItems = 0;
    let totalAmount = 0;

    data.forEach((dish) => {
      totalItems = totalItems + dish.count;
      totalAmount =
        parseFloat(totalAmount) +
        parseFloat(dish.dish_price) * parseFloat(dish.count);
    });

    return (
      <>
        <div className="grid">
          {data.map((dish, index) => {
            const { dish_name, dish_price, dish_description, count } = dish;

            const totalPrice = parseFloat(dish_price) * parseFloat(count);

            if (count > 0) {
              return (
                <div className="card" key={index}>
                  <h4>
                    {dish_name}

                    <span className="badge bg-danger">{count}</span>
                  </h4>

                  <h5>
                    ${dish_price} * {count} = ${totalPrice.toFixed(2)}
                  </h5>

                  <p>
                    {dish_description
                      ? dish_description
                      : "No description available"}
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>

        <div className="card mx-auto">
          <div className="card-header">Your Bill</div>

          <div className="card-body">
            <p className="card-text">Total bill for {totalItems} items are</p>

            <h2>${totalAmount.toFixed(2)}</h2>

            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                history.push("/");
              }}
            >
              ORDER AGAIN
            </button>
          </div>
        </div>
      </>
    );
  }

  render() {
    const { allDishes } = this.props;

    return (
      <>
        <div className="mt-5">
          <h1 className="title">
            <span>Smart Restaurant</span> Cart
          </h1>

          <p className="description">
            Your order has been taken. Please wait a while to cook your food.
          </p>
        </div>

        {allDishes && this.showDishes(allDishes)}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const allDishes = state.dishReducer.dishes;
  const totalItems = state.dishReducer.totalItems;
  const totalAmount = state.dishReducer.totalAmount;

  return {
    allDishes,
    totalItems,
    totalAmount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllDishes: (dishes) => dispatch(setAllDishes(dishes)),
    setTotalItems: (totalItems) => dispatch(setTotalItems(totalItems)),
    setTotalAmount: (totalAmount) => dispatch(setTotalAmount(totalAmount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
