import React, { useState } from "react";
import { FiSearch, FiTrash2, FiMail, FiCornerUpLeft, FiMoreVertical } from "react-icons/fi";
import "./Inbox.css";

const Inbox = () => {
  const initialEmails = [
    {
      sender: "Dr. Salim Idrissi",
      subject: "Re: Doctor Availability",
      time: "1 min ago",
      body: "Hello, I'm following up about Dr. Johnson's availability for my next appointment.",
    },
    {
      sender: "Dr. Amal Kabbaj",
      subject: "Urgent Dermatology Appointment",
      time: "2 days ago",
      body: "Please prioritize an appointment for a severe skin condition.",
    },
  ];

  const registeredUsers = [
    { id: 1, name: "Salim Idrissi", email: "salim@gmail.com" },
    { id: 2, name: "Amal Kabbaj", email: "amal@gmail.com" },
    { id: 3, name: "Amina Nouri", email: "amina@gmail.com" },
    { id: 4, name: "Hichame Benslimane", email: "hichame@gmail.com" },
    { id: 5, name: "Yasmine El Farssi", email: "yasmine@gmail.com" },
    { id: 5, name: "Mourad Jaouhari", email: "mourad@gmail.com" },
  ];

  const [emails, setEmails] = useState(initialEmails);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleSend = () => {
    if (selectedRecipient && newMessage) {
      const recipientName = registeredUsers.find(u => u.email === selectedRecipient)?.name;
      const newEmail = {
        sender: "You",
        subject: `Message to ${recipientName}`,
        time: "Just now",
        body: newMessage,
      };
      setEmails([newEmail, ...emails]);
      setNewMessage("");
      setSelectedRecipient("");
      alert(`Message sent to ${recipientName}`);
    } else {
      alert("Please select a recipient and type your message.");
    }
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebare">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredEmails.map((email, idx) => (
          <div
            key={idx}
            className="email-list-item"
            onClick={() => setSelectedEmail(email)}
          >
            <div className="email-sender">{email.sender}</div>
            <div className="email-subject">{email.subject}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Show Email Details if one is selected */}
        {selectedEmail ? (
          <>
            <div className="email-header">
              <h2>{selectedEmail.sender}</h2>
              <div className="icon-buttons">
                <FiTrash2 />
                <FiMail />
                <FiCornerUpLeft />
                <FiMoreVertical />
              </div>
            </div>
            <p className="email-time">{selectedEmail.time}</p>
            <div className="email-body">
              <p>{selectedEmail.body}</p>
            </div>
            <button
              className="send-button"
              onClick={() => setSelectedEmail(null)}
              style={{ marginTop: "20px" }}
            >
              Back to Compose
            </button>
          </>
        ) : (
          <>
            <h2>Compose New Message</h2>
            <select
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
              className="select-recipient"
            >
              <option value="">Select recipient</option>
              {registeredUsers.map((user) => (
                <option key={user.id} value={user.email}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>

            <textarea
              className="reply-box"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>

            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox;
