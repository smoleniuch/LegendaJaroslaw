import React, { Component } from "react";
import { connect } from "react-redux";
import {compose} from 'recompose'
import _get from "lodash/get";
import {
  reduxForm,
  Form,
  FieldGroup,
  Field,
  ErrorMessage
} from "Components/Form";
import { required } from "Components/Form/Validators";
import Button from "Components/Button";
import { addAlbum } from "Actions/galleryActions";

const mapDispatchToProps = {
    addAlbum
};

class AlbumForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field
          validate={required}
          name="name"
          props={{
            label: "Nazwa",
            placeholder: "album"
          }}
          component={FieldGroup}
        />

        <div style={{ textAlign: "right" }}>
          <Button
            disabled={this.props.submitting}
            type="submit"
            bsStyle="primary"
          >
            Dodaj
          </Button>
        </div>
      </Form>
    );
  }

  handleSubmit(d) {
    var requestData = {
      name: d.name,
      parent_id: this.props.currentAlbum.id
    };

    return this.props
      .addAlbum(requestData)
      .then()
      .catch(action => {
        throw new SubmissionError({
          _error: _get(
            action,
            "error.response.data.error.message",
            "Nie można dodać albumu."
          )
        });
      });
  }
}

const enhance = compose(
    connect(null, mapDispatchToProps),
    reduxForm({ form: "AlbumForm" })
)

export default enhance(AlbumForm)

