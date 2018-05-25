import React from "react";
import Icon from "Components/Icon";
import classNames from "classnames";

import "./style.scss";

const IconButtonBar = ({ iconButtons,display, rowInfo }) => {
  return (
    display(rowInfo)?
    (<div className="icon-button-bar-column-container">
      {iconButtons.map(({ onClick, ...props }, i) => {
        return (
          <Icon
            onClick={_ => onClick(rowInfo.original, rowInfo)}
            size={21}
            key={`${rowInfo.viewIndex}-${i}`}
            role="button"
            {...props}
          />
        );
      })}
    </div>):''
  );
};

IconButtonBar.defaultProps = {
  iconButtons: [],
  display:() => true,
};

export default IconButtonBar;
