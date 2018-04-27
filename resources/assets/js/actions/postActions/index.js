import * as types from './types' 

export function updatePostsFilter(filter){

  return {

    type:types.UPDATE_POSTS_FILTER,
    payload:{

      filter,

    }


  }

}

export function addPost(data){

  return {

    type:types.ADD_POST_REQUEST,
    payload:{

      request:{
       method:'post',
       url:'/posts',
       data 
      },

      notify:{
        success:{message:'Post został dodany.'},
        error:{message:'Post nie został dodany.'}
      }

    }


  }

}
