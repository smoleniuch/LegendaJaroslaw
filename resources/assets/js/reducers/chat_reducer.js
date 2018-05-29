import * as types from "Actions/chatActions/types";
const initialState = {
    initialMessages:[],
    newMessagesCount:0,
};

const chatReducer = function(state = initialState, action) {
  switch (action.type) {
    case types.RESET_NEW_MESSAGES_COUNT:
      return {
        ...state,
        newMessagesCount:0
      };

    case types.INCREASE_NEW_MESSAGES_COUNT:
      return {
        ...state,
        newMessagesCount:state.newMessagesCount += action.payload.value
      }
  }

  return state;
};

export default chatReducer;
