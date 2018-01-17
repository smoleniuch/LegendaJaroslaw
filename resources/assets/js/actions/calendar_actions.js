import _mapValues from 'lodash/mapValues'

export function getCalendarEvents(prop) {

  return {

    type: 'GET_CALENDAR_EVENTS',
    payload: {

      request: {

        url: '/calendar-events',
        transformResponse: (data) => {

          return data.map((calendarEvent) => {
            // transform string date into javascript date object
            return _mapValues(
              calendarEvent, (v, k) => ['start', 'end'].includes(k)
              ? new Date(v)
              : v)

          })

        }

      }

    }

  }

}
