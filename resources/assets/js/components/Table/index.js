import ReactTable from "react-table";
import selectTableHoc from 'react-table/lib/hoc/selectTable'
import {ReactTableDefaults} from "react-table";
import _transform from 'lodash/transform';
import _without from 'lodash/without';
import "react-table/react-table.css";
import "./style.scss";
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import Icon from 'Components/Icon'

import React, { Component } from "react";
const SelectReactTable = selectTableHoc(ReactTable);

class Table extends Component {

  state = {
    selections:{}
  }

  render() {

    const Table = this.props.selectTable?SelectReactTable:ReactTable

    return (
      <div className="custom-react-table-container">

        <ButtonGroup bsSize="medium" className="button-bar-container">
            {this.props.topButtons.map(button => {
              var {label,iconName,type,DropdownBody,onClick, ...buttonProps} = button
              var icon = iconName?<Icon size={18} name={iconName} />:''

              if(type === 'dropdown') {
                return <DropdownButton title={label} {...buttonProps}><DropdownBody data={this.props.data} selections={this.state.selections} updateSelection={this.updateSelection}/></DropdownButton>
              }
              return <Button onClick={() => onClick(this.selectedIds)} {...buttonProps}>{label} {icon}</Button>

            })}
        </ButtonGroup>
          
        <Table toggleSelection={this.toggleSelection} isSelected={this.isSelected} {...this.props}/>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState){
    var deletedIds = Object.keys(this.state.selections).filter(id => !this.props.data.some(row => row.id == id))

    if(deletedIds.length > 0){
      this.setState(prevState => {
        var selections = {...prevState.selections}
        for(var id of deletedIds){delete selections[id]}
        return {
          selections
        }
      })
    }

  }

  get selectedIds(){

    return _transform(this.state.selections, (total, selected, id) => {
      selected?total.push(id):null
    }, [])

  }

  toggleSelection = id => {
    this.setState(prevState => ({
      selections:{
        ...prevState.selections,
        [id]:!prevState.selections[id]
      }
    }))
  }

  updateSelection = (selections) => {
    this.setState({selections})
  }

  isSelected = id => {
    return this.state.selections[id]
  }
}

Table.defaultProps = {
  keyField:'id',
  defaultPageSize:10,   
  previousText:"Poprzednia",
  nextText:"Następna",
  loadingText:"Wczytuje...",
  noDataText:"Brak",
  pageText:"Strona",
  ofText:"z",
  rowsText:"rzędów",
  selectType:"checkbox",  
  topButtons:[],
  selectTable:false,
  selectAll:false,
}

export default Table;
