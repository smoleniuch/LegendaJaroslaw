import React, { Component } from 'react';
import {Modal, Content,  reduxModal} from 'Components/Modal';
import { Grid, Row, Col } from 'react-bootstrap'
import {connect} from 'react-redux'
import {Tabs, Tab} from 'Components/Tabs'

import LoginForm from 'Containers/Forms/LoginForm'
import RegisterForm from 'Containers/Forms/RegisterForm'
import Test from 'Containers/Forms/Test'
import { getCurrentUserData } from 'Actions/user_actions'

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
      <Modal  title='Panel Autoryzacji' {...this.props}>

        <Grid fluid>
          <Row>

          <Col md={8}>
          <Content borderRight>
          <Tabs id='auth-modal-forms' defaultActiveKey={1}>

            <Tab eventKey={1} title='Logowanie'>

                <LoginForm onSubmitSuccess={this.props.hide}/>

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

  onRegisterSuccess(){

    this.props.hide()

    this.props.updateCurrentUserData

  }

}


AuthModal = connect(null,mapDispatchToProps)(reduxModal(AuthModal, {name:'AuthModal'}))
export {
  AuthModal
}
