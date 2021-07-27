import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const { totalAmount, totalItems } = this.props;

    return (
      <nav className="fixed-top">
        <ul>
          <li>
            <Link to="/cart">Cart</Link>
          </li>

          <li>
            Total Dishes <span className="badge bg-danger">{totalItems}</span>{" "}
            <span className="badge bg-danger">${totalAmount}</span>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  const totalItems = state.dishReducer.totalItems;
  const totalAmount = state.dishReducer.totalAmount;

  return {
    totalItems,
    totalAmount,
  };
};

export default connect(mapStateToProps)(Nav);
