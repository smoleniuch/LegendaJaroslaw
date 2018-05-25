import ReactTable from "react-table";
import {ReactTableDefaults} from "react-table";
import "react-table/react-table.css";
import "./style.scss";
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Icon from 'Components/Icon'

import React, { Component } from "react";

class Table extends Component {
  render() {
    return (
      <div className="custom-react-table-container">

        <ButtonGroup bsSize="medium" className="button-bar-container">
            {this.props.topButtons.map(button => {
              var {label,iconName, ...buttonProps} = button
              var icon = iconName?<Icon size={20} name={iconName} />:''

              return <Button disabled={this.props.loading} {...buttonProps}>{label} {icon}</Button>

            })}
        </ButtonGroup>

        <ReactTable
          defaultPageSize={10}      
          previousText="Poprzednia"
          nextText="Następna"
          loadingText="Wczytuje..."
          noDataText="Brak"
          pageText="Strona"
          ofText="z"
          rowsText="rzędów"    
          {...this.props}
        />
      </div>
    );
  }
}

Table.defaultProps = {

  topButtons:[]

}

export default Table;
