import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSingleMed } from "../../actions";
import MedicineJSX from "./MedicineJSX";
import { Segment } from "semantic-ui-react";

/** MAIN COMPONENT */
const MedicineItem = props => {
  // component's state
  const [medName, setMedName] = useState(null);

  // getting name and type of medicine from props
  const { name, type } = props;

  // accessing the redux store
  const dispatch = useDispatch();
  const medicine = useSelector(({ selectedMed }) => selectedMed);

  if (medName !== name) {
    // getting a single medicine
    getSingleMed(type, name).then(data => {
      dispatch({ type: "GET_MED", payload: data });
      props.getSubstitute(data);
    });
    setMedName(name);
  }

  useEffect(() => {
    // on unmounting
    return () => {
      dispatch({ type: "GET_MED", payload: null });
    };
  }, [dispatch]);

  return (
    <Segment placeholder style={{ marginTop: "30px 0", minHeight: "580px" }}>
      <MedicineJSX medicine={medicine} />
    </Segment>
  );
};

export default MedicineItem;
