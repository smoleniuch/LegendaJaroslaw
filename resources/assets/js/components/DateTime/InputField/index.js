import React from 'react';
import PropTypes from 'prop-types';

import './style.scss'
import Button from 'Components/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Icon from 'Components/Icon'

const InputField = ({value, disabled, editable, removable, resetValue},openCalendar) => {
    return (
        <div className="date-input-field">
            <span className="date-output">{value}</span>
            <ButtonGroup bsSize="xsmall">
            {editable !== false?(<Button onClick={openCalendar} disabled={disabled} className="calendar-toggle-button">
                <Icon name="ion-edit"/>
            </Button>):''}
            {removable && value?(<Button onClick={resetValue}  disabled={disabled}>
                <Icon name="ion-android-delete"/>
            </Button>):''}
            </ButtonGroup>
        </div>
    );
};


export default InputField;