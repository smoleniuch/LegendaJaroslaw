import React, { Component } from 'react';
import { connect } from 'react-redux';
import {displayModal} from 'Actions/modalActions'
import {deletePost} from 'Actions/postActions'
import Button from 'Components/Button'
import Icon from 'Components/Icon'
import './style.scss'

const mapDispatchToProps = (dispatch, {post}) => ({
    displayEditPostModal:_ => dispatch(displayModal('EditPostContent',{post})),
    displayDeletionConfirmation: _ => {

        var afterConfirmPromiseGenerator = _ => dispatch(deletePost(post.id))

        dispatch(displayModal('ConfirmationModalContent',{question:'Napewno chcesz usunąć ten post?', afterConfirmPromiseGenerator}))
    },
})

class MenuBar extends Component {
    render() {
        return (
            <div className="post-menu-bar">

                    <Icon onClick={this.props.displayEditPostModal} title="Edytuj" role="button" size={22} name="ion-edit"/>
                    
                    <Icon onClick={this.props.displayDeletionConfirmation} title="Usuń" role="button" size={22} name="ion-android-delete"/>

            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
)(MenuBar);