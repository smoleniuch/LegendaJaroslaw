import _omitBy from "lodash/omitBy";
import * as types from "Actions/motivationalQuotesActions/types";

const initialState = {
  quoteOfTheDay: {},
  motivationalQuotes: {},
  quotesFetched: false,
  authorsFetched: false,
  authors: {}
};

export default function motivationalQuoteReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MOTIVATIONAL_QUOTES_REQUEST_SUCCESS:
      var motivationalQuotes = action.payload.data;
      return {
        ...state,
        quotesFetched: true,
        motivationalQuotes
      };

    case types.GET_MOTIVATIONAL_QUOTES_AUTHORS_REQUEST_SUCCESS:
      var authors = action.payload.data;
      return {
        ...state,
        authorsFetched: true,
        authors
      };

    case types.UPDATE_MOTIVATIONAL_QUOTE_REQUEST_SUCCESS:
    case types.ADD_MOTIVATIONAL_QUOTE_REQUEST_SUCCESS:
      var { quote, author } = action.payload.data;
      var authors = { ...state.authors };
      if (author) {
        authors[author.id] = author;
      }
      return {
        ...state,
        motivationalQuotes: {
          ...state.motivationalQuotes,
          [quote.id]: quote
        },
        authors
      };

    case types.UPDATE_MOTIVATIONAL_QUOTE_AUTHOR_REQUEST_SUCCESS:
    var  author  = action.payload.data;

    return {
      ...state,
      authors:{
        ...state.authors,
        [author.id]:author
      }
    };

    case types.DELETE_MOTIVATIONAL_QUOTE_REQUEST_SUCCESS:
      var quoteId = +action.meta.previousAction.payload.request.url
        .split("/")
        .pop();
      var motivationalQuotes = { ...state.motivationalQuotes };
      delete motivationalQuotes[quoteId];
      return {
        ...state,
        motivationalQuotes
      };

    case types.DELETE_MOTIVATIONAL_QUOTE_AUTHOR_REQUEST_SUCCESS:
      var authorId = +action.meta.previousAction.payload.request.url
        .split("/")
        .pop();
      var authors = { ...state.authors };
      delete authors[authorId];

      var motivationalQuotes = _omitBy(
        state.motivationalQuotes,
        quote => quote.author_id === authorId
      );
      return {
        ...state,
        authors,
        motivationalQuotes
      };
  }

  return state;
}
