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

        var outputFormat = `${this.props.dateFormat?this.props.dateFormat:''} ${this.props.timeFormat?this.props.timeFormat:''}`.replace(/^ | $/,'')
        
        this.props.onChange(v.format(outputFormat), this.props.name)
    }
}

DateTime.defaultProps = {
    editable:true,
    onChange:() => {},
    timeFormat:'HH:mm:ss',
    dateFormat:'YYYY-MM-DD',
    renderInput:InputField
};

export default DateTime;