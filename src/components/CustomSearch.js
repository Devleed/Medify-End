import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Input, Segment, Button, Icon } from "semantic-ui-react";

import history from "../history";
import _ from "lodash";
import { List } from "semantic-ui-react";

const segmentStyle = {
  position: "absolute",
  top: "50px",
  left: "255px",
  zIndex: "999",
  width: "68%"
};

const CustomSearch = props => {
  const [results, setResults] = useState([]);
  let medNames = useSelector(({ medNames }) => medNames);
  const onSubmit = ({ search }) => {
    if (!search) {
      alert("nothing to search for");
    } else {
      setResults([]);
      history.push(`/search/${search}`);
    }
  };
  const onInputChange = ({ target }) => {
    target.value = target.value.toLowerCase();
    if (target.value !== "") {
      if (medNames.find(el => el === target.value)) setResults([target.value]);
      else {
        const sorted = _.sortBy(medNames, o => {
          if (o.indexOf(target.value) !== -1) return o.indexOf(target.value);
        });
        if (_.isEqual(sorted, medNames)) setResults([]);
        else setResults(sorted.slice(0, 5));
      }
    } else {
      setResults([]);
    }
  };
  const renderResults = results => {
    return results.map(result => {
      return (
        <List.Item
          key={result}
          onClick={() => {
            onSubmit({ search: result });
          }}
        >
          <List.Content>
            <List.Header>{result}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
  };
  return (
    <React.Fragment>
      <form onSubmit={props.handleSubmit(onSubmit)} className="search__form">
        <Input className="search__ui">
          <Field
            name="search"
            type="text"
            placeholder="Search..."
            component="input"
            className="search__field"
            onChange={onInputChange}
            autoComplete="off"
          />
          <Button>
            <Icon name="search" />
          </Button>
        </Input>
      </form>
      {results.length === 0 ? null : (
        <Segment style={segmentStyle}>
          <List divided relaxed>
            {renderResults(results)}
          </List>
        </Segment>
      )}
    </React.Fragment>
  );
};

export default reduxForm({ form: "search form" })(CustomSearch);
