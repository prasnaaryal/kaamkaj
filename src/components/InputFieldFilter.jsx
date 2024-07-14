import React from "react";

const InputField = ({ handleChange, value, title, checked }) => {
  return (
    <label className="sidebar-label-container">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <span className="checkmark px-2"></span>
      {title}
    </label>
  );
};

export default InputField;
