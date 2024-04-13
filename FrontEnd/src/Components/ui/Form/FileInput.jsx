import React from 'react';
import Label from '../Label'

const FileInput = ({ input, value, onChange, formSubmitted }) => {
  const handleFileChange = (event) => {
    onChange(event); 
  };
console.log(value)

  return (
  <div>
    <Label>{input.label}</Label>  
    {value && typeof value === 'string' && (
        <p>{value}</p>
      )}
      <input 
         className="text-xs relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-500 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-500 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" aria-describedby="file_input_help" 
         id={`file_input-${input.name}`}
         name={input.name} 
         accept={input.accept} 
         onChange={handleFileChange}  
         type="file" />
        <div className="flex items-center space-x-2">
            <p className="text-xs opacity-60">
              Formato: jpg, png
            </p>
            <p className="text-xs opacity-60">
              Tamaño máximo: 800x800px
            </p>
          </div>
      {input.required && formSubmitted && !value && (
        <div className="text-red-500 text-sm">{input.errorMessage}</div>
      )}
      
  </div>

  );
};

export default FileInput;
