import * as types from './types';

export function addChatMessage(content){

    return {
        type:types.ADD_CHAT_MESSAGE_REQUEST,
        payload:{
            request:{
                url:'/chat-messages',
                method:'post',
                data:{
                    content
                }
            }
        }
    }

}

export function resetNewMessagesCount(){

    return {
        type:types.RESET_NEW_MESSAGES_COUNT,
    }

}

export function increaseNewMessagesCount(value = 1){

    return {
        type:types.INCREASE_NEW_MESSAGES_COUNT,
        payload:{
            value
        }
    }


}