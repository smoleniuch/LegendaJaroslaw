import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import {connect} from 'react-redux'
import { compose } from 'recompose'
import { withRouter, Route } from 'react-router'

import LoginForm from 'Containers/Forms/LoginForm'
import RegisterForm from 'Containers/Forms/RegisterForm'
import { getCurrentUserData } from 'Actions/user_actions'
import {Modal, Content,  reduxModal} from 'Components/Modal';
import {ReduxModal, withReduxModalManager} from 'Components/ReduxModal';
import {Tabs, Tab} from 'Components/Tabs'

const mapDispatchToProps = dispatch => {

  return {

    updateCurrentUserData:() => dispatch(getCurrentUserData())

  }

}

class AuthModal extends Component {
  constructor(props) {
    super(props);

    this.onRegisterSuccess = this.onRegisterSuccess.bind(this)
  }
  render() {
    return (
      <ReduxModal name="AuthModal"  title='Panel Autoryzacji'>

        <Grid fluid>
          <Row>

          <Col md={8}>
          <Content borderRight>
          <Tabs id='auth-modal-forms' defaultActiveKey={1}>

            <Tab eventKey={1} title='Logowanie'>

                <LoginForm onSubmitSuccess={this.props.hideModal}/>

            </Tab>

            <Tab eventKey={2} title='Rejestracja'>

              <RegisterForm onSubmitSuccess={this.onRegisterSuccess}/>

              </Tab>

          </Tabs>
          </Content>


          </Col>

          <Col md={4}>

          </Col>

          </Row>
        </Grid>

      </ReduxModal>
    );
  }

  onRegisterSuccess(){

    this.props.hideModal()

    this.props.updateCurrentUserData

  }

}

const enhance = compose(

  connect(null,mapDispatchToProps),
  withRouter,
  withReduxModalManager({bindNameToActions:'AuthModal'})

)

AuthModal = enhance(AuthModal)

export {
  AuthModal
}
