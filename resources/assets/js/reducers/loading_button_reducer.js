import _keyBy from 'lodash/keyBy'

import * as types from "Actions/loadingButtonActions/types";

const initialState = {}

export default function loadingButtonReducer(state = initialState, action){

  switch(action.type){

    case types.SHOW_LOADING:

    return {
        ...state,
        [scope]:1,
    }

    case types.HIDE_LOADING :

    var loadingButtons = {...state}

    delete loadingButtons[action.payload.scope]

    return loadingButtons

  }

  return state

}
