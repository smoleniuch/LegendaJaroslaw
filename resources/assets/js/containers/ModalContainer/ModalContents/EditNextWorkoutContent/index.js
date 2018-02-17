import {Grid, Row, Col} from 'react-bootstrap'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';

import { Content, Body } from 'Components/Modal'
import DescriptionCard from 'Components/DescriptionCard'
import LabelledList from 'Components/LabelledList'
import { cancelWorkout, undoWorkoutCancel } from 'Actions/workout_actions'
const mapStateToProps = (state) => {

  var nextWorkout = state.workout.workouts[state.workout.nextWorkoutId]

  var nextWorkoutTemplate = nextWorkout?_get(state,`workout.workoutTemplates[${nextWorkout.workout_template_id}]`):null

  return {

    nextWorkout,
    nextWorkoutTemplate

  }

}

const mapDispatchToProps =  {

    cancelWorkout,
    undoWorkoutCancel,

}

class EditNextWorkoutContent extends Component {
  constructor(props) {
    super(props);

    this.cancelWorkout = this.cancelWorkout.bind(this)
  }
  render() {
    return (
      <Content title="Edycja Najbliższego Treningu">
        <Body>
        <Grid fluid>
          <Row>
            <Col md={2} />

            <Col md={8}>
            <DescriptionCard title="Trening">
              {this.props.nextWorkout?(
                <LabelledList
                  items={[
                    {label:'Nazwa',value:this.props.nextWorkoutTemplate.name},
                    {label:'Opis',value:this.props.nextWorkoutTemplate.description},
                    {label:'Odwołany',value:this.props.nextWorkout.canceled?'Tak':'Nie'},
                    {label:'Rozpocznie się',value:this.props.nextWorkout.start},
                    {label:'Zakończy się',value:this.props.nextWorkout.end},
                  ]}/>
              ):'Brak Danych'}


            </DescriptionCard>
            </Col>

            <Col md={2} />

          </Row>
          <Row>

            <Col>
            <button onClick={()=>this.props.undoWorkoutCancel(this.props.nextWorkout.id)} >cofnij odwolanie</button>

            <button onClick={this.cancelWorkout} >odwołaj</button>
            </Col>

          </Row>
          </Grid>

        </Body>
      </Content>
    );
  }

  cancelWorkout(){

    var settings = {

      post:{

        title:'Odwołanie Treningu.',
        content:'Odwołanie Treningu Content'

      }

    }

    this.props.cancelWorkout(this.props.nextWorkout.id, settings)

  }

}
EditNextWorkoutContent = connect(mapStateToProps, mapDispatchToProps)(EditNextWorkoutContent)
export  {
  EditNextWorkoutContent
};
