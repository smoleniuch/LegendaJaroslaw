import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import {connect} from 'react-redux'
import { compose } from 'recompose'
import { withRouter, Route } from 'react-router'

import LoginForm from 'Containers/Forms/LoginForm'
import RegisterForm from 'Containers/Forms/RegisterForm'
import { getCurrentUserData } from 'Actions/user_actions'
import {Modal, Content} from 'Components/Modal';
import withRouterHelpers from 'Containers/ModalContainer/with_router_helpers.js';
import {Tabs, Tab} from 'Components/Tabs'

const mapDispatchToProps = dispatch => {

  return {

    updateCurrentUserData:() => dispatch(getCurrentUserData())

  }

}

class AuthModal extends Component {
  constructor(props) {
    super(props);

    this.hide = this.hide.bind(this)
    this.onRegisterSuccess = this.onRegisterSuccess.bind(this)
  }
  render() {

    return (
      <Modal onHide={this.hide} title='Panel Autoryzacji' show={true}>

        <Grid fluid>
          <Row>

          <Col md={8}>
          <Content borderRight>
          <Tabs id='auth-modal-forms' defaultActiveKey={1}>

            <Tab eventKey={1} title='Logowanie'>

                <LoginForm onSubmitSuccess={this.hide}/>

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

      </Modal>
    );
  }

  hide(){

    this.props.displayUnderModalLocation()

  }

  onRegisterSuccess(){

    this.hide()

    this.props.updateCurrentUserData

  }

}

const enhance = compose(

  withRouterHelpers,
  connect(null,mapDispatchToProps),

)

AuthModal = enhance(AuthModal)

export {
  AuthModal
}
