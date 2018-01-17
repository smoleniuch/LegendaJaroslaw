import React from 'react'
import { Tabs as BootstrapTabs, Tab } from 'react-bootstrap'
import classNames from 'classnames'
import './style.scss'

class Tabs extends React.Component {

  render() {

    var { children, className, ...props } = this.props

    return (
      <BootstrapTabs className={classNames('custom-tabs-component',className)} {...props}>
        {children}
      </BootstrapTabs>
    );
  }

}

export default Tabs;

export {

  Tabs,
  Tab

}
