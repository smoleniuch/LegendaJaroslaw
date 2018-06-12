import _keyBy from "lodash/keyBy";

import * as types from "Actions/postActions/types";

const initialState = {
  filter: "",
  lastPostChunk: 0,
  isFetching: false,
  posts: {}
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_POSTS_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };

    case types.ADD_POST_REQUEST_SUCCESS:
    case types.UPDATE_POST_REQUEST_SUCCESS:
      var post = action.payload.data;
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post
        }
      };

    case types.FETCH_POSTS_REQUEST:
      var posts = action.payload.data;
      return {
        ...state,
        isFetching: true
      };

    case types.FETCH_POSTS_REQUEST_SUCCESS:
      var posts = action.payload.data;
      return {
        ...state,
        lastPostChunk: state.lastPostChunk + 1,
        isFetching: false,
        posts: {
          ...state.posts,
          ...posts
        }
      };

    case types.FETCH_POSTS_REQUEST_FAIL:
      var posts = action.payload.data;
      return {
        ...state,
        isFetching: false
      };

    case types.DELETE_POST_REQUEST_SUCCESS:
      var id = action.meta.previousAction.payload.request.url.split("/").pop();

      var posts = { ...state.posts };
      delete posts[id];

      return {
        ...state,
        posts
      };
  }

  return state;
}
