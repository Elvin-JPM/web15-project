import Button from "../../Components/ui/Button";
import Label from "../../Components/ui/Label";
import Icon from "../../Components/ui/Icon";
import { useEffect } from "react";
import { deleteData, getData, putData } from "../../Api/api";
import { useState } from "react";
import getFromStorage from "../../Service/getFromStorage";
import Input from "../../Components/ui/Input";
import H2 from "../../Components/ui/H2";
import { useNavigate } from "react-router";
import logout from "../../Service/logout";
import styles from "../MyProfile/my_profile.module.css";
function MyProfile() {
  const navigate = useNavigate();

  // Definiendo los estados de las variables actuales y las nuevas
  const [userData, setUserData] = useState("");
  const [newData, setNewData] = useState({
    email: "",
    username: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const username = getFromStorage("username");
  const token = getFromStorage("jwt");

  // Recupernado la informacion del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getData(`/get/${username}`, {
          headers: { Authorization: `${token}` },
        });
        if (response) setUserData(response);
        setNewData({
          email: response.email,
          username: response.username,
          newPassword: "",
          confirmNewPassword: "",
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, []);

  const onDataChange = (e) => {
    setNewData({ ...newData, [e.target.getAttribute("name")]: e.target.value });
  };

  let requestBody = {
    email: newData.email === userData.email ? userData.email : newData.email,
    username:
      newData.username === userData.username
        ? userData.username
        : newData.username,
  };

  if (newData.newPassword !== "") {
    requestBody.password = newData.newPassword;
  }

  const updateMyData = async () => {
    try {
      const response = await putData(`/updateuser/${username}`, requestBody, {
        Authorization: `${token}`,
      });

      if (response.ok) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMyUser = async () => {
    try {
      const response = await deleteData(`/deleteUser/${username}`, {
        Authorization: `${token}`,
      });
      console.log("this is the response", response);
      if (response.ok) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(newData);

  const handleReturn = () => {
    navigate("/products");
  };

  return (
    <>
      <div className={`${styles.profile_form} max-w-xl mx-auto px-5`}>
        <Icon />
        <H2>Edit Profile</H2>
        <form>
          <div className="mb-4">
            <Label>email: </Label>
            <Input
              name="email"
              value={newData.email}
              onChange={onDataChange}
            ></Input>
          </div>
          <div className="mb-4">
            <Label>username:</Label>
            <Input
              name="username"
              onChange={onDataChange}
              value={newData.username}
            />
          </div>
          <div className="mb-4">
            <Label>New Password:</Label>
            <Input
              name="newPassword"
              type="password"
              onChange={onDataChange}
              value={newData.newPassword}
              placeholder="********"
            />
          </div>
          <div className="mb-4">
            <Label>Confirm New Password:</Label>
            <Input
              name="confirmNewPassword"
              type="password"
              onChange={onDataChange}
              value={newData.confirmNewPassword}
              placeholder="********"
            />
          </div>
        </form>
        <div className="mb-4">
          <Button onClick={deleteMyUser}>Delete my user</Button>
        </div>
        <div className="mb-4">
          <Button onClick={updateMyData}>Update my data</Button>
        </div>
        <div className="mb-4">
          <Button onClick={handleReturn}>Go Back</Button>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
