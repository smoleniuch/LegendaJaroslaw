import React from 'react';
import _isEqual from 'lodash/isEqual'
import _get from 'lodash/get'
import DateTime from 'Components/DateTime'
import './style.scss'

class DateTimeSpan extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            from:this.props.fromTimePickerProps.defaultValue,
            to:this.props.toTimePickerProps.defaultValue,
        }
    }

    componentDidUpdate(_, prevState){

        if(!_isEqual(prevState, this.state)){
            this.props.onChange(this.state)
        }

    }

    render(){
        var {label, fromTimePickerProps, toTimePickerProps} = this.props
        return (
<div className="date-time-span-container">

            <div className="pickers-container">

            <span className="">
                Od
            </span>
                <DateTime
                    

                    {...fromTimePickerProps}
                    name="from"
                    onChange={this.onChange}
                    value={_get(this.props,'value.from')}
                  />
            <span className="">
               Do
            </span>
                <DateTime
                    

                    {...toTimePickerProps}
                    name="to"
                    value={_get(this.props,'value.to')}
                    
                    onChange={this.onChange}
                  />
            </div>

        </div>
        )
    }

    onChange = (date, name) => {
        this.props.onChange({
            ...this.props.value,
            [name]:date,
        })
    }

    reset = () => {
      this.props.onChange({
          from:null,
          to:null,
      })
    }

}

DateTimeSpan.defaultProps = {
    value:{},
    label:'',
    fromTimePickerProps:{},
    toTimePickerProps:{},
}

export default DateTimeSpan;