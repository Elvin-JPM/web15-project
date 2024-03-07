import { useState } from "react";
import styles from "./formInput.module.css";

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name == "confirmPassword" && setFocused(true)}
        focused={focused.toString()}
      ></input>
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
