import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import moment from 'moment';
import _mapValues from 'lodash/mapValues'

import DateTimeSpan from "Components/DateTimeSpan";
import { Content, Body } from "Components/Modal";
import LoadingButton from "Components/LoadingButton";
import {
  reduxForm,
  Form,
  FieldGroup,
  Field,
  SubmissionError,
  ErrorMessage
} from "Components/Form";
import {required} from 'Components/Form/Validators'
import {addWorkouts} from 'Actions/workoutActions'

const mapDispatchToProps = {
  addWorkouts
};
const timeSpanValidation =  v => {
  var fromDate = moment(v.from, 'HH:mm')
  var toDate = moment(v.to, 'HH:mm')

  return fromDate.isBefore(toDate)? undefined : 'Nieprawidłowy przedział'

}

const dateSpanValidation =  v => {
  var fromDate = moment(v.from)
  var toDate = moment(v.to)

  return fromDate.isSameOrBefore(toDate)? undefined : 'Nieprawidłowy przedział'

}
class AddNewWorkoutContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Content title="Dodaj Trening">
        <Body>
          <Form onSubmit={this.props.handleSubmit(this.handleSubmit)} >
            <Field
              component={FieldGroup}
              props={{
                label: "Nazwa",
                defaultValue: "Trening"
              }}
              validate={required}
              name="name"
            />


              <Field
              validate={timeSpanValidation}
              component={FieldGroup}
                fromTimePickerProps={{
                  timeFormat: "HH:mm",
                  dateFormat: false,
                  
                }}
                toTimePickerProps={{
                  timeFormat: "HH:mm",
                  dateFormat: false,
                }}
                componentClass='dateTimeSpan'
                label="Czas Trwania"
      
              name="timeSpan"
            />


            <Field
              validate={required}
              component={FieldGroup}
              closeMenuOnSelect={false}
              label="Dni Tygodnia"
              componentClass="select"
              isMulti={true}
              options={[
                { value: 1, label: "Poniedziałek" },
                { value: 2, label: "Wtorek" },
                { value: 3, label: "Środa" },
                { value: 4, label: "Czwartek" },
                { value: 5, label: "Piątek" },
                { value: 6, label: "Sobota" },
                { value: 0, label: "Niedziela" }
              ]}
              name="dayOfWeeks"
            />

                          <Field
                          validate={dateSpanValidation}
                          help="Okres dla którego zostaną wygenerowane treningi"
              component={FieldGroup}
                fromTimePickerProps={{
                  timeFormat: false,
                }}
                toTimePickerProps={{
                  timeFormat: false,
                }}
                componentClass='dateTimeSpan'
                label="Zakres Obowiązywania"
      
              name="dateSpan"
            />
<div className="text-right">
            <LoadingButton

              type="submit"
              label="Dodaj"
              loadingLabel="Dodaje..."
              isLoading={this.props.activeRequest}
              bsStyle="primary"
            />
            </div>
          </Form>
        </Body>
      </Content>
    );
  }

  handleSubmit = data => {

    data = _mapValues(data, (v,k) => k === 'dayOfWeeks'?v.map(v=>v.value):v)

    this.props.dispatchByModal(addWorkouts(data))

  }

  addWorkout = () => {



  }

}

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  reduxForm({ form: "AddNewWorkoutForm" , initialValues:{
    timeSpan:{
      from:'19:00',
      to:'21:00',
    },
    dateSpan:{
      from:moment().format('YYYY-MM-DD'),
      to:moment().format('YYYY-MM-DD'),
    }
  }})
);

AddNewWorkoutContent = enhance(AddNewWorkoutContent);

export { AddNewWorkoutContent };
