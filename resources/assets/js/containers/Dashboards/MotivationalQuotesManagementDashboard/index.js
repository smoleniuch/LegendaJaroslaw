import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import moment from "moment";
import _get from "lodash/get";

import Dashboard from "Components/Dashboard";
import DashboardGrid from "Components/DashboardGrid";
import WorkoutCard from "Components/cards/WorkoutCard";
import Post from "Components/Post";
import Table from "Components/Table";
import { IconButtonBarColumn } from "Components/Table/BuiltInColumns";
import Button from "Components/Button";
import Label from "react-bootstrap/lib/Label";
import CRUDTable from 'Components/CRUDTable';

import { displayModal } from "Actions/modalActions";
import {
  getMotivationalQuotes,
  getMotivationalQuoteAuthors,
  deleteMotivationalQuote,
  deleteMotivationalQuoteAuthor
} from "Actions/motivationalQuotesActions";

const mapStateToProps = state => {
  return {
    motivationalQuotes: Object.values(
      state.motivationalQuote.motivationalQuotes
    ),
    areMotivationalQuotesFetched: state.motivationalQuote.quotesFetched,
    areMotivationalQuoteAuthorsFetched: state.motivationalQuote.authorsFetched,
    motivationalQuoteAuthors: state.motivationalQuote.authors
  };
};

const mapDispatchToProps = {
  displayModal,
  getMotivationalQuotes,
  getMotivationalQuoteAuthors,
  deleteMotivationalQuote,
  deleteMotivationalQuoteAuthor
};

class MotivationalQuotesManagementDashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {
      motivationalQuotes,
      motivationalQuoteAuthors,
      areMotivationalQuotesFetched,
      areMotivationalQuoteAuthorsFetched
    } = this.props;
    var isLoading =
      !areMotivationalQuotesFetched || !areMotivationalQuoteAuthorsFetched;
    return (
      <Dashboard>
        <Dashboard.Content >
          <CRUDTable
          pivotBy={["authorId"]}          
          displayRowButtons={rowInfo => rowInfo.row.authorId !== 'null'}
          onAdd={this.onAddButtonClick}
          onDelete={this.onDeleteButtonClick}
          onAggregatedDelete={this.onAuthorDeleteClick}
          onEdit={this.openEditMotivationalQuoteModal}
          data={isLoading ? [] : motivationalQuotes}
          collapseOnDataChange={false}
          loading={isLoading}
          columns={[
            {
              Header: "Autorzy",
              columns: [
                {
                  PivotValue: row =>
                    _get(motivationalQuoteAuthors, `${row.value}.name`, "Nieznany"),
                  Header: "Autor",
                  id: "authorId",
                  accessor: "author_id",
                  filterable: true,
                  filterMethod:({value}, {authorId}, column) => {
                    var authorName = _get(motivationalQuoteAuthors,`${authorId}.name`)
                    var regexp = new RegExp(_.escapeRegExp(value),'i');

                    return regexp.test(authorName)
                  }
                }
              ]
            },
            {
              Header: "Cytaty",
              columns: [
                {
                  Header: "Cytat",
                  accessor: "text",
                  filterable: true,
                //   filterAll:true,
                  aggregate: vals => vals.length,
                  filterMethod:({value}, row, column) => {

                    if(row._aggregated){return true}

                    var regexp = new RegExp(_.escapeRegExp(value),'i');

                    return regexp.test(row.text)
                  }
                },
              ]
            }
          ]}
          />

        </Dashboard.Content >
        
      </Dashboard>
    );
  }
  componentDidMount() {
    this.props.getMotivationalQuotes();
    this.props.getMotivationalQuoteAuthors();
  }
  shouldComponentUpdate(nextProps) {
    const changedProps = _.reduce(
      this.props,
      function(result, value, key) {
        return _.isEqual(value, nextProps[key]) ? result : result.concat(key);
      },
      []
    );
    return changedProps.length !== 0;
  }

  onAuthorDeleteClick = () => {};

  onDeleteButtonClick = (motivationalQuote, { row, aggregated }) => {
    var authorId = _get(row, "authorId");
    var afterConfirmPromiseGenerator = () =>
      aggregated
        ? this.props.deleteMotivationalQuoteAuthor(authorId)
        : this.props.deleteMotivationalQuote(motivationalQuote.id);

    this.props.displayModal("ConfirmationModalContent", {
      question: aggregated
        ? "Czy chcesz usunąć wybranego autora i jego cytaty?"
        : "Czy chcesz usunąć wybrany cytat?",
      afterConfirmPromiseGenerator
    });
  };

  onAddButtonClick = _ => {
    this.props.displayModal("UpdateMotivationalQuoteContent", {
      mode: "insert"
    });
  };

  openEditMotivationalQuoteModal = (motivationalQuote, { aggregated, row }) => {
    var authorId = _get(row, "authorId");
    var author = this.props.motivationalQuoteAuthors[authorId];

    if (aggregated) {
      this.props.displayModal("EditMotivationalQuoteAuthorContent", {
        author
      });
    } else {
      this.props.displayModal("UpdateMotivationalQuoteContent", {
        mode: "update",
        motivationalQuote
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  MotivationalQuotesManagementDashboard
);
