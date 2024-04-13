import React from 'react';
import Label from '../Label';
const CheckboxInput = ({ input, value, onChange }) => {
  const handleChange = (event) => {
    const { checked, value: checkboxValue } = event.target;
    const updatedValue = checked
      ? [...value, checkboxValue] 
      : value.filter((val) => val !== checkboxValue); 
    onChange({ target: { name: input.name, value: updatedValue } }); 
  };

  return (
    <div>
       <Label>{input.label}</Label>  
      {input.values.map((option) => (
        <div key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            name={input.name}
            value={option.value}
            checked={value.includes(option.value)} 
            onChange={handleChange}
          />
          <label className='text-gray-500' htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxInput;
