import BigCalendar from 'react-big-calendar';
import React, { Component } from 'react';
import classNames from 'classnames'
import moment from 'moment';
import './style.scss'

moment.locale('pl')

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
      <BigCalendar className={className} {...props}/>
    );
  }

}

Calendar.defaultProps = {
  displayAllDayRow: false,
};

export default Calendar;
