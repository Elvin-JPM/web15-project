import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import getFromStorage from "../../Service/getFromStorage";
import { getSocket } from "../../Service/socketManager";
import { getData, putData } from "../../Api/api";
import { Link } from "react-router-dom";

import styles from "./notifications.module.css";
import getTimeAgo from "../../Service/getTimeAgo";
import Button from "../../Components/ui/Button";
import { NoData } from "../../Components/ui/NoData";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [numNotifications, setNumNotifications] = useState(0);
  const [messageRead, setMessageRead] = useState(false);
  const navigate = useNavigate();

  const token = getFromStorage("jwt");
  const username = getFromStorage("username");
  let socket = getSocket(username);

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
      socket.on("chat message", async (msg) => {
        console.log("Recibiendo en cabecera:", username, msg);

        setNumNotifications(newNumNotifications + 1);
      });
    }
  }, [token, username, socket, messageRead]);

  const markRead = async (notificationReadValue, notificationId) => {
    try {
      const updatedReadNotification = await putData(
        `/notifications/${notificationId}`,
        { notificationReadValue },
        { Authorization: `${token}` }
      );

      setMessageRead(!messageRead);
    } catch (error) {}
  };

  const newValueNotifications = notifications;
  const newNumNotifications = numNotifications;
  return (
    <div className={styles.notifications_page}>
      <h2 className={styles.notifications_title}>Notifications</h2>
      {notifications.length ? (
        notifications.map((notification) => {
          return (
            <div className={styles.notification_item} key={notification._id}>
              {notification.type === "new message" ? (
                <Link
                  to={`/chat/${notification.owner}/${notification.productName}/${notification.productId}`}
                  state={{
                    client:
                      notification.recipient === notification.owner
                        ? notification.sender
                        : notification.recipient,
                  }}
                >
                  <div>
                    <p>
                      <strong>{notification.sender}</strong> sent you a message
                    </p>
                    <p className={styles.notification_message}>
                      {notification.message}
                    </p>
                    <p className={styles.notification_date}>
                      {getTimeAgo(notification.date)}
                    </p>
                  </div>
                </Link>
              ) : (
                ""
              )}

              <div className={styles.markMessage}>
                <svg
                  className={styles.unlike}
                  fill="white"
                  width="28px"
                  height="30px"
                  viewBox="-153.6 -153.6 2227.20 2227.20"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000"
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
                <Button
                  onClick={() => markRead(!notification.read, notification._id)}
                >
                  {notification.read ? "Mark as unread" : "Mark as read"}
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex min-h-[500px] items-center justify-center">
          <NoData description="No data to display" />
        </div>
      )}
    </div>
  );
}

export default Notifications;
