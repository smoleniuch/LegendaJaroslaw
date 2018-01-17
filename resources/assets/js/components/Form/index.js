import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form'
import FieldGroup from './FieldGroup'
import { Form as BootstrapForm } from 'react-bootstrap'
import ErrorMessage from './ErrorMessage'

class Form extends Component {

  render() {

    var { children, ...props } = this.props

    return (
      <BootstrapForm {...props}>
        {children}
      </BootstrapForm>
    );
  }

}

export {

  reduxForm,
  Form,
  FieldGroup,
  Field,
  SubmissionError,
  ErrorMessage

}

export default Form;
