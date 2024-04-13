import React from 'react';

const FileInput = ({ input, value, onChange, formSubmitted }) => (
  <div>
    <label htmlFor={input.name}>{input.label}</label>
    <input
      type="file"
      id={input.name}
      name={input.name}
      onChange={onChange}
      accept={input.accept}
      multiple={input.multiple}
      required={input.required}
    />
     {input.required && formSubmitted && !value && (
          <span className="text-red-500 text-sm">{input.errorMessage}</span>
        )}
  </div>
);

export default FileInput;
