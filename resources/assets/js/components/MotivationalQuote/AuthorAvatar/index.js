import React from 'react';
import Image from 'react-image-resizer'
import _get from 'lodash/get'

import './style.scss'
import UnknownAuthorAvatar from 'Images/unknown_motivational_quote_author_avatar.png'

const AuthorAvatar = ({name, displayName, avatarUrl}) => {


    return (
        <div className="motivational-quote-author-avatar">
            <Image height={100} width={100} className="avatar" src={avatarUrl} style={{margin:'auto'}}/>
            {displayName?<div className="name">{name}</div>:''}
            
        </div>
    );
};

AuthorAvatar.defaultProps = {
    displayName:true,
    name:'',
    avatarUrl:'',
}

export default AuthorAvatar; 