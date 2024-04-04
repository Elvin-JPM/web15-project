import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import getFromStorage from "../../Service/getFromStorage";
import { getSocket } from "../../Service/socketManager";
import { useLocation } from "react-router-dom";
import styles from "../Chat/chat.module.css";
import Header from "../../Components/ui/Header";
import Button from "../../Components/ui/Button";
import Footer from "../../Components/ui/Footer";
import Input from "../../Components/ui/Input";
function Chat() {
  const location = useLocation();
  const { productChat } = location.state;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  //const [username, setUsername] = useState(""); // State to hold the username
  const [isOwnerSet, setIsOwnerSet] = useState(false); // State to track if owner is set
  const socket = getSocket();
  const owner = productChat.owner;
  console.log(owner);

  const username = getFromStorage("username");

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages, socket]);

  useEffect(() => {
    if (owner) {
      setIsOwnerSet(true);
      socket.emit("setSocketUsername", username);
      socket.emit("setReceiverUsername", owner);
    }
  }, [owner]);

  const sendMessage = () => {
    socket.emit("chat message", input);
    setInput("");
  };

  return (
    <div className={styles.chatPage}>
      <Header />

      <div className={styles.chat}>
        <div className={styles.messagesBox}>
          {messages.length === 0
            ? "No messages yet..."
            : messages.map((msg, index) => <p key={index}>{msg}</p>)}
        </div>
        <textarea
          placeholder="Start typing..."
          className={styles.textarea}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>

      <Footer>Footer</Footer>
    </div>
  );
}

export default Chat;
