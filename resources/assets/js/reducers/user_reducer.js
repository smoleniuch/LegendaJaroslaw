const initialState = {

  isLoggedIn:false,

}

export default function userReducer(state = initialState, action){

  switch (action.type){

    case 'SET_USER':

      return {
        ...state,
        isLoggedIn:true,
        ...action.payload.data,


      }

    case 'REGISTER_USER_REQUEST_SUCCESS':

      return {

        ...state,
        isLoggedIn:true,
        ...action.payload.data

      }

    case 'LOGIN_ATTEMPT_REQUEST_SUCCESS':

      return {

        ...state,
        isLoggedIn:true,
        ...action.payload.data,

      }

    case 'LOG_OUT_SUCCESS':

      return {
        isLoggedIn:false
      }


  }

  return state
}
