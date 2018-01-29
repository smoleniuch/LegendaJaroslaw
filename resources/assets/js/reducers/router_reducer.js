import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
  location: null,
  prevLocation:null
};

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
export default function routerReducer(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    return {
      ...state,
      location: payload,
      prevLocation:state.location,
     };
  }

  return state;
}
