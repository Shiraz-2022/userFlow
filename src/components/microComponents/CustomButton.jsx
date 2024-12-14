import React from "react";

function CustomButton(props) {
  const { text, bgColor, textColor, onClick } = props;
  return (
    <button
      style={{ backgroundColor: bgColor }}
      className="py-3 px-3 rounded-md text-center w-full hover:bg-opacity-70"
      onClick={onClick}
    >
      <p style={{ color: textColor }}>{text}</p>
    </button>
  );
}

export default CustomButton;
