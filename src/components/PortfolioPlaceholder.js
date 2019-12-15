import React from "react";
import CustomPlaceholder from "./CustomPlacholder";
import { Header, Placeholder } from "semantic-ui-react";

// renders card placeholder
const renderCardPlaceholder = amount => {
  const list = [];
  for (let i = 0; i < amount; i++) {
    list.push(<CustomPlaceholder key={i} />);
  }
  return list;
};

/** MAIN COMPONENT */
const PortfolioPlaceholder = ({ amount }) => {
  return (
    <section className="portfolio">
      <Header as="h1">
        <Placeholder>
          <Placeholder.Line length="long" />
        </Placeholder>
      </Header>
      <ul className="portfolio__items">{renderCardPlaceholder(amount)}</ul>
    </section>
  );
};

export default PortfolioPlaceholder;
