import React, {
    Component
} from 'react';
import _get from 'lodash/get'
import moment from 'moment'
import {
    Form,
    Field,
    FieldGroup,
    reduxForm,
    
} from "Components/Form"
import DateTimeSpan from "Components/DateTimeSpan"
import Button from "Components/Button"
import ToggleButton from "react-bootstrap/lib/ToggleButton"
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup"
import SwitchButton from "Components/SwitchButton"
import Checkbox from "react-bootstrap/lib/Checkbox"
import ControlLabel from "react-bootstrap/lib/ControlLabel"

class SelectButtonDropdownBody extends Component {
    constructor(props) {
        super(props)

        this.state = {
            all:false,
        }

        this.setSelections = this.handleSelection.bind(this, 'select')
        this.unsetSelections = this.handleSelection.bind(this, 'unselect')
    }

    render() {
        return (

            <Form   style={{minWidth:300, padding:10}}>


                    <div><ControlLabel>Wszystkie </ControlLabel> <input style={{verticalAlign:'middle',margin:'auto'}} type="checkbox" onChange={this.onSelectAllToggle} checked={this.state.all}/></div>

            <Field
                component={FieldGroup}
                fromTimePickerProps={{
                timeFormat: false,
                inputProps:{disabled:this.state.all},        
                disabled:this.state.all,
                removable:true,   
                }}
                toTimePickerProps={{
                timeFormat: false,
                inputProps:{disabled:this.state.all},     
                removable:true,      
                }}
                componentClass='dateTimeSpan'
                label="Przedział Czasowy"
                name="dateSpan"/>
            <Field
                component={FieldGroup}
                fromTimePickerProps={{
                dateFormat: false,
                inputProps:{disabled:this.state.all,removable:true,},        
                disabled:this.state.all,
                removable:true,   
                }}
                toTimePickerProps={{
                removable:true,                    
                dateFormat: false,
                inputProps:{disabled:this.state.all,removable:true,},        
                }}
                componentClass='dateTimeSpan'
                label="Godzina Rozpoczęcia"
                name="beginTimeSpan"/>
            <Field
                component={FieldGroup}s
                componentClass='select'
                options={[
                    {label:'Poniedziałek', value:1},
                    {label:'Wtorek', value:2},
                    {label:'Środa', value:3},
                    {label:'Czwartek', value:4},
                    {label:'Piątek', value:5},
                    {label:'Sobota', value:6},
                    {label:'Niedziela', value:7},
                ]}
                isMulti={true}
                isDisabled={this.state.all}
                closeMenuOnSelect={false}
                label="Dni Tygodnia"
                name="dayOfWeeks"/>

            <div style={{
                 display: 'flex',
                 justifyContent: 'space-between'
                 }}>
                 <Button bsSize="small" onClick={this.props.handleSubmit(this.unsetSelections)}>Odznacz</Button>
                    
                 <Button bsSize="small" bsStyle="primary" onClick={this.props.handleSubmit(this.setSelections)}>Zaznacz</Button>
                 </div>
        </Form>
    );

    }

    onSelectAllToggle = () => {

        this.setState(prevState => ({all:!prevState.all}))

    }

    handleSelection = (mode,{dateSpan, dayOfWeeks, beginTimeSpan}) => {
        var { data } = this.props
        var selectedIds = {}
        
        var dateSpanFrom = _get(dateSpan, 'from')
        var dateSpanTo = _get(dateSpan, 'to')
        var beginTimeSpanFrom = _get(beginTimeSpan, 'from')
        var beginTimeSpanTo = _get(beginTimeSpan, 'to')
        var dayOfWeeks = dayOfWeeks?dayOfWeeks.map(option => option.value):[]

        for(var row of data){
            var workoutBegin = moment(row.start)
            var comparisonData = workoutBegin.clone().format('YYYY-MM-DD')
            if(
                 this.state.all ||
                (!dateSpanFrom || moment(row.start).isSameOrAfter(dateSpanFrom, 'day') ) && 
                (!dateSpanTo ||  moment(row.end).isSameOrBefore(dateSpanTo, 'day') ) &&
                (!beginTimeSpanFrom || workoutBegin.isSameOrAfter(moment(`${comparisonData} ${beginTimeSpanFrom}`)) ) && 
                (!beginTimeSpanTo ||  workoutBegin.isSameOrBefore(moment(`${comparisonData} ${beginTimeSpanFrom}`)) ) &&
                (dayOfWeeks.length === 0 || dayOfWeeks.some(dayIndex => moment(row.start).day() === dayIndex || moment(row.end).day() === dayIndex)) 
            ) {
                selectedIds[row.id] = mode === 'select'?true:false;
            }

        }


        this.props.updateSelection({...this.props.selections, ...selectedIds})

    }
}


export default reduxForm({form:'WorkoutsTableSelectorForm'})(SelectButtonDropdownBody)
