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

    case types.DELETE_WORKOUTS_REQUEST_SUCCESS:

    var workoutsIds = action.payload.data.success || [];
    var workouts = {...state.workouts}

    for(var id of workoutsIds){ delete workouts[id]}

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

    case types.EDIT_WORKOUTS_REQUEST_SUCCESS:

    var workouts = action.payload.data.success

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
