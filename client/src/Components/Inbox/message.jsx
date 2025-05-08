import React from 'react';
import './MessageView.css';

const MessageView = ({ message, onReply }) => {
  return (
    <div className="message-view">
      <div className="message-view-header">
        <h3>{message.subject}</h3>
        <div className="message-meta">
          <span className="sender">{message.sender}</span>
          {message.email && <span className="email">{message.email}</span>}
          <span className="date">{message.date || message.time}</span>
        </div>
      </div>
      
      <div className="message-content">
        <p>{message.fullContent}</p>
      </div>
      
      <div className="message-actions">
        <button onClick={onReply} className="reply-button">Reply</button>
      </div>
    </div>
  );
};

export default MessageView;