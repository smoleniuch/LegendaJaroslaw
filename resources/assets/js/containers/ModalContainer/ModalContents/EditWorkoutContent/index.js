import { Grid, Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEqual from 'lodash/isEqual'

import { Content, Body } from "Components/Modal";
import AccordionOptions from "Components/AccordionOptions";
import PostEditor from "Components/PostEditor";
import WorkoutCard from "Components/cards/WorkoutCard";
import Button from "Components/Button";
import Panel from "Components/Panel";
import {workoutCancelTemplate, workoutDateChangeTemplate, undoWorkoutCancelTemplate} from 'PostTemplates/workout'

import { cancelWorkout, undoWorkoutCancel, editWorkout } from "Actions/workout_actions";
import { addPost } from "Actions/postActions";

const mapStateToProps = (state, props) => {
  var workout = state.workout.workouts[props.workoutId];

  var workoutTemplate = workout
    ? _get(
        state,
        `workout.workoutTemplates[${workout.workout_template_id}]`
      )
    : null;

  return {
    workout,
    workoutTemplate
  };
};

const mapDispatchToProps = {
  cancelWorkout,
  undoWorkoutCancel,
  editWorkout,
  addPost,

};

class EditWorkoutContent extends Component {
  constructor(props) {
    super(props);


    this.state = {

      sendPost:true,
      post:{title:'',content:''},
      updatedWorkout:this.props.workout,

    };
    this.cancelWorkout = this.cancelWorkout.bind(this);
    this.togglePostStatus = this.togglePostStatus.bind(this)
    // this.didWorkoutUpdate = this.didWorkoutUpdate.bind(this)
  }
  render() {

    var {title} = this.props

    return (
      <Content title={title}>
        <Body>
          <Grid fluid>
            <Row>
              <Col md={2} />

              <Col md={8}>
                <WorkoutCard
                  editable={true}
                  onChange={this.onWorkoutUpdate}
                  workout={this.state.updatedWorkout}
                  workoutTemplate={this.props.workoutTemplate}
                />
              </Col>

              <Col md={2} />
            </Row>
            <Row>
              <br />

              <Panel expanded={this.state.sendPost}>
                <Panel.Heading style={{display:'flex',justifyContent: 'space-between'}} >
                  <Panel.Title>Post</Panel.Title>

                  <input checked={this.state.sendPost} onChange={this.togglePostStatus}
                   className="" type="checkbox"></input>

                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <PostEditor ref={c => this.postEditor = c} onChange={this.onPostChange}/>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>

              <br />
              <Button onClick={this.editWorkout} className="pull-right" bsStyle="primary">
                Zapisz{" "}
              </Button>

            </Row>
          </Grid>
        </Body>
      </Content>
    );
  }
  componentDidUpdate(prevProps, prevState) {

  }

  get didWorkoutUpdate(){
    return !_isEqual(this.props.workout, this.state.updatedWorkout)
  }

  get didDateChanged(){
    return !_isEqual(this.props.workout.start,this.state.updatedWorkout.start) || !_isEqual(this.props.workout.end,this.state.updatedWorkout.end)
  }

  get didCancelStatusChange(){ return !_isEqual(this.props.workout.canceled,this.state.updatedWorkout.canceled) }

  editWorkout = () => {

    Promise.all([
      this.props.editWorkout(this.props.workout.id,this.state.updatedWorkout),
      this.state.sendPost?this.props.addPost(this.state.post):null
      ]).then()


    
  }

  cancelWorkout() {

    this.props.cancelWorkout(this.props.workout.id, settings);

  }

  togglePostStatus(e){
    e.stopPropagation();

    this.setState(prevState => ({sendPost:!prevState.sendPost}))
  }

  onWorkoutUpdate = (updatedWorkout) => {

    this.setState({updatedWorkout},() => {

      if(!this.didWorkoutUpdate){

        this.postEditor.update({title:'', content:''})

      }

      else if( this.didCancelStatusChange && updatedWorkout.canceled){
        
          this.postEditor.update(workoutCancelTemplate(this.props.workout))

      }

      else if (this.didCancelStatusChange && !this.state.updatedWorkout.canceled){

        this.postEditor.update(undoWorkoutCancelTemplate(this.props.workout, updatedWorkout))        

      }

      else if(this.didDateChanged && !this.state.updatedWorkout.canceled){

        this.postEditor.update(workoutDateChangeTemplate(this.props.workout, updatedWorkout))

      }

    })



    
  }

  onPostChange = (post) => this.setState({post})
}

EditWorkoutContent.defaultProps = {
  title:'Edytor Treningu'
}

EditWorkoutContent = connect(mapStateToProps, mapDispatchToProps)(
  EditWorkoutContent
);
export { EditWorkoutContent };
