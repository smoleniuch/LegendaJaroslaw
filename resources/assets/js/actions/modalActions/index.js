import _isFunction from 'lodash/isFunction'
import * as types from './types'
export function displayModal(content,modalProps = {}){


  return (dispatch, getState) => {
    
    if(_isFunction(modalProps)){
      modalProps = modalProps(getState())
    }
    
    
    return dispatch({

      type:types.DISPLAY_MODAL,
      payload:{

        content,
        modalProps,
        
      }

    })

}

}

export function deleteModal(content){

  return {

    type:types.DELETE_MODAL,
    payload:{

      content,

    }

  }

}

export function hideModal(content, deleteIt = true){

  return (dispatch) => {

    var promise = new Promise((resolve, reject) => {

      dispatch({

        type:types.HIDE_MODAL,
        payload:{

          content,

        }

      })

      setTimeout(() => {

        resolve()
        if(deleteIt){dispatch(deleteModal(content))}

      }, 300)

    })

    return promise
  }


}
