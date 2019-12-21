import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { getSubstituteMeds, searchFor, getSimilarResults } from "../actions";
import MedicineJSX from "./MedicineComponents/MedicineJSX";
import Portfolio from "./homeComponents/Portfolio";
import { Segment } from "semantic-ui-react";
import PortfolioPlaceholder from "./PortfolioPlaceholder";

// renders portfolio
const renderPortfolio = (searchResult, sameFormulaMeds, isLoading, matched) => {
  let list = [];
  if (isLoading) {
    for (let i = 0; i < 1; i++) {
      list.push(<PortfolioPlaceholder amount="5" key={i} />);
    }
  }
  if (searchResult && searchResult !== "not found") {
    delete sameFormulaMeds[searchResult.name || ""];
    list.push(
      <Portfolio
        items={sameFormulaMeds}
        type={searchResult.type}
        key="1"
        header="Substitute Medicines"
        showButton={false}
      />
    );
  }
  if (matched.length > 0) {
    list.push(
      <Portfolio
        items={matched}
        showButton={false}
        key="1"
        header="similar results"
      />
    );
  }
  return list;
};

/** MAIN COMPONENT */
const MedicineSearch = props => {
  // component's state
  const [result, setResult] = useState(null);
  const [matched, setMatched] = useState([]);

  // accessing the redux store
  const searchResult = useSelector(({ searchResult }) => searchResult);
  const sameFormulaMeds = useSelector(({ formulaMeds }) => formulaMeds);
  const isLoading = useSelector(({ isLoading }) => isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    // on mounting and updating the searched term
    (async () => {
      dispatch({ type: "LOADING", payload: true });
      const data = await searchFor(props.match.params.term);
      dispatch({ type: "SEARCH_RESULT", payload: data });
      setMatched([]);
      dispatch({ type: "SUBSTITUE_MEDS", payload: {} });
    })();

    // on unmounting
    return () => {
      dispatch({ type: "SEARCH_RESULT", payload: null });
    };
  }, [props.match.params.term, dispatch]);

  // checks if search result exists
  if (
    searchResult !== "not found" &&
    searchResult &&
    !_.isEqual(result, searchResult)
  ) {
    // if exists then gets substitute medicines
    getSubstituteMeds(searchResult.formula).then(data => {
      dispatch({ type: "SUBSTITUE_MEDS", payload: data });
      dispatch({ type: "LOADING", payload: false });
    });
    setResult(searchResult);
  }

  if (searchResult === "not found" && matched.length === 0) {
    dispatch({ type: "LOADING", payload: false });
    getSimilarResults(props.match.params.term).then(data => {
      setMatched(data);
    });
  }

  return (
    <React.Fragment>
      <Segment placeholder style={{ marginTop: "30px", minHeight: "580px" }}>
        <MedicineJSX medicine={searchResult} message="No results found" />
      </Segment>
      {renderPortfolio(searchResult, sameFormulaMeds, isLoading, matched)}
    </React.Fragment>
  );
};

export default MedicineSearch;
