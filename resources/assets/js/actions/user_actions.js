export function setUser(data = {}) {

  return {type: 'SET_USER', payload: data}

}



export function getCurrentUserData(){

  return {

    type:'GET_CURRENT_USER_DATA',
    payload:{

      request:{

        url:'/get-current-user-data'

      }

    }

  }

}

export function registerUser(data) {

  return {

    type: 'REGISTER_USER_REQUEST',
    payload: {

      request: {
        url: '/register',
        method: 'post',
        data

      },
      options:{

        returnRejectedPromiseOnError:true,

      }

    }

  }

}


export function loginAttempt(email, password, rememberMe = true) {

  return {

    type: 'LOGIN_ATTEMPT_REQUEST',
    payload: {
      request: {

        method: 'post',
        url: '/login',
        data: {
          email,
          password,
          rememberMe
        },

      },
      options:{
        returnRejectedPromiseOnError:true,

      },
    }

  }

}
export function logOut() {

  return {

    type: 'LOG_OUT',
    payload: {
      request: {

        method: 'post',
        url: '/logout'

      }

    }

  }

}
