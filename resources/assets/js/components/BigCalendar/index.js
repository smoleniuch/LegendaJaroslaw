import BigCalendar from 'react-big-calendar';
import React, { Component } from 'react';
import classNames from 'classnames'
import moment from 'moment';
import pl from 'moment/locale/pl';
import Event from './Event';
import Toolbar from './Toolbar';
import './style.scss'
 

moment.locale('pl')
console.log(moment.locale())
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);


class Calendar extends Component {

  render() {

    var {displayAllDayRow, className, ...props} = this.props

    className = classNames(className, {

      'without-all-day-row':!displayAllDayRow

    })

    return (
      <BigCalendar
        step={60}
        className={className}
        defaultDate={new Date()}
        defaultView='week'
        startAccessor='start'
        endAccessor='end'
        messages={{

          previous:'poprzedni',
          next:'następny',
          today:'dziś',
          week:'tydzień',
          day:'dzień',
          month:'miesiąc',
          date:'data',
          time:'godzina',
          event:'wydarzenie'


        }}
        components={{

          event:Event,

        }}
        {...props}/>
    );
  }

}

Calendar.defaultProps = {
  displayAllDayRow: false,
};

export default Calendar;
