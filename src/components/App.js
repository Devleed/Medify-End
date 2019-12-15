import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";
import HomePage from "./homeComponents/HomePage";
import AddMedicine from "./AddMedicine";
import Navbar from "./Navbar";
import Footer from "./Footer";
import medicineTypeHome from "./MedicineTypeComponents/MedicineTypeHome";
import MedicineDisplay from "./MedicineComponents/MedicineDisplay";
import MedicineSearch from "./MedicineSearch";

const App = () => {
  return (
    <div className="wrapper">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/medicine/:type/:name"
            exact
            component={MedicineDisplay}
          />
          <Route path="/medicine/add" exact component={AddMedicine} />
          <Route path="/search/:term" exact component={MedicineSearch} />
          <Route path="/medicines/:type" exact component={medicineTypeHome} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
