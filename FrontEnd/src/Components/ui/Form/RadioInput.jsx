const RadioInput = ({ input, value, onChange }) => (
    <div>
      <label>{input.label}</label>
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
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );

export default RadioInput