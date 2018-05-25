import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import ReactSelect from "react-select";
import ReactSelectCreatable from "react-select/lib/Creatable";
import { Field } from "redux-form";
import ClassNames from "classnames";
import _findKey from "lodash/findKey";
import _pick from "lodash/pick";
import _get from "lodash/get";
import "./style.scss";

class FieldGroup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { id, label, help, ...props } = this.props;

    return (
      <FormGroup controlId={id} validationState={this.validationState}>
        <ControlLabel>{label} </ControlLabel>
        <div className="field-group-error">{this.error}</div>

        {this.getElement}

        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  get shouldDisplayError() {
    return _get(this.props, "meta.touched") && _get(this.props, "meta.invalid");
  }

  get error() {
    return this.shouldDisplayError ? _get(this.props, "meta.error") : null;
  }

  get fieldProps() {
    return _pick(this.props, []);
  }

  get getSelectElement() {
    var props = _pick(this.props, [
      "isMulti",
      "name",
      "isLoading",
      "noOptionsMessage",
      "options",
      "isDisabled",
      "placeholder",
      "value",
      "onChange",
      "isClearable",
      "onCreateOption",
      "getOptionValue",
      'isValidNewOption'
    ]);

    var propsWithDefaults = {
      isClearable: true,
      placeholder: "Wybierz...",
      noOptionsMessage: _ => "Brak",
      ...props
    };

    if (this.props.creatable) {
      return (
        <ReactSelectCreatable
          // getNewOptionData={inputValue => ({name:'inputValue'})}
          formatCreateLabel={input => `Dodaj "${input}"`}
          {...propsWithDefaults}
        />
      );
    }

    return <ReactSelect {...propsWithDefaults} />;
  }

  get getElement() {
    if (this.props.componentClass === "select") {
      return this.getSelectElement;
    }

    return this.getFormControlElement;
  }

  get getFormControlElement() {
    var props = _pick(this.props, ["type", "componentClass", "value"]);

    var events = { ...this.props.input };

    props = Object.assign({}, props, events);

    return <FormControl {...props} />;
  }

  get validationState() {
    var states = {
      error: this.shouldDisplayError
    };

    return _findKey(states, v => v) || null;
  }
}

export default FieldGroup;
