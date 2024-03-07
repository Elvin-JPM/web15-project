import { useState } from "react";
import FormInput from "../Components/FormInput";
import { postData } from "../Api/api";
import { useNavigate } from "react-router-dom";
import storage from "../Api/storage";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username not available",
      label: "Label",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password must be at least 8 characters long",
      label: "Password",
      required: true,
    },
  ];

  const requestBody = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("/authenticate", requestBody);
      console.log("From login:", response);
      storage.set("jwt", response.data.jwt);
      console.log(storage.get("jwt"));
      navigate("/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <form onSubmit={handleSubmit} className="login-container">
      <h1 className="title">Sign In</h1>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        ></FormInput>
      ))}

      <button>Submit</button>
    </form>
  );
};

export default Login;
