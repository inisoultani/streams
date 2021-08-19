import React from 'react';
import { Form, Field } from 'react-final-form';

class StreamForm extends React.Component {
  renderError = (meta) => {
    if (meta.touched && meta.error) {
      return (
        <div className="ui error message">
          <div className="header">
            {`${meta.error.code} - ${meta.error.message}`}
          </div>
        </div>
      );
    }
    return null;
  };
  renderInput = (formProps) => {
    console.log(formProps);
    const className = `${
      formProps.meta.error && formProps.meta.touched ? 'field error' : 'field'
    }`;
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        {/* <input
          autoComplete="off"
          value={formProps.input.value}
          onChange={formProps.input.onChange}
        /> */}
        <input autoComplete="off" {...formProps.input} />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  validateForm = (formValues) => {
    const errors = {};
    if (!formValues.title) {
      errors.title = {
        code: 'ERR-001',
        message: 'You must enter a title',
      };
    }
    if (!formValues.description) {
      errors.description = {
        code: 'ERR-002',
        message: 'You must enter a description',
      };
    }
    return errors;
  };

  render() {
    console.log(this.props);
    return (
      <Form
        initialValues={this.props.initialValues}
        onSubmit={this.onSubmit}
        validate={this.validateForm}
        subscription={{ submitting: true, pristine: true }}
        render={(props) => {
          console.log(props);
          return (
            <form onSubmit={props.handleSubmit} className="ui form error">
              <Field
                name="title"
                component={this.renderInput}
                label="Enter Title"
              />
              <Field
                name="description"
                component={this.renderInput}
                label="Enter Description"
              />
              <button
                className="ui button primary"
                disabled={props.submitting || props.pristine}
              >
                Submit
              </button>
            </form>
          );
        }}
      />
    );
  }
}

export default StreamForm;
