import React from 'react';
import './style.scss'

const DateDivider = ({date}) => {
    return (
        <div className="chat-date-divider">
            {date}
        </div>
    );
};

export default DateDivider;