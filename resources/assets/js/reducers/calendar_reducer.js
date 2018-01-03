const initialState = {
  isFetching: false,
  events: []
}

const calendarReducer = function(state = initialState, action) {

  switch (action.type) {

    case 'GET_CALENDAR_EVENTS':
      return Object.assign({}, state, {isFetching: true});

    case 'GET_CALENDAR_EVENTS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        events: action.payload.data
      });

  }

  return state;

}

export default calendarReducer;
