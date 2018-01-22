import React from 'react';
import { InputGroup, FormControl, Glyphicon } from 'react-bootstrap'
const SearchBar = ({ onChange }) => {

  var customOnChange = (e) => {
    var v = e.target.value;

    onChange(v,e)

  }
  
  return (
  <InputGroup>
      <FormControl onChange={customOnChange} type="text" />
      <InputGroup.Addon>
        <Glyphicon glyph="search" />
      </InputGroup.Addon>
  </InputGroup>
)
};

export default SearchBar;
