import React from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import PropTypes from "prop-types";

import { Form, FieldGroup } from "Components/Form";
import { Content, Body } from "Components/Modal";
import LoadingButton from "Components/LoadingButton";
import {
  updateMotivationalQuote,
  addMotivationalQuote
} from "Actions/motivationalQuotesActions";

const mapStateToProps = state => {
  return {
    authorOptions: Object.values(state.motivationalQuote.authors).map(
      author => ({ label: author.name, value: author })
    )
  };
};

class UpdateMotivationalQuoteContent extends React.Component {
  constructor(props) {
    super(props);

    var preSelectedAuthorId = _get(this.props, "motivationalQuote.author_id");

    this.state = {
      quoteText: _get(this.props, "motivationalQuote.text", ""),
      selectedAuthor: preSelectedAuthorId
        ? this.props.authorOptions.find(
            option => option.value.id === preSelectedAuthorId
          )
        : null
    };
  }

  render() {
    var { mode } = this.props;

    return (
      <Content title={mode === "insert" ? "Dodaj Cytat" : "Edytuj Cytat"}>
        <Body>
          <Form>
            <FieldGroup
              isValidNewOption={(inputValue, selectedOption)  => inputValue !== '' && !selectedOption.some(option => option.value.name === inputValue)}
              getOptionValue={option => option.value.name}
              onCreateOption={this.handleAuthorCreation}
              creatable
              value={this.state.selectedAuthor}
              onChange={this.onAuthorChange}
              options={this.props.authorOptions}
              label="Autor"
              componentClass="select"
            />

            <FieldGroup
              value={this.state.quoteText}
              input={{ onChange: this.onQuoteTextChange }}
              name="quote"
              label="Cytat"
              componentClass="textarea"
            />
          </Form>

          <div className="text-right" style={{ marginTop: "10px" }}>
            <LoadingButton
              label={mode === "insert" ? "Dodaj" : "Edytuj"}
              loadingLabel={mode === "insert" ? "Dodaje..." : "Edytuje..."}
              isLoading={this.props.activeRequest}
              bsStyle="primary"
              onClick={mode === "insert" ? this.addQuote : this.updateQuote}
            />
          </div>
        </Body>
      </Content>
    );
  }

  handleAuthorCreation = inputValue => {
    this.setState({
      selectedAuthor: {
        label: inputValue,
        value:  { name: inputValue },
      }
    });
  };

  onAuthorChange = selectedAuthor => {
    this.setState({ selectedAuthor });
  };

  onQuoteTextChange = e => {
    this.setState({ quoteText: e.target.value });
  };

  updateQuote = () => {
    return this.props.dispatchByModal(
      updateMotivationalQuote(this.props.motivationalQuote.id, {
        text: this.state.quoteText,
        author: _get(this.state, "selectedAuthor.value", null)
      })
    );
  };

  addQuote = () => {
    return this.props.dispatchByModal(
      addMotivationalQuote({
        text: this.state.quoteText,
        author: _get(this.state, "selectedAuthor.value", null),
      })
    );
  };
}

UpdateMotivationalQuoteContent.defaultProps = {
  mode: "update"
};

UpdateMotivationalQuoteContent.propTypes = {
  mode: PropTypes.oneOf(["update", "insert"])
};

UpdateMotivationalQuoteContent = connect(mapStateToProps)(
  UpdateMotivationalQuoteContent
);

export { UpdateMotivationalQuoteContent };
