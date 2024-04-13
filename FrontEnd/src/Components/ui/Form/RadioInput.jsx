import Label from "../Label";



const RadioInput = ({ input, value, formSubmitted, onChange }) => (
    <div>
         <Label>{input.label}</Label>  
      {input.options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={input.name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
          <label className='text-gray-500' htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
       {input.required && formSubmitted && !value && (
          <span className="text-red-500 text-sm">{input.errorMessage}</span>
        )}
    </div>
  );

export default RadioInput