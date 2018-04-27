import React, { Component } from "react";

import DescriptionCard from "Components/DescriptionCard";
import LabelledList from "Components/LabelledList";
import DateTime from "Components/DateTime";
import SwitchButton from "Components/SwitchButton";
import ToggleButton from "Components/ToggleButton";
import './style.scss'

class WorkoutEditCard extends Component {
  render() {
    return (
      <DescriptionCard className="workout-edit-card" title="Trening">
        {this.props.workout ? (
          <LabelledList
            items={[
              { label: "Nazwa", value: this.props.workoutTemplate.name },
              {
                label: "Odwołany",
                value: (
                  <ToggleButton
                    name="canceled"
                    onToggle={this.onChange}
                    value={this.props.workout.canceled}
                    activeLabel={"Tak"}
                    inactiveLabel={"Nie"}
                  />
                )
              },
              {
                label: "Rozpocznie się",
                value: (
                  <DateTime
                    onChange={this.onChange}
                    name="start"
                    inputProps={{ disabled: this.props.workout.canceled }}
                    defaultValue={this.props.workout.start}
                  />
                )
              },
              {
                label: "Zakończy się",
                value: (
                  <DateTime
                    name="end"
                    inputProps={{ editable:true, disabled: this.props.workout.canceled }}
                    onChange={this.onChange}
                    defaultValue={this.props.workout.end}
                  />
                )
              },
              { label: "Opis", value: this.props.workoutTemplate.description }
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

export default WorkoutEditCard;
