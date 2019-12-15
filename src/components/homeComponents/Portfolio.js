import React from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";

import CustomCard from "../CustomCard";

// renders medicines
const renderMeds = props => {
  let list = [];
  _.forIn(props.items, (val, key) => {
    list.push(<CustomCard med={{ name: key, ...val }} key={key} />);
  });
  return list;
};

/** MAIN COMPONENT */
const Portfolio = props => {
  if (props.items) {
    if (Object.keys(props.items).length !== 0) {
      return (
        <section className="portfolio">
          <Header as="h1">
            {props.header}
            {props.showButton ? (
              <NavLink to={`/medicines/${props.type}?page=1`}>
                <Button floated="right">Browse All</Button>
              </NavLink>
            ) : null}
          </Header>
          <ul className="portfolio__items">{renderMeds(props)}</ul>
        </section>
      );
    }
  }
  return null;
};

export default Portfolio;
