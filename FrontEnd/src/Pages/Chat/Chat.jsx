import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import getFromStorage from "../../Service/getFromStorage";
import { getSocket } from "../../Service/socketManager";

function Chat({ owner }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  //const [username, setUsername] = useState(""); // State to hold the username
  const [isOwnerSet, setIsOwnerSet] = useState(false); // State to track if owner is set
  const socket = getSocket();
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
    </div>
  );
}

export default Chat;
