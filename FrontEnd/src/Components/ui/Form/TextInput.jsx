const TextInput = ({ input, value, onChange, formSubmitted }) => (
    <div>
      <label htmlFor={input.name}>{input.label}</label>
      <div>
        <input
          id={input.name}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          autoComplete={input.name}
          value={value}
          onChange={onChange}
          required={input.required}
          pattern={input.pattern}
        />
        {input.required && formSubmitted && !value && (
          <span>{input.errorMessage}</span>
        )}
      </div>
    </div>
  );

export default TextInput