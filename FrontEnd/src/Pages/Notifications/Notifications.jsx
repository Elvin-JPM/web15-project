import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import getFromStorage from "../../Service/getFromStorage";
import { getSocket } from "../../Service/socketManager";
import { getData } from "../../Api/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [numNotifications, setNumNotifications] = useState(0);
  const navigate = useNavigate();
  let socket = getSocket();

  const token = getFromStorage("jwt");
  const username = getFromStorage("username");

  useEffect(() => {
    if (token && username) {
      const getNotifications = async () => {
        try {
          const newNotifications = await getData(`/notifications/${username}`);
          console.log("Notifications:", newNotifications);
          setNotifications(newNotifications);
          setNumNotifications(newNotifications.length);
        } catch (error) {
          console.log(error.message);
        }
      };

      getNotifications();
      console.log("Use Effect called");

      socket.on("chat message", async (msg) => {
        console.log("Recibiendo en cabecera:", username, msg);

        setNumNotifications(newNumNotifications + 1);

        console.log("Notifications after:", notifications);
      });
    }
  }, [token, username, socket]);

  const newValueNotifications = notifications;
  const newNumNotifications = numNotifications;
  return (
    <div>
      {notifications.map((notification) => {
        return (
          <div key={notification._id}>
            {notification.type === "new message" ? (
              <div>
                <p>New message from {notification.sender}</p>
                <p>{notification.message}</p>
                <svg
                  fill="#111111"
                  width="28px"
                  height="30px"
                  viewBox="-153.6 -153.6 2227.20 2227.20"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                  strokeWidth="126.72"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#00000"
                    strokeWidth="69.11999999999999"
                  >
                    {" "}
                    <path
                      d="M1771.731 291.037C1675.709 193.659 1547.944 140 1411.818 140h-.113c-136.125 0-263.777 53.66-359.573 150.924-37.618 38.07-68.571 80.997-92.294 127.426-23.61-46.429-54.563-89.356-92.068-127.313C771.86 193.659 644.208 140 507.97 140h-.113c-136.012 0-263.777 53.66-359.8 151.037-197.691 200.629-197.691 527.103 1.695 729.088l810.086 760.154 811.893-761.736c197.692-200.403 197.692-526.877 0-727.506"
                      fillRule="evenodd"
                    ></path>{" "}
                  </g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M1771.731 291.037C1675.709 193.659 1547.944 140 1411.818 140h-.113c-136.125 0-263.777 53.66-359.573 150.924-37.618 38.07-68.571 80.997-92.294 127.426-23.61-46.429-54.563-89.356-92.068-127.313C771.86 193.659 644.208 140 507.97 140h-.113c-136.012 0-263.777 53.66-359.8 151.037-197.691 200.629-197.691 527.103 1.695 729.088l810.086 760.154 811.893-761.736c197.692-200.403 197.692-526.877 0-727.506"
                      fillRule="evenodd"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Notifications;
