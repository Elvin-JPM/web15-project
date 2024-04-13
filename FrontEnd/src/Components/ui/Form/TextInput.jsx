const TextInput = ({ input, value, onChange, formSubmitted }) => (
    <div>
      <label htmlFor={input.name}>{input.label}</label>
      <div>
        <input
         className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
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
          <span className="text-red-500 text-sm">{input.errorMessage}</span>
        )}
      </div>
    </div>
  );

export default TextInput