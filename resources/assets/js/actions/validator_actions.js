export function validateRegisterCredentials(data){

  return {
    type: 'VALIDATE_REGISTER_CREDENTIALS_REQUEST',
    payload: {

      request: {

        method: 'post',
        url: '/validate-register-credentials',
        data,
      }

    }

  }

}
