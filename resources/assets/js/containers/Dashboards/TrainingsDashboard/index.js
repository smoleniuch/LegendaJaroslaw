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

    var { events, ...props } = this.props

    return (<Dashboard className="trainings-dashboard">

      <BigCalendar
        events={events}/>

    </Dashboard>);
  }

  componentDidMount(){

    this.props.getCalendarEvents()

  }

}

export default connect(mapStateToProps,{getCalendarEvents})(TrainingsDashboard);
