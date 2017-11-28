import * as types from '../actions/action-types'

const initialState = {
  prop:'test prop'
};

const searchLayoutReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.TEST_ACTION:
      return Object.assign({}, state, {
        prop: action.prop,
      });

  }

  return state;

}

export default searchLayoutReducer;
