import { useState } from "react";
import Form from '../../Components/ui/Form/Form'
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

  const handleSubmit = async (values) => {
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
      errorMessage: 'Nombre no disponible',
      label: 'Nombre del producto',
      //pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'description',
      type: 'text',
      placeholder: 'Descripción del producto',
      errorMessage: 'Información del producto no disponible',
      label: 'Información del producto',
      required: true,
    },
    {
      id: 3,
      name: 'price',
      type: 'number',
      placeholder: 'Precio',
      errorMessage: 'Formato de precio incorrecto',
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
    },
    {
      id: 6,
      name: 'sale',
      type: 'radio',
      label: 'Tipo de venta',
      options: [
        { value: 'selling', label: 'Para vender' },
        { value: 'buying', label: 'Para comprar' }
      ]
    },
  ];

  return (

    <div className="flex justify-center items-center h-full">
    <Card>
      <CardTitle className=''>Nuevo producto</CardTitle>
      <CardContent>
        <Form inputs={inputs} onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  </div>

  );
};

export default NewProductForm;
