import * as types from './types' 

export function updatePostsFilter(filter){

  return {

    type:types.UPDATE_POSTS_FILTER,
    payload:{

      filter,

    }


  }

}

export function updatePost(post){

  return {
    type:types.UPDATE_POST_REQUEST,
    payload:{
      request:{
        method:'put',
        url:`/posts/${post.id}`,
        data:post,
      },
      notify:{
        success:{
          message:'Edycja zakończyła się sukcesem'
        },
        error:{
          message:'Edycja nie powiodła się'
        }
      }
    }
  }

}

export function deletePost(id){

  return {
    type:types.DELETE_POST_REQUEST,
    payload:{
      request:{
        method:'delete',
        url:`/posts/${id}`
      },
      notify:{
        success:{
          message:'Post został usunięty'
        },
        error:{
          message:'Usuwanie postu nie powiodło się'
        }
      }
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
