import React from "react";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { Container, Header } from "semantic-ui-react";

import { isLoading } from "../actions";
import CustomForm from "./CustomForm";

class AddMedicine extends React.Component {
  state = { image: null };
  onSubmit = formValues => {
    const task = firebase
      .storage()
      .ref(`medicineImages/${this.state.image.name}`)
      .put(this.state.image);
    task.on(
      "state_changed",
      snap => {},
      err => {
        console.log(err);
      },
      async () => {
        try {
          const url = await firebase
            .storage()
            .ref("medicineImages")
            .child(this.state.image.name)
            .getDownloadURL();
          const medObj = {
            description: formValues.description,
            type: formValues.type,
            price: formValues.price,
            url,
            formula: formValues.formula
          };
          const rootRef = firebase
            .database()
            .ref()
            .child("medicines");
          const typeRef = rootRef.child(formValues.type);
          const medRef = typeRef.child(formValues.name);
          await medRef.set(medObj);
          alert("Added");
          this.props.isLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );
  };
  onFileSelect = e => {
    if (e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
    }
  };
  render() {
    return (
      <Container text style={{ margin: "30px 0" }}>
        <Header as="h2">Add a medicine</Header>
        <CustomForm onSubmit={this.onSubmit} onFileSelect={this.onFileSelect} />
      </Container>
    );
  }
}

export default connect(null, { isLoading })(AddMedicine);
