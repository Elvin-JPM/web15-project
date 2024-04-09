import { useRef, useEffect } from "react";
import styles from "../Chat/chat.module.css";
import getTimeAgo from "../../Service/getTimeAgo";
const MessageBox = ({ messages, loggedUser }) => {
  const scrollableRef = useRef(null);
  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollableRef} className={styles.messagesBox}>
      {messages.length === 0
        ? "No messages yet..."
        : messages.map((msg, index) => (
            <div
              className={`${
                msg.from === loggedUser
                  ? styles["loggedUser-message"]
                  : styles["receiver-message"]
              } ${styles["message"]}`}
              key={index}
            >
              <p>{msg.message}</p>
              <time className={styles.time} dateTime={msg.date}>
                {getTimeAgo(msg.date)}
              </time>
            </div>
          ))}
    </div>
  );
};

export default MessageBox;
