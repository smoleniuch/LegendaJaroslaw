import React, {Component} from 'react';
import { connect } from 'react-redux'
import _get from 'lodash/get'

import Dashboard from 'Components/Dashboard'
import BigCalendar from 'Components/BigCalendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './style.scss'

const mapStateToProps = (state) => {

  return {

    workouts:Object.values(state.workout.workouts),
    workoutTemplates:state.workout.workoutTemplates

  }

}

class CalendarDashboard extends Component {

  constructor(props) {
    super(props);

    // this.titleAccessor = this.titleAccessor.bind(this)
    this.startAccessor = this.timeAccessor.bind(this,'start')
    this.endAccessor = this.timeAccessor.bind(this,'end')

  }

  render() {

    var { workouts, ...props } = this.props

    return (<Dashboard className="calendar-dashboard">
      <Dashboard.Content>
      <BigCalendar
        startAccessor={this.startAccessor}
        endAccessor={this.endAccessor}
        titleAccessor={'name'}
        events={workouts}/>
    </Dashboard.Content>
    </Dashboard>);
  }

  // titleAccessor(workout){

  //   return _get(this.props.workoutTemplates,`${workout.workout_template_id}.name`)

  // }

  timeAccessor(path, event){

    return new Date(_get(event,path))

  }

}

export default connect(mapStateToProps)(CalendarDashboard);
