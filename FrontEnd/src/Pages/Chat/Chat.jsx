import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import getFromStorage from "../../Service/getFromStorage";
import { getSocket } from "../../Service/socketManager";
<<<<<<< HEAD

function Chat({ owner }) {
=======
import { useLocation } from "react-router-dom";
import styles from "../Chat/chat.module.css";
import Header from "../../Components/ui/Header";
import Button from "../../Components/ui/Button";
import Footer from "../../Components/ui/Footer";
import Input from "../../Components/ui/Input";
function Chat() {
  const location = useLocation();
  const { productChat } = location.state;
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  //const [username, setUsername] = useState(""); // State to hold the username
  const [isOwnerSet, setIsOwnerSet] = useState(false); // State to track if owner is set
  const socket = getSocket();
<<<<<<< HEAD
=======
  const owner = productChat.owner;
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
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
<<<<<<< HEAD
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
=======
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
>>>>>>> 5d1f2bc9574fb5efac5b8918a417fbfbe4d99d08
    </div>
  );
}

export default Chat;
