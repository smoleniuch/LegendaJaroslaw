import React from 'react';
import { InputGroup, FormControl, Glyphicon } from 'react-bootstrap'
import classNames from 'classnames'

import './style.scss'

const SearchBar = ({ onChange }) => {

  var customOnChange = (e) => {
    var v = e.target.value;

    onChange(v,e)

  }

  return (
  <InputGroup className={classNames('search-bar')}>
      <FormControl onChange={customOnChange} type="text" />
      <InputGroup.Addon>
        <Glyphicon glyph="search" />
      </InputGroup.Addon>
  </InputGroup>
)
};

export default SearchBar;
