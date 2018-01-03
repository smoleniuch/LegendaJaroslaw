import React, {Component} from 'react';
import { connect } from 'react-redux'
import Dashboard from 'Components/Dashboard'
import BigCalendar from 'Components/BigCalendar'
import { getCalendarEvents } from 'Actions/calendar_actions'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const mapStateToProps = (state) => {

  return {

    events:state.calendar.events

  }

}

class TrainingsDashboard extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    // var events = [
    //
    //   {
    //     'title': 'Trening',
    //     'start':new Date(2015, 3, 17, 5, 30, 0),
    //     'end': new Date(2015, 3, 17, 22, 0, 0)
    //   }
    //
    // ]

    var { events } = this.props
    return (<Dashboard className="trainings-dashboard">

      <BigCalendar
        step={60}
        events={events}
        defaultDate={new Date()}
        startAccessor='start'
        endAccessor='end'/>

    </Dashboard>);
  }

  componentDidMount(){

    this.props.getCalendarEvents()

  }

}

export default connect(mapStateToProps,{getCalendarEvents})(TrainingsDashboard);
