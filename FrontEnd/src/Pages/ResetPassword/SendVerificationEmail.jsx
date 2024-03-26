import Icon from "../../Components/ui/Icon";
import H2 from "../../Components/ui/H2";
import { useState } from "react";
import { useNavigate } from "react-router";
import Label from "../../Components/ui/Label";
import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";
import Button_large from "../../Components/ui/Button_large";
import { postData } from "../../Api/api";
const SendVerificationEmail = () => {
  const [userEmail, setEmail] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  console.log(userEmail);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("/reset-password", { userEmail });
      console.log("From verification email:", response);
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
        <form className="space-y-6" onSubmit={handleSubmitEmail}>
          <div>
            <Label htmlFor="new_password">Email</Label>
            <div className="mt-2">
              <Input
                id="verification_email"
                name="verification_email"
                type="email"
                placeholder="Enter verification email"
                autoComplete="Your Email"
                required
                value={userEmail}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button_large type="submit">Send Email</Button_large>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendVerificationEmail;
