import React, { useState, useEffect } from 'react';
import { getSocket } from '../Service/socketManager'; 
import getFromStorage from "../Service/getFromStorage";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = getSocket(); 

  useEffect(() => {
    // Listen for the 'newMessage' event to receive new messages from the server
    socket.on('newMessage', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
  }, [socket]);

  const sendMessage = () => {
    // Send the message to the server and broadcast it to all connected clients
    socket.emit('sendMessage', inputMessage);
    setInputMessage('');
  };

  const token = getFromStorage("jwt");

  return (
    // Display chat option only when the user is logged in
    token ? (
      <div>
        <h1>Chat</h1>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    ) : null
  );
};

export default Chat;

