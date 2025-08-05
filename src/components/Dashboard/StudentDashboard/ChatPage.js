import React, { useState } from 'react';
import {
    FaArrowLeft, // Back to Home icon
    FaPlus,      // Add chat icon
    FaSearch,    // Search chat icon
    FaPaperPlane, // Send message icon
    FaFileAlt
} from 'react-icons/fa';
import './ChatPage.css'; // Assuming your general dashboard styles are here

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: "Alice Johnson", text: "Hey everyone! Has anyone started the calculus assignment?", time: "10:30 AM", type: "received" },
        { id: 2, sender: "Bob Smith", text: "I'm working on it now. Question 3 is quite challenging!", time: "10:32 AM", type: "received" },
        { id: 3, sender: "You", text: "Hey everyone! Has anyone started the calculus assignment?", time: "10:35 AM", type: "sent" },
        { id: 4, sender: "You", text: "calculus-solution.pdf", time: "10:36 AM", type: "sent-file" },
        { id: 5, sender: "Charlie Davis", text: "Thanks! This is really helpful. The derivative approach makes much more sense now.", time: "10:40 AM", type: "received" },
        { id: 6, sender: "Prof. Smith", text: "Great collaboration everyone! Remember, the assignment is due tomorrow.", time: "10:45 AM", type: "received" },
    ]);

    const [chatList, setChatList] = useState([
        { id: 1, title: "General Discussion", members: 45, lastMessage: "Hey everyone! Has anyone started the...", active: true },
        { id: 2, title: "Math Study Group", members: 8, lastMessage: "Let's meet at 3 PM for the group stu", active: false },
        { id: 3, title: "Prof. Smith", members: 1, lastMessage: "Your assignment submission looks gr", active: false },
        { id: 4, title: "Alice Johnson", members: 1, lastMessage: "Can you help me with question 3?", active: false },
        { id: 5, title: "Physics Lab - Section A", members: 25, lastMessage: "Lab report due tomorrow at 11:58 PM", active: false },
    ]);

    const [currentMessage, setCurrentMessage] = useState("");

    const handleSendMessage = () => {
        if (currentMessage.trim() !== "") {
            setMessages([...messages, { id: messages.length + 1, sender: "You", text: currentMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: "sent" }]);
            setCurrentMessage("");
        }
    };

    return (
        <div className="container-fluid py-4 dashboard-content-container chat-page">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{color:"#0ABAB5",fontSize:"30px"}}>Chat</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr />

            {/* Chat Layout */}
            <div className="chat-container">
                {/* Left Column: Chat List */}
                <div className="chat-list-column">
                    <div className="chat-list-header d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Messages</h5>
                        <button className="btn btn-sm btn-outline-info rounded-circle">
                            <FaPlus />
                        </button>
                    </div>
                    <div className="chat-search-bar mb-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search chats..." />
                            <div className="input-group-append">
                                <span className="input-group-text"><FaSearch /></span>
                            </div>
                        </div>
                    </div>
                    <div className="chat-list-items">
                        {chatList.map(chat => (
                            <div key={chat.id} className={`chat-list-item d-flex flex-column p-3 mb-2 ${chat.active ? 'active' : ''}`}>
                                <h6 className="mb-1">{chat.title}</h6>
                                <small className="text-muted mb-1"># {chat.members} members</small>
                                <small className="last-message-text">{chat.lastMessage}</small>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Chat Messages */}
                <div className="chat-messages-column">
                    <div className="chat-messages-header d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                        <h5 className="mb-0">General Discussion</h5>
                        <span className="text-muted"># 45 members</span>
                    </div>
                    <div className="chat-messages-body">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chat-message-bubble ${msg.type}`}>
                                {msg.type === "received" && <span className="sender-name">{msg.sender}</span>}
                                {msg.type === "sent-file" ? (
                                    <div className="file-message">
                                        <FaFileAlt className="mr-2" /> {msg.text}
                                    </div>
                                ) : (
                                    <p>{msg.text}</p>
                                )}
                                <span className="message-time">{msg.time}</span>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input-area d-flex align-items-center mt-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type a message..."
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                        />
                        <button className="btn btn-info ml-2" onClick={handleSendMessage}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;