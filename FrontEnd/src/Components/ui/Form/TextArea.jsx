import Label from "../Label";


const TextArea = ({ input, value, onChange, formSubmitted }) => (
    <div>
         <Label>{input.label}</Label>  
      <div>
        <textarea
          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
          id={input.name}
          name={input.name}
          placeholder={input.placeholder}
          value={value}
          onChange={onChange}
          required={input.required}
        />
        {input.required && formSubmitted && !value && (
          <span className="text-red-500 text-sm">{input.errorMessage}</span>
        )}
      </div>
    </div>
  );
  
  export default TextArea;
  