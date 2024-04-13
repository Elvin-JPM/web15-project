import React from 'react';

const FileInput = ({ input, onChange }) => (
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
  </div>
);

export default FileInput