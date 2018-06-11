import React, { Component } from "react";
import _get from 'lodash/get'
import classNames from 'classnames'
import DescriptionCard from "Components/DescriptionCard";
import LabelledList from "Components/LabelledList";
import DateTime from "Components/DateTime";
import SwitchButton from "Components/SwitchButton";
import ToggleButton from "Components/ToggleButton";


class WorkoutCard extends Component {
  render() {
    return (
      <DescriptionCard className={classNames("workout-edit-card", this.props.className)} title="Trening">
        {this.props.workout ? (
          <LabelledList
            items={[
              { label: "Nazwa", value: this.props.workout.name },
              {
                label: "Odwołany",
                value: this.props.editable?(
                  <ToggleButton
                    name="canceled"
                    onToggle={this.onChange}
                    value={this.props.workout.canceled}
                    activeLabel={"Tak"}
                    inactiveLabel={"Nie"}
                  />):_get(this.props.workout,'canceled')?'Tak':'Nie'
              },
              {
                label: "Rozpocznie się",
                value: (
                  <DateTime
                    onChange={this.onChange}
                    name="start"
                    inputProps={{editable:this.props.editable, disabled: this.props.workout.canceled }}
                    defaultValue={this.props.workout.start}
                  />
                )
              },
              {
                label: "Zakończy się",
                value: (
                  <DateTime
                    name="end"
                    inputProps={{editable:this.props.editable, disabled: this.props.workout.canceled }}
                    onChange={this.onChange}
                    defaultValue={this.props.workout.end}
                  />
                )
              },
              // { label: "Opis", value: this.props.workoutTemplate.description }
            ]}
          />
        ) : (
          "Brak Danych"
        )}
      </DescriptionCard>
    );
  }

  onChange = (value, name) => {
    this.props.onChange({
      ...this.props.workout,
      [name]: value
    });
  };
}

WorkoutCard.defaultProps = {
  editable:false,
  workoutTemplate:{},
  workout:{},
  onChange:() => {},
}

export default WorkoutCard;
