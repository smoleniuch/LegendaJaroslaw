import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { submitEvent } from 'react-virtualized-tree/lib/eventWrappers';
import { getNodeRenderOptions, udpateNode as updateNode } from 'react-virtualized-tree/lib/selectors/nodes';
import { Renderer } from 'react-virtualized-tree/lib/shapes/rendererShapes';
import Icon from 'Components/Icon';

const Expandable = ({
  onChange,
  node,
  children
  }) => {
  const { hasChildren, isExpanded } = getNodeRenderOptions(node);

  const handleChange = () => onChange(
      updateNode(node, { expanded: !isExpanded }
      ));

  return (
    <span onDoubleClick={handleChange}>
      <Icon onClick={handleChange} name={isExpanded?'io-android-folder-open':'io-android-folder'} />
      { children }
    </span>);
};

Expandable.propTypes = {
  ...Renderer,
}

export default Expandable;