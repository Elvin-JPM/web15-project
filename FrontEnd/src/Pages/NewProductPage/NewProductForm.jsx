import { useState } from "react";
import Form from "../../Components/ui/Form/Form";
import { H2 } from "../../Components/ui/Index";
import {
  Card,
  CardTitle,
  CardContent,
} from "../../Components/ui/CardComponent";
import { useNavigate } from "react-router-dom";
import { postData } from "../../Api/api";
import getFromStorage from "../../Service/getFromStorage";
import styles from "../NewProductPage/new_product.module.css";

const NewProductForm = () => {
  const navigate = useNavigate();
  const token = getFromStorage("jwt");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (values) => {
    const formErrors = {};
    if (!values.name) {
      formErrors.name = "Name is required";
    }
    if (!values.description) {
      formErrors.description = "Description is required";
    }
    if (!values.price) {
      formErrors.price = "Price is requuired";
    }
    if (!values.photo) {
      formErrors.photo = "Photo is required";
    }
    if (!values.sale) {
      formErrors.sale = "Selling or looking to buy required";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const requestBody = {
      ...values,
      sale: values.sale == "selling" ? true : false,
    };
    console.log(requestBody);

    try {
      console.log(token);
      const response = await postData("/products", requestBody, {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      });

      if (response) {
        localStorage.setItem("mostrarSweetAlert", "true");
        console.log("New product:", response);
        navigate("/products");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Product's name",
      errorMessage: errors.name,
      label: "Nombre del producto",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      className: "w-full md:w-1/2",
    },
    {
      id: 3,
      name: "price",
      type: "number",
      placeholder: "Price",
      errorMessage: errors.price,
      label: "Precio",
      required: true,
      className: "w-full md:w-1/2",
    },
    {
      id: 2,
      name: "description",
      type: "textArea",
      placeholder: "Product's description",
      errorMessage: errors.description,
      label: "Información del producto",
      required: true,
    },
    {
      id: 4,
      name: "tags",
      type: "checkbox",
      label: "Tags",
      values: [
        { value: "Motor", label: " Motor" },
        { value: "Work", label: " Work" },
        { value: "Lifestyle", label: " Lifestyle" },
        { value: "Electronics", label: " Electronics" },
      ],
    },
    {
      id: 5,
      name: "photo",
      type: "file",
      label: "Select an image",
      accept: "image/*",
      required: true,
      errorMessage: errors.photo,
    },
    {
      id: 6,
      name: "sale",
      type: "radio",
      label: "Tipe of product",
      errorMessage: errors.sale,
      required: true,
      options: [
        { value: "selling", label: " For sale" },
        { value: "buying", label: " Looking to buy" },
      ],
    },
  ];

  return (
    <div
      className={`${styles.new_product_page} flex justify-center items-center h-full`}
    >
      <div className="w-full max-w-lg">
        <Card className="border rounded-xl">
          <CardTitle className="">
            <H2>Crear producto</H2>
          </CardTitle>
          <CardContent>
            <Form inputs={inputs} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewProductForm;
