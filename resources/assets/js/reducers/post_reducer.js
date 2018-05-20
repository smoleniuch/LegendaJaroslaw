import _keyBy from 'lodash/keyBy'

import * as types from "Actions/postActions/types";

const initialState = {

  filter:'',
  posts:{}

}

export default function postReducer(state = initialState, action){

  switch(action.type){

    case types.UPDATE_POSTS_FILTER:

      return {

        ...state,
        filter:action.payload.filter

      }

    case types.ADD_POST_REQUEST_SUCCESS:
    case types.UPDATE_POST_REQUEST_SUCCESS:
      var post = action.payload.data
      return {

        ...state,
        posts:{
          ...state.posts,
          [post.id]:post
        }

      }

    case types.DELETE_POST_REQUEST_SUCCESS:

      var id = action.meta.previousAction.payload.request.url.split('/').pop();

      var posts = {...state.posts}
      delete posts[id]

      return {
        ...state,
        posts,
      }
  }

  return state

}
