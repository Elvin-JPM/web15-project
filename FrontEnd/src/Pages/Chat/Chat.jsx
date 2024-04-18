import React, { useState, useEffect, useCallback, useRef } from "react";
import getFromStorage from "../../Service/getFromStorage";
import { getSocket } from "../../Service/socketManager";
import { useLocation, useParams } from "react-router-dom";
import { postData, putData } from "../../Api/api";
import MessageBox from "./MessageBox";
import styles from "../Chat/chat.module.css";
import Button from "../../Components/ui/Button";

function Chat() {
  const { owner, productId, productName } = useParams();
  const location = useLocation();
  const { client } = location.state;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentChatId, setCurrentChatId] = useState(null);
  const [newMessage, setNewMessage] = useState({});
  const currentChatIdRef = useRef(null);
  const socket = getSocket();

  const loggedUser = getFromStorage("username");
  const token = getFromStorage("jwt");

  const sender = loggedUser;
  const receiver = sender === owner ? client : owner;

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    const message = {
      message: input,
      from: sender,
      date: new Date(),
    };

    // After emitting the message, update it on the database
    try {
      const updatedChat = await putData(
        `/chat/${currentChatIdRef.current}`,
        message,
        {
          Authorization: `${token}`,
        }
      );
      if (updatedChat) {
        const newNotification = await postData("/notifications", {
          recipient: receiver,
          sender,
          productId,
          message: input,
          type: "new message",
          productName,
          owner,
        });

        socket.emit("chat message", message);
        //socket.emit("new notification", newNotification);
        setNewMessage({ message });
        setCurrentChatId(updatedChat._id);
        setMessages([...updatedChat.chat.messages]);
      }
    } catch (error) {
      console.log(error.message);
    }
    setInput("");
  };

  // Updating the messages state after receiving a message
  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log("Recibiendo mensaje para:", loggedUser, msg);
      setMessages([...messages, msg]);
    });
  }, [socket, messages, loggedUser]);

  // Find or create the chat as soon as the chat page is open
  useEffect(() => {
    const createChat = async () => {
      try {
        const response = await postData(
          "/find-create-chat",
          { client, owner, productId },
          { Authorization: `${token}` }
        );
        setCurrentChatId(response.data.chat._id);
        setMessages(response.data.chat.messages);
        if (!currentChatIdRef.current) {
          currentChatIdRef.current = response.data.chat._id;
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    createChat();
  }, []);

  // Emit an event specifying the sender and receiver of the message for this chat
  useEffect(() => {
    if (loggedUser && receiver) {
      socket.emit("setSocketUsername", loggedUser);
      socket.emit("setReceiverUsername", receiver);
    }
  }, [sender, receiver]);

  const chatId = currentChatId;

  return (
    <div className={styles.chatPage}>
      <div className={styles.chat}>
        <div className={styles.receiver}>
          <p>
            Chat with {receiver} about {productName}
          </p>
        </div>
        <MessageBox messages={messages} loggedUser={loggedUser} />
        <div className={styles.createMessage}>
          <input
            placeholder="Start typing..."
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnterKeyDown}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
