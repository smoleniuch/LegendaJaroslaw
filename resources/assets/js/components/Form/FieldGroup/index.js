import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import ReactSelect from "react-select";
import ReactSelectCreatable from "react-select/lib/Creatable";
import DateTimeSpan from 'Components/DateTimeSpan';
import { Field, clearFields } from "redux-form";
import ClassNames from "classnames";
import _findKey from "lodash/findKey";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _debounce from 'lodash/debounce'
import "./style.scss";

class FieldGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value:this.props.defaultValue
    }

    this.lazyOnChange = _debounce(this.onChange,200)
  }

  componentDidMount(){
    if(this.props.defaultValue && this.formControlRef){

      this.formControlRef.value = this.props.defaultValue

      if(this.props.input.onChange){ this.props.input.onChange(this.props.defaultValue)}

    }
  }
  
  componentDidUpdate(){

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

  get dateSpanElement(){
    var props = _pick(this.props, [
      'fromTimePickerProps',
      'toTimePickerProps',
    ]);

    return <DateTimeSpan  {...props} {...this.props.input} ref={c => this.dateTimeSpanRef = c}/>
  }
  
  get getSelectElement() {
    var props = _pick(this.props, [
      "isMulti",
      "name",
      "isLoading",
      "noOptionsMessage",
      'closeMenuOnSelect',
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
    var {onChange} = this.props.input
    var propsWithDefaults = {
      isClearable: true,
      placeholder: "Wybierz...",
      noOptionsMessage: _ => "Brak",
      onChange,
      ...props
    };

    if (this.props.creatable) {
      return (
        <ReactSelectCreatable
          // getNewOptionData={inputValue => ({name:'inputValue'})}
          
          formatCreateLabel={input => `Dodaj "${input}"`}
          {...propsWithDefaults}
          ref={c => this.selectRef = c}
        />
      );
    }

    return <ReactSelect  {...propsWithDefaults} ref={c => this.selectRef = c} />;
  }

  get getElement() {
    if (this.props.componentClass === "select") {
      return this.getSelectElement;
    } else if (this.props.componentClass === 'dateTimeSpan'){
      return this.dateSpanElement
    }

    return this.getFormControlElement;
  }

  get getFormControlElement() {
    var props = _pick(this.props, ["type", "componentClass", "value"]);

    // var events = { ...this.props.input };
    var {onChange,value, ...restEvents} = this.props.input;
    props = Object.assign({}, props, {...restEvents} );
    
    return <FormControl onChange={this.fireLazyChange}  inputRef={c => this.formControlRef = c} {...props} />;
  }

  get validationState() {
    var states = {
      error: this.shouldDisplayError
    };

    return _findKey(states, v => v) || null;
  }
  
  fireLazyChange = e => {
    let value = e.target.value

    this.lazyOnChange(value)
  }

  onChange = value => {

    var onChange = _get(this.props,'input.onChange', () => {})

    onChange(value)
  }
}

FieldGroup.defaultProps = {
  input:{},
  displayResetBtn:false,
}

export {ControlLabel}

export default FieldGroup;
