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
      var post = action.payload.data
      return {

        ...state,
        posts:{
          ...state.posts,
          [post.id]:post
        }

      }
  }

  return state

}
