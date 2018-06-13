import React from 'react';
import ReactLoading from 'react-loading'
import Fade from 'react-bootstrap/lib/Fade'

import './style.scss'

const LoadingIndicator = ({active, ...props}) => {
    return (
        <div className="loading-indicator-container">
        <Fade in={active}>
            <ReactLoading {...props}/>
        </Fade>
        </div>
    );
};


LoadingIndicator.defaultProps = {
    type:'spinningBubbles',
    active:true,
    color:'white',
}
export default LoadingIndicator;