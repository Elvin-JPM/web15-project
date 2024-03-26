import Icon from "../../Components/ui/Icon";
import H2 from "../../Components/ui/H2";
import { useState } from "react";
import { useNavigate } from "react-router";
import Label from "../../Components/ui/Label";
import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";
import Button_large from "../../Components/ui/Button_large";
import { useParams } from "react-router";
import { putData } from "../../Api/api";
const ResetPassword = () => {
  const [values, setValues] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const resetToken = useParams().token;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.getAttribute("name")]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putData(
        "/reset-password",
        { newPassword: values.newPassword },

        { headers: resetToken }
      );
      if (response.statusText === "ok") {
        navigate("/login");
      }
      console.log("From reset password:", response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Icon />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="new_password">New Password</Label>
            <div className="mt-2">
              <Input
                id="new_password"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                autoComplete="New Password"
                required
                value={values.newPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="confirm_new_password">Confirm password</Label>
            </div>
            <div className="mt-2">
              <Input
                id="confirm_new_password"
                name="confirmNewPassword"
                type="password"
                autoComplete="confirm_new_password"
                required
                placeholder="Confirm new password"
                value={values.confirmNewPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button_large
              disabled={!(values.newPassword === values.confirmNewPassword)}
              type="submit"
            >
              Reset Password
            </Button_large>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
