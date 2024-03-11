import { useState } from "react";
import FormInput from "../Components/FormInput";
import { useNavigate } from "react-router-dom";
import { postData } from "../Api/api";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const requestBody = values;

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username not available",
      label: "Label",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password must be at least 8 characters long",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      label: "Confirm password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    console.log("Submit clicked!");
    e.preventDefault();
    try {
      const response = await postData("/signup", requestBody);
      console.log("From signup component:", response);
      navigate("/login");
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
      <h1 className="title">Register</h1>
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

export default Signup;
