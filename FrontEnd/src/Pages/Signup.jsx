import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../Api/api';
import { Label, Input, H2, Button_large } from '../Components/ui/Index';

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [confirmPasswordPattern, setConfirmPasswordPattern] = useState(() => new RegExp(`^<span class="math-inline">\{values\.password\}</span>`));

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === 'password' || name === 'confirmPassword') {
      setConfirmPasswordPattern(() => new RegExp(`^<span class="math-inline">\{values\.password\}</span>`));
    }
  };

  useEffect(() => {
    setConfirmPasswordPattern(() => new RegExp(`^<span class="math-inline">\{values\.password\}</span>`));
  }, [values.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData('/signup', values);
      console.log('From signup component:', response);
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage: 'Username not available',
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password must be at least 8 characters long',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Passwords don't match",
      label: 'Confirm password',
      pattern: confirmPasswordPattern,
      required: true,
    },
  ];

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <H2>Register</H2>
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
                    onChange={handleChange}
                    required={input.required}
                    pattern={typeof input.pattern === 'function' ? input.pattern() : input.pattern}
                    errorMessage={input.name === 'confirmPassword' && values.password !== values.confirmPassword ? input.errorMessage : null}
                  />
                </div>
              </div>
            ))}

            <div>
              <Button_large type='submit'>Sign up</Button_large>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
