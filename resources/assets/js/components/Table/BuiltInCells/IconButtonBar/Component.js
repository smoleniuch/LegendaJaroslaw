import React from "react";
import Icon from "Components/Icon";
import classNames from "classnames";

import "./style.scss";

const IconButtonBar = ({ iconButtons, row, id }) => {
  return (
    <div className="icon-button-bar-column-container">
      {iconButtons.map(({ onClick, ...props }, i) => {
        return (
          <Icon
            onClick={_ => onClick(row)}
            size={21}
            key={`${id}-${i}`}
            role="button"
            {...props}
          />
        );
      })}
    </div>
  );
};

IconButtonBar.defaultProps = {
  iconButtons: []
};

export default IconButtonBar;
