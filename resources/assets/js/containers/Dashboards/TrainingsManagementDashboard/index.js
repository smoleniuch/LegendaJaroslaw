import React, { Component } from "react";
import { connect } from "react-redux";

import Dashboard from "Components/Dashboard";
import Label from "react-bootstrap/lib/Label";
import CRUDTable from 'Components/CRUDTable';
import SelectButtonDropdownBody from './components/SelectButtonDropdownBody'
import { displayModal } from "Actions/modalActions";
import { deleteWorkout, deleteWorkouts } from "Actions/workoutActions";
import './style.scss'

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
  deleteWorkouts,
};

class TrainingsManagementDashboard extends Component {
  constructor(props) {
    super(props);

    this.openEditWorkoutModal = this.openEditWorkoutModal.bind(this);
  }
  render() {
    var { posts } = this.props;

    return (
      <Dashboard className="training-managment-dashboard">
      <Dashboard.Content>


      <CRUDTable
        onAdd={this.openAddNewWorkoutModal}
        onEdit={this.openEditWorkoutModal}
        onDelete={this.onDelete}
        onBulkDelete={this.onBulkDelete}
        onBulkEdit={this.onBulkEdit}
        data={this.props.workouts}
        selectTable={true}
        displayAdvancedSelectorBtn={true}
        SelectorDropdownBody={SelectButtonDropdownBody}
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

  onBulkDelete = selectedIds => {

    this.props.displayModal("ConfirmationModalContent", {
      question: `Czy chcesz usunąć ${selectedIds.length} wybranych treningów ?`,
    afterConfirmPromiseGenerator:() => this.props.deleteWorkouts(selectedIds)
  });

  }
  
  onBulkEdit = selectedWorkoutIds => {
    this.props.displayModal("BulkEditWorkoutContent", {selectedWorkoutIds});
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
