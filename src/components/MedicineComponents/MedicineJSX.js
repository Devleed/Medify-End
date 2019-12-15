import React from "react";
import {
  Grid,
  Image,
  Header,
  CardDescription,
  CardContent,
  CardMeta,
  Icon,
  Loader
} from "semantic-ui-react";

const MedicineJSX = props => {
  const renderMed = () => {
    if (!props.medicine) {
      return <Loader active />;
    } else if (props.medicine === "not found") {
      return (
        <Header icon>
          <Icon name="search" />
          {props.message}
        </Header>
      );
    } else if (props.medicine) {
      const { medicine } = props;
      return (
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Image src={medicine.url} style={{ height: "500px" }} />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Header as="h1">
              {medicine.name}
              <br />
              <div style={{ fontSize: "17px" }}>({medicine.formula})</div>
            </Header>
            <CardMeta>
              <span className="date">{medicine.type}</span>
            </CardMeta>
            <CardDescription style={{ margin: "10px 0" }}>
              {medicine.description}
            </CardDescription>
            <CardContent style={{ fontWeight: "bold" }} extra>
              Rs.{medicine.price}
            </CardContent>
          </Grid.Column>
        </Grid>
      );
    }
  };
  return renderMed();
};

export default MedicineJSX;
