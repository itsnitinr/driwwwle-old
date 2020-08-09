import React from "react";

const ProfileInput = ({
  placeholder,
  value,
  icon,
  name,
  smallText,
  onChange,
}) => {
  return (
    <div className="field">
      <p className="control is-expanded has-icons-left">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          value={value || ""}
          name={name}
          onChange={(e) => onChange(e)}
        />
        <span className="icon is-small is-left">
          <i className={icon}></i>
        </span>
      </p>
      <p className="help">{smallText}</p>
    </div>
  );
};

export default ProfileInput;
