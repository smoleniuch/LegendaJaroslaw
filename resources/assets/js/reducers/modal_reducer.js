import _get from 'lodash/get'
import _set from 'lodash/set'

const initialState = {
  modals:{}
}

function modalReducer(state = initialState,action){

  switch (action.type){

    case 'DISPLAY_MODAL':

    var modal = _get(state, `modals.${action.payload.content}`)
    // create if it doesnt exists
    if (modal === undefined){

      modal = {

        show:true,
        content:action.payload.content,
        ...action.payload.modalProps
      }

    }

    else {

      _set(state, `modals.${action.payload.content}.show`, true)

    }

      return {
        ...state,
        modals:{
          ...state.modals,
          [action.payload.content]:modal
        }
      }

    case 'HIDE_MODAL':

      var modal = _get(state, `modals.${action.payload.content}`)
      return {
        ...state,
        modals:{
          ...state.modals,
          [action.payload.content]:{
            ...modal,
            show:false,
          }
        }
      }
    case 'DELETE_MODAL':

      var stateCopy = {...state}

      delete stateCopy.modals[action.payload.content]

      return stateCopy

  }

  return state

}


export default modalReducer
