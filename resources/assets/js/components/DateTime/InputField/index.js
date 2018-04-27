import React from 'react';
import PropTypes from 'prop-types';

import './style.scss'
import Button from 'Components/Button'
import Icon from 'Components/Icon'

const InputField = ({value, disabled, editable},openCalendar) => {
    return (
        <div className="date-input-field">
            <span className="date-output">{value}</span>
            {editable?(<Button onClick={openCalendar} bsSize="xsmall" disabled={disabled} className="calendar-toggle-button">
                <Icon name="ion-edit"/>
            </Button>):''}
        </div>
    );
};

InputField.propTypes = {
    
};

export default InputField;