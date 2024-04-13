import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import CheckboxInput from './CheckboxInput';
import FileInput from './FileInput';
import RadioInput from './RadioInput';
import {Button_large} from "../Index";


const Form = ({ inputs, values: initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues || {});
  //const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? [...(values[name] || []), value] : values[name].filter(v => v !== value)) : value;
    setValues({ ...values, [name]: newValue });
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setValues({ ...values, [event.target.name]: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // setFormSubmitted(true);
    onSubmit(values);
  };
  console.log('desde form', values)

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
                //formSubmitted={formSubmitted}
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
                    onChange={handleChange}
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
        <Button_large type="submit" onClick={handleSubmit}>Submit</Button_large>
    </form>
  );
};

export default Form