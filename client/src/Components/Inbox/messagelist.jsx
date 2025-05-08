import React from 'react';
import MessageItem from './messageitem';
import './messagelist.css';

const messagelist = ({ messages, onSelect, selectedId }) => {
  return (
    <div className="message-list">
      {messages.map(message => (
        <MessageItem
          key={message.id}
          message={message}
          isSelected={message.id === selectedId}
          onClick={() => onSelect(message)}
        />
      ))}
    </div>
  );
};

export default messagelist;