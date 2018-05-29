import React, { Component } from 'react';
import { Widget, addResponseMessage, renderCustomComponent } from 'react-chat-widget';
import {connect} from 'react-redux'
import {addChatMessage, resetNewMessagesCount} from 'Actions/chatActions'
import moment from 'moment'
import ResponseMessage from './ResponseMessage';
import DateDivider from './DateDivider';
import './style.scss'

const mapStateToProps = state => ({
    initialMessages:state.chat.initialMessages,
    newMessagesAmount:state.chat.newMessagesCount,
})



const renderResponseMessage = (props) => {
    renderCustomComponent(ResponseMessage, props, true)
}

class ChatWidget extends Component {
    render() {
        return (
            
            <div onClick={this.props.resetNewMessagesCount}>
            <Widget badge={this.props.newMessagesAmount} subtitle='' title="Czat" senderPlaceHolder='Napisz wiadomość...' handleNewUserMessage={this.handleNewMessage}/>
            </div>
        );
    }

    componentDidMount(){
        var prevDate;
        for(var msg of this.props.initialMessages){
            var currentDate = moment(msg.created_at)
            if(prevDate === undefined || currentDate.isAfter(prevDate,'day') ){
                renderCustomComponent(DateDivider,{date:currentDate.format('YY-MM-DD ddd')})
                prevDate = currentDate;
            }

            renderResponseMessage(msg)
            // addResponseMessage('msg.content')
        }
    }

    handleNewMessage = (msg) => {
        this.props.addChatMessage(msg)
    }

    onWidgetClick = (e) => {

    }
}



export {
    renderResponseMessage
}

export default connect(mapStateToProps, {addChatMessage,resetNewMessagesCount})(ChatWidget);