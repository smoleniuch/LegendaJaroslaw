import React from 'react';
import Image from 'react-bootstrap/lib/image'
import moment from 'moment'

import Icon from 'Components/Icon';
import './style.scss'

const ResponseMessage = ({content, created_at, user_avatar_url, user_name}) => {

    var time = moment(created_at).format('hh:mm')

    return (
        <div className="custom-chat-message">
            {/* <div>{created_at}</div> */}
            <div className="avatar-container">
            <Image src={user_avatar_url} circle />
            </div>
            <div className="user-name">{user_name}</div>
            <div className="content">
                {content}

                <div className="time-container">{time}</div>
            </div>
            
        </div>
    );
};

export default ResponseMessage;
