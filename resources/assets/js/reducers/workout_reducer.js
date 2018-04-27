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

  }

  return state

}
