import * as types from 'Actions/workoutActions/types'
const initialState = {

  workouts:{},
  workoutTemplates:{},

}

export default function workoutReducer(state = initialState, action){

  switch (action.type){
    case 'CANCEL_WORKOUT_REQUEST_SUCCESS':
    case 'UNDO_CANCEL_WORKOUT_REQUEST_SUCCESS':
    case 'EDIT_WORKOUT_REQUEST_SUCCESS':
    var workout = action.payload.data
    return {
      ...state,
      workouts:{
        ...state.workouts,
        [workout.id]:workout
      }
    }

    case types.DELETE_WORKOUT_REQUEST_SUCCESS:

    var workoutId = action.meta.previousAction.payload.request.url.split('/').pop();
    var workouts = {...state.workouts}

    delete workouts[workoutId];

    return {
      ...state,
      workouts
    }

    case types.ADD_WORKOUTS_REQUEST_SUCCESS:

    var workouts = action.payload.data

    return {
      ...state,
      workouts:{
        ...state.workouts,
        ...workouts
      }
    }

  }

  return state

}
