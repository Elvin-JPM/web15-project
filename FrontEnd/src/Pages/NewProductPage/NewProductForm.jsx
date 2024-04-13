import { useState } from "react";
import Form from '../../Components/ui/Form/Form'
import {
  H2,
} from "../../Components/ui/Index";
import {
  Card,
  CardTitle,
  CardContent,
} from "../../Components/ui/CardComponent";
import { useNavigate } from "react-router-dom";
import { postData } from "../../Api/api";
import getFromStorage from "../../Service/getFromStorage";

const NewProductForm = () => {
  const navigate = useNavigate();
  const token = getFromStorage("jwt");
  const [errors, setErrors] = useState({});
console.log('error', errors)
  const handleSubmit = async (values) => {
    const formErrors = {};
    if (!values.name) {
      formErrors.name = "Nombre es requerido";
    }
    if (!values.description) {
      formErrors.description = "Descripción es requerida";
    }
    if (!values.price) {
      formErrors.price = "Precio es requerido";
    }
    if (!values.photo) {
      formErrors.photo = "La foto es requerida";
    }
    if (!values.sale) {
      formErrors.sale = "Se necesita un tipo de venta";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const requestBody = {
      ...values,
      sale: values.sale == "selling" ? true : false,
    };

    try {
      console.log(token);
      const response = await postData("/products", requestBody, {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      });
      localStorage.setItem('mostrarSweetAlert', 'true')
      console.log("New product:", response);
      navigate("/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Nombre de producto',
      errorMessage: errors.name, 
      label: 'Nombre del producto',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'description',
      type: 'text',
      placeholder: 'Descripción del producto',
      errorMessage: errors.description,
      label: 'Información del producto',
      required: true,
    },
    {
      id: 3,
      name: 'price',
      type: 'number',
      placeholder: 'Precio',
      errorMessage: errors.price,
      label: 'Precio',
      required: true,
    },
    {
      id: 4,
      name: 'tags',
      type: 'checkbox',
      label: 'Tags',
      values: [
        { value: 'Motor', label: 'Motor' },
        { value: 'Work', label: 'Work' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'Electronics', label: 'Electronics' }
      ]
    },
    {
      id: 5,
      name: 'photo',
      type: 'file',
      label: 'Seleeccione una imagen',
      accept: 'image/*',
      required: true,
      errorMessage: errors.photo,
    },
    {
      id: 6,
      name: 'sale',
      type: 'radio',
      label: 'Tipo de venta',
      errorMessage: errors.sale,
      required: true,
      options: [
        { value: 'selling', label: 'Para vender' },
        { value: 'buying', label: 'Para comprar' }
      ]
    },
  ];

  return (

    <div className="flex justify-center items-center h-full">
    <Card>
      <CardTitle className=''><H2>Crear producto</H2></CardTitle>
      <CardContent>
        <Form inputs={inputs}  onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  </div>

  );
};

export default NewProductForm;
