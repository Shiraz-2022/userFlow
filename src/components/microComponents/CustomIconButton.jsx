import React from "react";

function CustomIconButton(props) {
  const { bgColor, textColor, text, reverse, icon, hideText, onClick } = props;
  return (
    <button
      style={{
        backgroundColor: bgColor,
        ...(reverse && { flexDirection: "row-reverse" }),
      }}
      className="p-3 rounded-md flex justify-between items-center gap-5"
      onClick={onClick}
    >
      <p
        style={{
          color: textColor,
          ...(hideText && { display: "none" }),
        }}
      >
        {text}
      </p>
      <img src={icon} alt="button-icon" className="w-5 h-5" />
    </button>
  );
}

export default CustomIconButton;
