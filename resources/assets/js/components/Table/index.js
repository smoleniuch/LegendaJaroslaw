import ReactTable from "react-table";
import "react-table/react-table.css";
import "./style.scss";
import React, { Component } from "react";

class Table extends Component {
  render() {
    return (
      <div className="custom-react-table-container">
        <ReactTable
          {...this.props}
          previousText="Poprzednia"
          nextText="Następna"
          loadingText="Wczytuje..."
          noDataText="Brak"
          pageText="Strona"
          ofText="z"
          rowsText="rzędów"
        />
      </div>
    );
  }
}

export default Table;
