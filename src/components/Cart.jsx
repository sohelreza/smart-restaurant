import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setAllDishes,
  setTotalAmount,
  setTotalItems,
} from "../redux/dish/dishActions";

class Cart extends Component {
  increaseQuantity(dish_id) {
    const { allDishes, setAllDishes, setTotalItems, setTotalAmount } =
      this.props;
    let totalItems = 0;
    let totalAmount = 0;

    const updatedDishes = allDishes.map((dish) =>
      dish.dish_id === dish_id ? { ...dish, count: dish.count + 1 } : dish
    );

    updatedDishes.forEach((dish) => {
      totalItems = totalItems + dish.count;
      totalAmount =
        parseFloat(totalAmount) +
        parseFloat(dish.dish_price) * parseFloat(dish.count);
    });

    setAllDishes(updatedDishes);
    setTotalItems(totalItems);
    setTotalAmount(totalAmount.toFixed(2));
    setTotalAmount(totalAmount.toFixed(2));
  }

  decreaseQuantity(dish_id) {
    const { allDishes, setAllDishes, setTotalItems, setTotalAmount } =
      this.props;
    let totalItems = 0;
    let totalAmount = 0;

    const updatedDishes = allDishes.map((dish) =>
      dish.dish_id === dish_id ? { ...dish, count: dish.count - 1 } : dish
    );

    updatedDishes.forEach((dish) => {
      totalItems = totalItems + dish.count;
      totalAmount =
        parseFloat(totalAmount) +
        parseFloat(dish.dish_price) * parseFloat(dish.count);
    });

    setAllDishes(updatedDishes);
    setTotalItems(totalItems);
    setTotalAmount(totalAmount.toFixed(2));
  }

  showDishes(data) {
    const { totalItems, totalAmount, history, setTotalItems, setTotalAmount } =
      this.props;

    return (
      <>
        <div className="grid">
          {data.map((dish, index) => {
            const { dish_name, dish_price, dish_description, count, dish_id } =
              dish;

            const totalPrice = parseFloat(dish_price) * parseFloat(count);

            if (count > 0) {
              return (
                <div className="card" key={index}>
                  <h3>{dish_name}</h3>

                  <h5>
                    ${dish_price} * {count} = ${totalPrice.toFixed(2)}
                  </h5>

                  <p>
                    {dish_description
                      ? dish_description
                      : "No description available"}
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => this.increaseQuantity(dish_id)}
                  >
                    ADD ONE MORE
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {count ? count : ""}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => this.decreaseQuantity(dish_id)}
                  >
                    DELETE ONE
                  </button>
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

            <h2>${totalAmount}</h2>

            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                history.push("/success");
                setTotalItems(0);
                setTotalAmount(0);
              }}
            >
              CONFIRM ORDER
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

          <p className="description">Edit & confirm your cart</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
