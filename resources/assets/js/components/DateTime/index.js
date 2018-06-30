import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField'

class DateTime extends Component {
    render() {

        var { onChange, name, inputProps, ...props } = this.props

        return (
            <Datetime onChange={this.onChange} inputProps={this.mergedInputProps(inputProps)} {...props}/>
        );
    }

    onChange = (v) => {

        if(v === null){
            return this.props.onChange(null, this.props.name)
        }

        var outputFormat = `${this.props.dateFormat?this.props.dateFormat:''} ${this.props.timeFormat?this.props.timeFormat:''}`.replace(/^ | $/,'')
        
        this.props.onChange(v.format(outputFormat), this.props.name)
    }

    mergedInputProps = inputProps => ({
     ...inputProps,
     removable:this.props.removable,
     resetValue:this.resetValue,
    })
    
    resetValue = _ => {
        this.onChange(null)
    }
}

DateTime.defaultProps = {
    editable:true,
    removable:false,
    onChange:() => {},
    timeFormat:'HH:mm:ss',
    dateFormat:'YYYY-MM-DD',
    renderInput:InputField
};

export default DateTime;