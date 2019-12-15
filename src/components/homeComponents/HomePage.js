import React, { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import _ from "lodash";

import "../../style.css";
import Portfolio from "./Portfolio";
import PortfolioPlaceholder from "../PortfolioPlaceholder";
import { getMeds } from "../../actions";

// renders portfolio
const renderPortfolio = (medicines, isLoading) => {
  let list = [];
  if (isLoading) {
    for (let i = 0; i < 2; i++)
      list.push(<PortfolioPlaceholder amount="5" key={i} />);
  } else {
    _.forIn(medicines, (val, key) => {
      if (key === "Derma" || key === "Cardio-Vascular-System") {
        list.push(
          <Portfolio showButton items={val} type={key} key={key} header={key} />
        );
      }
    });
  }
  return list;
};

/** MAIN COMPONENT */
const HomePage = () => {
  // required functionality
  const dispatch = useDispatch();
  const medicines = useSelector(({ typeMedicines }) => typeMedicines);
  const isLoading = useSelector(({ isLoading }) => isLoading);
  const store = useStore();

  if (Object.keys(medicines).length !== 0 && isLoading) {
    dispatch({ type: "LOADING", payload: false });
  }

  useEffect(() => {
    // on mounting
    (() => {
      ["Derma", "Cardio-Vascular-System"].forEach(async type => {
        dispatch({ type: "LOADING", payload: true });
        const data = await getMeds(type, 5);
        dispatch({ type: "GET_MEDS", payload: data });
      });
    })();

    // on unmounting
    return () => {
      ["Derma", "Cardio-Vascular-System"].forEach(type => {
        delete store.getState().typeMedicines[type];
      });
    };
  }, [dispatch, store]);

  return (
    <React.Fragment>
      <section className="main__container">
        <h1 className="test">
          Search any medicine you want,
          <br />
          you'll find it here
        </h1>
      </section>
      {renderPortfolio(medicines, isLoading)}
    </React.Fragment>
  );
};

export default HomePage;
