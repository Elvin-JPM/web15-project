import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import getFromStorage from "../../Service/getFromStorage";
import { getSocket } from "../../Service/socketManager";
import { useLocation } from "react-router-dom";
import { postData } from "../../Api/api";
import styles from "../Chat/chat.module.css";
import Header from "../../Components/ui/Header";
import Button from "../../Components/ui/Button";
import Footer from "../../Components/ui/Footer";
import Input from "../../Components/ui/Input";

function Chat() {
  const location = useLocation();
  const { owner, client, productId } = location.state;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  //const [username, setUsername] = useState(""); // State to hold the username
  const [isOwnerSet, setIsOwnerSet] = useState(false); // State to track if owner is set
  const socket = getSocket();
  console.log(productId);
  console.log(owner);

  const loggedUser = getFromStorage("username");
  const token = getFromStorage("jwt");

  const sender = loggedUser === owner ? owner : client;
  const receiver = sender === owner ? client : owner;

  useEffect(() => {
    const createChat = async () => {
      try {
        const response = await postData(
          "/find-create-chat",
          { client, owner, productId },
          { Authorization: `${token}` }
        );
        console.log(response.data.chat);
      } catch (error) {
        console.log(error.message);
      }
    };
    createChat();
  }, []);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages, socket]);

  useEffect(() => {
    if (owner) {
      setIsOwnerSet(true);
      socket.emit("setSocketUsername", sender);
      socket.emit("setReceiverUsername", receiver);
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
