import Button from "../../Components/ui/Button";
import Label from "../../Components/ui/Label";
import Icon from "../../Components/ui/Icon";
import Header from "../../Components/ui/Header";
import { useEffect } from "react";
import { deleteData, getData, putData } from "../../Api/api";
import { useState } from "react";
import getFromStorage from "../../Service/getFromStorage";
import Input from "../../Components/ui/Input";
import H2 from "../../Components/ui/H2";
import { useNavigate } from "react-router";
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

  const requestBody = {
    email: newData.email === userData.email ? userData.email : newData.email,
    username:
      newData.username === userData.username
        ? userData.email
        : newData.username,
    password: newData.password === "" ? "" : newData.password,
  };

  const updateMyData = async () => {
    try {
      const response = await putData(`/updateuser/${username}`, requestBody, {
        Authorization: `${token}`,
      });
      console.log(response);
      if (response.ok) navigate("/login");
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
      if (response.ok) navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(newData);

  return (
    <>
      <Header />
      <div className="max-w-xl  mx-auto p-5">
        <Icon />
        <H2>Editar Perfil</H2>
        <form>
          <Label>email: </Label>
          <Input
            name="email"
            value={newData.email}
            onChange={onDataChange}
          ></Input>
          <br></br>
          <Label>username: </Label>
          <Input
            name="username"
            onChange={onDataChange}
            value={newData.username}
          />
          <br></br>
          <Label>New Password: </Label>
          <Input
            name="newPassword"
            onChange={onDataChange}
            value={newData.newPassword}
            placeholder="In case you want to change it..."
          />
          <br></br>
          <Label>Confirm New Password: </Label>
          <Input
            name="confirmNewPassword"
            onChange={onDataChange}
            value={newData.confirmNewPassword}
            placeholder="Confirm your new password"
          />
        </form>
        <br></br>
        <Button onClick={deleteMyUser}>Delete my user</Button>
        <br></br>
        <Button
          disabled={
            !(
              newData.newPassword === newData.confirmNewPassword &&
              (newData.username !== userData.username ||
                newData.email !== userData.email)
            )
          }
          onClick={updateMyData}
        >
          Update my data
        </Button>
      </div>
    </>
  );
}

export default MyProfile;
