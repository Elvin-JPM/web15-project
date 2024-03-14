import { useState } from "react";
import { Label, Input, Icon, H2, Button_large } from '../Components/ui/Index';
import { postData } from "../Api/api";
import { useNavigate } from "react-router-dom";
import storage from "../Api/storage";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    rememberMe: false, // Initial state for remembering user
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked }); // Update state based on checkbox value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("/authenticate", values);
      console.log("From login:", response);

      if (values.rememberMe) {
        storage.set("jwt", response.data.jwt);
      }

      console.log(storage.get("jwt"));
      navigate("/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Icon />
        <H2>Log In</H2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <Label htmlFor='username'>Username</Label>
            <div className='mt-2'>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='Enter your username'
                autoComplete='username'
                required
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <Label htmlFor='password'>Password</Label>
            </div>
            <div className='mt-2'>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                placeholder='********'
              />
            </div>
          </div>

          <div className='flex items-center'>
            <Input
              className='mr-2 w-4 h-4 rounded-sm border border-gray-300 focus:ring-primary focus:ring-offset-0 focus:outline-none'
              id='remember-me'
              name='rememberMe' // Cambiar el nombre a 'rememberMe'
              type='checkbox'
              checked={values.rememberMe}
              onChange={handleChange}
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
