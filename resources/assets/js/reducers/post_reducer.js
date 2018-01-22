const initialState = {

  filter:'',
  posts:[]

}

export default function postReducer(state = initialState, action){

  switch(action.type){

    case 'UPDATE_POSTS_FILTER':

      return {

        ...state,
        filter:action.payload.filter

      }

  }

  return state

}
