import * as types from 'Actions/activeRequestActions/types'
const initialState = {}
  
  const activeRequestReducer = function(state = initialState, action) {
  
    switch (action.type) {
  
      case types.ADD_REQUEST:
        return {
            ...state,
            [action.payload.scope]:true
        }
  
      case types.REMOVE_REQUEST:
        var requestsCopy = {...state}
        delete requestsCopy[action.payload.scope]

        return requestsCopy
  
    }
  
    return state;
  
  }
  
  export default activeRequestReducer;
  