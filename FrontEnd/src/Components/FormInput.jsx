import { useState } from "react";
import { Label, Input } from '../Components/ui/Index';

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'></div>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Label>{label}</Label>
          <Input
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() => inputProps.name == "confirmPassword" && setFocused(true)}
            focused={focused.toString()}
          ></Input>
          <span>{errorMessage}</span>
        </div>
    </>
  );
};

export default FormInput;
