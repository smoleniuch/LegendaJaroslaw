import _get from 'lodash/get'
import _set from 'lodash/set'

const initialState = {
  modals:{}
}

function modalReducer(state = initialState,action){

  switch (action.type){

    case 'DISPLAY_MODAL':

    var modal = _get(state, `modals.${action.payload.name}`)
    // create if it doesnt exists
    if (modal === undefined){

      modal = {

        show:true,
        name:action.payload.name,

      }

    }

    else {

      _set(state, `modals.${action.payload.name}.show`, true)

    }

      return {
        ...state,
        modals:{
          ...state.modals,
          [action.payload.name]:modal
        }
      }

    case 'HIDE_MODAL':

      var modal = _get(state, `modals.${action.payload.name}`)
      return {
        ...state,
        modals:{
          ...state.modals,
          [action.payload.name]:{
            ...modal,
            show:false,
          }
        }
      }
    case 'DELETE_MODAL':

      var stateCopy = {...state}

      delete stateCopy.modals[action.payload.name]

      return stateCopy
      
  }

  return state

}


export default modalReducer
