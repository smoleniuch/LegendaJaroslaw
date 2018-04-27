import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField'

class DateTime extends Component {
    render() {

        var { onChange, name, ...props } = this.props

        return (
            <Datetime onChange={this.onChange} {...props}/>
        );
    }

    onChange = (v) => {
        this.props.onChange(v.format('YYYY-MM-DD HH:mm:ss'), this.props.name)
    }
}

DateTime.defaultProps = {
    editable:false,
    onChange:() => {},
    timeFormat:'HH:mm:ss',
    dateFormat:'YYYY-MM-DD',
    renderInput:InputField
};

export default DateTime;