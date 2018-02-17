

export function cancelWorkout(id, data){

  return {
    type:'CANCEL_WORKOUT_REQUEST',
    payload:{

      request:{
        url:`/workouts/${id}/cancel`,
        method:'post',
        data
      }

    }
  }

}

export function undoWorkoutCancel(id, data){

  return {
    type:'UNDO_CANCEL_WORKOUT_REQUEST',
    payload:{

      request:{
        url:`/workouts/${id}/cancel/undo`,
        method:'post',
        data
      }

    }
  }

}
