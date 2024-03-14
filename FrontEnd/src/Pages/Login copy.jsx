import { useState } from "react";
import { Label, Input, Icon, H2, Button_large } from '../Components/ui/Index';
import { postData } from "../Api/api";
import { useNavigate } from "react-router-dom";
import storage from "../Api/storage";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
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
      label: "Username",
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

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Icon />
        <H2>Log In</H2>
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
                />
              </div>
            </div>
          ))}

          {/* Added code snippet here */}
          <div className='flex items-center'>
            <Input
              className='mr-2 w-4 h-4 rounded-sm border border-gray-300 focus:ring-primary focus:ring-offset-0 focus:outline-none'
              id='remember-me'
              name='remember-me'
              type='checkbox'
            />
            <Label className='text-gray-700' htmlFor='remember-me'>
              Remember me
            </Label>
          </div>

          <div className='flex items-center justify-end'>
            <Button_large type='submit'>Log in</Button_large>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
