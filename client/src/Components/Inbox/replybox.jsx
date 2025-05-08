import React, { useState } from 'react';
import './ReplyBox.css';

const ReplyBox = ({ message, onClose }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reply submission
    console.log('Reply sent:', replyContent);
    onClose();
  };

  return (
    <div className="reply-box">
      <div className="reply-header">
        <h4>Reply to {message.sender}</h4>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder={`Reply to ${message.sender} about "${message.subject}"`}
          required
        />
        <div className="reply-actions">
          <button type="submit" className="send-button">Send</button>
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ReplyBox;