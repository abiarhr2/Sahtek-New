// src/Components/Inbox/Inbox.jsx
import React, { useState } from 'react';

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'Alice Smith',
      time: '1 min ago',
      subject: 'Re: Doctor Availability',
      preview: 'Hello, I\'m following up about Dr. Johnsons availability...',
      fullContent: 'Hello, I\'m following up about Dr. Johnson\'s availability for my next appointment. Please let me know what time slots are open next week. Thank you!',
      date: 'Mar 25, 2025, 11:50 PM',
      email: 'alicesmith@example.com'
    },
    {
      id: 2,
      sender: 'William Smith',
      time: '2 days ago',
      subject: 'Urgent Dermatology Appointment',
      preview: 'I have a suspicious mole that needs evaluation. Can I see Dr. Patel this week? Prefer mornings...',
      fullContent: 'I have a suspicious mole that needs evaluation. Can I see Dr. Patel this week? I would prefer morning appointments if possible. Please let me know the earliest availability.',
      isUrgent: true
    },
    {
      id: 3,
      sender: 'Emily Davis',
      time: '3 days ago',
      subject: 'Abnormal Results – MRN#89821',
      preview: 'Critical: Elevated WBC count (15,000) for Jane Doe. Flagged for Dr. Kharis review...',
      fullContent: 'Critical: Elevated WBC count (15,000) for Jane Doe. Flagged for Dr. Kharis review. Patient should be contacted immediately for follow-up testing.',
      isCritical: true
    },
    {
      id: 4,
      sender: 'David Lee',
      time: '3 days ago',
      subject: 'Ward SB Bed Availability',
      preview: '2 beds free in Ward 5B. Update the system when assigned.',
      fullContent: '2 beds free in Ward 5B. Please update the system when these are assigned to maintain accurate bed tracking.'
    }
  ];

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    setReplyingTo(null);
  };

  const handleReply = () => {
    setReplyingTo(selectedMessage);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    // Handle sending the reply
    console.log('Reply sent:', replyContent);
    setReplyingTo(null);
    setReplyContent('');
  };

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      backgroundColor: '#fff'
    }}>
      {/* Message List */}
      <div style={{
        width: '35%',
        borderRight: '1px solid #e0e0e0',
        overflowY: 'auto'
      }}>
        {messages.map(message => (
          <div 
            key={message.id}
            style={{
              padding: '15px',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              backgroundColor: selectedMessage?.id === message.id ? '#e3f2fd' : '#fff',
              borderLeft: message.isCritical ? '4px solid #f44336' : 
                        message.isUrgent ? '4px solid #ff9800' : 'none'
            }}
            onClick={() => handleMessageSelect(message)}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px'
            }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>{message.sender}</h4>
              <span style={{ fontSize: '12px', color: '#666' }}>{message.time}</span>
            </div>
            <h5 style={{ margin: '5px 0', fontSize: '13px', fontWeight: '500' }}>{message.subject}</h5>
            <p style={{
              margin: '5px 0 0',
              fontSize: '12px',
              color: '#666',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{message.preview}</p>
          </div>
        ))}
      </div>
      
      {/* Message View */}
      <div style={{
        width: '65%',
        padding: '20px',
        overflowY: 'auto'
      }}>
        {selectedMessage ? (
          <>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <div style={{
                borderBottom: '1px solid #eee',
                paddingBottom: '15px',
                marginBottom: '15px'
              }}>
                <h3 style={{ margin: '0 0 10px' }}>{selectedMessage.subject}</h3>
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  fontSize: '13px',
                  color: '#666'
                }}>
                  <span>{selectedMessage.sender}</span>
                  {selectedMessage.email && <span>{selectedMessage.email}</span>}
                  <span>{selectedMessage.date || selectedMessage.time}</span>
                </div>
              </div>
              
              <div style={{
                flexGrow: 1,
                padding: '10px 0'
              }}>
                <p>{selectedMessage.fullContent}</p>
              </div>
              
              <div style={{
                paddingTop: '15px',
                borderTop: '1px solid #eee'
              }}>
                <button 
                  onClick={handleReply}
                  style={{
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Reply
                </button>
              </div>
            </div>

            {/* Reply Box */}
            {replyingTo && (
              <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                marginTop: '20px',
                backgroundColor: '#f9f9f9'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 15px',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <h4 style={{ margin: 0 }}>Reply to {replyingTo.sender}</h4>
                  <button 
                    onClick={() => setReplyingTo(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '20px',
                      cursor: 'pointer',
                      color: '#666'
                    }}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSendReply} style={{ padding: '15px' }}>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={`Reply to ${replyingTo.sender} about "${replyingTo.subject}"`}
                    required
                    style={{
                      width: '100%',
                      minHeight: '150px',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      resize: 'vertical',
                      marginBottom: '10px'
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px'
                  }}>
                    <button 
                      type="submit"
                      style={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        padding: '8px 15px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Send
                    </button>
                    <button 
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      style={{
                        backgroundColor: '#f5f5f5',
                        border: '1px solid #ddd',
                        padding: '8px 15px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#888'
          }}>
            <p>Select a message to view</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;