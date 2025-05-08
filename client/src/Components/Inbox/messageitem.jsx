import React from 'react';
import './messageitem.css';

const MessageItem = ({ message, isSelected, onClick }) => {
  return (
    <div 
      className={`message-item ${isSelected ? 'selected' : ''} ${message.isCritical ? 'critical' : ''} ${message.isUrgent ? 'urgent' : ''}`}
      onClick={onClick}
    >
      <div className="message-header">
        <h4 className="sender">{message.sender}</h4>
        <span className="time">{message.time}</span>
      </div>
      <h5 className="subject">{message.subject}</h5>
      <p className="preview">{message.preview}</p>
    </div>
  );
};

export default MessageItem;