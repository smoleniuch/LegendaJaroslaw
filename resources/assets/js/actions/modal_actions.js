export function displayModal(name){

  return {

    type:'DISPLAY_MODAL',
    payload:{

      name,

    }

  }

}

export function deleteModal(name){

  return {

    type:'DELETE_MODAL',
    payload:{

      name,

    }

  }

}

export function hideModal(name, deleteIt = true){

  return (dispatch) => {

    var promise = new Promise((resolve, reject) => {

      dispatch({

        type:'HIDE_MODAL',
        payload:{

          name,

        }

      })

      setTimeout(() => {

        resolve()
        if(deleteIt){dispatch(deleteModal(name))}

      }, 300)

    })

    return promise
  }


}
