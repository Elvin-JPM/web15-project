import React, { useState } from 'react';
import TextInput from './TextInput';
import CheckboxInput from './CheckboxInput';
import FileInput from './FileInput';
import RadioInput from './RadioInput';


const Form = ({ inputs, onSubmit }) => {
  const [values, setValues] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? [...(values[name] || []), value] : values[name].filter(v => v !== value)) : value;
    setValues({ ...values, [name]: newValue });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    onSubmit(values);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {inputs.map((input) => {
        switch (input.type) {
          case 'text':
          case 'number':
          case 'email':
            return (
              <TextInput
                key={input.id}
                input={input}
                value={values[input.name] || ''}
                onChange={onChange}
                formSubmitted={formSubmitted}
              />
            );
          case 'checkbox':
            return (
              <CheckboxInput
                key={input.id}
                input={input}
                value={values[input.name] || []} 
                onChange={onChange}
               // formSubmitted={formSubmitted}
              />
            );
            case 'file':
                return (
                  <FileInput
                    key={input.id}
                    input={input}
                    onChange={onChange}
                  />
                );
                case 'radio':
                    return (
                      <RadioInput
                        key={input.id}
                        input={input}
                        value={values[input.name] || ''}
                        onChange={onChange}
                      />
                    );
          default:
            return null;
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form