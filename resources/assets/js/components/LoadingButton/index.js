import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../Button'



class LoadingButton extends Component {
    render() {

        var {label, loadingLabel, isLoading , ...props} = this.props

        return (
            <Button disabled={isLoading} {...props}>{isLoading?loadingLabel:label}</Button>
        );
    }
}

export default LoadingButton;