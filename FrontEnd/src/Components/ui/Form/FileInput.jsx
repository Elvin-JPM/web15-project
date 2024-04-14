import React, {useState, useEffect} from 'react';
import Label from '../Label'

const FileInput = ({ input, value, onChange, formSubmitted }) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGES_URL;
  const imageUrl = IMAGE_BASE_URL + value

  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    setSelectedImage(value ? imageUrl : null);
  }, [value, imageUrl]);
  console.log(selectedImage, value)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader(); 
      reader.onload = () => {
        setSelectedImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
    onChange(event); 
  };

 
  const handleClearImage = () => {
    setSelectedImage(null); 
    onChange({ target: { name: input.name, value: null } }); 
  };


  return (
    <div>

    <div className="w-full">
        {selectedImage ? ( // Si hay una imagen temporal seleccionada, mostrarla
          <>
            <Label>Previous image</Label>
            <img className='w-full h-52 my-1' src={selectedImage} alt="Selected" />
            <button className='border border-red-600 font-bold bg-red-600 text-xs rounded text-white p-2' onClick={handleClearImage}>Clear</button>
          </>
        ) : (
          <div className="w-full mb-2">
            <div className="flex justify-center items-center bg-gray-200 h-52"> {/* Tamaño ajustable según sea necesario */}
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          </div>
        )}
        {/* {value && <>   <img src={imageUrl} alt="actual" />
            <i className="fas fa-image"></i> </>} */}
      </div>
      <Label>{input.label}</Label>
    <input 
       className="text-xs relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-500 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-500 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" aria-describedby="file_input_help" 
       id={`file_input-${input.name}`}
       name={input.name} 
       accept={input.accept} 
       onChange={handleFileChange}  
       type="file" />
    <div className="flex items-center space-x-2">
      <p className="text-xs opacity-60">Formato: jpg, png</p>
      <p className="text-xs opacity-60">Tamaño máximo: 800x800px</p>
    </div>
    {input.required && formSubmitted && !value && (
      <div className="text-red-500 text-sm">{input.errorMessage}</div>
    )}
  </div>

  );
};

export default FileInput;
