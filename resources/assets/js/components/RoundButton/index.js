import React from "react";
import Button from "Components/Button";

const RoundButton = ({ size, style, children, ...props }) => {
  var size = `${size}px`;

  return (
    <Button
      style={{
        width: size,
        height: size,
        display: "flex",
        borderRadius: "50%",
        ...style
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default RoundButton;
