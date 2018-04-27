import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Panel from 'react-bootstrap/lib/Panel'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import Bar from './Bar'
class AccordionOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {

      activeKey:'1'

    };
  }

  render() {
    var { options, id, children  } = this.props
    return (
      <PanelGroup id={id}>

        {options.map((option, i)=>{

          return (
            <Panel bsStyle="primary" eventKey={i}>
              <Panel.Heading>
                <Panel.Title toggle>{option.title}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>Panel content {i}</Panel.Body>
            </Panel>
          )

        })}
        {children}
      </PanelGroup>
    );
  }


  onClick(){

  }
}

AccordionOptions.defaultProps = {

  options:[],

}
AccordionOptions.propTypes = {
  id:PropTypes.any.isRequired
}

AccordionOptions.Bar = Bar

export default AccordionOptions;
