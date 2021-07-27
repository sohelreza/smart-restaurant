import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Dish from "./components/Dish";
import Nav from "./components/Nav";
import Success from "./components/Success";

function App() {
  return (
    <Router>
      <Nav />

      <Switch>
        <Route component={Dish} path="/" exact />

        <Route component={Cart} path="/cart" exact />

        <Route component={Success} path="/success" exact />
      </Switch>
    </Router>
  );
}

export default App;
