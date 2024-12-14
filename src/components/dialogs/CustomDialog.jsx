import React from "react";

function CustomDialog(props) {
  const { icon, text, onClose } = props;

  return (
    <div
      className="fixed inset-0 bg-customBlack bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-white w-96 h-64 rounded-md flex flex-col items-center justify-center p-5">
        <img className="w-24 h-24" src={icon} alt="success-failiure-icon" />
        <h2 className="text-lg font-bold text-customGray mt-7 text-center">
          {text.toUpperCase()}
        </h2>
      </div>
    </div>
  );
}

export default CustomDialog;
