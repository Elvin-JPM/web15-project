import React from 'react';
import Label from '../Label';
const CheckboxInput = ({ input, value, onChange }) => {
  const handleChange = (event) => {
    const { checked, value: checkboxValue } = event.target;
    const updatedValue = checked
      ? [...value, checkboxValue] // Agrega el valor seleccionado a la lista
      : value.filter((val) => val !== checkboxValue); // Filtra el valor deseleccionado de la lista
    onChange({ target: { name: input.name, value: updatedValue } }); // Llama a la función onChange con el nuevo valor
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
            checked={value.includes(option.value)} // Verifica si el valor está en la lista de valores seleccionados
            onChange={handleChange} // Usa la función handleChange para manejar los cambios en los checkboxes
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxInput;
