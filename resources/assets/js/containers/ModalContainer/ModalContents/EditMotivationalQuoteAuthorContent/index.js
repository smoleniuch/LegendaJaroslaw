import React from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import PropTypes from "prop-types";

import { Form, FieldGroup } from "Components/Form";
import { Content, Body } from "Components/Modal";
import LoadingButton from "Components/LoadingButton";
import {
  updateMotivationalQuoteAuthor,
} from "Actions/motivationalQuotesActions";

const mapDispatchToProps = {
    updateMotivationalQuoteAuthor
}

class EditMotivationalQuoteAuthorContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        authorName:this.props.author.name
    };
  }

  render() {
    var { mode } = this.props;

    return (
      <Content title={"Edytuj Autora"}>
        <Body>
          <Form>

            <FieldGroup
              value={this.state.authorName}
              input={{ onChange: this.onNameChange }}
              name="name"
              label="Nazwa"
              componentClass="textarea"
            />
          </Form>

          <div className="text-right" style={{ marginTop: "10px" }}>
            <LoadingButton
              label={"Edytuj"}
              loadingLabel={"Edytuje..."}
              isLoading={this.props.activeRequest}
              bsStyle="primary"
              onClick={this.updateAuthor}
            />
          </div>
        </Body>
      </Content>
    );
  }
  
  onNameChange = e => this.setState({authorName:e.target.value})

  updateAuthor = () => {
    return this.props.dispatchByModal(
      updateMotivationalQuoteAuthor(this.props.author.id, {
        name: this.state.authorName
      })
    );
  };

}


EditMotivationalQuoteAuthorContent


export { EditMotivationalQuoteAuthorContent };
