import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setAllDishes,
  setTotalAmount,
  setTotalItems,
} from "../redux/dish/dishActions";

class Dish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
    };
  }

  componentDidMount() {
    const { setAllDishes, setTotalItems, setTotalAmount } = this.props;

    axios
      .get(
        "http://smartrestaurantsolutions.com/mobileapi-test/Tigger.php?funId=81&rest_id=645"
      )
      .then((response) => {
        let allDish = [];

        response.data.app[0].cuisine[0].category.forEach((category) => {
          category.dish.forEach((dish) => {
            dish.count = 0;

            allDish.push(dish);
          });
        });

        setAllDishes(allDish);
        setTotalItems(0);
        setTotalAmount(0);

        this.setState({
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

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
  }

  showDishes(data) {
    return (
      <>
        <div className="grid">
          {data.map((dish, index) => {
            const { dish_name, dish_price, dish_description, count, dish_id } =
              dish;

            return (
              <div className="card" key={index}>
                {/* <h3>Name &rarr;</h3> */}

                <h3>{dish_name}</h3>

                <h5>${dish_price}</h5>

                <p>
                  {dish_description
                    ? dish_description
                    : "No description available"}
                </p>

                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-2 position-relative"
                  onClick={() => this.increaseQuantity(dish_id)}
                >
                  ADD TO CART
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {count ? count : ""}
                  </span>
                </button>
              </div>
            );
          })}
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
            <span>Smart Restaurant</span> Menu
          </h1>

          <p className="description">
            Check out our various delicious dishes only for you
          </p>
        </div>

        {allDishes && this.showDishes(allDishes)}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const allDishes = state.dishReducer.dishes;

  return {
    allDishes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllDishes: (dishes) => dispatch(setAllDishes(dishes)),
    setTotalItems: (totalItems) => dispatch(setTotalItems(totalItems)),
    setTotalAmount: (totalAmount) => dispatch(setTotalAmount(totalAmount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dish);
