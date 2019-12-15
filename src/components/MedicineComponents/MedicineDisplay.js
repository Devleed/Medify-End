import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSubstituteMeds } from "../../actions";
import Portfolio from "../homeComponents/Portfolio";
import MedicineItem from "./MedicineItem";
import PortfolioPlaceholder from "../PortfolioPlaceholder";

// renders portfolio
const renderPortfolio = (sameFormulaMeds, match, isLoading) => {
  let list = [];
  if (isLoading) {
    for (let i = 0; i < 1; i++)
      list.push(<PortfolioPlaceholder amount="5" key={i} />);
  } else {
    delete sameFormulaMeds[match.params.name];
    list.push(
      <Portfolio
        items={sameFormulaMeds}
        type={match.params.type}
        key="1"
        header="Substitute Medicines"
        showButton={false}
      />
    );
  }

  return list;
};

/** MAIN COMPONENT */
const MedicineDisplay = props => {
  // getting name and type of medicine from url params
  const { name, type } = props.match.params;

  // accessing the redux store
  const dispatch = useDispatch();
  const sameFormulaMeds = useSelector(({ formulaMeds }) => formulaMeds);
  const isLoading = useSelector(({ isLoading }) => isLoading);

  // gets the medicines with same formula
  const getSubstitute = medicine => {
    getSubstituteMeds(medicine.formula).then(data => {
      dispatch({ type: "SUBSTITUE_MEDS", payload: data });
      dispatch({ type: "LOADING", payload: false });
    });
  };

  useEffect(() => {
    // on mounting
    (() => {
      dispatch({ type: "LOADING", payload: true });
    })();

    // on unmounting
    return () => {
      dispatch({ type: "SUBSTITUE_MEDS", payload: {} });
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <MedicineItem name={name} type={type} getSubstitute={getSubstitute} />
      {renderPortfolio(sameFormulaMeds, props.match, isLoading)}
    </React.Fragment>
  );
};

export default MedicineDisplay;
