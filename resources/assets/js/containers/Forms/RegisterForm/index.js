import React, { Component } from 'react';
import { connect } from 'react-redux'
import _pick from 'lodash/pick'
import _has from 'lodash/has'
import _get from 'lodash/get'
import _mapValues from 'lodash/mapValues'

import { reduxForm, Form, FieldGroup, Field, SubmissionError, ErrorMessage } from 'Components/Form'
import { required, sameAsValue, minLength, email, validateGenerator } from 'Components/Form/Validators'
import Button  from 'Components/Button'
import { registerUser, getCurrentUserData } from 'Actions/user_actions'
import { validateRegisterCredentials } from 'Actions/validator_actions.js'
import { Grid, Col, Row } from 'react-bootstrap'

const mapDispatchToProps = (dispatch) => {

  return {

    registerUser:(data) => dispatch(registerUser(data)),
  }

}

const asyncValidate = (values, dispatch, props) => {
  var promise = new Promise((resolve, reject) => {

    var dispatchAction = dispatch(validateRegisterCredentials(_pick(values,['email','name']))).then((nextAction)=>{

        if(nextAction.error){

          var errors = _get(nextAction, 'error.response.data.errors', {})
          var asyncErrors = _mapValues(errors, (e)=>e[0])

          reject(asyncErrors)

        }

        else {

          resolve()

        }

      })

    })


  return promise


}

class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)

  }

  render() {

    return (
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

        <Field name='name' props={{label:'Nazwa', placeholder:'email'}} component={FieldGroup}/>

        <Field name='email' props={{label:'Email', placeholder:'email'}} component={FieldGroup}/>

        <Field  name='password' props={{label:'Hasło', type:'password'}} component={FieldGroup}/>

        <Field  name='password_confirmation' props={{label:'Potwierdź Hasło', type:'password'}} component={FieldGroup}/>


        <Button disabled={this.props.submitting} type='submit' bsStyle="primary">Zarejestruj</Button>


      </Form>
    );
  }

  handleSubmit(data){

      return this.props.registerUser(data).catch((action) => {

        throw new SubmissionError(_get(action,'error.response.data.errors'))

      })

  }


}

const validate = validateGenerator({

  email:required,
  name:required,
  password:[

    required,
    minLength(6,'Hasło musi posiadać minimalnie 6 znaków'),

  ],
  password_confirmation:[

    required,
    sameAsValue('password', 'Hasło musi być identyczne.')

  ]

})


export default connect(null, mapDispatchToProps)(
  reduxForm({
    asyncBlurFields:['name','email'],
    form:'RegisterForm',
    asyncValidate,
    validate,

  })(RegisterForm)
)
