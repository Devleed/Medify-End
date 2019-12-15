import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";

import { isLoading } from "../actions";

class CustomForm extends React.Component {
  renderInput = ({ input, label, type }) => {
    switch (type) {
      case "text":
        return (
          <React.Fragment>
            <label>{label}</label>
            <input {...input} />
          </React.Fragment>
        );
      case "textarea":
        return (
          <React.Fragment>
            <label>{label}</label>
            <textarea {...input}></textarea>
          </React.Fragment>
        );
      case "number":
        return (
          <React.Fragment>
            <label>{label}</label>
            <input type="number" {...input} />
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <label>{label}</label>
            <input {...input} />
          </React.Fragment>
        );
    }
  };
  onSubmit = formValues => {
    this.props.isLoading(true);
    this.props.onSubmit(formValues);
  };
  renderLoader() {
    if (this.props.isDataLoading)
      return <div className="ui active centered inline loader"></div>;
    else return null;
  }
  render() {
    const formProps = {
      onSubmit: this.props.handleSubmit(this.onSubmit)
    };
    if (this.props.isDataLoading) formProps.loading = true;

    return (
      <div style={{ marginTop: "20px" }}>
        <Form {...formProps}>
          <Form.Field>
            <Field
              name="name"
              component={this.renderInput}
              label="Medicine Name"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <Field
              name="description"
              component={this.renderInput}
              label="Description"
              type="textarea"
            />
          </Form.Field>
          <Form.Field>
            <Field
              name="formula"
              component={this.renderInput}
              label="Formula"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label>Type</label>
            <Field name="type" component="select">
              <option></option>
              <option value="Cardio-Vascular-System">
                Cardio-Vascular System
              </option>
              <option value="Central-Nervous-System">
                Central Nervous System
              </option>
              <option value="Circulatory-System">Circulatory System</option>
              <option value="Derma">Derma</option>
              <option value="Endocrine-System">Endocrine System</option>
              <option value="Eyes-Nose-Ear">Eyes, Nose, Ear</option>
              <option value="Gestro-Instetinal-Tract">
                Getro-Instatinal-Tract
              </option>
              <option value="Derpression">Derpression</option>
              <option value="Eyes-Nose-Ear">Eyes-Nose-Ear</option>
              <option value="Fever-and-Pain">Fever and Pain</option>
              <option value="Infection">Infection</option>
              <option value="Supplement">Supplement</option>
            </Field>
          </Form.Field>
          <Form.Field>
            <Field
              name="price"
              component={this.renderInput}
              label="Price"
              type="number"
            />
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <input
              onChange={this.props.onFileSelect}
              type="file"
              style={{ margin: "5px 0px 20px 0px" }}
            />
          </Form.Field>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isDataLoading: state.isLoading };
};

const reduxSetup = reduxForm({
  form: "Add medicine form"
})(CustomForm);

export default connect(mapStateToProps, { isLoading })(reduxSetup);
