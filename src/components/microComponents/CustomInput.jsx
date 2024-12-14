import React from "react";

function CustomInput(props) {
  const {
    type,
    label,
    placeholder,
    labelColor,
    textColor,
    placeholderColor,
    onChange,
    value,
  } = props;
  return (
    <div>
      <p className={`text-[${labelColor}] mb-5`}>{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className={`rounded-md py-3 px-3 w-full focus:outline-none text-sm`}
        placeholderColor={placeholderColor}
        style={{ color: textColor }}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default CustomInput;
