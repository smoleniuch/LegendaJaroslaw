import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import moment from 'moment';
import _mapValues from 'lodash/mapValues'
import _get from 'lodash/get'

import DateTimeSpan from "Components/DateTimeSpan";
import { Content, Body } from "Components/Modal";
import LoadingButton from "Components/LoadingButton";
import {
  reduxForm,
  Form,
  FieldGroup,
  Field,
} from "Components/Form";
import {isValidTimeSpanOptional} from 'Components/Form/Validators'
import {editWorkouts} from 'Actions/workoutActions'

const mapDispatchToProps = {
  editWorkouts
};

class BulkEditWorkoutContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Content title="Edytuj Zaznaczone Treningi">
        <Body>
          <Form onSubmit={this.props.handleSubmit(this.handleSubmit)} >
            <Field
              component={FieldGroup}
              props={{
                label: "Nazwa",
              }}
              name="name"
            />


              <Field
              validate={isValidTimeSpanOptional}
              component={FieldGroup}
                fromTimePickerProps={{
                  timeFormat: "HH:mm",
                  dateFormat: false,
                  removable:true,
                }}
                toTimePickerProps={{
                  timeFormat: "HH:mm",
                  dateFormat: false,
                  removable:true,                  
                }}
                componentClass='dateTimeSpan'
                label="Czas Trwania"
      
              name="timeSpan"
            />

            <Field
              component={FieldGroup}
              props={{
                label: "Status",
              }}
              componentClass="select"
              options={[
                {value:true, label:'Odwołany'},
                {value:false, label:'Aktualny'},
              ]}
              name="canceled"
            />

<div className="text-right">
            <LoadingButton

              type="submit"
              label="Edytuj"
              loadingLabel="Edytuje..."
              isLoading={this.props.activeRequest}
              bsStyle="primary"
            />
            </div>
          </Form>
        </Body>
      </Content>
    );
  }

  handleSubmit = values => {

    var requestData = _mapValues(values,(v,k) => k === 'canceled'?_get(v,'value'):v )
    this.props.dispatchByModal(editWorkouts(requestData, this.props.selectedWorkoutIds))

  }

}

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  reduxForm({ form: "BulkEditWorkoutForm"})
);

BulkEditWorkoutContent = enhance(BulkEditWorkoutContent);

export { BulkEditWorkoutContent };
