import React from "react";
import { Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const setupButtons = ({ page, totalPages, type }) => {
  if (page === 1 && totalPages > 1) {
    // show next button
    return (
      <NavLink to={`/medicines/${type}?page=${page + 1}`}>
        <Button primary>Next</Button>
      </NavLink>
    );
  } else if (page === totalPages && totalPages > 1) {
    // show both buttons
    return (
      <NavLink to={`/medicines/${type}?page=${page - 1}`}>
        <Button primary>previous</Button>
      </NavLink>
    );
  } else if (totalPages > 1) {
    // show previous button
    return (
      <React.Fragment>
        <NavLink to={`/medicines/${type}?page=${page - 1}`}>
          <Button primary>previous</Button>
        </NavLink>
        <NavLink to={`/medicines/${type}?page=${page + 1}`}>
          <Button primary>Next</Button>
        </NavLink>
      </React.Fragment>
    );
  }
};

/** MAIN COMPONENT */
const PageButtons = props => {
  return <div>{setupButtons(props)}</div>;
};

export default PageButtons;
