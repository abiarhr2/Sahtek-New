// client/src/Components/ChatBox.jsx
import React, { useState } from 'react';
import './Chatbox.css';

function ChatBox() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleSend = async () => {
    if (message.trim() !== '') {
      setChatLog([...chatLog, { sender: 'user', text: message }]);
      setMessage('');

      // Send the message to the Flask backend
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      const data = await response.json();
      if (data.response) {
        setChatLog([...chatLog, { sender: 'user', text: message }, { sender: 'bot', text: data.response }]);
      }
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
