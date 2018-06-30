import _get from "lodash/get";

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

export function deleteWorkouts(ids = []) {
  return {
    type: types.DELETE_WORKOUTS_REQUEST,
    payload: {
      request: {
        url: `/workouts/delete`,
        method: "post",
        data:{
          ids,
        }
      },
      notify:{
        success:{
          message:(r) => `Pomyślnie usunięto ${_get(r,'data.success.length')} treningi`,
          display:(r) => _get(r,'data.success.length', 0) > 0,
        },
        error:{
          message:(r) => `Usuwanie ${_get(r,'data.error.length')} treningów nie powiodło się`
        }

      }
    }
  };
}

export function editWorkouts(values, ids = []) {
  return {
    type: types.EDIT_WORKOUTS_REQUEST,
    payload: {
      request: {
        url: `/workouts/bulk-edit`,
        method: "post",
        data:{
          values,
          ids
        }
      },
      notify:{
        success:{
          message:(r) =>{ 

            var successfullEdits = Object.keys(_get(r,'data.success', {})).length

            return `Pomyślnie zedytowano ${successfullEdits} ${successfullEdits === 1?'trening':'treningów'}`
          },
        },
        error:{
          message:(r) =>{ 

            var unsuccessfullEdits = _get(r,'data.error.length', ids.length)

            return `Edycja ${unsuccessfullEdits} ${unsuccessfullEdits === 1?'treningu':'treningów'} zakończyła się niepowodzeniem`
          },
        }

      }
    }
  };
}
