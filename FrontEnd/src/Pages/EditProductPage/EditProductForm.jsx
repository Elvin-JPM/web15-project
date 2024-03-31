import { useState } from "react";
import {
  Label,
  Input,
  Icon,
  H2,
  Button_large,
} from "../../Components/ui/Index";
import { useNavigate } from "react-router-dom";
import { postData, putData } from "../../Api/api";
import getFromStorage from "../../Service/getFromStorage";
import { useEffect } from "react";
import { useParams } from "react-router";
import { getData } from "../../Api/api";
const EditProductForm = () => {
  const navigate = useNavigate();
  const { productId, productName } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]); // tags
  const [previousImage, setPreviousImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getData(`/products/${productId}/${productName}`);
        console.log("Producto a editar:", response);
        setProduct(response);
        setValues({
          name: `${response.name}`,
          description: `${response.description}`,
          price: `${response.price}`,
          sale: `${response.sale ? "selling" : "buying"}`,
        });
        //setSelectedImage(`${response.photo}`);
        setSelectedTags(response.tags);
        setPreviousImage(response.photo);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const [values, setValues] = useState({
    name: ``,
    description: "",
    price: "",
    sale: "selling",
  });

  const token = getFromStorage("jwt");
  const username = getFromStorage("username");

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
    photo: selectedImage || previousImage,
    tags: selectedTags,
  };

  console.log("Request Body: ", requestBody);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate(`/products/${values.name}/${productId}`);
    } catch (error) {
      console.log(error.message);
    }
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
      value: ``,
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
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <H2>Editar producto</H2>
        </div>

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
                    required={input.required}
                    pattern={input.pattern}
                    errorMessage={input.errorMessage}
                    onChange={onChange}
                  />
                </div>
              </div>
            ))}

            <Label>Previous image: {previousImage}</Label>
            <Label htmlFor="imageInput">Select an Image:</Label>
            <Input
              type="file"
              id="imageInput"
              name="photo"
              required
              accept="image/*" // Specify that only image files are allowed
              onChange={handleImageChange}
            />

            <Label>Selling or buying:</Label>
            <label>
              <input
                type="radio"
                id="sell"
                name="sale"
                value="selling"
                checked={values.sale === "selling"}
                onChange={onChange}
              />
              For sale
            </label>
            <br></br>
            <label>
              <input
                type="radio"
                id="buy"
                name="sale"
                value="buying"
                checked={values.sale === "buying"}
                onChange={onChange}
              />
              Looking to buy
            </label>

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

            <div>
              <Button_large type="submit" onClick={handleSubmit}>
                Editar producto
              </Button_large>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductForm;
