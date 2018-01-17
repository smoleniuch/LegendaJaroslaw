import React, {Component} from 'react';
import {connect} from 'react-redux'
import _get from 'lodash/get'
import {
  reduxForm,
  Form,
  FieldGroup,
  Field,
  SubmissionError,
  ErrorMessage
} from 'Components/Form'
import {required} from 'Components/Form/Validators'
import Button from 'Components/Button'
import {loginAttempt} from 'Actions/user_actions'

const mapDispatchToProps = (dispatch) => {

  return {

    loginAttempt: (login, password, rememberMe) => dispatch(loginAttempt(login, password, rememberMe)),
  }

}

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)

  }

  render() {

    return (<Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

      <Field validate={required} name='email' props={{
          label: 'Login',
          placeholder: 'email'
        }} component={FieldGroup}/>

      <Field validate={required} name='password' props={{
          label: 'Hasło',
          type: 'password'
        }} component={FieldGroup}/> {<ErrorMessage show={this.props.error && !this.props.submitting}>{this.props.error}</ErrorMessage>}

      <Button disabled={this.props.submitting} type='submit' bsStyle="primary">Zaloguj się</Button>

    </Form>);
  }


  handleSubmit(d) {

    return this.props.loginAttempt(d.email, d.password).then((action) => {}).catch((action) => {
      throw new SubmissionError({_error: _get(action,'error.response.data.errors.email','Logowanie nie powiodło się.') })
    })

  }

}

const validate = (values) => {}

export default connect(null, mapDispatchToProps)(reduxForm({form: 'LoginForm'})(LoginForm))
