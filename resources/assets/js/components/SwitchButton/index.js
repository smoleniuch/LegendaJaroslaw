import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSwitchButton from 'react-switch-button'
import 'react-switch-button/dist/react-switch-button.css';

class SwitchButton extends Component {
    render() {

        var {onChange, name, ...props} = this.props

        return (
            <div className="switch-button-container">
                <ReactSwitchButton onChange={this.onChange} {...props}/>
            </div>
        );
    }
    onChange = (v) => this.props.onChange(v, this.props.name)
}

SwitchButton.propTypes = {

};

SwitchButton.defaultProps = {

    theme:'rsbc-switch-button-flat-square',

}

export default SwitchButton;