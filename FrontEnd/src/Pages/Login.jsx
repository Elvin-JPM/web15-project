import { useState } from "react";
import { Label, Input, Icon, H2, Button_large } from "../Components/ui/Index";
import { postData } from "../Api/api";
import { Link, useNavigate } from "react-router-dom";
import storage from "../Api/storage";
import { initializeSocket } from "../Service/socketManager";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    rememberMe: false, // Initial state for remembering user
    error: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.getAttribute("name")]: e.target.value,
      error: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("/authenticate", values);
      console.log("From login:", response);
      console.log("error", response.data.error);

      if (!response.data.error) {
        if (values.rememberMe) {
          storage.set("jwt", response.data.jwt);
          storage.set("username", response.data.username);
          sessionStorage.removeItem("jwt");
          sessionStorage.removeItem("username");
          console.log(response);
        } else {
          sessionStorage.setItem("jwt", response.data.jwt);
          sessionStorage.setItem("username", response.data.username);
          storage.remove("jwt");
          storage.remove("username");
        }
        console.log(values.username);
        await initializeSocket(values.username);
        navigate("/products");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setValues({
        ...values,
        error: "Wrong Username/Password. Try again or Register.",
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Icon />
        <H2>Log In</H2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username">Username</Label>
            <div className="mt-2">
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
                required
                value={values.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="********"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <Input
              className="mr-2 w-4 h-4 rounded-sm border border-gray-300 focus:ring-primary focus:ring-offset-0 focus:outline-none"
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={values.rememberMe}
              onChange={handleChange}
            />
            <Label className="text-gray-700" htmlFor="remember-me">
              Remember me
            </Label>
          </div>
          <Link to={"/verification-email"}>Forgot password?</Link>

          {values.error && (
            <div className="text-red-700 text-sm inline-block w-full h6">
              {values.error}
            </div>
          )}

          <div className="flex items-center justify-end">
            <Button_large type="submit">Log in</Button_large>
          </div>

          <div>
            <Link
              to="/signup"
              className="bg-primaryVariant flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondaryVariant transition-colors duration-300 hover:bg-secondaryVariant"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
