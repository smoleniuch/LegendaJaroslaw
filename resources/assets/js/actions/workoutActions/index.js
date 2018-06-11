import * as types from "./types";

export function addWorkouts(data){

  return {
    type: types.ADD_WORKOUTS_REQUEST,
    payload: {
      request: {
        url: `/workouts`,
        method: "post",
        data
      },
      notify:{
        success:{
          message:'Dodawanie treningów powiodło się'
        },
        error:{
          message:'Dodawanie treningów nie powiodło się'
        }
      }
    }
  };

}

export function cancelWorkout(id, data) {
  return {
    type: "CANCEL_WORKOUT_REQUEST",
    payload: {
      request: {
        url: `/workouts/${id}/cancel`,
        method: "post",
        data
      }
    }
  };
}

export function undoWorkoutCancel(id, data) {
  return {
    type: "UNDO_CANCEL_WORKOUT_REQUEST",
    payload: {
      request: {
        url: `/workouts/${id}/cancel/undo`,
        method: "post",
        data
      }
    }
  };
}

export function editWorkout(id, data) {
  return {
    type: types.EDIT_WORKOUT_REQUEST,
    payload: {
      request: {
        url: `/workouts/${id}/edit`,
        method: "post",
        data
      }
    }
  };
}

export function deleteWorkout(id) {
  return {
    type: types.DELETE_WORKOUT_REQUEST,
    payload: {
      request: {
        url: `/workouts/${id}`,
        method: "delete",
      }
    }
  };
}
