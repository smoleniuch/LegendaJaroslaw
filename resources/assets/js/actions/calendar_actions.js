import _mapValues from 'lodash/mapValues'

export function getCalendarEvents(prop) {

  return {

    type: 'GET_CALENDAR_EVENTS',
    payload: {

      request: {

        url: '/calendar-events',
        transformResponse: (data) => {
          console.log(data.length)
          return data.map((calendarEvent) => {
            // transform string date into javascript object
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
