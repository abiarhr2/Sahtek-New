// src/Components/ChatBox.jsx
import React, { useState } from 'react';
import './Chatbox.css';

function ChatBox() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleSend = () => {
    if (message.trim() !== '') {
      setChatLog([...chatLog, { sender: 'user', text: message }]);
      setMessage('');
      // Here you could add fake bot replies if you want
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chat-header">
        <h2>ChatSeha</h2>
        <p>How can I help?</p>
      </div>

      <div className="chat-body">
        {chatLog.length === 0 ? (
          <div className="empty-chat">Start typing to chat...</div>
        ) : (
          chatLog.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
}

export default ChatBox;
