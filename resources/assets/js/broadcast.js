import SocketClient from 'socket.io-client';
import Echo from "laravel-echo"
import store from './store'
import {renderResponseMessage} from 'Components/ChatWidget'
import {increaseNewMessagesCount} from 'Actions/chatActions'

window.io = SocketClient;
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});


window.Echo.channel('chat')
    .listen('NewChatMessage', ({message}) => {

        store.dispatch(increaseNewMessagesCount());
        renderResponseMessage(message)

    })

const getSocketId = () => window.Echo.socketId();

export {
    getSocketId
}