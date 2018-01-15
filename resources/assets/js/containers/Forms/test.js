import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {sameAsValue, required} from 'Components/Form/Validators'

const renderField = (
  { input, label, type, meta: { asyncValidating, touched, error } },
) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const AsyncValidationForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        validate={required}
        component={renderField}
        label="Password"
      />

      <Field
        name="confirmation_pass"
        type="password"
        validate={[sameAsValue]}
        component={renderField}
        label="Password"
      />

      <div>
        <button type="submit" disabled={submitting}>Sign Up</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => { // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'That username is taken' };
    }
  });
};

export default reduxForm({
  form: 'asyncValidation', // a unique identifier for this form
  asyncValidate,
  asyncBlurFields: ['username'],
})(AsyncValidationForm);
