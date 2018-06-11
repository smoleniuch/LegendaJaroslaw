import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import moment from "moment";
import _sortBy from "lodash/sortBy";

import { IconButtonBarColumn } from "Components/Table/BuiltInColumns";
import Dashboard from "Components/Dashboard";
import DashboardGrid from "Components/DashboardGrid";
import WorkoutCard from "Components/cards/WorkoutCard";
import Post from "Components/Post";
import Table from "Components/Table";
import Button from "Components/Button";
import Label from "react-bootstrap/lib/Label";
import CRUDTable from 'Components/CRUDTable';

import { displayModal } from "Actions/modalActions";
import { deleteWorkout } from "Actions/workoutActions";

const mapStateToProps = state => {
  return {
    workouts: Object.values(state.workout.workouts).sort(
      (a, b) => new Date(b.start) - new Date(a.start)
    ),
    workoutTemplates: state.workout.workoutTemplates
  };
};

const mapDispatchToProps = {
  displayModal,
  deleteWorkout,
};

class TrainingsManagementDashboard extends Component {
  constructor(props) {
    super(props);

    this.openEditWorkoutModal = this.openEditWorkoutModal.bind(this);
  }
  render() {
    var { posts } = this.props;

    return (
      <Dashboard>
      <Dashboard.Content>


      <CRUDTable
        onAdd={this.openAddNewWorkoutModal}
        onEdit={this.openEditWorkoutModal}
        onDelete={this.onDelete}
        data={this.props.workouts}
        columns={[
          {
            Header:'Treningi',
            columns:[
        
          {
            Header: "Nazwa",
            // id: "name",
            accessor: 'name'
          },
          { Header: "Rozpoczyna się", accessor: "start" },
          { Header: "Kończy się", accessor: "end" },
          {
            Header: "Status",
            id:'status',
            accessor:'canceled',
            Cell: ({ original }) => {
              var label = original.canceled ? (
                <Label bsStyle="danger">Odwołany</Label>
              ) : (
                <Label bsStyle="success">Aktualny</Label>
              );

              return <h4 className='text-center' style={{margin:'auto'}}>{label}</h4>;
            }
          },
        ]
        }
        ]}
      
      />
                      </Dashboard.Content>
      </Dashboard>
    )

   
  }

  openAddNewWorkoutModal = () => {

    this.props.displayModal('AddNewWorkoutContent')

  }

  onDelete = ({id}) => {

  this.props.displayModal("ConfirmationModalContent", {
      question: "Czy chcesz usunąć wybrany trening?",
    afterConfirmPromiseGenerator:() => this.props.deleteWorkout(id)
  });

  }

  openEditWorkoutModal({id:workoutId}) {
    this.props.displayModal("EditWorkoutContent", { workoutId });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  TrainingsManagementDashboard
);
