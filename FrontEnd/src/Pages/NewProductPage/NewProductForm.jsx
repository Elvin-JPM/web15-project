import { useState } from "react";
import {
  Label,
  Input,
  Icon,
  H2,
  Button_large,
} from "../../Components/ui/Index";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter
} from "../../Components/ui/CardComponent";
import { useNavigate } from "react-router-dom";
import { postData } from "../../Api/api";
import storage from "../../Api/storage";
import getFromStorage from "../../Service/getFromStorage";



const NewProductForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    sale: "selling",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]); // tags
  const [formSubmitted, setFormSubmitted] = useState(false);

  const token = getFromStorage("jwt");

  // Handler functions
  const onChange = (e) => {
    setValues({ ...values, [e.target.getAttribute("name")]: e.target.value });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleTagsChange = (value) => {
    if (selectedTags.includes(value)) {
      // If the option is already selected, remove it from the array
      setSelectedTags(selectedTags.filter((option) => option !== value));
    } else {
      // If the option is not selected, add it to the array
      setSelectedTags([...selectedTags, value]);
    }
  };

  const requestBody = {
    ...values,
    sale: values.sale == "selling" ? true : false,
    photo: selectedImage,
    tags: selectedTags,
  };

  console.log(requestBody);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setFormSubmitted(true);
  };

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
      // pattern: "^[A-Za-z0-9]{3,16}$",
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

  return (
    <Card>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <CardTitle>Nuevo producto</CardTitle>
        </div>
        <CardContent>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <div key={input.id}>
                <Label htmlFor={input.name}>{input.label}</Label>
                <div className="mt-2">
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
                    errorMessage={input.required && formSubmitted && !values[input.name] ? "Campo requerido" : (formSubmitted && !RegExp(input.pattern).test(values[input.name]) ? input.errorMessage : null)}
                  />
                </div>
              </div>
            ))}

            <label htmlFor="imageInput">Select an Image:</label>
            <Input
              type="file"
              id="imageInput"
              required
              accept="image/*" // Specify that only image files are allowed
              onChange={handleImageChange}
            />

            <label>Selling or buying:</label>

              <input
                type="radio"
                id="sell"
                name="sale"
                value="selling"
                checked={values.sale === "selling"}
                onChange={onChange}
              />
              For sale
        
           
              <input
                type="radio"
                id="buy"
                name="sale"
                value="buying"
                checked={values.sale === "buying"}
                onChange={onChange}
              />
              Looking to buy
         

            <br></br>
            <label>Tags:</label>

            <div>
              <input
                type="checkbox"
                id="Motor"
                value="Motor"
                checked={selectedTags.includes("Motor")}
                onChange={() => handleTagsChange("Motor")}
              />
              <label htmlFor="Motor">Motor</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="Work"
                value="Work"
                checked={selectedTags.includes("Work")}
                onChange={() => handleTagsChange("Work")}
              />
              <label htmlFor="Work">Work</label>
            </div>

            <div>
              <input
               label='LifeStyle'
                type="checkbox"
                id="Lifestyle"
                value="Lifestyle"
                checked={selectedTags.includes("Lifestyle")}
                onChange={() => handleTagsChange("Lifestyle")}
              />
              <label htmlFor="Lifestyle">Lifestyle</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="Electronics"
                value="Electronics"
                checked={selectedTags.includes("Electronics")}
                onChange={() => handleTagsChange("Electronics")}
              />
              <label htmlFor="Electronics">Electronics</label>
            </div>

            <CardFooter>
              <Button_large type="submit">Crear producto</Button_large>
            </CardFooter>
          </form>
        </div>

        </CardContent>

      </div>
    </Card>
  );
};

export default NewProductForm;
