import { useState } from "react";
import { Label, Input, Icon, H2, Button_large } from '../../Components/ui/Index';
import { useNavigate } from "react-router-dom";
import { postData } from "../../Api/api";

const EditProductForm = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();
  const requestBody = values;

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Nombre de producto",
      errorMessage: "Nombre not available",
      label: "Nombre del producto",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "Describe del producto",
      errorMessage: "Información del producto not available",
      label: "Información del producto",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "price",
      type: "number",
      placeholder: "Precio",
      errorMessage: "Formato no corresponde",
      label: "Precio",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken'); // Obtener el token de localStorage
      const response = await postData("/products", values, { // Incluir el token en la solicitud
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("New product:", response);
      navigate("/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <H2>Editar producto</H2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <div key={input.id}>
                <Label htmlFor={input.name}>{input.label}</Label>
                <div className='mt-2'>
                  <Input
                    id={input.name}
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    autoComplete={input.name}
                    value={values[input.name]}
                    onChange={onChange}
                    required={input.required}
                    pattern={input.pattern}
                    errorMessage={input.errorMessage}
                  />
                </div>
              </div>
            ))}

            <div>
              <Button_large type='submit'>Crear producto</Button_large>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductForm;
