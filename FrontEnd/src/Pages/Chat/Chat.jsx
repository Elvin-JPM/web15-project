// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import getFromStorage from "../../Service/getFromStorage";
// import { getSocket } from "../../Service/socketManager";
// import { useLocation, useParams } from "react-router-dom";
// import { postData, putData } from "../../Api/api";
// import styles from "../Chat/chat.module.css";
// import Header from "../../Components/ui/Header";
// import Button from "../../Components/ui/Button";
// import Footer from "../../Components/ui/Footer";
// import getTimeAgo from "../../Service/getTimeAgo";
// import sendSVG from "../Chat/send-message-2-2.svg";
// import sendMessageIcon from "../Chat/send-message.png";

// function Chat() {
//   const { owner, productId, productName } = useParams();
//   const location = useLocation();
//   const { client } = location.state;
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [currentChat, setCurrentChat] = useState(null);
//   const [newMessage, setNewMessage] = useState({});
//   const socket = getSocket();
//   console.log("Messages:", messages);

//   const loggedUser = getFromStorage("username");
//   const token = getFromStorage("jwt");

//   const sender = loggedUser; // === owner ? owner : client;
//   const receiver = sender === owner ? client : owner;

//   // Finds a chat, if it doesn't exist then creates a new one
//   useEffect(() => {
//     const createChat = async () => {
//       try {
//         const response = await postData(
//           "/find-create-chat",
//           { client, owner, productId },
//           { Authorization: `${token}` }
//         );
//         setCurrentChat(response.data.chat);
//         setMessages(response.data.chat.messages);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     createChat();
//   }, [newMessage]);

//   useEffect(() => {
//     socket.on("chat message", (msg) => {
//       console.log("Recibiendo mensaje para:", loggedUser, msg);
//       //alert(`New message: ${msg.message}`);
//       // SetMessages se actualiza aqui y en SendMessage para que actualice la interfaz tanto del que envia como el que recibe
//       setMessages([...messages, msg]);
//     });
//   }, [messages]);

//   useEffect(() => {
//     if (owner) {
//       //setIsOwnerSet(true);  //uncomment in case it fails
//       socket.emit("setSocketUsername", sender);
//       socket.emit("setReceiverUsername", receiver);
//     }
//   }, [owner]);

//   const sendMessage = async () => {
//     const newMessage = {
//       message: input,
//       from: sender,
//       date: new Date(),
//     };
//     socket.emit("chat message", newMessage);
//     setNewMessage({ newMessage });

//     try {
//       const updatedChat = await putData(
//         `/chat/${currentChat._id}`,
//         {
//           message: input,
//           from: sender,
//           date: new Date(),
//         },
//         { Authorization: `${token}` }
//       );
//       if (updatedChat) {
//         setCurrentChat(updatedChat);
//         setMessages([...updatedChat.chat.messages]);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//     setInput("");
//   };

//   return (
//     <div className={styles.chatPage}>
//       <Header />

//       <div className={styles.chat}>
//         <div className={styles.receiver}>
//           Chat with {receiver} about {productName}
//         </div>
//         <MessageBox messages={messages} loggedUser={loggedUser} />
//         <div className={styles.createMessage}>
//           <input
//             placeholder="Start typing..."
//             className={styles.input}
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <Button onClick={sendMessage}>Send</Button>
//         </div>
//       </div>

//       <Footer>Footer</Footer>
//     </div>
//   );
// }

// const MessageBox = ({ messages, loggedUser }) => {
//   const scrollableRef = useRef(null);
//   useEffect(() => {
//     // Scroll to the bottom when the component mounts
//     if (scrollableRef.current) {
//       scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div ref={scrollableRef} className={styles.messagesBox}>
//       {messages.length === 0
//         ? "No messages yet..."
//         : messages.map((msg, index) => (
//             <div
//               className={`${
//                 msg.from === loggedUser
//                   ? styles["loggedUser-message"]
//                   : styles["receiver-message"]
//               } ${styles["message"]}`}
//               key={index}
//             >
//               <p>{msg.message}</p>
//               <time className={styles.time} dateTime={msg.date}>
//                 {getTimeAgo(msg.date)}
//               </time>
//             </div>
//           ))}
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import getFromStorage from "../../Service/getFromStorage";
import { getSocket } from "../../Service/socketManager";
import { useLocation, useParams } from "react-router-dom";
import { postData, putData } from "../../Api/api";
import styles from "../Chat/chat.module.css";
import Header from "../../Components/ui/Header";
import Button from "../../Components/ui/Button";
import Footer from "../../Components/ui/Footer";
import getTimeAgo from "../../Service/getTimeAgo";

function Chat() {
  const { owner, productId, productName } = useParams();
  const location = useLocation();
  const { client } = location.state;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState({});
  const socket = getSocket();

  const loggedUser = getFromStorage("username");
  const token = getFromStorage("jwt");

  const sender = loggedUser;
  const receiver = sender === owner ? client : owner;

  const sendMessage = useCallback(async () => {
    const newMessage = {
      message: input,
      from: sender,
      date: new Date(),
    };
    socket.emit("chat message", newMessage);
    setNewMessage({ newMessage });

    try {
      const updatedChat = await putData(
        `/chat/${currentChat._id}`,
        {
          message: input,
          from: sender,
          date: new Date(),
        },
        { Authorization: `${token}` }
      );
      if (updatedChat) {
        setCurrentChat(updatedChat);
        setMessages([...updatedChat.chat.messages]);
      }
    } catch (error) {
      console.log(error.message);
    }
    setInput("");
  }, [socket, input, sender, currentChat, token]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log("Recibiendo mensaje para:", loggedUser, msg);
      setMessages([...messages, msg]);
    });
  }, [socket, messages, loggedUser]);

  useEffect(() => {
    const createChat = async () => {
      try {
        const response = await postData(
          "/find-create-chat",
          { client, owner, productId },
          { Authorization: `${token}` }
        );
        setCurrentChat(response.data.chat);
        setMessages(response.data.chat.messages);
      } catch (error) {
        console.log(error.message);
      }
    };
    createChat();
  }, [newMessage]);

  useEffect(() => {
    if (owner) {
      socket.emit("setSocketUsername", sender);
      socket.emit("setReceiverUsername", receiver);
    }
  }, [owner, sender, socket, receiver]);

  return (
    <div className={styles.chatPage}>
      <Header />

      <div className={styles.chat}>
        <div className={styles.receiver}>
          Chat with {receiver} about {productName}
        </div>
        <MessageBox messages={messages} loggedUser={loggedUser} />
        <div className={styles.createMessage}>
          <input
            placeholder="Start typing..."
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>

      <Footer>Footer</Footer>
    </div>
  );
}

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

export default Chat;
