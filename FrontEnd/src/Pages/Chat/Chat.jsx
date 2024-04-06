import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import getFromStorage from "../../Service/getFromStorage";
import { getSocket } from "../../Service/socketManager";
import { useLocation, useParams } from "react-router-dom";
import { postData, putData } from "../../Api/api";
import styles from "../Chat/chat.module.css";
import Header from "../../Components/ui/Header";
import Button from "../../Components/ui/Button";
import Footer from "../../Components/ui/Footer";

function Chat() {
  const { owner, productId } = useParams();
  const location = useLocation();
  const { client } = location.state;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState(null);

  const socket = getSocket();
  console.log("Messages:", messages);

  const loggedUser = getFromStorage("username");
  const token = getFromStorage("jwt");

  const sender = loggedUser; // === owner ? owner : client;
  const receiver = sender === owner ? client : owner;

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
  }, []);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log("Recibiendo mensaje para:", loggedUser, msg);
      // SetMessages se actualiza aqui y en SendMessage para que actualice la interfaz tanto del que envia como el que recibe
      setMessages([...messages, msg]);
    });
  }, [messages]);

  useEffect(() => {
    if (owner) {
      //setIsOwnerSet(true);  //uncomment in case it fails
      socket.emit("setSocketUsername", sender);
      socket.emit("setReceiverUsername", receiver);
    }
  }, [owner]);

  const sendMessage = async () => {
    socket.emit("chat message", {
      message: input,
      from: sender,
      date: new Date(),
    });
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
  };

  return (
    <div className={styles.chatPage}>
      <Header />

      <div className={styles.chat}>
        <div className={styles.messagesBox}>
          {messages.length === 0
            ? "No messages yet..."
            : messages.map((msg, index) => <p key={index}>{msg.message}</p>)}
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
