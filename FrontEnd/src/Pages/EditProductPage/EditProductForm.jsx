import React, { useState, useEffect } from "react";
import Form from '../../Components/ui/Form/Form';
import {
  H2,
} from "../../Components/ui/Index";
import { Card, CardTitle, CardContent } from "../../Components/ui/CardComponent";
import { useNavigate, useParams } from "react-router-dom";
import { putData, getData } from "../../Api/api";
import getFromStorage from "../../Service/getFromStorage";

const EditProductForm = () => {
  const navigate = useNavigate();
  const { productId, productName } = useParams();
  const token = getFromStorage("jwt");
  const username = getFromStorage("username");

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    sale: 'selling',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previousImage, setPreviousImage] = useState('');
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getData(`/products/${productId}/${productName}`);
        console.log("Producto a editar:", response);
        setValues({
          name: response.name || '',
          description: response.description || '',
          price: response.price || '',
          sale: response.sale ? 'selling' : 'buying',
          tags: response.tags,
          photo: response.photo
        });
        setPreviousImage(response.photo || '');
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (values) => {
    const requestBody = {
      ...values,
      sale: values.sale === "selling",
    };

    try {
      const response = await putData(
        `/products/${username}/${productId}`,
        requestBody,
        {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        }
      );
      console.log("Edit product:", response);
      response && localStorage.setItem("mostrarSweetAlert", "true");
      response && navigate(`/products/${values.name}/${productId}`);
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
      pattern: '^[A-Za-z0-9]{3,16}$',
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
        <CardTitle className=''><H2>Editar producto</H2></CardTitle>
        <CardContent>
          <Form inputs={inputs} values={values} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProductForm;
